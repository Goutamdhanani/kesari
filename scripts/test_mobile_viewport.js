import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\pooja\\.gemini\\antigravity-ide\\brain\\4fab2383-a091-4728-9f67-59fae164af36';

async function testMobile() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();
    
    // 1. Mobile Device Viewport (iPhone 14 / modern smartphone: 390 x 844)
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));

    const p1 = path.join(ARTIFACT_DIR, 'mobile_viewport_home.png');
    await page.screenshot({ path: p1, fullPage: false });
    console.log('Captured 1: mobile_viewport_home.png');

    // 2. Mobile Catalog
    await page.evaluate(() => window.scrollBy(0, 650));
    await new Promise(r => setTimeout(r, 600));
    const p2 = path.join(ARTIFACT_DIR, 'mobile_viewport_catalog.png');
    await page.screenshot({ path: p2, fullPage: false });
    console.log('Captured 2: mobile_viewport_catalog.png');

    // 3. Mobile Booking Modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const b = btns.find(x => x.textContent && x.textContent.includes('Book Now'));
      if (b) b.click();
    });
    await new Promise(r => setTimeout(r, 800));
    const p3 = path.join(ARTIFACT_DIR, 'mobile_viewport_modal.png');
    await page.screenshot({ path: p3, fullPage: false });
    console.log('Captured 3: mobile_viewport_modal.png');

    // Close modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // 4. Mobile Ticket Wallet View (click "Tickets" on mobile bottom nav)
    await page.evaluate(() => {
      const navBtns = Array.from(document.querySelectorAll('.mobile-nav-item-btn'));
      const ticketNav = navBtns.find(b => b.textContent && b.textContent.includes('Tickets'));
      if (ticketNav) ticketNav.click();
    });
    await new Promise(r => setTimeout(r, 800));
    const p4 = path.join(ARTIFACT_DIR, 'mobile_viewport_wallet.png');
    await page.screenshot({ path: p4, fullPage: false });
    console.log('Captured 4: mobile_viewport_wallet.png');

    // 5. Mobile Simulator in 1440x900
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(x => x.textContent && x.textContent.includes('Mobile'));
      if (b) b.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    const p5 = path.join(ARTIFACT_DIR, 'mobile_sim_view.png');
    await page.screenshot({ path: p5, fullPage: false });
    console.log('Captured 5: mobile_sim_view.png');

    console.log('All mobile screenshots captured successfully!');
  } finally {
    await browser.close();
  }
}

testMobile().catch(console.error);
