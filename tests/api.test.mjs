import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createStore} from '../server/store.mjs';
import {createApp} from '../server/app.mjs';
test('one API connects admin management, landing selection, guest booking and payment review',async()=>{
 const store=createStore(':memory:'),app=createApp(store,'integration-only-password');const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));const origin='http://127.0.0.1:'+server.address().port;let cookie='';
 async function call(url,method='GET',body,token){const r=await fetch(origin+url,{method,headers:{'Content-Type':'application/json',Cookie:cookie,...(token?{Authorization:'Bearer '+token}:{})},body:body?JSON.stringify(body):undefined});return {status:r.status,data:await r.json(),headers:r.headers}}
 try{
  assert.equal((await call('/api/admin')).status,401);assert.equal((await call('/api/admin/login','POST',{password:'wrong'})).status,401);
  const login=await call('/api/admin/login','POST',{password:'integration-only-password'});assert.equal(login.status,200);cookie=login.headers.get('set-cookie').split(';')[0];assert.match(login.headers.get('set-cookie'),/HttpOnly/);
  const base={title:'Test near event',date:'2099-01-01T20:00:00+05:30',price:299,capacity:10,published:true,bookingOpen:true,bookingMode:'upi',terms:'Test terms',showOnLanding:true};
  assert.equal((await call('/api/admin/events/near','PUT',base)).status,200);
  assert.equal((await call('/api/admin/events/late','PUT',{...base,title:'Test featured event',date:'2099-02-01',featured:true})).status,200);
  let content=(await call('/api/content')).data;assert.deepEqual(content.landingEvents.map(e=>e.id),['late','near']);
  await call('/api/admin/events/late','PUT',{...base,title:'Hidden from landing',date:'2099-02-01',showOnLanding:false});content=(await call('/api/content')).data;assert.deepEqual(content.landingEvents.map(e=>e.id),['near']);assert.equal(content.events.length,2);
  await call('/api/admin/settings','PUT',{upiId:'test@bank',payeeName:'Test Merchant',email:'test@example.com',phone:'9876543210'});
  const created=await call('/api/orders','POST',{eventId:'near',name:'Test Guest',email:'test@example.com',phone:'9876543210',quantity:2,amount:1,acceptedTerms:true,requestKey:'integration-test-key-123456'});assert.equal(created.status,201);assert.equal(created.data.amount,598);const o=created.data;
  assert.equal((await call('/api/orders/'+o.id)).status,404);assert.equal((await call('/api/orders/'+o.id+'/payment','POST',{utr:'TEST123456789'},o.token)).data.status,'pending_review');
  assert.equal((await call('/api/admin/orders/'+o.id+'/review','POST',{status:'confirmed'})).data.status,'confirmed');const confirmed=(await call('/api/orders/'+o.id,'GET',null,o.token)).data;assert.ok(confirmed.ticketCode);assert.equal(confirmed.token,undefined);
  const foreign=await fetch(origin+'/api/admin/settings',{method:'PUT',headers:{'Content-Type':'application/json',Cookie:cookie,Origin:'https://untrusted.example'},body:'{}'});assert.equal(foreign.status,403);
 }finally{await new Promise(r=>server.close(r));store.db.close()}
});
