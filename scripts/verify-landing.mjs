import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {selectLandingEvents} from '../src/lib/events.js';
const out=path.resolve('.local/qa');fs.mkdirSync(out,{recursive:true});
const content=await(await fetch('http://localhost:3000/api/content')).json();const events=selectLandingEvents(content.events);
const browser=await puppeteer.launch({executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
const settled=async id=>page.waitForFunction(id=>{const el=[...document.querySelectorAll('.landing-event-slide')];return el.length===1&&el[0].dataset.eventId===id},{},id);
try{
 for(const size of[{width:306,height:650},{width:390,height:844},{width:1440,height:900}]){
  await page.setViewport({...size,deviceScaleFactor:1,isMobile:size.width<600,hasTouch:size.width<600});await page.goto('http://localhost:3000/#/',{waitUntil:'networkidle0'});await settled(events[0]?.id||'');await page.evaluate(()=>document.fonts.ready);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.deepEqual(await page.evaluate(()=>[...document.images].filter(x=>!x.complete||!x.naturalWidth).map(x=>x.src)),[]);
  assert.equal((await page.$$('.landing-pagination button')).length,events.length);
  assert.deepEqual(await page.$$eval('[data-menu-id]',els=>els.map(e=>e.dataset.menuId)),['events','discover','profile','tickets']);
  assert.equal(await page.$eval('.landing-cards',e=>getComputedStyle(e).touchAction),'pan-x');
  assert.ok(await page.$eval('.landing-glass-card.selected',e=>{const card=e.getBoundingClientRect(),rail=e.parentElement.getBoundingClientRect();return Math.abs(card.x+card.width/2-rail.x-rail.width/2)<2}));
  assert.ok(await page.$eval('.landing-managed-art',e=>{const photo=e.getBoundingClientRect(),screen=document.querySelector('.memory-landing').getBoundingClientRect();return Math.abs(photo.width-screen.width)<1&&Math.abs(photo.height-screen.height)<1&&Math.abs(photo.top-screen.top)<1}));
  assert.equal(await page.$('.memory-landing .aurora-field'),null,'Landing uses only the current event photo');
  for(const selector of ['.landing-glass-top','.landing-glass-bottom'])assert.match(await page.$eval(selector,e=>getComputedStyle(e).backdropFilter),/blur/);
  assert.ok(await page.$eval('.landing-brand img',e=>e.naturalWidth>0&&e.alt.includes('Kesari')));
  assert.equal(await page.$('.landing-heading'),null);
  await page.screenshot({path:path.join(out,'live-events-'+size.width+'.png'),fullPage:true});
  await page.click('[aria-label="Open menu"]');await page.waitForSelector('#landing-navigation');
  assert.equal(await page.$eval('.landing-menu-toggle',e=>e.getAttribute('aria-expanded')),'true');
  assert.deepEqual(await page.$$eval('#landing-navigation a',els=>els.map(e=>e.getAttribute('href'))),['#/events','#/discover','#/profile','#/tickets','#/admin']);
  await page.screenshot({path:path.join(out,'glass-menu-'+size.width+'.png'),fullPage:true});
  const outside=await page.$eval('.memory-landing',e=>{const r=e.getBoundingClientRect();return{x:r.x+r.width*.1,y:r.y+r.height*.85}});
  await page.mouse.click(outside.x,outside.y);await page.waitForSelector('#landing-navigation',{hidden:true});assert.equal(new URL(page.url()).hash,'#/');
  await page.click('[aria-label="Open menu"]');await page.keyboard.press('Escape');await page.waitForSelector('#landing-navigation',{hidden:true});
  assert.equal(await page.$eval('.landing-menu-toggle',e=>e===document.activeElement),true);
 }
 // Desktop dragging changes only the menu, and must not produce a click-through booking.
 const beforeDrag=await page.$eval('.landing-cards',e=>e.dataset.selected),rail=await page.$eval('.landing-cards',e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
 await page.mouse.move(rail.x+rail.w*.75,rail.y+rail.h*.5);await page.mouse.down();await page.mouse.move(rail.x+rail.w*.25,rail.y+rail.h*.5,{steps:16});await page.mouse.up();
 await page.waitForFunction(selected=>document.querySelector('.landing-cards').dataset.selected!==selected,{},beforeDrag);await settled(events[0]?.id||'');assert.equal(new URL(page.url()).hash,'#/');
 const menuAfterDrag=await page.$eval('.landing-cards',e=>e.dataset.selected);
 if(events.length>1){await page.click('[aria-label="Next event"]');await settled(events[1].id);assert.equal(new URL(page.url()).hash,'#/');assert.equal(await page.$eval('.landing-cards',e=>e.dataset.selected),menuAfterDrag);await page.click('[aria-label="Previous event"]');await settled(events[0].id);}
 if(events.length){const photo=await page.$eval('.memory-landing',e=>{const r=e.getBoundingClientRect();return{x:r.x+r.width*.5,y:r.y+r.height*.45}});await page.mouse.click(photo.x,photo.y);await page.waitForSelector('.live-booking-panel');assert.equal(new URL(page.url()).hash,'#/event/'+events[0].id);assert.match(await page.$eval('.memory-page-heading',e=>e.textContent),new RegExp(events[0].title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));}
 assert.deepEqual(errors,[]);console.log('PASS: one full-screen event photo, top/bottom glass blur, supplied Kesari logo, menu open/dismiss/Escape, 306/390/1440 layouts, independent navigation cards, photo controls and booking.');
}finally{await browser.close()}
