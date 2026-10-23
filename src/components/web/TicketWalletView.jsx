import React, { useState } from 'react';
import { motion } from 'motion/react';
import TicketCard from '../ticket/TicketCard';
import AppIcon from '../common/AppIcon';
import './TicketWalletView.css';

export default function TicketWalletView({
  tickets = [],
  onOpenQR = () => {},
  onSaveToAppleWallet = () => {},
  onExploreMore = () => {}
}) {
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);
  const activeTicket = tickets[selectedTicketIndex] || tickets[0];

  return (
    <section className="web-wallet-section">
      <div className="wallet-container">
        
        {/* Header */}
        <div className="wallet-header">
          <div className="section-eyebrow-pill">
            <AppIcon name="ticket" size={13} color="var(--color-brand-saffron)" />
            <span>Verified Digital Passes</span>
          </div>
          <h2 className="section-title">Digital Ticket Wallet</h2>
          <p className="section-subtitle">
            Cryptographically encrypted screen tickets with dynamic barcode anti-counterfeiting. Present this directly at gate scanners.
          </p>
        </div>

        {tickets.length > 0 ? (
          <div className="wallet-main-layout">
            
            {/* Left Column: Tickets Switcher List */}
            <div className="wallet-sidebar-list">
              <span className="sidebar-list-title">Your Active Passes ({tickets.length})</span>
              
              <div className="tickets-list-scroll">
                {tickets.map((t, idx) => (
                  <button
                    key={t.id}
                    className={`ticket-summary-pill-btn ${selectedTicketIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedTicketIndex(idx)}
                  >
                    <img src={t.image} alt={t.eventTitle} className="pill-ticket-thumb" />
                    <div className="pill-ticket-info">
                      <span className="pill-ticket-title">{t.eventTitle}</span>
                      <span className="pill-ticket-meta">{t.date} • {t.seat}</span>
                    </div>
                    {selectedTicketIndex === idx && (
                      <span className="pill-active-indicator">●</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Apple Wallet Notice */}
              <div className="apple-wallet-perk-card">
                <span className="perk-icon">
                  <AppIcon name="sparkles" size={18} color="var(--color-brand-saffron)" />
                </span>
                <div>
                  <h4 className="perk-heading">Apple & Google Wallet Ready</h4>
                  <p className="perk-sub">Add any pass with one click for offline gate tap.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Stage Dual-Notch Ticket Presentation */}
            <div className="wallet-stage-ticket-display">
              <div className="ticket-elevation-mount">
                <TicketCard 
                  title={activeTicket.eventTitle}
                  date={activeTicket.date}
                  time={activeTicket.time}
                  location={activeTicket.location}
                  seat={activeTicket.seat}
                  hash={activeTicket.hash}
                  image={activeTicket.image}
                  parentBg="pale"
                  className="wallet-featured-ticket"
                />
              </div>

              {/* Wallet Actions Bar */}
              <div className="wallet-ticket-actions">
                <motion.button 
                  className="wallet-action-primary-btn"
                  onClick={() => onOpenQR(activeTicket)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AppIcon name="qr" size={17} color="#FFFFFF" />
                  <span>Show Gate QR Pass</span>
                  <span className="action-hint">Scan at gate</span>
                </motion.button>

                <motion.button 
                  className="wallet-action-secondary-btn"
                  onClick={() => onSaveToAppleWallet(activeTicket)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Add to Apple Wallet</span>
                </motion.button>

                <button 
                  className="wallet-action-ghost-btn"
                  onClick={() => alert(`Downloading verifiable PDF pass for ${activeTicket.eventTitle}...`)}
                >
                  <AppIcon name="share" size={15} color="var(--color-muted-gray)" />
                  <span>Download Pass PDF</span>
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="wallet-empty-state">
            <AppIcon name="ticket" size={36} color="var(--color-muted-gray)" />
            <h3 className="wallet-empty-title">Your Wallet is Empty</h3>
            <p className="wallet-empty-desc">
              You haven't booked any event passes yet. Browse available sessions and secure your gate ticket in seconds!
            </p>
            <button 
              className="wallet-explore-btn"
              onClick={onExploreMore}
            >
              Explore Events Now
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
