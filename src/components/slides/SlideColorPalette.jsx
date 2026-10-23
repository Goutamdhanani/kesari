import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './SlideColorPalette.css';

export default function SlideColorPalette() {
  const [copiedHex, setCopiedHex] = useState(null);

  const colors = [
    { hex: "#0A0A0A", name: "Obsidian", role: "Primary Deep Canvas & Base Contrast" },
    { hex: "#F5F0E8", name: "Warm ivory", role: "Headlines, Editorial Typography & Crisp Elements" },
    { hex: "#FF8248", name: "Stage orange", role: "Primary CTAs, Active States & Stage Backlight Glow" },
    { hex: "#292522", name: "Charcoal", role: "Card Surfaces, Navigation Bars & Elevated Panels" }
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
            <img src="/assets/kesari_logo.png" alt="KESARI Logo" className="colors-thumb-img" />
          </div>
          <p className="colors-statement">
            A handcrafted luxury palette rooted in Obsidian, Warm Ivory, Stage Orange, and Charcoal for an immersive, tactile live experience.
          </p>
        </div>
      </div>

      {/* Recommended Color Palette Swatch Bar */}
      <div className="palette-swatches-grid">
        {colors.map((c) => (
          <motion.div 
            key={c.hex}
            className="palette-swatch-card"
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => handleCopyHex(c.hex)}
            title={`Click to copy ${c.hex}`}
          >
            <div 
              className="palette-swatch-pill" 
              style={{ 
                backgroundColor: c.hex, 
                border: c.hex === '#0A0A0A' ? '1px solid rgba(245, 240, 232, 0.2)' : 'none' 
              }} 
            />
            <div className="palette-swatch-meta">
              <span className="swatch-name">{c.name}</span>
              <span className="swatch-hex font-mono">{c.hex}</span>
              <span className="swatch-role">{c.role}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Center Visualization: Pinwheel Donut */}
      <div className="colors-center-stage">
        <motion.div 
          className="pinwheel-container"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <img 
            src="/assets/donut_wheel_perfect.png" 
            alt="Color Palette Wheel" 
            className="pinwheel-artwork-img"
          />

          {/* Interactive Clickable Hotspots */}
          <button 
            className="badge-click-hotspot hotspot-lime" 
            onClick={() => handleCopyHex('#FF8248')} 
            title="Click to copy #FF8248 (Stage orange)"
          />
          <button 
            className="badge-click-hotspot hotspot-crimson" 
            onClick={() => handleCopyHex('#FF8248')} 
            title="Click to copy #FF8248"
          />
          <button 
            className="badge-click-hotspot hotspot-sky" 
            onClick={() => handleCopyHex('#F5F0E8')} 
            title="Click to copy #F5F0E8 (Warm ivory)"
          />
          <button 
            className="badge-click-hotspot hotspot-white" 
            onClick={() => handleCopyHex('#292522')} 
            title="Click to copy #292522 (Charcoal)"
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
