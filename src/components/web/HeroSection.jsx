import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './HeroSection.css';

export default function HeroSection({
  featuredEvent,
  onBookNow = () => {},
  onToggleFavorite = () => {},
  isFavorite = false,
  onSelectEvent = () => {}
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 12, mins: 45, secs: 20 });

  // Live countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!featuredEvent) return null;

  return (
    <section className="web-hero-section">
      <div className="hero-banner-card">
        {/* Stage Concert Image with Ambient Vignette */}
        <div className="hero-image-backdrop">
          <img 
            src={featuredEvent.image} 
            alt={featuredEvent.title} 
            className="hero-backdrop-img"
          />
          <div className="hero-gradient-overlay"></div>
          <div className="hero-glow-accent blue-glow"></div>
          <div className="hero-glow-accent lime-glow"></div>
        </div>

        {/* Content Inside Hero */}
        <div className="hero-content-wrapper">
          {/* Top Status & Countdown Row */}
          <div className="hero-top-status-row">
            <div className="hero-badge-pill">
              <span className="badge-pulse-dot"></span>
              <span className="badge-text">{featuredEvent.badge || '⚡ FEATURED LIVE CONCERT'}</span>
            </div>

            {/* Live Countdown Clock */}
            <div className="hero-countdown-clock">
              <span className="countdown-label">Gates open in:</span>
              <div className="countdown-digits-wrap">
                <span className="countdown-digit">{String(timeLeft.days).padStart(2, '0')}d</span>
                <span className="countdown-sep">:</span>
                <span className="countdown-digit">{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span className="countdown-sep">:</span>
                <span className="countdown-digit">{String(timeLeft.mins).padStart(2, '0')}m</span>
                <span className="countdown-sep">:</span>
                <span className="countdown-digit sec-digit">{String(timeLeft.secs).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>

          {/* Main Title & Editorial Pitch */}
          <div className="hero-editorial-block">
            <span className="hero-category-label">
              <span className="category-symbol">🎸</span> {featuredEvent.category}
            </span>
            <h1 className="hero-main-title">{featuredEvent.title}</h1>
            <p className="hero-lead-description">{featuredEvent.description}</p>
          </div>

          {/* Venue & Metadata Strip */}
          <div className="hero-meta-strip">
            <div className="meta-pill">
              <span className="meta-icon">📅</span>
              <span className="meta-text">{featuredEvent.date}</span>
            </div>
            <div className="meta-pill">
              <span className="meta-icon">📍</span>
              <span className="meta-text">{featuredEvent.venue}</span>
            </div>
            <div className="meta-pill price-pill">
              <span className="meta-label">Passes:</span>
              <span className="meta-price-val">{featuredEvent.priceLabel}</span>
            </div>
          </div>

          {/* Action CTAs & Sound Wave Bar */}
          <div className="hero-actions-row">
            <motion.button 
              className="hero-primary-cta"
              onClick={() => onBookNow(featuredEvent)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="cta-icon">⚡</span>
              <span className="cta-text">Book Tickets Now</span>
              <span className="cta-arrow">↗</span>
            </motion.button>

            <motion.button 
              className={`hero-audio-btn ${isPlayingAudio ? 'active' : ''}`}
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              title={isPlayingAudio ? 'Pause Sound Preview' : 'Play Sound Waves Preview'}
            >
              <span className="audio-btn-icon">{isPlayingAudio ? '⏸' : '▶'}</span>
              <span className="audio-btn-label">
                {isPlayingAudio ? 'Sound Waves Playing' : 'Preview Live Vibe'}
              </span>

              {/* Animated Equalizer Wave Bars */}
              <div className={`sound-equalizer-bars ${isPlayingAudio ? 'animating' : ''}`}>
                <span className="bar bar-1"></span>
                <span className="bar bar-2"></span>
                <span className="bar bar-3"></span>
                <span className="bar bar-4"></span>
              </div>
            </motion.button>

            <motion.button 
              className={`hero-favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={() => onToggleFavorite(featuredEvent.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              aria-label="Save to favorites"
            >
              <AppIcon 
                name="heart" 
                size={20} 
                color={isFavorite ? '#EE3D5A' : '#FFFFFF'} 
                fill={isFavorite ? '#EE3D5A' : 'none'}
                strokeWidth={2}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
