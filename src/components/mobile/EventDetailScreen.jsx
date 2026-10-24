import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import AppIcon from '../common/AppIcon';
import { MOCK_EVENTS } from '../../data/mockEvents';
import './EventDetailScreen.css';

export default function EventDetailScreen({
  eventId = 'rock',
  onBack = () => {},
  onBookSuccess = () => {}
}) {
  const [selectedTier, setSelectedTier] = useState('ga');
  const [ticketCount, setTicketCount] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // Dynamic Bangalore Event Lookup
  const eventData = MOCK_EVENTS.find(e => e.id === eventId) || MOCK_EVENTS[0];

  const tiers = eventData.tiers && eventData.tiers.length > 0 ? eventData.tiers : [
    { id: 'ga', name: 'General Admission', price: eventData.price, perks: 'Standard access to standing area and main bars' },
    { id: 'vip', name: 'VIP Pit & Express Pass', price: Math.round(eventData.price * 1.8), perks: 'Front barrier access, private lounge & express entry' }
  ];

  const currentTierObj = tiers.find(t => t.id === selectedTier) || tiers[0];
  const currentPrice = currentTierObj.price;
  const totalPrice = currentPrice * ticketCount;

  const handleCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E50914', '#0042D9', '#DAFB71', '#FFFFFF']
    });

    const newTicket = {
      id: `ticket-${Date.now()}`,
      eventId: eventData.id,
      eventTitle: eventData.title,
      date: eventData.date,
      time: eventData.time.split(' - ')[0] || eventData.time,
      location: eventData.venue || `${eventData.venueShort}, Bangalore`,
      seat: selectedTier === 'vip' ? 'VIP Pavilion #14' : 'General Admission',
      tier: currentTierObj.name,
      price: totalPrice,
      quantity: ticketCount,
      hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`,
      image: eventData.image,
      parentBg: 'pale'
    };

    setTimeout(() => {
      onBookSuccess(newTicket);
    }, 350);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: `Join me at ${eventData.title} in Bangalore!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert(`Event link copied to clipboard! 🔗`);
    }
  };

  return (
    <motion.div 
      key={eventData.id}
      className="mobile-event-detail-screen"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Hero Header Media */}
      <div className="detail-hero-banner">
        <img src={eventData.image} alt={eventData.title} className="detail-hero-img" />
        <div className="detail-banner-gradient"></div>

        {/* Top Floating Buttons */}
        <div className="detail-top-nav">
          <motion.button 
            className="detail-circle-btn" 
            onClick={onBack} 
            aria-label="Go Back"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AppIcon name="chevron-left" size={20} color="#FFFFFF" strokeWidth={2.5} />
          </motion.button>
          
          <div style={{ display: 'flex', gap: 8 }}>
            <motion.button 
              className="detail-circle-btn" 
              onClick={handleShare}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Share Event"
            >
              <AppIcon name="share" size={17} color="#FFFFFF" strokeWidth={2} />
            </motion.button>

            <motion.button 
              className={`detail-circle-btn ${isLiked ? 'liked' : ''}`} 
              onClick={() => setIsLiked(!isLiked)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Favorite"
            >
              <AppIcon name="heart" size={18} color={isLiked ? '#EE3D5A' : '#FFFFFF'} strokeWidth={2} />
            </motion.button>
          </div>
        </div>

        <div className="detail-badge-pill">
          <span>🎵 {eventData.category}</span>
        </div>
      </div>

      {/* Main Body Info */}
      <div className="detail-body-container">
        <h1 className="detail-title">{eventData.title}</h1>
        
        {/* Date & Location Pill Cards */}
        <div className="detail-quick-meta">
          <div className="quick-meta-item">
            <AppIcon name="calendar" size={16} color="#0042D9" />
            <div>
              <div className="meta-bold">{eventData.date}</div>
              <div className="meta-sub">{eventData.time}</div>
            </div>
          </div>

          <div className="quick-meta-item">
            <AppIcon name="pin" size={16} color="#E50914" />
            <div>
              <div className="meta-bold">Bangalore</div>
              <div className="meta-sub">{eventData.venueShort || eventData.venue}</div>
            </div>
          </div>
        </div>

        {/* About Event */}
        <div className="detail-section">
          <h3 className="section-label">About Event</h3>
          <p className="detail-description">{eventData.description}</p>
        </div>

        {/* Lineup Section */}
        {eventData.lineup && eventData.lineup.length > 0 && (
          <div className="detail-section">
            <h3 className="section-label">Artist Lineup</h3>
            <div className="lineup-avatars-row">
              {eventData.lineup.map((artist, i) => (
                <div key={i} className="lineup-artist-item">
                  <div className="lineup-avatar-wrap">
                    <img src={artist.img} alt={artist.name} />
                  </div>
                  <span className="artist-name">{artist.name}</span>
                  <span className="artist-role">{artist.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ticket Tier Selection */}
        <div className="detail-section">
          <h3 className="section-label">Select Ticket Tier</h3>
          <div className="ticket-tier-selector">
            {tiers.map((tier) => (
              <div 
                key={tier.id}
                className={`tier-card ${selectedTier === tier.id ? 'active-tier' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className="tier-header">
                  <span className="tier-name">{tier.name}</span>
                  <span className="tier-price">₹{tier.price.toLocaleString()}</span>
                </div>
                <span className="tier-desc">{tier.perks}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="detail-quantity-row">
          <span className="quantity-label">Number of Tickets</span>
          <div className="quantity-stepper">
            <button 
              className="stepper-btn" 
              onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
            >
              -
            </button>
            <span className="stepper-val">{ticketCount}</span>
            <button 
              className="stepper-btn" 
              onClick={() => setTicketCount(Math.min(6, ticketCount + 1))}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="detail-sticky-footer">
        <div className="footer-total">
          <span className="total-label">Total Amount</span>
          <span className="total-amount">₹{totalPrice.toLocaleString()}</span>
        </div>
        <motion.button 
          className="book-lime-cta-btn" 
          onClick={handleCheckout}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Book Pass • ₹{totalPrice.toLocaleString()}</span>
          <AppIcon name="arrow-up-right" size={18} color="#FFFFFF" strokeWidth={2.5} />
        </motion.button>
      </div>
    </motion.div>
  );
}
