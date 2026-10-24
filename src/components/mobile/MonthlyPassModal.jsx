import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MONTHLY_PASSES, KESARI_CONTACT } from '../../data/kesariStudioData';
import './MonthlyPassModal.css';

export default function MonthlyPassModal({ isOpen, onClose = () => {} }) {
  const [selectedPassId, setSelectedPassId] = useState('pass-performer');

  if (!isOpen) return null;

  const handleSubscribeWhatsApp = (pass) => {
    const msg = 
      `Hi Kesari - The Memory Studio Koramangala!\n` +
      `I want to get the *${pass.name}* (${pass.billing}).\n` +
      `Please activate my monthly studio membership!`;
    window.open(KESARI_CONTACT.whatsappUrl(msg), '_blank');
    onClose();
  };

  const currentPass = MONTHLY_PASSES.find(p => p.id === selectedPassId) || MONTHLY_PASSES[1];

  return (
    <AnimatePresence>
      <motion.div 
        className="pass-modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="pass-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        >
          <div className="sheet-drag-handle" />

          {/* Header */}
          <div className="pass-modal-header">
            <div>
              <span className="pass-eyebrow">MONTHLY MEMBERSHIPS • KORAMANGALA</span>
              <h3 className="pass-title">Studio Monthly Passes</h3>
              <p className="pass-sub">Choose from 3 curated studio residency plans</p>
            </div>
            <button className="pass-close-btn" onClick={onClose}>✕</button>
          </div>

          {/* Pass Selector Tabs */}
          <div className="pass-pills-row">
            {MONTHLY_PASSES.map(p => (
              <button
                key={p.id}
                className={`pass-tier-pill ${selectedPassId === p.id ? 'active' : ''}`}
                onClick={() => setSelectedPassId(p.id)}
              >
                <span>{p.name.split(' ')[0]}</span>
                <small>{p.billing.split(' ')[0]}</small>
              </button>
            ))}
          </div>

          <div className="pass-body-scroll">
            {/* Active Pass Card Details */}
            <div className={`pass-hero-card ${currentPass.popular ? 'popular' : ''}`}>
              <div className="pass-hero-header">
                <span className="pass-tier-tag">{currentPass.tierTag}</span>
                <span className="pass-hero-price">{currentPass.billing}</span>
              </div>

              <h4 className="pass-hero-title">{currentPass.name}</h4>
              <p className="pass-hero-desc">{currentPass.highlight}</p>

              <div className="pass-perks-list">
                {currentPass.perks.map((perk, i) => (
                  <div key={i} className="pass-perk-row">
                    <span className="perk-check">✓</span>
                    <span className="perk-text">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="pass-guarantee-note">
              <span>⚡ Valid for 30 days from activation at Kesari - The Memory Studio, Koramangala. Cancel or upgrade anytime.</span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="pass-modal-footer">
            <motion.button 
              className="pass-whatsapp-btn"
              onClick={() => handleSubscribeWhatsApp(currentPass)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="wa-icon">💬</span>
              <span>Get {currentPass.name.split(' ')[0]} Pass on WhatsApp</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
