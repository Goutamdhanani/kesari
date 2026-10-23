import React from 'react';
import AppIcon from '../common/AppIcon';
import './MobileBottomNav.css';

export default function MobileBottomNav({
  activeView = 'explore',
  onSelectView = () => {},
  ticketCount = 0,
  savedCount = 0,
  unreadCount = 0,
  onOpenNotifications = () => {}
}) {
  return (
    <nav className="mobile-bottom-nav-dock" aria-label="Mobile Bottom Navigation">
      <div className="mobile-bottom-nav-container">
        
        {/* 1. Explore */}
        <button 
          className={`mobile-nav-item-btn ${activeView === 'explore' ? 'active' : ''}`}
          onClick={() => {
            onSelectView('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Explore Events"
        >
          <div className="mobile-nav-icon-wrap">
            <AppIcon name="compass" size={20} color={activeView === 'explore' ? '#E07A28' : '#9CA3AF'} />
          </div>
          <span className="mobile-nav-label">Explore</span>
        </button>

        {/* 2. My Tickets */}
        <button 
          className={`mobile-nav-item-btn ${activeView === 'wallet' ? 'active' : ''}`}
          onClick={() => {
            onSelectView('wallet');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="My Tickets"
        >
          <div className="mobile-nav-icon-wrap">
            <AppIcon name="ticket" size={20} color={activeView === 'wallet' ? '#E07A28' : '#9CA3AF'} />
            {ticketCount > 0 && (
              <span className="mobile-nav-badge-pill">{ticketCount}</span>
            )}
          </div>
          <span className="mobile-nav-label">Tickets</span>
        </button>

        {/* 3. Saved Wishlist */}
        <button 
          className={`mobile-nav-item-btn ${activeView === 'favorites' ? 'active' : ''}`}
          onClick={() => {
            onSelectView('favorites');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Saved Events"
        >
          <div className="mobile-nav-icon-wrap">
            <AppIcon 
              name="heart" 
              size={20} 
              color={activeView === 'favorites' ? '#E05342' : '#9CA3AF'} 
              fill={activeView === 'favorites' ? '#E05342' : 'none'}
            />
            {savedCount > 0 && (
              <span className="mobile-nav-badge-pill lime-dot">{savedCount}</span>
            )}
          </div>
          <span className="mobile-nav-label">Saved</span>
        </button>

        {/* 4. Mobile Simulator Switcher */}
        <button 
          className={`mobile-nav-item-btn ${activeView === 'mobile' ? 'active' : ''}`}
          onClick={() => {
            onSelectView('mobile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Mobile App Simulator"
        >
          <div className="mobile-nav-icon-wrap">
            <AppIcon name="layout" size={20} color={activeView === 'mobile' ? '#E07A28' : '#9CA3AF'} />
          </div>
          <span className="mobile-nav-label">Simulator</span>
        </button>

        {/* 5. Alerts Drawer */}
        <button 
          className="mobile-nav-item-btn"
          onClick={onOpenNotifications}
          aria-label="Notifications"
        >
          <div className="mobile-nav-icon-wrap">
            <AppIcon name="bell" size={20} color="#9CA3AF" />
            {unreadCount > 0 && (
              <span className="mobile-nav-unread-dot"></span>
            )}
          </div>
          <span className="mobile-nav-label">Alerts</span>
        </button>

      </div>
    </nav>
  );
}
