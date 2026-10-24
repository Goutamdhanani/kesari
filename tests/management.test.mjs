import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createStore} from '../server/store.mjs';
import {createApp} from '../server/app.mjs';

async function fixture(run) {
  const store=createStore(':memory:'),server=createApp(store,'management-test-password').listen(0,'127.0.0.1');
  await new Promise(resolve=>server.once('listening',resolve));
  const origin='http://127.0.0.1:'+server.address().port;
  let cookie='';
  const call=async(path,method='GET',body,{authenticated=true,token,origin:requestOrigin}={})=>{
    const response=await fetch(origin+path,{method,headers:{'Content-Type':'application/json',...(authenticated&&cookie?{Cookie:cookie}:{}),...(token?{Authorization:'Bearer '+token}:{}),...(requestOrigin?{Origin:requestOrigin}:{})},body:body===undefined?undefined:JSON.stringify(body)});
    return {status:response.status,data:await response.json(),headers:response.headers};
  };
  const login=async()=>{const result=await call('/api/admin/login','POST',{password:'management-test-password'});assert.equal(result.status,200);cookie=result.headers.get('set-cookie').split(';')[0];};
  try {await run({store,call,login});}
  finally {await new Promise(resolve=>server.close(resolve));store.db.close();}
}

const enquiry={name:' Guest Name ',email:'guest@example.com',phone:'+91 9876543210',kind:'venue',message:'We would like to enquire about a workshop.',preferredDate:'2099-03-12'};

test('public enquiries persist validated details and expose only the public receipt',async()=>fixture(async({store,call})=>{
  const result=await call('/api/enquiries','POST',{...enquiry,status:'resolved',token:'untrusted',requestKey:'untrusted'});
  assert.equal(result.status,201);
  assert.deepEqual(Object.keys(result.data).sort(),['id','reference','status']);
  assert.equal(result.data.status,'new');
  assert.match(result.data.reference,/^KES-ENQ-[A-Z0-9]+$/);
  const saved=store.get('enquiry',result.data.id);
  assert.equal(saved.name,'Guest Name');assert.equal(saved.message,enquiry.message);assert.equal(saved.preferredDate,enquiry.preferredDate);assert.ok(saved.createdAt);
  assert.equal(saved.token,undefined);assert.equal(saved.requestKey,undefined);
  assert.equal((await call('/api/admin', 'GET',undefined,{authenticated:false})).status,401);
  const support=await call('/api/enquiries','POST',{...enquiry,kind:'support',preferredDate:''});
  assert.equal(support.status,201);assert.equal(store.get('enquiry',support.data.id).preferredDate,'');
}));

test('enquiries reject missing, malformed and oversized fields',async()=>fixture(async({call})=>{
  const invalid=[{name:''},{name:'a'.repeat(81)},{email:'bad-email'},{email:'a'.repeat(151)+'@example.com'},{phone:'123'},{phone:'----------'},{kind:'payment'},{message:' '},{message:'a'.repeat(3001)},{preferredDate:'2099-02-30'},{preferredDate:'not-a-date'},{preferredDate:20990312},{name:['Guest']}];
  for(const fields of invalid){const result=await call('/api/enquiries','POST',{...enquiry,...fields});assert.equal(result.status,400,JSON.stringify(fields));assert.equal(typeof result.data.error,'string');}
  assert.equal((await call('/api/enquiries','POST')).status,400);
}));

test('public enquiries are rate limited and reject cross-origin writes',async()=>fixture(async({call})=>{
  assert.equal((await call('/api/enquiries','POST',enquiry,{origin:'https://untrusted.example'})).status,403);
  for(let index=0;index<25;index++)assert.equal((await call('/api/enquiries','POST',enquiry)).status,201);
  assert.equal((await call('/api/enquiries','POST',enquiry)).status,429);
}));

