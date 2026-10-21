import {test} from 'node:test';
import assert from 'node:assert/strict';
import {selectLandingEvents} from '../src/lib/events.js';
import {createStore} from '../server/store.mjs';
const now=Date.parse('2030-01-01T00:00:00Z');
const event=(id,date,extra={})=>({id,title:id,date,published:true,showOnLanding:true,capacity:10,price:250,bookingOpen:true,bookingMode:'upi',terms:'Test terms',...extra});
test('landing uses featured priorities then closest dates, excluding drafts, hidden and past events',()=>{
 const events=[event('later','2030-02-01'),event('soon','2030-01-02'),event('feature-b','2030-05-01',{featured:true,featureOrder:2}),event('feature-a','2030-07-01',{featured:true,featureOrder:1}),event('draft','2030-01-01T01:00:00Z',{published:false}),event('hidden','2030-01-01T02:00:00Z',{showOnLanding:false}),event('past','2029-01-01',{featured:true})];
 assert.deepEqual(selectLandingEvents(events,now).map(e=>e.id),['feature-a','feature-b','soon','later']);
 assert.deepEqual(selectLandingEvents([event('solo','2030-01-02')],now).map(e=>e.id),['solo']);assert.deepEqual(selectLandingEvents([],now),[]);
});
test('saved event settings drive landing and server prices; payments cannot be self-confirmed or oversold',()=>{
 const s=createStore(':memory:');try{
  s.put('settings','main',{...s.get('settings','main'),payeeName:'Test Merchant'});
  s.event(event('test','2099-01-01T20:00:00+05:30',{featured:true,featureOrder:3,landingImage:'/assets/events/ev_jazz.jpg',capacity:1}),'test');
  assert.equal(s.publicContent().landingEvents[0].landingImage,'/assets/events/ev_jazz.jpg');
  const payload={eventId:'test',name:'Test Guest',email:'test@example.com',phone:'9876543210',quantity:1,amount:1,acceptedTerms:true,requestKey:'test-key-1234567890'};
  assert.throws(()=>s.order({...payload,acceptedTerms:false}),/accept/);
  const o=s.order(payload);assert.equal(o.amount,250);assert.equal(o.status,'awaiting_payment');assert.equal(s.order(payload).id,o.id);
  assert.throws(()=>s.review(o.id,'confirmed'),/submitted/);assert.throws(()=>s.payment(o.id,'bad'),/reference/);
  s.payment(o.id,'TEST123456789');const second=s.order({...payload,requestKey:'test-key-0987654321'});assert.throws(()=>s.payment(second.id,'TEST123456789'),/already/);
  s.payment(second.id,'TEST987654321');const confirmed=s.review(o.id,'confirmed');assert.ok(confirmed.ticketCode);assert.equal(s.review(o.id,'confirmed').ticketCode,confirmed.ticketCode);assert.throws(()=>s.review(second.id,'confirmed'),/Capacity/);assert.equal(s.publicContent().events[0].remaining,0);
  assert.throws(()=>s.event(event('test','2099-01-01',{landingImage:'javascript:alert(1)'}),'test'),/image/);
 }finally{s.db.close()}
});
