import React from 'react';
import { motion } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './StudioBanner.css';

export default function StudioBanner({ onBookStudio = () => {} }) {
  const specs = [
    { label: 'Acoustic Tuning', desc: 'Custom sound diffusion & absorption panels' },
    { label: 'Backline Rig', desc: 'Vintage Fender, Marshall & Roland keys' },
    { label: 'Live Tracking', desc: 'Neumann & Shure multi-mic broadcast desk' },
    { label: 'Audience Capacity', desc: 'Intimate 24-seat acoustic lounge sets' }
  ];

  return (
    <section className="studio-spotlight-section">
      <div className="studio-spotlight-container">
        
        {/* Banner Card */}
        <div className="studio-spotlight-card">
          {/* Studio Image Backdrop */}
          <div className="studio-image-frame">
            <img 
              src="/assets/kesari_studio.jpg" 
              alt="KESARI Sound Studio Koramangala" 
              className="studio-spotlight-img"
            />
            <div className="studio-overlay-gradient"></div>
            <div className="studio-orange-ambient-glow"></div>
          </div>

          {/* Foreground Content */}
          <div className="studio-spotlight-content">
            <div className="studio-eyebrow-row">
              <span className="studio-badge">
                <span className="studio-live-pulse"></span>
                KESARI ACOUSTIC & RECORDING STUDIO
              </span>
              <span className="studio-location-tag">
                <AppIcon name="pin" size={12} color="#FF8248" />
                Koramangala 4th Block, Bengaluru
              </span>
            </div>

            <h2 className="studio-spotlight-title">
              Crafted for Sound. Made for Musicians.
            </h2>
            <p className="studio-spotlight-lead">
              Step into Bengaluru's sanctuary for live acoustic sessions, band rehearsals, and analog multi-track tracking. Surrounded by warm tube amplifiers, precision acoustic baffling, and warm stage backlights.
            </p>

            {/* Gear & Studio Specs Grid */}
            <div className="studio-specs-grid">
              {specs.map((item, i) => (
                <div key={i} className="studio-spec-pill">
                  <span className="spec-bullet"></span>
                  <div className="spec-text-wrap">
                    <span className="spec-label">{item.label}</span>
                    <span className="spec-desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="studio-spotlight-actions">
              <motion.button 
                className="studio-primary-action"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBookStudio}
              >
                <AppIcon name="ticket" size={16} color="#0A0A0A" />
                <span>Reserve Studio Session Passes</span>
              </motion.button>
              
              <div className="studio-status-chip">
                <span className="studio-hours-dot"></span>
                <span>Open for Live Tracking & Evening Jams (11:00 AM - 01:00 AM)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
