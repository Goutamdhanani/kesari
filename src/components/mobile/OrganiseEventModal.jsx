import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import { EVENT_ORGANISER_CATEGORIES, KESARI_CONTACT } from '../../data/kesariStudioData';
import './OrganiseEventModal.css';

export default function OrganiseEventModal({ isOpen, onClose = () => {} }) {
  const [selectedCategory, setSelectedCategory] = useState('music');
  const [guestCount, setGuestCount] = useState('20 - 40 Guests');
  const [datePref, setDatePref] = useState('This Weekend');
  const [customNotes, setCustomNotes] = useState('');

  if (!isOpen) return null;

  const guestOptions = ['10 - 20 Guests', '20 - 40 Guests', '40 - 60 Guests', '60+ Guests'];
  const dateOptions = ['This Weekend', 'Next Week', 'Next Month', 'Flexible'];

  const handleSendToWhatsApp = () => {
    const categoryObj = EVENT_ORGANISER_CATEGORIES.find(c => c.id === selectedCategory);
    const catLabel = categoryObj ? categoryObj.label : 'Event';

    const message = 
      `Hi Kesari - The Memory Studio Koramangala!\n` +
      `I want to organise an event at the studio:\n\n` +
      `• *Event Type:* ${catLabel}\n` +
      `• *Expected Guests:* ${guestCount}\n` +
      `• *Preferred Time:* ${datePref}\n` +
      (customNotes ? `• *Notes:* ${customNotes}\n` : '') +
      `\nPlease share the available slots and quotation for Koramangala studio!`;

    window.open(KESARI_CONTACT.whatsappUrl(message), '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="organise-modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="organise-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        >
          <div className="sheet-drag-handle" />

          {/* Header */}
          <div className="organise-modal-header">
            <div>
              <span className="organise-eyebrow">HOST AT KESARI KORAMANGALA</span>
              <h3 className="organise-title">Organise Your Event</h3>
              <p className="organise-sub">Music, workshops, meetups & private gatherings</p>
            </div>
            <button className="organise-close-btn" onClick={onClose}>✕</button>
          </div>

          <div className="organise-body-scroll">
            {/* Quick Direct WhatsApp Chat Bar */}
            <div className="organise-direct-wa-bar">
              <a 
                href={KESARI_CONTACT.whatsappUrl('Hi Kesari Studio Koramangala! I want to chat about organising an event at the studio.')}
                target="_blank" 
                rel="noopener noreferrer"
                className="organise-direct-wa-link"
              >
                <div className="wa-bar-left">
                  <span className="wa-bar-icon">💬</span>
                  <div className="wa-bar-text">
                    <span className="wa-bar-title">Direct WhatsApp Chat</span>
                    <span className="wa-bar-sub">Quick question? Chat directly with Kesari</span>
                  </div>
                </div>
                <span className="wa-bar-action">Chat ›</span>
              </a>
            </div>

            {/* 1. Category Selection */}
            <div className="form-group-block">
              <label className="form-group-label">1. Select Event Type</label>
              <div className="organise-cats-grid">
                {EVENT_ORGANISER_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    className={`cat-select-card ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className="cat-card-icon">{cat.icon}</span>
                    <span className="cat-card-label">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Guest Count */}
            <div className="form-group-block">
              <label className="form-group-label">2. Expected Attendance</label>
              <div className="chips-row">
                {guestOptions.map(opt => (
                  <button
                    key={opt}
                    className={`choice-chip ${guestCount === opt ? 'active' : ''}`}
                    onClick={() => setGuestCount(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Date / Timeframe */}
            <div className="form-group-block">
              <label className="form-group-label">3. Preferred Date</label>
              <div className="chips-row">
                {dateOptions.map(opt => (
                  <button
                    key={opt}
                    className={`choice-chip ${datePref === opt ? 'active' : ''}`}
                    onClick={() => setDatePref(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Custom Notes */}
            <div className="form-group-block">
              <label className="form-group-label">4. Specific Requirements (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Need 2 microphones, sound engineer, or seating layout..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="organise-text-input"
              />
            </div>

            {/* Studio Perks banner */}
            <div className="studio-perks-box">
              <span className="perk-tag">INCLUDED AT KESARI STUDIO</span>
              <p className="perk-desc">
                Yamaha PA sound system, stage lighting, green room, high-speed WiFi & cafe lounge at Koramangala.
              </p>
            </div>
          </div>

          {/* Sticky WhatsApp Trigger */}
          <div className="organise-sticky-footer">
            <motion.button 
              className="organise-whatsapp-btn"
              onClick={handleSendToWhatsApp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="wa-icon">💬</span>
              <span>Send Details to WhatsApp (7760539955)</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
