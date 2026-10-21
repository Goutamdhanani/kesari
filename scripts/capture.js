import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\pooja\\.gemini\\antigravity-ide\\brain\\4fab2383-a091-4728-9f67-59fae164af36';

async function capture() {
  console.log('Launching Edge from:', EDGE_PATH);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();
    
    const clickByText = async (text) => {
      await page.evaluate((t) => {
        const btns = Array.from(document.querySelectorAll('button'));
        const target = btns.find(b => b.textContent.includes(t));
        if (target) target.click();
      }, text);
      await new Promise(r => setTimeout(r, 600));
    };

    // Collapse dock for pure pristine captures
    await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    // 1. UI Kit Board
    await clickByText('1. UI Kit');
    // Hide dock temporarily for clean slide capture
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 400));
    const p1 = path.join(ARTIFACT_DIR, 'captured_uikit.png');
    await page.screenshot({ path: p1, fullPage: false });
    console.log('Captured UI Kit:', p1);

    // 2. Color Palette Board
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'flex';
    });
    await clickByText('2. Color Palette');
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 400));
    const p3 = path.join(ARTIFACT_DIR, 'captured_colors.png');
    await page.screenshot({ path: p3, fullPage: false });
    console.log('Captured Colors:', p3);

    // 3. Typography Board
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'flex';
    });
    await clickByText('3. Typography');
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 400));
    const p4 = path.join(ARTIFACT_DIR, 'captured_typography.png');
    await page.screenshot({ path: p4, fullPage: false });
    console.log('Captured Typography:', p4);

    // 4. User Flow Board
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'flex';
    });
    await clickByText('4. User Flow');
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 400));
    const p4_flow = path.join(ARTIFACT_DIR, 'captured_userflow.png');
    await page.screenshot({ path: p4_flow, fullPage: false });
    console.log('Captured User Flow:', p4_flow);

    // 5. 3D Studio Mockup Board
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'flex';
    });
    await clickByText('5. 3D Studio Mockup');
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 400));
    const p5 = path.join(ARTIFACT_DIR, 'captured_studio.png');
    await page.screenshot({ path: p5, fullPage: false });
    console.log('Captured Studio:', p5);

    // 6. Mobile App Simulator - Home
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'flex';
    });
    await clickByText('Mobile App');
    await page.evaluate(() => {
      const dock = document.querySelector('.floating-presentation-dock');
      if (dock) dock.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 400));
    const p2 = path.join(ARTIFACT_DIR, 'captured_mobile.png');
    await page.screenshot({ path: p2, fullPage: false });
    console.log('Captured Mobile Screen (Home):', p2);

    // 7. Mobile - Onboarding
    await clickByText('Onboarding');
    await new Promise(r => setTimeout(r, 400));
    const pOnboarding = path.join(ARTIFACT_DIR, 'captured_mobile_onboarding.png');
    await page.screenshot({ path: pOnboarding, fullPage: false });
    console.log('Captured Onboarding Screen:', pOnboarding);

    // 8. Mobile - Digital Ticket
    await clickByText('Digital Ticket');
    await new Promise(r => setTimeout(r, 400));
    const pTicket = path.join(ARTIFACT_DIR, 'captured_mobile_ticket.png');
    await page.screenshot({ path: pTicket, fullPage: false });
    console.log('Captured Digital Ticket Screen:', pTicket);

    // 9. Mobile - Event Details
    await clickByText('Event Details');
    await new Promise(r => setTimeout(r, 400));
    const pDetails = path.join(ARTIFACT_DIR, 'captured_mobile_details.png');
    await page.screenshot({ path: pDetails, fullPage: false });
    console.log('Captured Event Details Screen:', pDetails);

    console.log('All screenshots captured successfully!');
  } finally {
    await browser.close();
  }
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
