import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import path from 'node:path';
import {selectLandingEvents} from '../src/lib/events.js';

const origin=process.env.KESARI_PREVIEW_ORIGIN||'http://localhost:3000',out=path.resolve('.local/qa');mkdirSync(out,{recursive:true});
const catalogue=await(await fetch(origin+'/api/content')).json(),event=selectLandingEvents(catalogue.events)[0];
const browser=await puppeteer.launch({executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(12000);
async function visit(route){await page.goto(origin+'/#/'+route,{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);}
try{
 for(const size of [{width:306,height:650},{width:390,height:844},{width:768,height:1024},{width:1440,height:900},{width:844,height:390}]){
  await page.setViewport({...size,isMobile:size.width<600,hasTouch:size.width<600});
  for(const route of ['', 'events','discover','profile','tickets',...(event?['event/'+event.id]:[])]){
   await visit(route);await page.waitForSelector('.landing-brand img');
   const geometry=await page.evaluate(()=>{
    const app=document.querySelector('.landing-shell').getBoundingClientRect(),logo=document.querySelector('.landing-brand img').getBoundingClientRect(),content=document.querySelector('.studio-content');
    return{width:app.width,left:app.left,viewport:innerWidth,logoWidth:logo.width,logoHeight:logo.height,fakeChrome:!!document.querySelector('.landing-phone,.landing-island'),overflow:document.documentElement.scrollWidth>innerWidth+1,contentOverflow:content?getComputedStyle(content).overflowY:null,bodyBackground:getComputedStyle(document.body).backgroundColor,broken:[...document.images].filter(x=>x.complete&&!x.naturalWidth).map(x=>x.src)};
   });
   assert.ok(Math.abs(geometry.width-geometry.viewport)<1&&Math.abs(geometry.left)<1,'Edge-to-edge app on '+route);
   assert.equal(geometry.fakeChrome,false,'No simulated phone or notch');
   assert.ok(geometry.logoWidth<=117&&geometry.logoHeight<=35,'Compact logo on '+route);
   assert.equal(geometry.overflow,false,'Horizontal overflow on '+route);assert.deepEqual(geometry.broken,[]);
   assert.equal(geometry.bodyBackground,'rgb(3, 19, 30)','Reference dark navy canvas');
   if(route){
    assert.equal(geometry.contentOverflow,'visible','Use native page scrolling');
    await page.waitForFunction(()=>{const active=document.querySelector('.studio-dock button.active'),light=active?.querySelector('.studio-tab-light');if(!light)return false;const a=active.getBoundingClientRect(),b=light.getBoundingClientRect();return Math.abs(a.x+a.width/2-b.x-b.width/2)<1});
   }
   await page.screenshot({path:path.join(out,'native-'+(route.replaceAll('/','-')||'home')+'-'+size.width+'.png')});
  }
 }
 await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});await visit('events');
 const headerTop=await page.$eval('.landing-header',e=>e.getBoundingClientRect().top);
 await page.evaluate(()=>scrollBy(0,450));assert.ok(await page.evaluate(()=>scrollY>100),'Native document scroll');
 assert.ok(Math.abs(await page.$eval('.landing-header',e=>e.getBoundingClientRect().top)-headerTop)<1,'Fixed header stays in viewport');
 await page.evaluate(()=>scrollTo(0,0));await page.type('[aria-label="Search events"]','no-results-qa-query');await page.waitForSelector('.memory-empty');assert.equal((await page.$$('.memory-event')).length,0);
 await page.click('.studio-dock [aria-label="My profile"]');await page.waitForSelector('.profile-form');
 await page.type('.profile-form [name="name"]','Browser Test Guest');await page.click('.profile-form button[type="submit"]');await page.waitForFunction(()=>document.querySelector('.profile-save-status')?.textContent.includes('saved'));
 await page.reload({waitUntil:'networkidle0'});assert.equal(await page.$eval('.profile-form [name="name"]',e=>e.value),'Browser Test Guest');
 await page.click('[aria-label="Open menu"]');await page.click('#landing-navigation a[href="#/tickets"]');await page.waitForSelector('.tickets-empty');assert.equal(new URL(page.url()).hash,'#/tickets');
 if(event){await visit('event/'+event.id);await page.click('.event-book-jump');await page.waitForFunction(()=>{const panel=document.querySelector('.live-booking-panel').getBoundingClientRect(),header=document.querySelector('.landing-header').getBoundingClientRect();return panel.top>=header.bottom-1&&panel.top<innerHeight*.6});await page.screenshot({path:path.join(out,'native-booking-form-390.png')});}
 const pass={id:'qa-layout-only',token:'qa-layout-only',eventId:event?.id||'qa-event',eventTitle:'An evening at Kesari',eventDate:'2099-01-01T20:00:00+05:30',quantity:2,status:'confirmed',reference:'QA-LAYOUT-ONLY',ticketCode:'QA-LAYOUT-ONLY'};
 await page.setRequestInterception(true);page.on('request',request=>{if(new URL(request.url()).pathname==='/api/orders/qa-layout-only')request.respond({status:200,contentType:'application/json',body:JSON.stringify(pass)});else request.continue()});
 await page.evaluate(pass=>localStorage.setItem('kesari-ui-orders',JSON.stringify([pass])),pass);
 await page.setViewport({width:306,height:650,isMobile:true,hasTouch:true});await visit('tickets');await page.reload({waitUntil:'networkidle0'});await page.waitForSelector('.live-ticket .payment-qr');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Narrow confirmed ticket must fit');
 assert.ok(await page.$eval('.live-ticket .payment-qr',e=>e.getBoundingClientRect().height<=e.parentElement.getBoundingClientRect().height+1));
 await page.screenshot({path:path.join(out,'native-pass-layout-306.png')});
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await visit('profile');
 assert.equal(await page.$eval('.liquid-reference-art',e=>getComputedStyle(e).animationName),'none');
 assert.deepEqual(errors,[]);console.log('PASS: edge-to-edge app without fake phone/notch, reference liquid-colour canvas, responsive mobile/tablet/desktop/landscape, native scrolling, fixed header, search, profile, menus, booking and narrow tickets.');
}catch(e){await page.screenshot({path:path.join(out,'native-failure.png'),fullPage:true});throw e;}finally{await browser.close()}
