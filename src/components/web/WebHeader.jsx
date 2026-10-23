import React, { useState, useRef, useEffect } from 'react';
import AppIcon from '../common/AppIcon';
import './WebHeader.css';

export default function WebHeader({
  activeView = 'explore', // 'explore' | 'wallet' | 'favorites' | 'mobile' | 'slides'
  onSelectView = () => {},
  selectedCity = 'San Francisco',
  onSelectCity = () => {},
  cities = [],
  searchQuery = '',
  onSearchChange = () => {},
  ticketCount = 1,
  savedCount = 0,
  unreadCount = 2,
  onToggleNotifications = () => {}
}) {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
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
        {/* Brand & City Selector */}
        <div className="header-brand-cluster">
          <button 
            className="brand-logo-btn" 
            onClick={() => onSelectView('explore')}
            title="HYPERACTIVE Home"
          >
            <span className="brand-name">HYPERACTIVE</span>
            <span className="brand-dot"></span>
          </button>

          {/* City Dropdown */}
          <div className="city-selector-wrap">
            <button 
              className="city-pill-btn" 
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              aria-label="Select City"
            >
              <span className="city-pin-icon">📍</span>
              <span className="city-current-name">{selectedCity}</span>
              <span className="city-chevron-arrow">▾</span>
            </button>

            {cityDropdownOpen && (
              <div className="city-dropdown-menu">
                <div className="city-dropdown-header">Select City</div>
                {cities.map(c => (
                  <button 
                    key={c}
                    className={`city-dropdown-item ${c === selectedCity ? 'active' : ''}`}
                    onClick={() => {
                      onSelectCity(c);
                      setCityDropdownOpen(false);
                    }}
                  >
                    <span>{c}</span>
                    {c === selectedCity && <span className="city-check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="header-search-bar">
          <span className="search-icon-slot">
            <AppIcon name="search" size={16} color="#7E8597" />
          </span>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search rock tours, festivals, artists..."
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
            <span className="nav-btn-icon">⚡</span>
            <span>Explore</span>
          </button>

          <button 
            className={`nav-pill-btn ${activeView === 'wallet' ? 'active' : ''}`}
            onClick={() => onSelectView('wallet')}
          >
            <span className="nav-btn-icon">🎟️</span>
            <span>My Tickets</span>
            {ticketCount > 0 && <span className="nav-badge-pill">{ticketCount}</span>}
          </button>

          <button 
            className={`nav-pill-btn ${activeView === 'favorites' ? 'active' : ''}`}
            onClick={() => onSelectView('favorites')}
          >
            <span className="nav-btn-icon">❤️</span>
            <span>Saved</span>
            {savedCount > 0 && <span className="nav-badge-pill lime-badge">{savedCount}</span>}
          </button>
        </nav>

        {/* Right Utility: Mode Switcher & User Profile */}
        <div className="header-utility-cluster">
          {/* Mode Switcher Capsule */}
          <div className="mode-switcher-capsule">
            <button 
              className={`mode-btn ${activeView === 'explore' || activeView === 'wallet' || activeView === 'favorites' ? 'active' : ''}`}
              onClick={() => onSelectView('explore')}
              title="Full Web App Experience"
            >
              🖥️ Web
            </button>
            <button 
              className={`mode-btn ${activeView === 'mobile' ? 'active' : ''}`}
              onClick={() => onSelectView('mobile')}
              title="Interactive Mobile Phone Simulator"
            >
              📱 Mobile
            </button>
            <button 
              className={`mode-btn ${activeView === 'slides' ? 'active' : ''}`}
              onClick={() => onSelectView('slides')}
              title="Behance Case Study & Design System"
            >
              📐 Behance
            </button>
          </div>

          {/* Notifications Bell */}
          <button 
            className="header-icon-btn notifications-btn"
            onClick={onToggleNotifications}
            title="Notifications"
            aria-label="Open notifications"
          >
            <AppIcon name="bell" size={18} color="#FFFFFF" />
            {unreadCount > 0 && <span className="notification-unread-dot"></span>}
          </button>

          {/* User Profile Pill */}
          <div className="header-user-avatar-wrap" title="Gregory (User)">
            <img 
              src="/assets/gregory_face.png" 
              alt="Gregory" 
              className="header-user-avatar-img"
            />
            <span className="user-online-status"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
