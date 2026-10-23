import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './QRModal.css';

export default function QRModal({ isOpen, onClose = () => {}, ticket = null }) {
  if (!isOpen) return null;

  const eventTitle = ticket?.eventTitle || 'Gate Entry Pass';
  const location = ticket?.location || 'Riverfront Park Main Gate A';
  const passHash = ticket?.hash || '0x487Fh3kmjn3...35620';

  return (
    <AnimatePresence>
      <motion.div 
        className="qr-modal-backdrop" 
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="qr-modal-sheet" 
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Grabber handle */}
          <div className="sheet-drag-handle"></div>

          <div className="qr-modal-header">
            <h3 className="qr-modal-title">{eventTitle}</h3>
            <button className="qr-modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>

          <p className="qr-modal-subtitle">Hold phone near scanner at {location}</p>

          {/* QR Code Container */}
          <div className="qr-code-scanner-box">
            <div className="qr-scanner-beam"></div>
            <svg className="qr-code-svg" viewBox="0 0 200 200">
              {/* Corner 1 (Top Left) */}
              <rect x="15" y="15" width="50" height="50" fill="none" stroke="#080808" strokeWidth="10" rx="6" />
              <rect x="30" y="30" width="20" height="20" fill="#080808" />

              {/* Corner 2 (Top Right) */}
              <rect x="135" y="15" width="50" height="50" fill="none" stroke="#080808" strokeWidth="10" rx="6" />
              <rect x="150" y="30" width="20" height="20" fill="#080808" />

              {/* Corner 3 (Bottom Left) */}
              <rect x="15" y="135" width="50" height="50" fill="none" stroke="#080808" strokeWidth="10" rx="6" />
              <rect x="30" y="150" width="20" height="20" fill="#080808" />

              {/* Data matrix dots */}
              <rect x="75" y="20" width="10" height="10" fill="#080808" />
              <rect x="95" y="20" width="10" height="10" fill="#080808" />
              <rect x="115" y="20" width="10" height="10" fill="#080808" />
              <rect x="75" y="40" width="10" height="10" fill="#080808" />
              <rect x="105" y="40" width="10" height="10" fill="#080808" />
              <rect x="85" y="55" width="10" height="10" fill="#080808" />
              
              {/* Center pattern */}
              <rect x="75" y="75" width="50" height="50" fill="#DAFB71" rx="8" />
              <text x="100" y="105" textAnchor="middle" fill="#080808" fontSize="22" fontWeight="900" fontFamily="sans-serif">⚡</text>

              <rect x="25" y="75" width="10" height="10" fill="#080808" />
              <rect x="45" y="75" width="10" height="10" fill="#080808" />
              <rect x="25" y="95" width="10" height="10" fill="#080808" />
              <rect x="45" y="105" width="10" height="10" fill="#080808" />
              
              <rect x="145" y="75" width="10" height="10" fill="#080808" />
              <rect x="165" y="85" width="10" height="10" fill="#080808" />
              <rect x="145" y="105" width="10" height="10" fill="#080808" />

              <rect x="75" y="135" width="10" height="10" fill="#080808" />
              <rect x="95" y="145" width="10" height="10" fill="#080808" />
              <rect x="115" y="135" width="10" height="10" fill="#080808" />
              <rect x="85" y="165" width="10" height="10" fill="#080808" />
              <rect x="105" y="165" width="10" height="10" fill="#080808" />
              <rect x="135" y="145" width="10" height="10" fill="#080808" />
              <rect x="155" y="155" width="10" height="10" fill="#080808" />
              <rect x="175" y="145" width="10" height="10" fill="#080808" />
              <rect x="145" y="175" width="10" height="10" fill="#080808" />
              <rect x="165" y="175" width="10" height="10" fill="#080808" />
            </svg>
          </div>

          {/* Info Pills */}
          <div className="qr-meta-box">
            <div className="qr-meta-row">
              <span className="qr-meta-label">Ticket Holder</span>
              <span className="qr-meta-val">Gregory Jenkins</span>
            </div>
            <div className="qr-meta-row">
              <span className="qr-meta-label">Pass ID</span>
              <span className="qr-meta-val font-mono">{passHash}</span>
            </div>
            <div className="qr-meta-row">
              <span className="qr-meta-label">Status</span>
              <span className="qr-status-valid">● Valid Admission</span>
            </div>
          </div>

          <motion.button 
            className="qr-done-btn" 
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Done
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
