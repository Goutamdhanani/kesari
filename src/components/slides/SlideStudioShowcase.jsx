import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MobileFrame from '../mobile/MobileFrame';
import './SlideStudioShowcase.css';

export default function SlideStudioShowcase({ onNavigateHome = () => {} }) {
  // mode: 'studio' (exact Behance render) | 'interactive' (live device simulator)
  const [mode, setMode] = useState('studio');

  return (
    <motion.section 
      className="behance-slide-studio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Studio Viewport */}
      <div className="studio-canvas-container">
        {mode === 'studio' ? (
          <div className="studio-render-wrap">
            {/* Authentic Behance Studio Shot with Brutalist Concrete & Tilted iPhone 16 Pro */}
            <motion.div 
              className="studio-mockup-frame"
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <img 
                src="/assets/kesari_studio.jpg" 
                alt="KESARI Live Studio" 
                className="studio-mockup-img" 
              />

              {/* Click Hotspot over Phone to launch interactive mode */}
              <button 
                className="studio-phone-hotspot"
                onClick={() => setMode('interactive')}
                title="Click to interact with Live Mobile App"
              >
                <div className="hotspot-pulse-badge">
                  <span>Test Mobile Experience</span>
                </div>
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="studio-interactive-wrap">
            <div className="interactive-controls-bar">
              <button 
                className="back-to-studio-btn"
                onClick={() => setMode('studio')}
              >
                ← Back to 3D Studio Mockup
              </button>
              <span className="interactive-badge">Interactive Live Simulator</span>
            </div>
            <MobileFrame initialScreen="home" />
          </div>
        )}
      </div>
    </motion.section>
  );
}
