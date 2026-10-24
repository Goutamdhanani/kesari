import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MONTHLY_PASSES, KESARI_MEMBERSHIP_META, KESARI_CONTACT } from '../../data/kesariStudioData';
import './MonthlyPassModal.css';

export default function MonthlyPassModal({ isOpen, initialPassId = 'pass-ritual', onClose = () => {} }) {
  const [selectedPassId, setSelectedPassId] = useState(initialPassId);

  React.useEffect(() => {
    if (initialPassId) {
      setSelectedPassId(initialPassId);
    }
  }, [initialPassId, isOpen]);

  if (!isOpen) return null;

  const handleSubscribeWhatsApp = (pass) => {
    const msg = 
      `Hi Kesari - The Memory Studio!\n` +
      `I want to join the *${pass.name}* (${pass.billing}) membership.\n\n` +
      `• *Access:* ${pass.workdays} (${pass.workHoursTotal})\n` +
      `• *Beverages:* ${pass.teaCount}\n` +
      (pass.diningCredit !== '—' ? `• *Dining Credit:* ${pass.diningCredit}\n` : '') +
      `• *Total Package Worth:* ₹${pass.totalValue.toLocaleString()} (${pass.savingsText})\n\n` +
      `Please let me know how to start my membership!`;
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

          {/* Modal Header */}
          <div className="pass-modal-header">
            <div>
              <span className="membership-kicker">KESARI MEMBERSHIP</span>
              <h3 className="membership-hero-title">Come for a coffee. Find your place.</h3>
              <p className="membership-hero-motto">Work here. Eat here. Meet here. Belong here.</p>
            </div>
            <button className="pass-close-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>

          {/* Coworking Schedule Pill */}
          <div className="membership-schedule-banner">
            <span className="sched-icon">⏱️</span>
            <div className="sched-text">
              <strong>Coworking Hours:</strong> Mon–Thu 10am–6pm (8h) · Fri 10am–3pm (5h)
            </div>
            <span className="sched-badge">37h / wk</span>
          </div>

          {/* Pass Selector Tabs */}
          <div className="membership-tier-tabs">
            {MONTHLY_PASSES.map(p => {
              const isSelected = selectedPassId === p.id;
              return (
                <button
                  key={p.id}
                  className={`tier-tab-btn ${isSelected ? 'active ' + p.theme : ''}`}
                  onClick={() => setSelectedPassId(p.id)}
                >
                  <span className="tab-tier-name">{p.name.replace('THE ', '')}</span>
                  <span className="tab-tier-price">{p.billing.split(' ')[0]}</span>
                  {p.popular && <span className="tab-loved-dot" title="Most Loved" />}
                </button>
              );
            })}
          </div>

          {/* Body Scroll */}
          <div className="pass-body-scroll">
            {/* The Bespoke Pass Card */}
            <div className={`bespoke-membership-pass ${currentPass.theme}`}>
              {/* Card Header */}
              <div className="pass-card-top">
                <div className="pass-badge-stack">
                  <span className="pass-eyebrow-tag">{currentPass.tierTag}</span>
                  <h4 className="pass-name-display">{currentPass.name}</h4>
                </div>
                <div className="pass-price-box">
                  <span className="pass-price-num">{currentPass.billing}</span>
                  <span className="pass-validity-tag">30-day membership</span>
                </div>
              </div>

              {/* Tagline */}
              <p className="pass-tagline-quote">"{currentPass.headline}"</p>

              {/* WOW WHAT A DEAL: Total Worth Callout Banner */}
              <div className="deal-callout-capsule">
                <div className="deal-callout-top">
                  <span className="deal-worth-label">TOTAL BENEFIT WORTH</span>
                  <span className="deal-worth-amount">₹{currentPass.totalValue.toLocaleString()}</span>
                </div>
                <div className="deal-callout-bottom">
                  <span className="deal-pay-note">You pay only <strong>{currentPass.billing.split(' ')[0]}</strong></span>
                  <span className="deal-savings-badge">{currentPass.savingsText}</span>
                </div>
              </div>

              {/* Mathematical Value Breakdown */}
              <div className="value-math-breakdown-box">
                <span className="math-box-heading">Real Itemized Value Breakdown:</span>
                <div className="math-items-list">
                  {currentPass.valueBreakdown.map((row, i) => (
                    <div key={i} className="math-item-row">
                      <span className="math-item-label">{row.label}</span>
                      <span className="math-item-val">{row.value}</span>
                    </div>
                  ))}
                  <div className="math-total-row">
                    <span>Total Package Value:</span>
                    <strong>₹{currentPass.totalValue.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Included Benefits & Privileges */}
              <div className="pass-features-block">
                <span className="features-label">Included Privileges:</span>
                <div className="features-checklist">
                  {currentPass.perks.map((perk, i) => (
                    <div key={i} className="feature-check-item">
                      <span className="feature-check-icon">✓</span>
                      <span className="feature-check-text">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Studio Hours Note */}
              <div className="pass-studio-hours-note">
                <span className="hours-note-label">⚡ Coworking Schedule:</span>
                <span className="hours-note-detail">Mon–Thu: 10:00 AM – 6:00 PM · Fri: 10:00 AM – 3:00 PM</span>
              </div>
            </div>

            {/* Membership Terms & Philosophy */}
            <div className="membership-philosophy-box">
              <span className="philo-heading">Three ways to belong. One place to call yours.</span>
              <p className="philo-terms">
                Monthly memberships. Personal beverage redemptions only (hot/iced teas & coffees @ ₹120 value). Regular Kesari-hosted community experiences included subject to RSVP and availability. Terms apply.
              </p>
            </div>
          </div>

          {/* Sticky WhatsApp Trigger */}
          <div className="pass-modal-footer">
            <motion.button 
              className={`pass-subscribe-btn ${currentPass.theme}`}
              onClick={() => handleSubscribeWhatsApp(currentPass)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="wa-icon">💬</span>
              <span>Join {currentPass.name} on WhatsApp ({currentPass.billing.split(' ')[0]})</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
