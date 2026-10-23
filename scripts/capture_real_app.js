import puppeteer from 'puppeteer-core';
import path from 'path';

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
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });

    const clickByText = async (text) => {
      await page.evaluate((t) => {
        const btns = Array.from(document.querySelectorAll('button, a'));
        const target = btns.find(b => b.textContent && b.textContent.includes(t));
        if (target) target.click();
      }, text);
      await new Promise(r => setTimeout(r, 600));
    };

    // 1. Home / Explore Page (Real World Web App)
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));

    const p1 = path.join(ARTIFACT_DIR, 'real_app_home.png');
    await page.screenshot({ path: p1, fullPage: false });
    console.log('Captured 1: Real App Home ->', p1);

    // 2. Open Event Detail & Booking Modal
    await clickByText('Book Now');
    await new Promise(r => setTimeout(r, 800));
    const p2 = path.join(ARTIFACT_DIR, 'real_app_modal.png');
    await page.screenshot({ path: p2, fullPage: false });
    console.log('Captured 2: Booking Modal ->', p2);

    // Close modal
    await clickByText('✕');
    await new Promise(r => setTimeout(r, 400));

    // 3. Digital Ticket Wallet View
    await clickByText('My Tickets');
    await new Promise(r => setTimeout(r, 800));
    const p3 = path.join(ARTIFACT_DIR, 'real_app_wallet.png');
    await page.screenshot({ path: p3, fullPage: false });
    console.log('Captured 3: Ticket Wallet ->', p3);

    // 4. Open Gate QR Pass Modal
    await clickByText('Show Gate QR Pass');
    await new Promise(r => setTimeout(r, 800));
    const p4 = path.join(ARTIFACT_DIR, 'real_app_qr.png');
    await page.screenshot({ path: p4, fullPage: false });
    console.log('Captured 4: Gate QR Pass ->', p4);

    // Close QR Modal
    await clickByText('Done');
    await new Promise(r => setTimeout(r, 400));

    // 5. Standalone Mobile Simulator
    await clickByText('📱 Mobile');
    await new Promise(r => setTimeout(r, 800));
    const p5 = path.join(ARTIFACT_DIR, 'real_app_mobile.png');
    await page.screenshot({ path: p5, fullPage: false });
    console.log('Captured 5: Mobile Simulator ->', p5);

    console.log('All real app screenshots captured successfully!');
  } finally {
    await browser.close();
  }
}

capture().catch(err => {
  console.error('Error in capture:', err);
  process.exit(1);
});
