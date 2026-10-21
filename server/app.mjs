import express from 'express';
import {randomBytes,timingSafeEqual} from 'node:crypto';
export function createApp(store,adminPassword) {
  const app=express(),sessions=new Map(),attempts=new Map();
  app.disable('x-powered-by');app.use(express.json({limit:'40kb'}));
  app.use((req,res,next)=>{res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');if(req.path.startsWith('/api/'))res.setHeader('Cache-Control','no-store');if(!['GET','HEAD','OPTIONS'].includes(req.method)){const origin=req.headers.origin;if(origin&&origin!==`${req.protocol}://${req.headers.host}`)return res.status(403).json({error:'Origin not allowed.'});}next();});
  const limited=(req,res,next)=>{const key=req.ip+req.path,now=Date.now();let x=attempts.get(key);if(!x||now-x.at>60000)x={at:now,n:0};x.n++;attempts.set(key,x);if(x.n>25)return res.status(429).json({error:'Too many requests. Try again in a minute.'});next();};
  const cookie=req=>(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('kesari_session='))?.slice(15);
  const auth=(req,res,next)=>sessions.get(cookie(req))>Date.now()?next():res.status(401).json({error:'Please sign in.'});
  const publicOrder=o=>{const {token,requestKey,...rest}=o;return rest;};
  const owned=(req,res,next)=>{const o=store.get('order',req.params.id);if(!o||req.headers.authorization!==`Bearer ${o.token}`)return res.status(404).json({error:'Booking not found.'});req.order=o;next();};
  app.get('/api/content',(req,res)=>res.json(store.publicContent()));
  app.post('/api/admin/login',limited,(req,res)=>{const a=Buffer.from(String(req.body.password||'')),b=Buffer.from(adminPassword);if(a.length!==b.length||!timingSafeEqual(a,b))return res.status(401).json({error:'Incorrect password.'});const token=randomBytes(32).toString('hex');sessions.set(token,Date.now()+8*3600000);res.cookie('kesari_session',token,{httpOnly:true,sameSite:'strict',secure:req.secure,maxAge:8*3600000});res.json({ok:true});});
  app.post('/api/admin/logout',auth,(req,res)=>{sessions.delete(cookie(req));res.clearCookie('kesari_session');res.json({ok:true});});
  app.get('/api/admin',auth,(req,res)=>res.json({events:store.all('event'),settings:store.get('settings','main'),orders:store.all('order').map(publicOrder),enquiries:store.all('enquiry')}));
  app.put('/api/admin/events/:id',auth,(req,res)=>res.json(store.event(req.body,req.params.id)));
  app.put('/api/admin/settings',auth,(req,res)=>{const d=req.body;const upiId=store.text(d.upiId,100),payeeName=store.text(d.payeeName,100),email=store.text(d.email,150),phone=store.text(d.phone,18);if(!/^[\w.-]+@[\w.-]+$/.test(upiId)||!/^\S+@\S+\.\S+$/.test(email)||!/^[+0-9 ()-]{10,18}$/.test(phone))return res.status(400).json({error:'Check the UPI ID, email and phone.'});res.json(store.put('settings','main',{upiId,payeeName,email,phone}));});
  app.post('/api/orders',limited,(req,res)=>res.status(201).json(store.order(req.body)));
  app.get('/api/orders/:id',owned,(req,res)=>res.json(publicOrder(req.order)));
  app.post('/api/orders/:id/payment',limited,owned,(req,res)=>res.json(publicOrder(store.payment(req.params.id,store.text(req.body.utr,40)))));
  app.post('/api/admin/orders/:id/review',auth,(req,res)=>res.json(publicOrder(store.review(req.params.id,req.body.status))));
  app.use('/api',(req,res)=>res.status(404).json({error:'Not found.'}));
  app.use((err,req,res,next)=>{if(!req.path.startsWith('/api/'))return next(err);res.status(err.status||500).json({error:err.status?err.message:'Unable to complete the request.'});});
  const cleanup=setInterval(()=>{const now=Date.now();for(const[k,v]of attempts)if(now-v.at>60000)attempts.delete(k);for(const[k,v]of sessions)if(v<now)sessions.delete(k);},60000);cleanup.unref();
  return app;
}
