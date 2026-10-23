import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './OnboardingScreen.css';

export default function OnboardingScreen({ onFinish = () => {} }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      title: "Event Jam",
      subtitle: "Discover live concerts, secret festivals, and underground experiences around you in seconds.",
      feature: "Instant Gate Check-in • Digital Wallet Pass",
      image: "/assets/rock_concert_bg.png",
      tag: "⚡ Hyperactive Live Experience"
    },
    {
      title: "Sound Waves",
      subtitle: "Secure verifiable digital screen tickets with anti-counterfeit dynamic barcode encryption.",
      feature: "Zero Fraud • One-Tap Apple Wallet",
      image: "/assets/jazz_blues_pills.png",
      tag: "🎟️ Verified NFC Passes"
    },
    {
      title: "Vibe Together",
      subtitle: "Explore artist lineups, set times, and curated festival stages before you arrive.",
      feature: "Curated Lineups • Realtime Notifications",
      image: "/assets/rock_concert_bg.png",
      tag: "🎸 Curated Lineups"
    }
  ];

  const current = slides[slideIndex];

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  return (
    <div className="mobile-onboarding-screen">
      {/* Top Header */}
      <div className="onboarding-top-bar">
        <span className="onboarding-brand-mini">HYPERACTIVE</span>
        <button className="onboarding-skip-btn" onClick={onFinish}>
          Skip
        </button>
      </div>

      {/* Hero Image Showcase */}
      <div className="onboarding-hero-image-wrap">
        <AnimatePresence mode="wait">
          <motion.img 
            key={slideIndex}
            src={current.image} 
            alt={current.title} 
            className="onboarding-hero-img"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        <div className="onboarding-img-gradient-overlay"></div>
        <div className="onboarding-floating-pill">
          <span>{current.tag}</span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="onboarding-bottom-content">
        <AnimatePresence mode="wait">
          <motion.div 
            key={slideIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="onboarding-heading">{current.title}</h1>
            <p className="onboarding-description">{current.subtitle}</p>
          </motion.div>
        </AnimatePresence>

        <div className="onboarding-translucent-card">
          <AppIcon name="sparkles" size={16} color="#DAFB71" />
          <span>{current.feature}</span>
        </div>

        {/* Footer Nav Controls */}
        <div className="onboarding-footer-controls">
          <button 
            className={`onboarding-circle-btn ${slideIndex === 0 ? 'disabled' : ''}`}
            onClick={handlePrev}
            disabled={slideIndex === 0}
            aria-label="Previous Slide"
          >
            <AppIcon name="chevron-left" size={20} color="#FFFFFF" strokeWidth={2.5} />
          </button>

          <div className="onboarding-dots-row">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`onboarding-dot ${i === slideIndex ? 'active' : ''}`} 
              />
            ))}
          </div>

          <motion.button 
            className="onboarding-lime-action-btn"
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Next Slide"
          >
            <AppIcon name="arrow-right" size={20} color="#080808" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
