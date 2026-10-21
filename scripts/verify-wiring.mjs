import puppeteer from 'puppeteer-core';
import express from 'express';
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import path from 'node:path';
import {createStore} from '../server/store.mjs';
import {createApp} from '../server/app.mjs';

// Isolated in-memory events and test merchant. No live bookings or bank operations.
const store=createStore(':memory:');
store.put('settings','main',{upiId:'integration-test@bank',payeeName:'Integration Test Merchant',email:'test@example.com',phone:'9876543210'});
const base={category:'Music',image:'music',price:350,capacity:10,published:true,bookingOpen:true,bookingMode:'upi',terms:'Test event terms. Manual payment review.',showOnLanding:true,description:'Isolated test experience.'};
store.event({...base,title:'TEST · Near evening',date:'2099-01-02T20:00:00+05:30'},'near');
store.event({...base,image:'ev_sukoon',title:'TEST · Featured evening',date:'2099-02-02T20:00:00+05:30'},'later');
const app=createApp(store,'browser-integration-password');
app.use(express.static(path.resolve('dist')));app.get('/{*page}',(req,res)=>res.sendFile(path.resolve('dist/index.html')));
const testHost=process.env.TEST_NETWORK_HOST||'127.0.0.1';
const server=app.listen(0,process.env.TEST_NETWORK_HOST?'0.0.0.0':'127.0.0.1');await new Promise(r=>server.once('listening',r));
const origin='http://'+testHost+':'+server.address().port,out=path.resolve('.local/qa');mkdirSync(out,{recursive:true});
const browser=await puppeteer.launch({executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
const guest=await browser.newPage(),errors=[];console.log('Browser launched.');guest.setDefaultTimeout(15000);guest.on('pageerror',e=>errors.push(e.message));
async function settled(page,id){await page.waitForFunction(id=>{const slides=[...document.querySelectorAll('.landing-event-slide')];return slides.length===1&&slides[0].dataset.eventId===id}, {},id);}
async function swipe(page,selector,from,to){
 const r=await page.$eval(selector,e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}}),client=await page.createCDPSession();
 const start=r.x+r.w*from,end=r.x+r.w*to,y=r.y+r.h*.5;
 try{
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:start,y}]});
  for(let i=1;i<=10;i++){await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start+(end-start)*i/10,y}]});await new Promise(r=>setTimeout(r,25));}
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 }finally{await client.detach()}
}
async function clickText(page,selector,text){const buttons=await page.$$(selector);for(const b of buttons)if((await b.evaluate(e=>e.textContent)).includes(text)){await b.click();return;}throw Error('Button not found: '+text);}
try{
 await guest.setViewport({width:390,height:844,isMobile:true,hasTouch:true});await guest.goto(origin+'/#/',{waitUntil:'networkidle0'});await settled(guest,'near');
 console.log('Landing loaded.');assert.equal(await guest.$eval('[aria-label="Next event"]',e=>e.disabled),false);
 // The branded top menu opens navigation, never the photo's booking action.
 for(const id of ['events','discover','profile','tickets']){
  await guest.click('[aria-label="Open menu"]');await guest.waitForSelector('#landing-navigation');
  await guest.click(`#landing-navigation a[href="#/${id}"]`);await guest.waitForFunction(hash=>location.hash===hash,{},'#/'+id);
  assert.equal(await guest.$('.event-booking-form'),null);
  await guest.goto(origin+'/#/',{waitUntil:'networkidle0'});await settled(guest,'near');
 }
 await guest.click('.landing-brand');assert.equal(new URL(guest.url()).hash,'#/');assert.equal(await guest.$('.event-booking-form'),null);
 assert.deepEqual(await guest.$$eval('[data-menu-id]',els=>els.map(e=>e.dataset.menuId)),['events','discover','profile','tickets']);
 assert.doesNotMatch(await guest.$eval('.landing-cards',e=>e.textContent),/TEST|₹|350|2099/);
 const initialMenu=await guest.$eval('.landing-cards',e=>e.dataset.selected),initialPhoto=await guest.$eval('.landing-managed-art img',e=>e.src);
 await guest.click('[aria-label="Next event"]');await settled(guest,'later');assert.equal(new URL(guest.url()).hash,'#/');
 assert.equal(await guest.$eval('.landing-cards',e=>e.dataset.selected),initialMenu);
 assert.notEqual(await guest.$eval('.landing-managed-art img',e=>e.src),initialPhoto);
 await swipe(guest,'.landing-cards',.75,.25);
 await guest.waitForFunction(index=>document.querySelector('.landing-cards').dataset.selected!==index,{},initialMenu);
 assert.equal(new URL(guest.url()).hash,'#/');await settled(guest,'later');
 console.log('Menu touch swipe stayed separate from event photos.');
 // A swipe in the photo changes only the event, retaining the selected menu.
 const menuAfterSwipe=await guest.$eval('.landing-cards',e=>e.dataset.selected);
 await swipe(guest,'.landing-managed-art',.75,.25);await settled(guest,'near');
 assert.equal(await guest.$eval('.landing-cards',e=>e.dataset.selected),menuAfterSwipe);
 assert.equal(new URL(guest.url()).hash,'#/');
 // Every menu card opens its own page, including cards reached by scrolling.
 for(const id of ['events','discover','profile','tickets']){
  await guest.$eval(`[data-menu-id="${id}"]`,e=>e.focus());
  await guest.waitForFunction(id=>document.querySelector('.landing-glass-card.selected')?.dataset.menuId===id,{},id);
  await guest.click(`[data-menu-id="${id}"]`);
  await guest.waitForFunction(hash=>location.hash===hash,{},'#/'+id);
  assert.equal(await guest.$('.event-booking-form'),null);
  await guest.goto(origin+'/#/',{waitUntil:'networkidle0'});await settled(guest,'near');
 }
 // Keyboard navigation inside the menu never moves the event carousel.
 await guest.focus('[data-menu-id="discover"]');await guest.keyboard.press('ArrowRight');
 await guest.waitForFunction(()=>document.querySelector('.landing-glass-card.selected')?.dataset.menuId==='profile');await settled(guest,'near');
 assert.equal(new URL(guest.url()).hash,'#/');
 await guest.click('[aria-label="Next event"]');await settled(guest,'later');
 await guest.click('[aria-label="Previous event"]');await settled(guest,'near');
 await guest.click('.landing-pagination button:last-child');await settled(guest,'later');assert.equal(new URL(guest.url()).hash,'#/');
 const centrePhoto=await guest.$eval('.memory-landing',e=>{const r=e.getBoundingClientRect();return{x:r.x+r.width*.5,y:r.y+r.height*.45}});await guest.mouse.click(centrePhoto.x,centrePhoto.y);await guest.waitForSelector('.event-booking-form');assert.equal(new URL(guest.url()).hash,'#/event/later');

 console.log('Landing navigation passed.');const admin=await browser.newPage();admin.setDefaultTimeout(15000);admin.on('pageerror',e=>errors.push(e.message));await admin.setViewport({width:1280,height:900});await admin.goto(origin+'/#/admin',{waitUntil:'networkidle0'});await admin.type('[name="password"]','browser-integration-password');await admin.click('.admin-login-card button[type="submit"],.admin-login-card .memory-action');await admin.waitForSelector('.admin-event-list');console.log('Admin login passed.');
 await admin.screenshot({path:path.join(out,'studio-admin-desktop.png')});
 await admin.click('[data-event-id="later"] .admin-star');await admin.waitForFunction(()=>document.querySelector('[data-event-id="later"] .admin-star')?.getAttribute('aria-pressed')==='true');
 await admin.click('[data-event-id="later"] .memory-action');await admin.waitForSelector('.admin-editor');
 await admin.focus('[name="price"]');await admin.keyboard.down('Control');await admin.keyboard.press('KeyA');await admin.keyboard.up('Control');await admin.keyboard.press('Backspace');await admin.type('[name="price"]','799');
 await admin.type('[name="landingImage"]','/assets/events/ev_jazz.jpg');
 console.log('Editor values',await admin.$eval('.admin-editor',e=>({price:e.elements.price.value,landingImage:e.elements.landingImage.value})));await admin.click('.admin-editor .memory-action');await admin.waitForSelector('.admin-event-list');console.log('Saved fields',{price:store.get('event','later').price,landingImage:store.get('event','later').landingImage});
 await guest.bringToFront();await guest.goto(origin+'/#/',{waitUntil:'networkidle0'});await settled(guest,'later');assert.ok(await guest.$('.landing-managed-art img'));
 assert.doesNotMatch(await guest.$eval('.landing-cards',e=>e.textContent),/799|TEST/);
 assert.match(await guest.$eval('.landing-event-caption',e=>e.textContent),/TEST · Featured evening/);
 await guest.screenshot({path:path.join(out,'event-carousel-mobile.png')});console.log('Feature, price and artwork edits passed.');
 const rect=await guest.$eval('.memory-landing',e=>{const r=e.getBoundingClientRect();return{x:r.left+8,y:r.top+r.height*.44}});await guest.mouse.click(rect.x,rect.y);await guest.waitForSelector('.event-booking-form');assert.equal(new URL(guest.url()).hash,'#/event/later');
 await guest.type('[name="name"]','Integration Guest');await guest.type('[name="email"]','guest@example.com');await guest.type('[name="phone"]','9876543210');await guest.select('[name="quantity"]','2');await guest.click('[name="acceptedTerms"]');await clickText(guest,'.event-booking-form button','Continue to UPI');await guest.waitForSelector('.payment-qr');
 console.log('Guest order created.');assert.equal(store.all('order').length,1);let order=store.all('order')[0];assert.equal(order.eventId,'later');assert.equal(order.amount,1598);assert.equal(order.status,'awaiting_payment');
 await guest.waitForFunction(()=>{const form=document.querySelector('.event-booking-form').getBoundingClientRect(),header=document.querySelector('.landing-header').getBoundingClientRect();return form.top>=header.bottom-1&&form.top<innerHeight*.6});
 await guest.screenshot({path:path.join(out,'studio-upi-390.png')});
 const uri=await guest.$eval('a[href^="upi:"]',e=>e.href);assert.equal(new URL(uri).searchParams.get('am'),'1598.00');assert.equal(new URL(uri).searchParams.get('pa'),'integration-test@bank');
 await guest.goto(origin+'/#/tickets',{waitUntil:'networkidle0'});await guest.waitForSelector('.live-ticket');await clickText(guest,'.live-ticket button','Continue payment');await guest.waitForSelector('.payment-qr');assert.equal(store.all('order').length,1);
 await guest.type('[name="utr"]','TEST-TRANSACTION-123456');await clickText(guest,'.event-booking-form button','Submit for verification');await guest.waitForFunction(()=>document.querySelector('.event-booking-form')?.textContent.includes('Payment sent for review.'));
 await clickText(guest,'.event-booking-form button','View my tickets');await guest.waitForSelector('.ticket-status.pending_review');console.log('Payment reference submitted and booking resumed.');
 await admin.bringToFront();await clickText(admin,'.admin-console-body>nav button','Bookings');await admin.waitForSelector('.admin-booking');admin.once('dialog',d=>d.accept());await clickText(admin,'.admin-booking button','Verify & confirm');await admin.waitForFunction(()=>document.querySelector('.admin-booking .admin-status')?.textContent==='confirmed');
 await guest.bringToFront();await clickText(guest,'.memory-page>button','Refresh booking status');await guest.waitForSelector('.ticket-status.confirmed');await guest.waitForSelector('.live-ticket .payment-qr');assert.ok(store.get('order',order.id).ticketCode);
 await guest.reload({waitUntil:'networkidle0'});await guest.waitForSelector('.ticket-status.confirmed');await guest.screenshot({path:path.join(out,'studio-confirmed-ticket-390.png')});console.log('Confirmed ticket retrieved.');
 await guest.setViewport({width:306,height:650,isMobile:true,hasTouch:true});
 assert.ok(await guest.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 assert.ok(await guest.$eval('.live-ticket .payment-qr',e=>e.getBoundingClientRect().height<=e.parentElement.getBoundingClientRect().height+1));
 await guest.screenshot({path:path.join(out,'studio-confirmed-ticket-306.png')});await guest.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
 await admin.bringToFront();await clickText(admin,'.admin-console-body>nav button','Events');await clickText(admin,'.admin-title-row button','Add event');await admin.waitForSelector('.admin-editor');await admin.type('[name="title"]','TEST · Unpublished draft');await admin.$eval('[name="date"]',e=>{e.value='2099-03-01T20:00';e.dispatchEvent(new Event('input',{bubbles:true}));});await admin.click('.admin-editor .memory-action');await admin.waitForSelector('.admin-event-list');assert.equal(store.publicContent().events.length,2);
 store.event({...store.get('event','near'),published:false,bookingOpen:false},'near');await guest.bringToFront();await guest.bringToFront();await guest.goto(origin+'/#/',{waitUntil:'networkidle0'});await settled(guest,'later');assert.equal(await guest.$eval('[aria-label="Next event"]',e=>e.disabled),true);
 store.event({...store.get('event','later'),published:false,bookingOpen:false},'later');await guest.reload({waitUntil:'networkidle0'});await settled(guest,'');assert.equal((await guest.$$('.landing-pagination button')).length,0);assert.equal(await guest.$eval('[aria-label="Next event"]',e=>e.disabled),true);
 assert.deepEqual(errors,[]);
 console.log('PASS: independent touch/keyboard menus and event photos, every menu destination, nearest/featured ordering, blue-area booking, admin feature + price + artwork edits, guest UPI QR, resume without duplicate order, manual verification, confirmed tickets and one/zero-event states.');
}catch(e){console.error('Failure at',guest.url(),e.message);console.error('Saved event',store.get('event','later'));console.error((await guest.$eval('body',e=>e.textContent)).slice(-1800));await guest.bringToFront();await guest.screenshot({path:path.join(out,'wiring-failure.png'),fullPage:true});throw e;}finally{await Promise.race([browser.close(),new Promise(resolve=>setTimeout(resolve,3000))]);server.closeAllConnections();await new Promise(r=>server.close(r));store.db.close();}