test('only authenticated managers may change enquiry status',async()=>fixture(async({store,call,login})=>{
  const receipt=(await call('/api/enquiries','POST',enquiry)).data,path='/api/admin/enquiries/'+receipt.id;
  assert.equal((await call(path,'PATCH',{status:'resolved'})).status,401);
  await login();
  assert.equal((await call('/api/admin')).data.enquiries.length,1);
  for(const status of ['in_progress','resolved','new']){const result=await call(path,'PATCH',{status});assert.equal(result.status,200);assert.equal(result.data.status,status);assert.equal(result.data.message,enquiry.message);}
  assert.ok(store.get('enquiry',receipt.id).updatedAt);
  assert.equal((await call(path,'PATCH',{status:'deleted'})).status,400);
  assert.equal((await call(path,'PATCH')).status,400);
  assert.equal((await call('/api/admin/enquiries/missing','PATCH',{status:'resolved'})).status,404);
  assert.equal((await call(path,'PATCH',{status:'resolved'},{origin:'https://untrusted.example'})).status,403);
}));

test('manual check-in requires confirmed payment, authentication and an explicit true value; repeats are idempotent',async()=>fixture(async({store,call,login})=>{
  await login();
  await call('/api/admin/settings','PUT',{upiId:'test@bank',payeeName:'Test Merchant',email:'team@example.com',phone:'9876543210'});
  const event={title:'Disposable managed event',date:'2099-01-01T20:00:00+05:30',price:299,capacity:2,published:true,bookingOpen:true,bookingMode:'upi',terms:'Test booking terms'};
  assert.equal((await call('/api/admin/events/checkin','PUT',event)).status,200);
  const booking=await call('/api/orders','POST',{eventId:'checkin',name:'Guest',email:'guest@example.com',phone:'9876543210',quantity:2,amount:1,status:'confirmed',checkedInAt:'fake',acceptedTerms:true,requestKey:'management-checkin-request-1234'});
  assert.equal(booking.status,201);assert.equal(booking.data.amount,598);assert.equal(booking.data.status,'awaiting_payment');assert.equal(booking.data.checkedInAt,undefined);
  const order=booking.data,path='/api/admin/orders/'+order.id+'/check-in';
  assert.equal((await call(path,'POST',{checkedIn:true},{authenticated:false})).status,401);
  assert.equal((await call(path,'POST',{checkedIn:true})).status,409);
  assert.equal((await call('/api/orders/'+order.id+'/payment','POST',{utr:'CHECKIN123456'}, {token:order.token})).status,200);
  assert.equal((await call(path,'POST',{checkedIn:true})).status,409);
  assert.equal((await call('/api/admin/orders/'+order.id+'/review','POST',{status:'confirmed'})).status,200);
  for(const checkedIn of [false,'true',null])assert.equal((await call(path,'POST',{checkedIn})).status,400);
  assert.equal((await call(path,'POST')).status,400);
  const checked=await call(path,'POST',{checkedIn:true});assert.equal(checked.status,200);assert.ok(checked.data.checkedInAt);assert.equal(checked.data.token,undefined);assert.equal(checked.data.requestKey,undefined);
  const repeated=await call(path,'POST',{checkedIn:true});assert.equal(repeated.status,200);assert.equal(repeated.data.checkedInAt,checked.data.checkedInAt);
  const customer=(await call('/api/orders/'+order.id,'GET',undefined,{token:order.token})).data;assert.equal(customer.checkedInAt,checked.data.checkedInAt);assert.equal(customer.token,undefined);assert.equal(customer.requestKey,undefined);
  const admin=(await call('/api/admin')).data;assert.equal(admin.orders[0].token,undefined);assert.equal(admin.orders[0].requestKey,undefined);
  assert.equal((await call('/api/admin/orders/missing/check-in','POST',{checkedIn:true})).status,404);
  assert.equal((await call(path,'POST',{checkedIn:true},{origin:'https://untrusted.example'})).status,403);
  assert.equal((await call('/api/admin/events/checkin','PUT',{...event,capacity:1})).status,400);
  assert.equal(store.get('order',order.id).status,'confirmed');
}));
