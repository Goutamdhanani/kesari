import React from 'react';
import './WebFooter.css';

export default function WebFooter({
  onSelectView = () => {}
}) {
  return (
    <footer className="web-footer-root">
      <div className="footer-container">
        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">
              <span>HYPERACTIVE</span>
              <span className="footer-lime-dot"></span>
            </div>
            <p className="footer-brand-bio">
              The next-generation live event experience platform. Verifiable screen tickets with dynamic barcode encryption, instant gate check-ins, and zero counterfeit fraud.
            </p>
            <div className="footer-store-badges">
              <button className="store-pill-btn" onClick={() => onSelectView('mobile')}>
                <span className="store-icon">🍏</span>
                <div className="store-text">
                  <span className="store-sub">Download for</span>
                  <span className="store-name">iOS App</span>
                </div>
              </button>
              <button className="store-pill-btn" onClick={() => onSelectView('mobile')}>
                <span className="store-icon">🤖</span>
                <div className="store-text">
                  <span className="store-sub">Get it on</span>
                  <span className="store-name">Android</span>
                </div>
              </button>
            </div>
          </div>

          {/* Column: Platform Experience */}
          <div className="footer-links-col">
            <h5 className="footer-col-title">Platform</h5>
            <ul className="footer-links-list">
              <li><button onClick={() => onSelectView('explore')}>Explore Concerts</button></li>
              <li><button onClick={() => onSelectView('wallet')}>My Ticket Wallet</button></li>
              <li><button onClick={() => onSelectView('favorites')}>Saved Events</button></li>
              <li><button onClick={() => onSelectView('mobile')}>Mobile App Simulator</button></li>
            </ul>
          </div>

          {/* Column: Behance & Design System */}
          <div className="footer-links-col">
            <h5 className="footer-col-title">Design System</h5>
            <ul className="footer-links-list">
              <li><button onClick={() => onSelectView('slides')}>📜 Behance Case Study</button></li>
              <li><button onClick={() => onSelectView('slides')}>1. UI Kit Board</button></li>
              <li><button onClick={() => onSelectView('slides')}>2. Organic Color Palette</button></li>
              <li><button onClick={() => onSelectView('slides')}>3. Lufga Typography</button></li>
              <li><button onClick={() => onSelectView('slides')}>4. User Flow Architecture</button></li>
              <li><button onClick={() => onSelectView('slides')}>5. 3D Studio Mockup</button></li>
            </ul>
          </div>

          {/* Column: Verified Gate Security */}
          <div className="footer-links-col">
            <h5 className="footer-col-title">Security & Tech</h5>
            <div className="footer-security-box">
              <span className="sec-icon">🔒</span>
              <span className="sec-text">
                Dynamic barcode rolling token refreshing every 15 seconds to prevent gate screenshots.
              </span>
            </div>
            <div className="footer-metric-pill">
              <span className="metric-num">100%</span>
              <span className="metric-label">Verifiable NFC passes</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span className="footer-copyright">
            © 2026 HYPERACTIVE Live Events, Inc. Inspired by the Behance Event Jam Case Study.
          </span>
          <div className="footer-legal-links">
            <button onClick={() => onSelectView('explore')}>Privacy</button>
            <button onClick={() => onSelectView('explore')}>Terms</button>
            <button onClick={() => onSelectView('slides')}>Behance Spec</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
