import React, { useState } from 'react';
import { motion } from 'motion/react';
import './SlideTypography.css';

export default function SlideTypography() {
  const [previewText, setPreviewText] = useState("");

  const typeRows = [
    { name: "Heading 1", font: "Lufga", weight: "Semibold", weightNum: 600, size: "40", actualSize: "36px" },
    { name: "Heading 2", font: "Lufga", weight: "Medium", weightNum: 500, size: "36", actualSize: "30px" },
    { name: "Heading 3", font: "Lufga", weight: "Medium", weightNum: 500, size: "24", actualSize: "22px" },
    { name: "Title", font: "Lufga", weight: "Regular", weightNum: 400, size: "20", actualSize: "18px" },
    { name: "Subtitle", font: "Lufga", weight: "Regular", weightNum: 400, size: "16", actualSize: "15px" }
  ];

  return (
    <motion.section 
      className="behance-slide-typography"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Watermark Faint Letters */}
      <div className="typo-watermark-bg">
        <span className="watermark-letter letter-left">E</span>
        <span className="watermark-letter letter-bottom-1">ding 1</span>
        <span className="watermark-letter letter-bottom-2">ding 2</span>
      </div>

      {/* Top Header */}
      <div className="typo-header">
        <h2 className="typo-title">Typography</h2>
        <div className="typo-chips-wrap">
          <span className="typo-chip">Modern</span>
          <span className="typo-chip">Geometric</span>
          <span className="typo-chip">Indentity</span>
        </div>
      </div>

      {/* Giant Hero Wordmark: Authentic Lufga artwork */}
      <div className="typo-hero-wordmark-wrap">
        <img 
          src="/assets/lufga_wordmark.png" 
          alt="Lufga Typographic Wordmark" 
          className="typo-hero-wordmark-img"
        />
      </div>

      {/* Font Hierarchy Table */}
      <div className="typo-table-container">
        {typeRows.map((row) => (
          <div key={row.name} className="typo-table-row">
            <div 
              className="typo-col col-name" 
              style={{ fontSize: row.actualSize, fontWeight: row.weightNum }}
            >
              {previewText || row.name}
            </div>
            <div className="typo-col col-font">{row.font}</div>
            <div className="typo-col col-weight">{row.weight}</div>
            <div className="typo-col col-size">{row.size}</div>
          </div>
        ))}
      </div>

      {/* Interactive Type Tester Bar */}
      <div className="typo-tester-bar">
        <span className="tester-label">Live Preview:</span>
        <input 
          type="text" 
          placeholder="Type here to test all Lufga hierarchy levels..." 
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          className="typo-tester-input"
        />
        {previewText && (
          <button className="typo-reset-btn" onClick={() => setPreviewText("")}>Reset</button>
        )}
      </div>
    </motion.section>
  );
}
