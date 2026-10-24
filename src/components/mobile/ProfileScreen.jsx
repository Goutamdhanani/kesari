import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import ProfileSkeletonScreen from './ProfileSkeletonScreen';
import './ProfileScreen.css';

export default function ProfileScreen({
  onBack = () => {},
  onOpenTickets = () => {},
  onSelectEvent = () => {},
  onOpenAdmin = () => {},
  tickets = [],
  savedEvents = []
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('passes'); // 'passes' | 'saved' | 'settings'
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [appleWalletSync, setAppleWalletSync] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mobile-profile-screen-root" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <ProfileSkeletonScreen key="skeleton" />
        ) : (
          <motion.div 
            key="content"
            className="mobile-profile-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Header Bar */}
      <header className="profile-top-bar">
        <button className="profile-back-btn" onClick={onBack} aria-label="Go Back">
          <AppIcon name="chevron-left" size={20} color="#0C0D12" strokeWidth={2.5} />
        </button>
        <h2 className="profile-header-title">My Profile</h2>
        <button className="profile-settings-btn" onClick={() => setActiveTab('settings')} aria-label="Settings">
          <AppIcon name="settings" size={18} color="#0C0D12" />
        </button>
      </header>

      {/* User Hero Identity Card */}
      <div className="profile-identity-card">
        <div className="identity-avatar-ring">
          <img src="/assets/gregory_face.png" alt="Gregory Vance" className="identity-avatar-img" />
          <div className="identity-vip-badge" title="Verified VIP">⚡</div>
        </div>
        <h3 className="identity-name">Gregory Vance</h3>
        <p className="identity-handle">@gregory.sound • Bangalore, India</p>
        <div className="identity-pill-tag">
          <span>🎵 VIP Festival Explorer</span>
        </div>

        {/* Stats Row */}
        <div className="identity-stats-row">
          <div className="stat-box" onClick={onOpenTickets}>
            <span className="stat-number">{tickets.length || 1}</span>
            <span className="stat-label">Active Passes</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-box">
            <span className="stat-number">4</span>
            <span className="stat-label">Attended</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-box" onClick={() => setActiveTab('saved')}>
            <span className="stat-number">{savedEvents.length || 2}</span>
            <span className="stat-label">Wishlist</span>
          </div>
        </div>
      </div>

      {/* Segmented Controls */}
      <div className="profile-segmented-row">
        <button 
          className={`profile-seg-btn ${activeTab === 'passes' ? 'active' : ''}`}
          onClick={() => setActiveTab('passes')}
        >
          🎟️ Passes ({tickets.length || 1})
        </button>
        <button 
          className={`profile-seg-btn ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          ❤️ Saved ({savedEvents.length || 2})
        </button>
        <button 
          className={`profile-seg-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Tab 1: Passes */}
      {activeTab === 'passes' && (
        <div className="profile-tab-content">
          <div className="passes-preview-card" onClick={onOpenTickets}>
            <div className="pass-card-left">
              <span className="pass-tag">GATE PASS VERIFIED</span>
              <h4 className="pass-title">{tickets[0]?.eventTitle || 'Jazz & Blues Festival'}</h4>
              <span className="pass-time">📅 Sep 5, 2026 • Kesari Arena Bangalore</span>
            </div>
            <div className="pass-card-right">
              <div className="pass-qr-thumb">
                <AppIcon name="qr" size={24} color="#080808" />
              </div>
              <span className="pass-tap-label">Tap to view</span>
            </div>
          </div>

          <button className="wallet-full-btn" onClick={onOpenTickets}>
            <span>View Full Ticket Wallet</span>
            <AppIcon name="chevron-right" size={16} color="#FFFFFF" strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* Tab 2: Saved Wishlist */}
      {activeTab === 'saved' && (
        <div className="profile-tab-content">
          <div className="saved-events-list">
            <div className="saved-event-item" onClick={() => onSelectEvent('rock')}>
              <img src="/assets/rock_concert_bg.png" alt="Rock Legends" className="saved-thumb" />
              <div className="saved-info">
                <span className="saved-cat">Rock & Electric</span>
                <h4 className="saved-title">Rock Legends Reunion</h4>
                <span className="saved-date">Oct 20 • Kesari Studio Hall, Bangalore</span>
              </div>
              <span className="saved-price">From ₹1,499</span>
            </div>

            <div className="saved-event-item" onClick={() => onSelectEvent('hiphop')}>
              <img src="/assets/concert_crowd.jpg" alt="Hip Hop Showcase" className="saved-thumb" />
              <div className="saved-info">
                <span className="saved-cat">Hip-Hop & Urban</span>
                <h4 className="saved-title">Hip Hop Showcase Live</h4>
                <span className="saved-date">Nov 14 • Kesari Studio, Bangalore</span>
              </div>
              <span className="saved-price">From ₹1,350</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <div className="profile-tab-content">
          <div className="settings-group-card">
            <div className="settings-row">
              <div className="settings-label-wrap">
                <AppIcon name="bell" size={16} color="#0042D9" />
                <div>
                  <div className="settings-title">Live Gate & Lineup Alerts</div>
                  <div className="settings-desc">Get notified 2 hours before showtime</div>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={notificationsEnabled} 
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="settings-toggle"
              />
            </div>

            <div className="settings-divider" />

            <div className="settings-row">
              <div className="settings-label-wrap">
                <span style={{ fontSize: 16 }}>🍏</span>
                <div>
                  <div className="settings-title">Auto-Add to Apple Wallet</div>
                  <div className="settings-desc">Instantly sync booked passes</div>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={appleWalletSync} 
                onChange={() => setAppleWalletSync(!appleWalletSync)}
                className="settings-toggle"
              />
            </div>

            <div className="settings-divider" />

            {/* Studio CMS & Fydo Import Link */}
            <a 
              href="#admin"
              className="settings-row" 
              onClick={(e) => {
                e.preventDefault();
                onOpenAdmin();
              }}
              style={{ cursor: 'pointer', textDecoration: 'none', background: 'rgba(218, 251, 113, 0.08)', borderRadius: 12, padding: '10px 12px' }}
            >
              <div className="settings-label-wrap">
                <span style={{ fontSize: 18 }}>⚡</span>
                <div>
                  <div className="settings-title" style={{ color: '#0C0D12', fontWeight: 750 }}>Studio CMS & Event Operations Link</div>
                  <div className="settings-desc">Add, edit, delete events & fast Fydo auto-import</div>
                </div>
              </div>
              <AppIcon name="arrow-up-right" size={16} color="#0042D9" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      )}

      <div style={{ height: 85, flexShrink: 0 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
