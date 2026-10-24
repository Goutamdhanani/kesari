import puppeteer from 'puppeteer-core';
import express from 'express';
import assert from 'node:assert/strict';
import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {createStore} from '../server/store.mjs';
import {createApp} from '../server/app.mjs';

// Disposable SQLite memory store, test merchant and ephemeral loopback server only.
// This script never opens server/data, reads credentials, or initiates payment.
assert.ok(existsSync('dist/index.html'), 'Run npm run build before browser verification.');
const store = createStore(':memory:');
store.put('settings','main',{upiId:'webapp-test@bank',payeeName:'Disposable Test Merchant',email:'team@example.com',phone:'9876543210'});
const base = {category:'Music',image:'music',price:350,capacity:12,published:true,bookingOpen:true,bookingMode:'upi',terms:'Disposable test event. Manual payment review. Contact the team for refunds.',showOnLanding:true,description:'A disposable browser test experience. No live records or money.'};
store.event({...base,title:'TEST · Next evening',date:'2099-01-02T20:00:00+05:30'},'near');
store.event({...base,title:'TEST · Past evening',date:'2001-01-02T20:00:00+05:30',bookingOpen:false},'past');
store.event({...base,title:'TEST · Closed gathering',date:'2099-02-02T20:00:00+05:30',bookingOpen:false,category:'Community'},'closed');
store.event({...base,title:'TEST · Partner event',date:'2099-03-02T20:00:00+05:30',bookingMode:'external',externalUrl:'https://example.com/tickets'},'partner');
const app = createApp(store,'disposable-browser-password');
app.use(express.static(path.resolve('dist')));
app.get('/{*page}',(request,response) => response.sendFile(path.resolve('dist/index.html')));
const server = app.listen(0,'127.0.0.1');
await new Promise(resolve => server.once('listening',resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const out = path.resolve('.local/qa/webapp');
mkdirSync(out,{recursive:true});
const executablePath = process.env.EDGE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
let browser, guest, admin;
const errors = [], checks = [];
const pass = text => { checks.push(text); console.log('PASS:',text); };
const routeUrl = route => `${origin}/#/${route === 'home' ? '' : route}`;
async function open(page, route, heading) {
  await page.bringToFront();
  await page.goto(routeUrl(route),{waitUntil:'networkidle0'});
  await page.waitForSelector('#main-content h1');
  if (heading) await page.waitForFunction(text => document.querySelector('#main-content h1')?.textContent.includes(text),{},heading);
}
async function textButton(page, text, scope='#main-content') {
  await page.bringToFront();
  await page.waitForFunction(({scope,text})=>[...document.querySelectorAll(`${scope} button`)].some(element=>element.textContent.trim()===text&&!element.disabled),{polling:100},{scope,text});
  const candidates = await page.$$(`${scope} button`);
  for (const candidate of candidates) {
    if ((await candidate.evaluate(element => element.textContent.trim())) === text) { await candidate.click(); return; }
  }
  throw Error(`Button missing: ${text} in ${scope}`);
}
async function field(page, selector, value) {
  await page.$eval(selector,(element,value) => {
    const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype,'value').set.call(element,value);
    element.dispatchEvent(new Event('input',{bubbles:true}));
    element.dispatchEvent(new Event('change',{bubbles:true}));
  },String(value));
}
async function checkbox(page, name, value) {
  if (await page.$eval(`[name="${name}"]`,element => element.checked) !== value) await page.click(`[name="${name}"]`);
}
async function layout(page, route, width) {
  await page.setViewport({width,height:900,isMobile:width < 761,hasTouch:width < 761});
  await open(page,route);
  const metrics = await page.evaluate(() => ({
    document:document.documentElement.scrollWidth, viewport:innerWidth,
    root:document.querySelector('.kesari-public-app,.workspace-app.management').getBoundingClientRect().width,
    overflow:getComputedStyle(document.body).overflowY,
    fake:!!document.querySelector('.mobile-frame,.phone-frame,.standalone-mobile-canvas,.behance-case-study-canvas,.phone-notch'),
    mobileNav:getComputedStyle(document.querySelector('.wa-mobile-nav,.mobile-bottom-nav-dock')).display,
    sidebar:document.querySelector('.wa-sidebar')?getComputedStyle(document.querySelector('.wa-sidebar')).display:'none',
  }));
  assert.ok(metrics.document <= width+1, `${route} at ${width}px overflows: ${JSON.stringify(metrics)}`);
  assert.ok(metrics.root >= width-1, `${route} is constrained to a device frame`);
  assert.equal(metrics.fake,false,`${route} contains presentation or simulated phone UI`);
  assert.notEqual(metrics.overflow,'hidden',`${route} disables document scrolling`);
  if(route.startsWith('admin'))assert.equal(width <= 760 ? metrics.sidebar : metrics.mobileNav,'none');
  else {assert.equal(metrics.sidebar,'none');assert.equal(metrics.mobileNav,width<=768?'block':'none');}
}

try {
  browser = await puppeteer.launch({executablePath,headless:true});
  guest = await browser.newPage(); admin = await browser.newPage();
  for (const page of [guest,admin]) { page.setDefaultTimeout(15000); page.on('pageerror',error => errors.push(error.message)); await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]); }
  await guest.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
  await admin.setViewport({width:1440,height:1000});

  // Deep links, refresh, aliases and proper not-found states.
  for (const [route,heading] of [['home','TEST · Next evening'],['events','Explore Experiences'],['discover','Discover Experiences'],['saved','Saved Experiences'],['tickets','Digital Ticket Wallet'],['profile','My profile'],['contact','Contact Kesari'],['venue','Bring your people'],['event/near','TEST · Next evening'],['explore','TEST · Next evening'],['favorites','Saved Experiences'],['wallet','Digital Ticket Wallet']]) {
    console.log('Checking route and reload:',route);
    await open(guest,route,heading); await guest.reload({waitUntil:'networkidle0'}); await guest.waitForSelector('#main-content h1');
  }
  for (const route of ['unknown','showcase','mobile','admin/missing','event/near/foreign-private-key','event/missing']) {
    await open(guest,route); assert.match(await guest.$eval('#main-content',element => element.textContent),/Page not found|Booking access is unavailable|Event unavailable/);
  }
  await open(guest,'home'); await guest.click('[aria-label="Open navigation"]');
  await guest.waitForSelector('#web-all-pages');
  const menuText=await guest.$eval('#web-all-pages',element=>element.textContent);
  for(const label of ['Discover','Our venue','Contact us','Team space'])assert.ok(menuText.includes(label));
  await guest.keyboard.press('Escape'); assert.equal(await guest.$('#web-all-pages'),null);
  await guest.keyboard.press('Tab');
  for(const [label,route] of [['Discover','discover'],['Our venue','venue'],['Contact us','contact'],['My profile','profile']]){
    await guest.click('[aria-label="Open navigation"]');await guest.waitForSelector('#web-all-pages');await textButton(guest,label,'#web-all-pages');await guest.waitForFunction(route=>location.hash==='#/'+route,{},route);await guest.waitForSelector('#main-content h1');
  }
  for(const [label,route] of [['Explore Events',''],['My Tickets','tickets'],['Saved Events','saved'],['My Profile','profile'],['Contact Kesari','contact']]){
    await guest.click(`.mobile-bottom-nav-dock [aria-label="${label}"]`);await guest.waitForFunction(route=>location.hash==='#/'+route,{},route);await guest.waitForSelector('#main-content h1');
  }
  pass('Public routes, aliases, reloads, unknown links and keyboard mobile menu');

  // Local profile and saved events are real persistent browser state.
  await open(guest,'profile');
  for (const [name,value] of Object.entries({name:'Browser Guest',email:'guest@example.com',phone:'9876543210',city:'Bengaluru'})) await field(guest,`[name="${name}"]`,value);
  await textButton(guest,'Save profile');
  await guest.waitForFunction(() => document.querySelector('[role="status"]')?.textContent.includes('saved on this device'));
  await guest.reload({waitUntil:'networkidle0'}); assert.equal(await guest.$eval('[name="name"]',element => element.value),'Browser Guest');
  await open(guest,'events'); await guest.click('[data-event-id="near"] [aria-label^="Save "]');
  await open(guest,'saved'); assert.equal((await guest.$$('.catalog-event-card')).length,1); assert.ok(await guest.$('[data-event-id="near"]'));
  await guest.reload({waitUntil:'networkidle0'}); assert.ok(await guest.$('[data-event-id="near"]'));
  await open(guest,'events'); await guest.type('input[type="search"]','no matching experience'); await guest.waitForSelector('.catalog-empty-state');
  assert.equal((await guest.$$('.catalog-event-card')).length,0); await textButton(guest,'Reset Filters');
  await guest.select('[aria-label="Event dates"]','past'); await guest.waitForFunction(() => document.querySelectorAll('.catalog-event-card').length === 1); assert.ok(await guest.$('[data-event-id="past"]'));
  await guest.select('[aria-label="Event dates"]','upcoming'); await guest.waitForFunction(() => document.querySelectorAll('.catalog-event-card').length === 3); assert.equal(await guest.$('[data-event-id="past"]'),null);
  await open(guest,'event/closed'); assert.equal(await guest.$('.event-booking-form'),null);
  await open(guest,'event/past'); assert.equal(await guest.$('.event-booking-form'),null);
  await open(guest,'event/partner'); assert.equal(await guest.$eval('a[href="https://example.com/tickets"]',element => element.target),'_blank');
  pass('Profile/save persistence, catalogue search/date filters, closed/past/external booking states');

  // Management creates a draft, publishes, edits price/artwork and features it.
  await open(admin,'admin/events','Team sign in'); await admin.type('[name="password"]','disposable-browser-password'); await textButton(admin,'Sign in'); await admin.waitForFunction(() => document.querySelector('.wa-main h1')?.textContent === 'Events');
  await textButton(admin,'New event'); await admin.waitForSelector('.wa-admin-editor');
  for (const [name,value] of Object.entries({title:'TEST · Browser workshop',date:'2099-04-07T20:30',price:'499',capacity:'12',description:'Created through the management browser form.',terms:'Disposable booking. Manual payment verification. Contact the team for refund terms.'})) await field(admin,`.wa-admin-editor [name="${name}"]`,value);
  await admin.select('[name="category"]','Workshops'); await textButton(admin,'Save event'); await admin.waitForSelector('.wa-event-list');
  const created = store.all('event').find(event => event.title === 'TEST · Browser workshop'); assert.ok(created); assert.equal(created.published,false); assert.equal(store.publicContent().events.some(event => event.id === created.id),false);
  const eventRow = `[data-event-id="${created.id}"]`;
  await textButton(admin,'Publish',eventRow); await admin.waitForFunction(selector => document.querySelector(selector)?.textContent.includes('Unpublish'),{},eventRow);
  await textButton(admin,'Edit',eventRow); await admin.waitForSelector('.wa-admin-editor');
  await field(admin,'[name="price"]','799'); await field(admin,'[name="imageUrl"]','/assets/events/ev_jazz.jpg'); await field(admin,'[name="landingImage"]','/assets/events/ev_sukoon.jpg'); await checkbox(admin,'bookingOpen',true); await textButton(admin,'Save event'); await admin.waitForSelector('.wa-event-list');
  await textButton(admin,'Feature',eventRow); await admin.waitForFunction(selector => document.querySelector(selector+' button[aria-pressed="true"]'),{},eventRow);
  const edited = store.get('event',created.id); assert.equal(edited.price,799); assert.equal(edited.featured,true); assert.equal(edited.bookingOpen,true);
  await open(guest,'home'); assert.equal(await guest.$eval('.web-hero-section',element => element.dataset.eventId),created.id); assert.match(await guest.$eval('.web-hero-section',element => element.textContent),/799/);
  assert.match(await guest.$eval('.hero-backdrop-img',element=>element.src),/ev_sukoon.jpg$/);
  await open(guest,'events'); assert.match(await guest.$eval(eventRow,element => element.textContent),/799/); assert.match(await guest.$eval(eventRow+' img',element => element.src),/ev_jazz.jpg$/);
  pass('Management draft creation, publish, edit and feature drive the same public catalogue and INR prices');

  // Customer requests the server-calculated amount and submits a test reference.
  await open(guest,'event/'+created.id); await guest.waitForSelector('.event-booking-form');
  assert.equal(await guest.$eval('[name="name"]',element => element.value),'Browser Guest');
  await guest.select('[name="quantity"]','2'); await guest.click('[name="acceptedTerms"]'); await textButton(guest,'Continue to UPI','.event-booking-form'); await guest.waitForSelector('.payment-qr');
  assert.equal(store.all('order').length,1); const order = store.all('order')[0]; assert.equal(order.amount,1598); assert.equal(order.status,'awaiting_payment'); assert.equal(order.eventId,created.id);
  const uri = new URL(await guest.$eval('a[href^="upi:"]',element => element.href)); assert.equal(uri.searchParams.get('am'),'1598.00'); assert.equal(uri.searchParams.get('pa'),'webapp-test@bank'); assert.equal(uri.searchParams.get('pn'),'Disposable Test Merchant'); assert.equal(uri.searchParams.get('tr'),order.reference);
  await guest.screenshot({path:path.join(out,'payment-mobile.png'),fullPage:true});
  await open(guest,'tickets'); await guest.waitForSelector('.ticket-status.awaiting_payment'); await textButton(guest,'Continue payment','.live-ticket'); await guest.waitForSelector('.payment-qr'); assert.equal(store.all('order').length,1);
  await guest.type('[name="utr"]','DISPOSABLE-UTR-123456'); await textButton(guest,'Submit for verification','.event-booking-form'); await guest.waitForFunction(() => document.querySelector('.event-booking-form')?.textContent.includes('Payment sent for review.'));
  assert.equal(store.get('order',order.id).status,'pending_review'); assert.equal(store.get('order',order.id).ticketCode,undefined);
  await textButton(guest,'View my tickets','.event-booking-form'); await guest.waitForSelector('.ticket-status.pending_review'); assert.equal(await guest.$('.live-ticket .payment-qr'),null);
  pass('Server-created UPI request, exact amount/payee/reference, private-key resume, pending manual verification');

  // Staff confirms only after explicit bank-review acknowledgement.
  await open(admin,'admin/bookings','Bookings'); await admin.waitForSelector(`[data-order-id="${order.id}"]`); admin.once('dialog',dialog => dialog.accept()); await textButton(admin,'Verify & confirm',`[data-order-id="${order.id}"]`);
  await admin.waitForFunction(() => document.querySelector('.wa-success')?.textContent.includes('Booking confirmed'));
  assert.equal(store.get('order',order.id).status,'confirmed'); assert.ok(store.get('order',order.id).ticketCode);
  await guest.bringToFront(); await textButton(guest,'Refresh booking status'); await guest.waitForSelector('.ticket-status.confirmed'); await guest.waitForSelector('.live-ticket .payment-qr'); await guest.reload({waitUntil:'networkidle0'}); await guest.waitForSelector('.ticket-status.confirmed');
  const persisted = await guest.evaluate(() => JSON.parse(localStorage.getItem('kesari-ui-orders'))); assert.equal(persisted[0].token,order.token); assert.ok(persisted[0].ticketCode);
  await guest.screenshot({path:path.join(out,'confirmed-ticket-mobile.png'),fullPage:true});
  await open(admin,'admin/attendees','Attendees'); await admin.waitForSelector(`[data-order-id="${order.id}"]`);
  await admin.type('input[type="search"]','does-not-exist'); await admin.waitForSelector('.wa-empty'); await field(admin,'input[type="search"]','Browser Guest'); await admin.waitForSelector(`[data-order-id="${order.id}"]`);
  const downloadSession = await admin.createCDPSession(); await downloadSession.send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:out,eventsEnabled:true});
  await textButton(admin,'Export CSV'); await admin.waitForFunction(() => document.querySelector('.wa-success')?.textContent.includes('Exported 1 booking'));
  admin.once('dialog',dialog => dialog.accept()); await textButton(admin,'Check in',`[data-order-id="${order.id}"]`); await admin.waitForFunction(selector => document.querySelector(selector)?.textContent.includes('Arrival recorded'),{},`[data-order-id="${order.id}"]`); assert.ok(store.get('order',order.id).checkedInAt);
  await downloadSession.detach();
  pass('Manual confirmation, persisted confirmed QR ticket, attendee search/CSV and guarded check-in');

  // Venue and support messages reach the real management enquiry queue.
  for (const [route,kind] of [['venue','venue'],['contact','support']]) {
    await open(guest,route); await field(guest,'[name="message"]',`Disposable ${kind} enquiry from the browser verification.`); if (kind === 'venue') await field(guest,'[name="preferredDate"]','2099-05-10'); await textButton(guest,'Send enquiry'); await guest.waitForFunction(() => document.querySelector('.wa-success')?.textContent.includes('received your enquiry'));
    assert.match(await guest.$eval('.wa-success',element => element.textContent),/KES-ENQ-/);
  }
  assert.equal(store.all('enquiry').length,2); await open(admin,'admin/enquiries','Enquiries'); await admin.waitForSelector('[data-enquiry-id]');
  const enquiry = store.all('enquiry').find(item => item.kind === 'venue'); await admin.select(`[data-enquiry-id="${enquiry.id}"] select`,'in_progress'); await admin.waitForFunction(id => document.querySelector(`[data-enquiry-id="${id}"] [data-status="in_progress"]`),{},enquiry.id); assert.equal(store.get('enquiry',enquiry.id).status,'in_progress');
  await open(admin,'admin/settings','Settings'); await field(admin,'[name="email"]','updated-team@example.com'); await textButton(admin,'Save settings'); await admin.waitForFunction(() => document.querySelector('.wa-success')?.textContent.includes('settings saved')); await open(guest,'contact'); assert.ok(await guest.$('a[href="mailto:updated-team@example.com"]'));
  pass('Venue/support enquiry receipts, management status updates and shared contact settings');

  // Network failure and recovery remain actionable rather than blank screens.
  await guest.setRequestInterception(true);
  const intercept = request => request.url().includes('/api/content') ? request.respond({status:503,contentType:'application/json',body:JSON.stringify({error:'Disposable catalogue failure.'})}) : request.continue();
  guest.on('request',intercept); await open(guest,'events'); await guest.waitForSelector('.wa-error'); assert.match(await guest.$eval('.wa-error',element => element.textContent),/Try again/);
  guest.off('request',intercept); await guest.setRequestInterception(false); await textButton(guest,'Try again'); await guest.waitForSelector('.catalog-event-card');
  pass('Catalogue failure shows retry and recovers');

  const publicRoutes = ['home','events','discover','saved','tickets','profile','contact','venue','event/'+created.id];
  const adminRoutes = ['admin','admin/events','admin/bookings','admin/attendees','admin/enquiries','admin/settings'];
  for (const width of [360,390,768,1440]) {
    console.log('Checking public/management layout:',width);
    for (const route of publicRoutes) await layout(guest,route,width);
    for (const route of adminRoutes) await layout(admin,route,width);
    await open(guest,'home'); await guest.screenshot({path:path.join(out,`home-${width}.png`),fullPage:true});
    await open(admin,'admin/attendees'); await admin.screenshot({path:path.join(out,`attendees-${width}.png`),fullPage:true});
  }
  pass('All public and management pages at 360/390/768/1440px: original web components, native document scroll and no horizontal overflow');

  // Zero-event catalogue is meaningful and does not invent content.
  for (const event of store.all('event')) store.event({...event,published:false,bookingOpen:false},event.id);
  await open(guest,'home'); await guest.waitForSelector('.catalog-empty-state'); assert.equal(await guest.$('.web-hero-section'),null);
  await open(guest,'events'); assert.equal((await guest.$$('.catalog-event-card')).length,0); assert.ok(await guest.$('.catalog-empty-state'));
  assert.deepEqual(errors,[]);
  pass('Empty catalogue and no browser runtime errors');
  writeFileSync(path.join(out,'result.json'),JSON.stringify({ok:true,checks,screenshots:out},null,2));
} catch (failure) {
  console.error('Browser verification failed:',failure.message);
  if (guest) await guest.screenshot({path:path.join(out,'failure-guest.png'),fullPage:true}).catch(()=>{});
  if (admin) await admin.screenshot({path:path.join(out,'failure-admin.png'),fullPage:true}).catch(()=>{});
  writeFileSync(path.join(out,'result.json'),JSON.stringify({ok:false,checks,error:failure.message,runtimeErrors:errors},null,2));
  throw failure;
} finally {
  if (browser) await browser.close();
  server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); store.db.close();
}
