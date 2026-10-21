import React, { useState } from 'react';
import { motion } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './EventCards.css';

// Card 1: Upcoming Event Pill Card (Small horizontal card)
export function UpcomingEventCard({
  tag = "Your upcoming event : Sep 5",
  title = "Jazz & Blues Festival",
  image = "/assets/upcoming_pill_thumb.png",
  onClick = () => {}
}) {
  return (
    <motion.div 
      className="upcoming-mini-card" 
      onClick={onClick}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="upcoming-card-art">
        <img src={image} alt={title} />
      </div>
      <div className="upcoming-card-info">
        <span className="upcoming-card-tag">{tag}</span>
        <h4 className="upcoming-card-title">{title}</h4>
      </div>
      <motion.button 
        className="upcoming-lime-arrow-btn" 
        aria-label="Open Event Details"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        <AppIcon name="arrow-up-right" size={18} color="#080808" strokeWidth={2.5} />
      </motion.button>
    </motion.div>
  );
}

// Card 2: Compact Event Summary Card (Rock Legends Reunion)
export function CompactEventCard({
  title = "Rock Legends Reunion",
  date = "October 20",
  price = "From $18.89",
  onClick = () => {}
}) {
  return (
    <motion.div 
      className="compact-event-card" 
      onClick={onClick}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="compact-top-row">
        <div className="compact-title-wrap">
          <h4 className="compact-event-title-line">Rock Legends</h4>
          <h4 className="compact-event-title-line">Reunion</h4>
        </div>
        <motion.button 
          className="upcoming-lime-arrow-btn" 
          aria-label="View Event"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <AppIcon name="arrow-up-right" size={18} color="#080808" strokeWidth={2.5} />
        </motion.button>
      </div>
      <div className="compact-bottom-row">
        <span className="compact-event-date">
          <AppIcon name="calendar" size={14} color="#8C93A4" />
          {date}
        </span>
        <span className="compact-event-price">{price}</span>
      </div>
    </motion.div>
  );
}

// Card 3: Featured Music Hero Card (Large vertical card with authentic rock concert background)
export function FeaturedHeroCard({
  category = "Music",
  title = "Rock Legends Reunion",
  date = "October 20",
  price = "From $18.89",
  image = "/assets/rock_concert_bg.png",
  onSelect = () => {}
}) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div 
      className="featured-hero-card" 
      onClick={onSelect}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Background Imagery */}
      <img src={image} alt={title} className="hero-card-bg-img" />
      <div className="hero-card-dark-gradient"></div>

      {/* Top Floating Badges */}
      <div className="hero-top-badges">
        <div className="hero-category-chip">
          <span className="category-music-note">🎵</span>
          <span className="category-name">{category}</span>
        </div>
        <motion.button 
          className={`hero-heart-btn ${liked ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          aria-label="Save to favorites"
        >
          <AppIcon 
            name="heart" 
            size={18} 
            color={liked ? '#EE3D5A' : '#FFFFFF'} 
            strokeWidth={liked ? 0 : 2}
            className={liked ? 'fill-crimson' : ''}
          />
        </motion.button>
      </div>

      {/* Bottom Content Info */}
      <div className="hero-bottom-content">
        <h3 className="hero-event-title">{title}</h3>
        <div className="hero-info-footer">
          <div className="hero-date-price">
            <span className="hero-date">
              <AppIcon name="calendar" size={14} color="#D1D5DB" />
              {date}
            </span>
            <span className="hero-price">{price}</span>
          </div>
          <motion.button 
            className="hero-white-arrow-btn" 
            aria-label="Open Event"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            <AppIcon name="arrow-up-right" size={18} color="#080808" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
