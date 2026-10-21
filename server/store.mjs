import {DatabaseSync} from 'node:sqlite';
import {randomUUID,randomBytes} from 'node:crypto';
import {selectLandingEvents} from '../src/lib/events.js';

export function createStore(file) {
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS records(kind TEXT NOT NULL,id TEXT NOT NULL,value TEXT NOT NULL,PRIMARY KEY(kind,id))');
  const all = kind => db.prepare('SELECT value FROM records WHERE kind=?').all(kind).map(r => JSON.parse(r.value));
  const get = (kind,id) => { const row = db.prepare('SELECT value FROM records WHERE kind=? AND id=?').get(kind,id); return row ? JSON.parse(row.value) : null; };
  const put = (kind,id,value) => { db.prepare('INSERT OR REPLACE INTO records VALUES(?,?,?)').run(kind,id,JSON.stringify(value)); return value; };
  const fail = (message,status=400) => { throw Object.assign(new Error(message),{status}); };
  const text = (value,max=300) => typeof value === 'string' ? value.trim().slice(0,max) : '';
  const imageURL = value => !value || /^https?:\/\//i.test(value) || /^\/assets\/[a-zA-Z0-9_./-]+$/.test(value) && !value.includes('..');
  if (!get('settings','main')) put('settings','main',{upiId:'kesari.memory@okhdfcbank',payeeName:'',email:'Kesari.memory@gmail.com',phone:'+917760539955'});
  function sold(id) { return all('order').filter(o => o.eventId === id && o.status === 'confirmed').reduce((n,o) => n+o.quantity,0); }
  function publicContent() {
    const events = all('event').filter(e => e.published).map(e => ({...e,remaining:Math.max(0,e.capacity-sold(e.id))}));
    return {events,landingEvents:selectLandingEvents(events),settings:get('settings','main')};
  }
  function event(data,id) {
    if (!/^[a-zA-Z0-9_-]{1,100}$/.test(id)) fail('Invalid event ID.');
    const previous = get('event',id) || {};
    const title=text(data.title,120),date=text(data.date,60),description=text(data.description,3000),terms=text(data.terms,2000);
    const price=data.price === '' || data.price == null ? null : Number(data.price),capacity=Number(data.capacity);
    const featureOrder=Number(data.featureOrder || 0),imageUrl=text(data.imageUrl,1000),landingImage=text(data.landingImage,1000);
    if (!title || !Number.isFinite(Date.parse(date)) || !Number.isInteger(capacity) || capacity<1 || capacity>2000 || price !== null && (!Number.isFinite(price) || price<1 || price>100000)) fail('Enter a title, valid date, capacity and ticket price.');
    if (!Number.isInteger(featureOrder) || featureOrder<0 || featureOrder>999) fail('Featured position must be between 0 and 999.');
    if (!imageURL(imageUrl) || !imageURL(landingImage)) fail('Use an HTTP(S) image URL or a local /assets/ image.');
    const bookingMode=data.bookingMode === 'upi' ? 'upi' : 'external',externalUrl=text(data.externalUrl,1000);
    if (externalUrl && !/^https:\/\//.test(externalUrl)) fail('External booking links must use HTTPS.');
    if (data.bookingOpen && (!data.published || Date.parse(date)<=Date.now() || !terms || bookingMode==='upi' && price===null || bookingMode==='external' && !externalUrl)) fail('Open bookings require a published future event, booking terms, and a price or external booking link.');
    if (capacity<sold(id)) fail('Capacity cannot be lower than confirmed tickets.');
    return put('event',id,{...previous,id,title,date,description,terms,price,capacity,category:['Music','Workshops','Community'].includes(data.category)?data.category:'Music',image:/^[a-z0-9_-]{1,40}$/.test(data.image)?data.image:'music',imageUrl,landingImage,published:!!data.published,bookingOpen:!!data.bookingOpen,bookingMode,externalUrl,featured:!!data.featured,featureOrder,showOnLanding:data.showOnLanding!==false,updatedAt:new Date().toISOString()});
  }
  function order(data) {
    const e=get('event',data.eventId),settings=get('settings','main');
    if (!e || !e.published || !e.bookingOpen || e.bookingMode!=='upi' || Date.parse(e.date)<=Date.now() || !Number.isFinite(e.price) || e.price<=0) fail('Bookings are not open for this event.');
    if (!settings.payeeName || !/^[\w.-]+@[\w.-]+$/.test(settings.upiId)) fail('UPI payment setup is incomplete.');
    if (data.acceptedTerms!==true) fail('Please accept the booking terms.');
    const quantity=Number(data.quantity),name=text(data.name,80),email=text(data.email,150),phone=text(data.phone,18);
    if (!Number.isInteger(quantity) || quantity<1 || quantity>6 || !name || !/^\S+@\S+\.\S+$/.test(email) || !/^[+0-9 ()-]{10,18}$/.test(phone)) fail('Check your contact details and ticket quantity.');
    if (sold(e.id)+quantity>e.capacity) fail('Not enough tickets remain.');
    const key=text(data.requestKey,80);
    if (!/^[a-zA-Z0-9_-]{16,80}$/.test(key)) fail('Invalid booking request. Reload the booking form.');
    const prior=all('order').find(o=>o.requestKey===key); if(prior) return prior;
    const id=randomUUID(),token=randomBytes(24).toString('hex');
    return put('order',id,{id,token,requestKey:key,eventId:e.id,eventTitle:e.title,eventDate:e.date,eventImage:e.image,imageUrl:e.imageUrl||'',name,email,phone,quantity,amount:Math.round(e.price*quantity*100)/100,status:'awaiting_payment',createdAt:new Date().toISOString(),upiId:settings.upiId,payeeName:settings.payeeName,reference:'KES-'+id.slice(0,8).toUpperCase(),terms:e.terms});
  }
  function payment(id,utr) {
    const o=get('order',id);if(!o)fail('Booking not found.',404);
    if(!/^[A-Za-z0-9-]{8,40}$/.test(utr))fail('Enter the transaction reference from your UPI app.');
    if(['confirmed','rejected'].includes(o.status))fail('This booking has already been reviewed.',409);
    if(all('order').some(x=>x.id!==id&&x.utr?.toLowerCase()===utr.toLowerCase()))fail('This payment reference was already submitted.',409);
    return put('order',id,{...o,utr,status:'pending_review',submittedAt:new Date().toISOString()});
  }
  function review(id,status) {
    const o=get('order',id);if(!o)fail('Booking not found.',404);
    if(!['confirmed','rejected'].includes(status))fail('Invalid review status.');
    if(o.status==='confirmed'&&status==='confirmed')return o;
    if(o.status!=='pending_review')fail('Only submitted payments can be reviewed.');
    if(status==='confirmed'){const e=get('event',o.eventId);if(!e||sold(e.id)+o.quantity>e.capacity)fail('Capacity reached. Arrange a refund instead of confirming.');o.ticketCode=randomBytes(20).toString('hex');}
    return put('order',id,{...o,status,reviewedAt:new Date().toISOString()});
  }
  return {db,all,get,put,fail,text,event,order,payment,review,publicContent};
}
