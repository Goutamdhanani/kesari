import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import AppIcon from '../common/AppIcon';
import './EventDetailScreen.css';

export default function EventDetailScreen({
  eventId = 'rock',
  onBack = () => {},
  onBookSuccess = () => {}
}) {
  const [selectedTier, setSelectedTier] = useState('ga');
  const [ticketCount, setTicketCount] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const eventData = eventId === 'jazz' ? {
    title: "Jazz & Blues Festival",
    date: "Sep 5, 2024",
    time: "15:00 PM - 23:00 PM",
    venue: "Riverfront Park, San Francisco",
    image: "/assets/jazz_blues_pills.png",
    category: "Jazz & Blues",
    description: "Immerse yourself in three stages of smooth saxophone melodies, soulful electric blues, and world-class live improvisation along the scenic bay.",
    lineup: [
      { name: "Miles Quartet", role: "Main Stage", img: "/assets/artist_1.png" },
      { name: "Sarah Vaughan Trio", role: "Acoustic Dome", img: "/assets/artist_2.png" },
      { name: "Blue Note All-Stars", role: "Sunset Stage", img: "/assets/artist_3.png" }
    ],
    prices: { ga: 22.50, vip: 55.00, all: 110.00 }
  } : {
    title: "Rock Legends Reunion",
    date: "October 20, 2024",
    time: "18:00 PM - 02:00 AM",
    venue: "The Great Northern, San Francisco",
    image: "/assets/rock_concert_bg.png",
    category: "Rock & Electric",
    description: "An electrifying night celebrating iconic guitar riffs, thunderous drum solos, and legendary rock anthems performed by Grammy-nominated artists.",
    lineup: [
      { name: "The Velvet Echoes", role: "Headliner", img: "/assets/artist_1.png" },
      { name: "Neon Distortion", role: "Direct Support", img: "/assets/artist_2.png" },
      { name: "Sonic Revival", role: "Opening Act", img: "/assets/artist_3.png" }
    ],
    prices: { ga: 18.89, vip: 45.00, all: 95.00 }
  };

  const currentPrice = eventData.prices[selectedTier];
  const totalPrice = (currentPrice * ticketCount).toFixed(2);

  const handleCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#DAFB71', '#0042D9', '#EE3D5A', '#FFFFFF']
    });
    setTimeout(() => {
      onBookSuccess();
    }, 400);
  };

  return (
    <motion.div 
      className="mobile-event-detail-screen"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
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

        <div className="detail-badge-pill">
          <span>{eventData.category}</span>
        </div>
      </div>

      {/* Main Body Info */}
      <div className="detail-body-container">
        <h1 className="detail-title">{eventData.title}</h1>
        
        {/* Date & Location Pill Cards */}
        <div className="detail-quick-meta">
          <div className="quick-meta-item">
            <AppIcon name="calendar" size={16} color="var(--color-brand-saffron)" />
            <div>
              <div className="meta-bold">{eventData.date}</div>
              <div className="meta-sub">{eventData.time}</div>
            </div>
          </div>

          <div className="quick-meta-item">
            <AppIcon name="pin" size={16} color="var(--color-brand-saffron)" />
            <div>
              <div className="meta-bold">Bengaluru, Koramangala</div>
              <div className="meta-sub">{eventData.venue}</div>
            </div>
          </div>
        </div>

        {/* About Event */}
        <div className="detail-section">
          <h3 className="section-label">About Event</h3>
          <p className="detail-description">{eventData.description}</p>
        </div>

        {/* Lineup Section */}
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

        {/* Ticket Tier Selection */}
        <div className="detail-section">
          <h3 className="section-label">Select Ticket Tier</h3>
          <div className="ticket-tier-selector">
            <div 
              className={`tier-card ${selectedTier === 'ga' ? 'active-tier' : ''}`}
              onClick={() => setSelectedTier('ga')}
            >
              <div className="tier-header">
                <span className="tier-name">General Admission</span>
                <span className="tier-price">${eventData.prices.ga.toFixed(2)}</span>
              </div>
              <span className="tier-desc">Standard access to general standing area and stages</span>
            </div>

            <div 
              className={`tier-card ${selectedTier === 'vip' ? 'active-tier' : ''}`}
              onClick={() => setSelectedTier('vip')}
            >
              <div className="tier-header">
                <span className="tier-name">VIP Festival Pass</span>
                <span className="tier-price">${eventData.prices.vip.toFixed(2)}</span>
              </div>
              <span className="tier-desc">Express entry, private bar, premium viewing deck</span>
            </div>
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
          <span className="total-label">Total Price</span>
          <span className="total-amount">${totalPrice}</span>
        </div>
        <motion.button 
          className="book-lime-cta-btn" 
          onClick={handleCheckout}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Add to Cart & Checkout</span>
          <AppIcon name="arrow-up-right" size={18} color="#080808" strokeWidth={2.5} />
        </motion.button>
      </div>
    </motion.div>
  );
}
