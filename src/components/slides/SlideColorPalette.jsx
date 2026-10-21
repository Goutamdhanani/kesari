import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './SlideColorPalette.css';

export default function SlideColorPalette() {
  const [copiedHex, setCopiedHex] = useState(null);

  const colors = [
    { hex: "#EE3D5A", name: "Crimson / Coral", role: "Urgent Alerts, Badges & Music Accents" },
    { hex: "#DAFB71", name: "Electric Lime", role: "High-Priority Action & Active Indicators" },
    { hex: "#80B0EC", name: "Soft Sky Blue", role: "Subtle Interfaces, Dividers & Highlights" },
    { hex: "#FFFFFF", name: "Pure White", role: "Content Cards, Tickets & High-Contrast Typography" }
  ];

  const handleCopyHex = (hex) => {
    navigator.clipboard?.writeText?.(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <motion.section 
      className="behance-slide-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Header matching reference */}
      <div className="colors-header">
        <h2 className="colors-title">Color Palette</h2>
        <div className="colors-header-right">
          <div className="colors-thumb-wrap">
            <img src="/assets/color_capsule.png" alt="3D Capsule Asset" className="colors-thumb-img" />
          </div>
          <p className="colors-statement">
            We use a balanced mix of primary, secondary, and accent colors to create a clear visual hierarchy and an emotionally high experience.
          </p>
        </div>
      </div>

      {/* Main Center Visualization: Authentic 4-color Organic Swirl Donut */}
      <div className="colors-center-stage">
        <motion.div 
          className="pinwheel-container"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {/* Authentic High-Resolution Donut Artwork with organic swirl petals and frosted badges */}
          <img 
            src="/assets/donut_wheel_perfect.png" 
            alt="Color Palette Wheel" 
            className="pinwheel-artwork-img"
          />

          {/* Interactive Clickable Hotspots over the 4 Frosted Badges */}
          <button 
            className="badge-click-hotspot hotspot-lime" 
            onClick={() => handleCopyHex('#DAFB71')} 
            title="Click to copy #DAFB71"
          />
          <button 
            className="badge-click-hotspot hotspot-crimson" 
            onClick={() => handleCopyHex('#EE3D5A')} 
            title="Click to copy #EE3D5A"
          />
          <button 
            className="badge-click-hotspot hotspot-sky" 
            onClick={() => handleCopyHex('#80B0EC')} 
            title="Click to copy #80B0EC"
          />
          <button 
            className="badge-click-hotspot hotspot-white" 
            onClick={() => handleCopyHex('#FFFFFF')} 
            title="Click to copy #FFFFFF"
          />
        </motion.div>

        {/* Copy Feedback Toast */}
        <AnimatePresence>
          {copiedHex && (
            <motion.div 
              className="color-copied-toast"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span>Copied <strong>{copiedHex}</strong> to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
