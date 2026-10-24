import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import DetailSkeletonScreen from './DetailSkeletonScreen';
import UPICheckoutModal from './UPICheckoutModal';
import { MOCK_EVENTS } from '../../data/mockEvents';
import './EventDetailScreen.css';

export default function EventDetailScreen({
  eventId = 'rock',
  events = MOCK_EVENTS,
  onBack = () => {},
  onBookSuccess = () => {}
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState('ga');
  const [ticketCount, setTicketCount] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, [eventId]);

  // Dynamic Event Lookup from passed events or catalog
  const eventData = (events && events.length > 0 ? events : MOCK_EVENTS).find(e => e.id === eventId) || (events || MOCK_EVENTS)[0];

  const tiers = eventData.tiers && eventData.tiers.length > 0 ? eventData.tiers : [
    { id: 'ga', name: 'General Admission', price: eventData.price, perks: 'Standard access to standing area and main bars' },
    { id: 'vip', name: 'VIP Pit & Express Pass', price: Math.round(eventData.price * 1.8), perks: 'Front barrier access, private lounge & express entry' }
  ];

  // Set default tier if selected is not in tiers
  useEffect(() => {
    if (tiers.length > 0 && !tiers.find(t => t.id === selectedTier)) {
      setSelectedTier(tiers[0].id);
    }
  }, [eventId, tiers]);

  const currentTierObj = tiers.find(t => t.id === selectedTier) || tiers[0];
  const currentPrice = currentTierObj.price;
  const totalPrice = currentPrice * ticketCount;

  const handleOpenCheckout = () => {
    setShowUPIModal(true);
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
    <div className="mobile-event-detail-root" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <DetailSkeletonScreen key="skeleton" />
        ) : (
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
          onClick={handleOpenCheckout}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Pay via UPI • ₹{totalPrice.toLocaleString()}</span>
          <AppIcon name="arrow-up-right" size={18} color="#FFFFFF" strokeWidth={2.5} />
        </motion.button>
      </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instant Android UPI Intent & QR Checkout Modal */}
      <UPICheckoutModal 
        isOpen={showUPIModal}
        onClose={() => setShowUPIModal(false)}
        event={eventData}
        tier={currentTierObj}
        ticketCount={ticketCount}
        totalPrice={totalPrice}
        onPaymentSuccess={onBookSuccess}
      />
    </div>
  );
}
