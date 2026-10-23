import React from 'react';
import AppIcon from '../common/AppIcon';
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
              <span>KESARI</span>
              <span className="footer-lime-dot"></span>
            </div>
            <p className="footer-brand-bio">
              Curated live experiences, acoustic sessions, and gatherings in Bengaluru, Koramangala. Verifiable digital passes with instant gate verification.
            </p>
            <div className="footer-store-badges">
              <button className="store-pill-btn" onClick={() => onSelectView('mobile')}>
                <div className="store-text">
                  <span className="store-sub">Experience on</span>
                  <span className="store-name">iOS App</span>
                </div>
              </button>
              <button className="store-pill-btn" onClick={() => onSelectView('mobile')}>
                <div className="store-text">
                  <span className="store-sub">Experience on</span>
                  <span className="store-name">Android</span>
                </div>
              </button>
            </div>
          </div>

          {/* Column: Platform Experience */}
          <div className="footer-links-col">
            <h5 className="footer-col-title">Experiences</h5>
            <ul className="footer-links-list">
              <li><button onClick={() => onSelectView('explore')}>Explore Sessions</button></li>
              <li><button onClick={() => onSelectView('wallet')}>My Ticket Passes</button></li>
              <li><button onClick={() => onSelectView('favorites')}>Saved Events</button></li>
              <li><button onClick={() => onSelectView('mobile')}>Mobile Experience</button></li>
            </ul>
          </div>

          {/* Column: Design System */}
          <div className="footer-links-col">
            <h5 className="footer-col-title">Architecture</h5>
            <ul className="footer-links-list">
              <li><button onClick={() => onSelectView('slides')}>Design System Spec</button></li>
              <li><button onClick={() => onSelectView('slides')}>UI Components</button></li>
              <li><button onClick={() => onSelectView('slides')}>Color Palette</button></li>
              <li><button onClick={() => onSelectView('slides')}>Typography Scale</button></li>
              <li><button onClick={() => onSelectView('slides')}>User Journey</button></li>
            </ul>
          </div>

          {/* Column: Verified Gate Security */}
          <div className="footer-links-col">
            <h5 className="footer-col-title">Access & Venue</h5>
            <div className="footer-security-box">
              <span className="sec-icon">
                <AppIcon name="ticket" size={14} color="var(--color-brand-saffron)" />
              </span>
              <span className="sec-text">
                Dynamic barcode rolling pass refreshing automatically for secure gate access.
              </span>
            </div>
            <div className="footer-metric-pill">
              <span className="metric-num">Bengaluru</span>
              <span className="metric-label">Koramangala 4th Block</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span className="footer-copyright">
            © 2026 KESARI. Bengaluru, Koramangala. All rights reserved.
          </span>
          <div className="footer-legal-links">
            <button onClick={() => onSelectView('explore')}>Privacy</button>
            <button onClick={() => onSelectView('explore')}>Terms</button>
            <button onClick={() => onSelectView('slides')}>Design Spec</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
