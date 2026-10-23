import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import AppIcon from '../common/AppIcon';
import './EventModal.css';

export default function EventModal({
  event,
  isOpen = false,
  onClose = () => {},
  onBookSuccess = () => {},
  isFavorite = false,
  onToggleFavorite = () => {}
}) {
  const [selectedTier, setSelectedTier] = useState('ga');
  const [ticketCount, setTicketCount] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  if (!isOpen || !event) return null;

  const currentTier = (event.tiers || []).find(t => t.id === selectedTier) || {
    id: 'ga',
    name: 'General Admission',
    price: event.price,
    perks: 'Standard access to standing area and main bars'
  };

  const currentPrice = currentTier.price;
  const subtotal = (currentPrice * ticketCount);
  const fee = (subtotal * 0.08); // 8% service fee
  const total = (subtotal + fee).toFixed(2);

  const handleConfirmBooking = () => {
    setIsBooking(true);

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#DAFB71', '#0042D9', '#EE3D5A', '#FFFFFF']
    });

    const newTicket = {
      id: `tkt-${Date.now().toString().slice(-4)}`,
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      time: event.time.split(' - ')[0] || event.time,
      location: event.venueShort || event.venue,
      seat: `${currentTier.name} (Qty: ${ticketCount})`,
      hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...${Math.random().toString(16).substring(2, 6)}`,
      tier: currentTier.name,
      price: Number(total),
      image: event.image,
      bookedAt: 'Just now'
    };

    setTimeout(() => {
      setIsBooking(false);
      onBookSuccess(newTicket);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="event-modal-backdrop" onClick={onClose}>
        <motion.div 
          className="event-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.24, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Close Button */}
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>

          {/* Modal Header Art Banner */}
          <div className="modal-banner-art">
            <img src={event.image} alt={event.title} className="modal-art-img" />
            <div className="modal-art-overlay"></div>

            <div className="modal-top-tag-row">
              <span className="modal-category-chip">🎵 {event.category}</span>
              <button 
                className={`modal-fav-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(event.id)}
                aria-label="Save event"
              >
                <AppIcon 
                  name="heart" 
                  size={18} 
                  color={isFavorite ? '#EE3D5A' : '#FFFFFF'} 
                  fill={isFavorite ? '#EE3D5A' : 'none'}
                  strokeWidth={2}
                />
              </button>
            </div>

            <div className="modal-banner-headline">
              <h2 className="modal-event-title">{event.title}</h2>
              <div className="modal-venue-date">
                <span>📅 {event.date}</span>
                <span>•</span>
                <span>📍 {event.venue}</span>
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="modal-scroll-content">
            {/* About Event */}
            <div className="modal-section-group">
              <h4 className="modal-group-heading">About the Experience</h4>
              <p className="modal-description-text">{event.description}</p>
            </div>

            {/* Lineup if present */}
            {event.lineup && event.lineup.length > 0 && (
              <div className="modal-section-group">
                <h4 className="modal-group-heading">Featured Lineup</h4>
                <div className="modal-lineup-row">
                  {event.lineup.map(artist => (
                    <div key={artist.name} className="modal-artist-chip">
                      <img src={artist.img} alt={artist.name} className="modal-artist-avatar" />
                      <div className="modal-artist-info">
                        <span className="artist-name">{artist.name}</span>
                        <span className="artist-role">{artist.role} • {artist.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ticket Tier Selection */}
            <div className="modal-section-group">
              <h4 className="modal-group-heading">Select Ticket Tier</h4>
              <div className="ticket-tiers-stack">
                {(event.tiers || []).map(tier => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <div 
                      key={tier.id}
                      className={`ticket-tier-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      <div className="tier-radio-indicator">
                        {isSelected && <div className="tier-radio-dot"></div>}
                      </div>
                      <div className="tier-info-wrap">
                        <div className="tier-name-price-row">
                          <span className="tier-name">{tier.name}</span>
                          <span className="tier-price">${tier.price.toFixed(2)}</span>
                        </div>
                        <span className="tier-perks-sub">{tier.perks}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="modal-section-group quantity-row">
              <span className="quantity-label">Number of Passes:</span>
              <div className="quantity-counter-controls">
                <button 
                  className="qty-btn"
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  disabled={ticketCount <= 1}
                >
                  -
                </button>
                <span className="qty-number">{ticketCount}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setTicketCount(Math.min(8, ticketCount + 1))}
                  disabled={ticketCount >= 8}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="modal-price-breakdown-card">
              <div className="breakdown-line">
                <span>Passes ({ticketCount}x {currentTier.name})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="breakdown-line">
                <span>Verifiable Dynamic NFC Service Fee (8%)</span>
                <span>${fee.toFixed(2)}</span>
              </div>
              <div className="breakdown-line total-line">
                <span>Total Amount</span>
                <span className="total-highlight">${total}</span>
              </div>
            </div>
          </div>

          {/* Fixed Checkout Bar */}
          <div className="modal-checkout-footer">
            <div className="checkout-total-col">
              <span className="checkout-label">Total to pay:</span>
              <span className="checkout-big-price">${total}</span>
            </div>

            <motion.button 
              className="modal-confirm-checkout-btn"
              onClick={handleConfirmBooking}
              disabled={isBooking}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="checkout-btn-icon">⚡</span>
              <span>{isBooking ? 'Securing Passes...' : 'Confirm & Book Tickets'}</span>
              <span className="checkout-btn-arrow">↗</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
