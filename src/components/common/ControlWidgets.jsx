import React, { useState } from 'react';
import { motion } from 'motion/react';
import AppIcon from './AppIcon';
import './ControlWidgets.css';

// 1. 4x4 Icon Grid Matrix (from Slide 1 top-left)
export function IconGridMatrix() {
  const [activeIcon, setActiveIcon] = useState(null);

  const icons = [
    { id: 'home', name: 'home' },
    { id: 'search', name: 'search' },
    { id: 'calendar', name: 'calendar' },
    { id: 'arrow-up-right', name: 'arrow-up-right' },
    { id: 'chevron-left', name: 'chevron-left' },
    { id: 'chevron-right', name: 'chevron-right' },
    { id: 'share', name: 'share' },
    { id: 'pin', name: 'pin' },
    { id: 'heart', name: 'heart' },
    { id: 'ticket', name: 'ticket' },
    { id: 'coupon', name: 'coupon' },
    { id: 'bell', name: 'bell' },
    { id: 'power', name: 'power' },
    { id: 'qr', name: 'qr' },
    { id: 'waveform', name: 'waveform' },
    { id: 'music', name: 'music' }
  ];

  return (
    <div className="icon-grid-matrix-4x4">
      {icons.map((item) => (
        <motion.button
          key={item.id}
          className={`matrix-icon-btn ${activeIcon === item.id ? 'active' : ''}`}
          onClick={() => setActiveIcon(item.id)}
          whileHover={{ scale: 1.1, backgroundColor: activeIcon === item.id ? '#DAFB71' : '#F8FAFC' }}
          whileTap={{ scale: 0.92 }}
          title={item.name}
        >
          <AppIcon name={item.name} size={20} color="#080808" strokeWidth={2} />
        </motion.button>
      ))}
    </div>
  );
}

// 2. User Profile Pill Bar (KESARI + Bengaluru, Koramangala + Bell)
export function UserProfileBar({
  avatar = "/assets/kesari_logo.png",
  location = "Bengaluru, Koramangala",
  unreadNotifications = true,
  theme = "blue", // "blue" | "white"
  onNotificationClick = () => {},
  onProfileClick = () => {}
}) {
  return (
    <motion.div 
      className={`user-profile-pill-bar theme-${theme}`}
      whileHover={{ y: -2 }}
    >
      {/* Avatar */}
      <div className="profile-avatar-wrap" onClick={onProfileClick} title="KESARI Profile">
        <img src={avatar} alt="KESARI" className="profile-avatar-img" />
      </div>

      {/* Location */}
      <div className="profile-location-wrap">
        <AppIcon 
          name="pin" 
          size={14} 
          color={theme === 'blue' ? '#FFFFFF' : '#080808'} 
          strokeWidth={2.5} 
        />
        <span className="profile-location-text">{location}</span>
      </div>

      {/* Bell Notification Button */}
      <motion.button 
        className="profile-bell-btn" 
        onClick={onNotificationClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Notifications"
      >
        <AppIcon name="bell" size={18} color="#080808" strokeWidth={2} />
        {unreadNotifications && <span className="bell-red-badge-dot"></span>}
      </motion.button>
    </motion.div>
  );
}

// 3. Carousel Controls & QR Code Row
export function CarouselAndQRControls({
  activeIndex = 1,
  totalSlides = 3,
  onPrev = () => {},
  onNext = () => {},
  onShowQR = () => {}
}) {
  return (
    <div className="carousel-qr-controls-block">
      {/* Top Carousel Navigation */}
      <div className="carousel-nav-row">
        <motion.button 
          className="carousel-arrow-btn prev" 
          onClick={onPrev} 
          aria-label="Previous"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AppIcon name="chevron-left" size={18} color="#FFFFFF" strokeWidth={2.5} />
        </motion.button>

        <div className="carousel-dots-indicator">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <span 
              key={idx} 
              className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        <motion.button 
          className="carousel-arrow-btn next lime-btn" 
          onClick={onNext} 
          aria-label="Next"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AppIcon name="chevron-right" size={18} color="#080808" strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Middle QR Action Row */}
      <div className="qr-action-row">
        <motion.button 
          className="power-dark-circle-btn" 
          aria-label="Toggle Power"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AppIcon name="power" size={18} color="#FFFFFF" strokeWidth={2} />
        </motion.button>

        <motion.button 
          className="show-qr-lime-pill-btn" 
          onClick={onShowQR}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="qr-icon-sq">
            <AppIcon name="qr" size={18} color="#080808" strokeWidth={2.5} />
          </div>
          <span className="show-qr-label">Show QR Code</span>
          <span className="qr-triple-chevrons">›››</span>
        </motion.button>
      </div>
    </div>
  );
}

// 4. Floating Bottom Navigation Bar (Black capsule with lime active state)
export function FloatingBottomNav({
  activeTab = 'home',
  onTabChange = () => {}
}) {
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'search', icon: 'search', label: 'Search' },
    { id: 'calendar', icon: 'calendar', label: 'Events' },
    { id: 'ticket', icon: 'ticket', label: 'Tickets' }
  ];

  return (
    <nav className="floating-bottom-nav-bar" aria-label="Main Navigation">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            className={`nav-tab-item ${isActive ? 'active-lime-tab' : 'inactive-dark-tab'}`}
            onClick={() => onTabChange(tab.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={tab.label}
          >
            <AppIcon 
              name={tab.icon} 
              size={20} 
              color={isActive ? '#080808' : '#FFFFFF'} 
              strokeWidth={isActive ? 2.5 : 2}
            />
          </motion.button>
        );
      })}
    </nav>
  );
}
