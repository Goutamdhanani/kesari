import React, { useRef, useEffect } from 'react';
import AppIcon from '../common/AppIcon';
import './WebHeader.css';

export default function WebHeader({
  activeView = 'explore', // 'explore' | 'wallet' | 'favorites' | 'mobile' | 'slides'
  onSelectView = () => {},
  selectedCity = 'Bengaluru, Koramangala',
  searchQuery = '',
  onSearchChange = () => {},
  ticketCount = 1,
  savedCount = 0,
  unreadCount = 2,
  onToggleNotifications = () => {}
}) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="web-header-root">
      <div className="web-header-container">
        {/* Brand & Fixed Location Pill */}
        <div className="header-brand-cluster">
          <button 
            className="brand-logo-btn" 
            onClick={() => onSelectView('explore')}
            title="KESARI Home"
          >
            <span className="brand-name">KESARI</span>
            <span className="brand-dot"></span>
          </button>

          {/* Single Fixed Location Pill - Bengaluru, Koramangala */}
          <div className="city-selector-wrap">
            <div className="city-pill-btn static-pill" title="Current Location">
              <AppIcon name="pin" size={13} color="var(--color-brand-saffron)" />
              <span className="city-current-name">Bengaluru, Koramangala</span>
            </div>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="header-search-bar">
          <span className="search-icon-slot">
            <AppIcon name="search" size={15} color="var(--color-muted-gray)" />
          </span>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search live experiences, artists, acoustic sets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input-field"
          />
          {searchQuery && (
            <button 
              className="search-clear-btn" 
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
          <span className="search-kbd-hint">⌘K</span>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="header-nav-pills" aria-label="Main Navigation">
          <button 
            className={`nav-pill-btn ${activeView === 'explore' ? 'active' : ''}`}
            onClick={() => onSelectView('explore')}
          >
            <AppIcon name="compass" size={15} />
            <span>Explore</span>
          </button>

          <button 
            className={`nav-pill-btn ${activeView === 'wallet' ? 'active' : ''}`}
            onClick={() => onSelectView('wallet')}
          >
            <AppIcon name="ticket" size={15} />
            <span>Tickets</span>
            {ticketCount > 0 && <span className="nav-badge-pill">{ticketCount}</span>}
          </button>

          <button 
            className={`nav-pill-btn ${activeView === 'favorites' ? 'active' : ''}`}
            onClick={() => onSelectView('favorites')}
          >
            <AppIcon name="heart" size={15} />
            <span>Saved</span>
            {savedCount > 0 && <span className="nav-badge-pill saffron-badge">{savedCount}</span>}
          </button>
        </nav>

        {/* Right Utility: Mode Switcher & User Profile */}
        <div className="header-utility-cluster">
          {/* Minimal Mode Switcher Capsule (No Emojis) */}
          <div className="mode-switcher-capsule">
            <button 
              className={`mode-btn ${activeView === 'explore' || activeView === 'wallet' || activeView === 'favorites' ? 'active' : ''}`}
              onClick={() => onSelectView('explore')}
              title="Full Web App Experience"
            >
              Web
            </button>
            <button 
              className={`mode-btn ${activeView === 'mobile' ? 'active' : ''}`}
              onClick={() => onSelectView('mobile')}
              title="Interactive Mobile Simulator"
            >
              Mobile
            </button>
            <button 
              className={`mode-btn ${activeView === 'slides' ? 'active' : ''}`}
              onClick={() => onSelectView('slides')}
              title="Design System & Architecture"
            >
              Design
            </button>
          </div>

          {/* Notifications Bell */}
          <button 
            className="header-icon-btn notifications-btn"
            onClick={onToggleNotifications}
            title="Notifications"
            aria-label="Open notifications"
          >
            <AppIcon name="bell" size={17} color="#FFFFFF" />
            {unreadCount > 0 && <span className="notification-unread-dot"></span>}
          </button>

          {/* User Profile Pill */}
          <div className="header-user-avatar-wrap" title="User Profile">
            <img 
              src="/assets/gregory_face.png" 
              alt="Profile" 
              className="header-user-avatar-img"
            />
            <span className="user-online-status"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
