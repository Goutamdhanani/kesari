import React, { useState, useEffect } from 'react';
import { MOCK_EVENTS, CITIES, GENRES, INITIAL_TICKETS } from './data/mockEvents';
import WebHeader from './components/web/WebHeader';
import HeroSection from './components/web/HeroSection';
import EventCatalog from './components/web/EventCatalog';
import TicketWalletView from './components/web/TicketWalletView';
import EventModal from './components/web/EventModal';
import NotificationDrawer from './components/web/NotificationDrawer';
import WebFooter from './components/web/WebFooter';
import ToastSystem from './components/web/ToastSystem';
import MobileFrame from './components/mobile/MobileFrame';
import QRModal from './components/mobile/QRModal';
import SlideUIKit from './components/slides/SlideUIKit';
import SlideColorPalette from './components/slides/SlideColorPalette';
import SlideTypography from './components/slides/SlideTypography';
import SlideUserFlow from './components/slides/SlideUserFlow';
import SlideStudioShowcase from './components/slides/SlideStudioShowcase';
import './App.css';

export default function App() {
  // Navigation View: 'explore' | 'wallet' | 'favorites' | 'mobile' | 'slides'
  const [activeView, setActiveView] = useState('explore');

  // Application Data States
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [favorites, setFavorites] = useState(['rock']);
  const [selectedCity, setSelectedCity] = useState('San Francisco');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [selectedModalEvent, setSelectedModalEvent] = useState(null);
  const [activeQRTicket, setActiveQRTicket] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      icon: '🎟️',
      title: 'Pass Ready for Gate Check-in',
      message: 'Your Jazz & Blues Festival ticket is verified for Riverfront Park.',
      time: '12m ago'
    },
    {
      id: 'n2',
      icon: '⚡',
      title: 'Rock Legends Selling Fast',
      message: 'Over 92% of passes claimed for the October 20 concert.',
      time: '1h ago'
    },
    {
      id: 'n3',
      icon: '🎷',
      title: 'New Lineup Announcement',
      message: 'Miles Quartet added to Riverfront Sunset Stage.',
      time: 'Yesterday'
    }
  ]);
  const [unreadCount, setUnreadCount] = useState(2);

  // Toast System
  const [toasts, setToasts] = useState([]);
  const triggerToast = (message, icon = '⚡', type = 'info') => {
    const id = `t-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, icon, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Behance Slide Deck Mode States
  const [activeSlide, setActiveSlide] = useState('all');
  const [showFloatingNav, setShowFloatingNav] = useState(true);

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedModalEvent(null);
        setShowQRModal(false);
        setNotificationDrawerOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input-field');
        if (searchInput) searchInput.focus();
      }
      // Arrow keys in slide deck mode
      if (activeView === 'slides') {
        if (e.target.closest('input, textarea')) return;
        const slides = ['all', 'uikit', 'colors', 'typography', 'flow', 'studio'];
        const idx = slides.indexOf(activeSlide);
        if (e.key === 'ArrowRight' && idx < slides.length - 1) {
          setActiveSlide(slides[idx + 1]);
        } else if (e.key === 'ArrowLeft' && idx > 0) {
          setActiveSlide(slides[idx - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, activeSlide]);

  // Handlers
  const handleOpenEvent = (event) => {
    setSelectedModalEvent(event);
  };

  const handleBookNow = (event) => {
    setSelectedModalEvent(event);
  };

  const handleBookSuccess = (newTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    setSelectedModalEvent(null);
    triggerToast(`Pass confirmed for ${newTicket.eventTitle}! Added to Digital Wallet.`, '🎟️', 'success');
  };

  const handleToggleFavorite = (eventId) => {
    setFavorites(prev => {
      const exists = prev.includes(eventId);
      if (exists) {
        triggerToast('Removed from saved events', '🤍');
        return prev.filter(id => id !== eventId);
      } else {
        triggerToast('Saved to your favorites collection!', '❤️', 'success');
        return [...prev, eventId];
      }
    });
  };

  const handleOpenQR = (ticket) => {
    setActiveQRTicket(ticket);
    setShowQRModal(true);
  };

  const handleSaveToAppleWallet = (ticket) => {
    triggerToast(`Added pass for "${ticket.eventTitle}" to Apple Wallet!`, '🍏', 'success');
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    triggerToast(`Location switched to ${city}`, '📍');
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    triggerToast('All notifications cleared', '🧹');
  };

  // Filtered list for 'favorites' view
  const favoriteEvents = events.filter(e => favorites.includes(e.id));
  const featuredEvent = events.find(e => e.id === 'rock') || events[0];

  return (
    <div className="hyperactive-showcase-root">
      
      {/* 1. Global Sticky Header */}
      <WebHeader 
        activeView={activeView}
        onSelectView={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        cities={CITIES}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        ticketCount={tickets.length}
        savedCount={favorites.length}
        unreadCount={unreadCount}
        onToggleNotifications={() => {
          setNotificationDrawerOpen(!notificationDrawerOpen);
          setUnreadCount(0);
        }}
      />

      {/* 2. Main Content Views */}
      <main className="presentation-canvas">

        {/* VIEW A: REAL-WORLD EXPLORE & EVENT CATALOG */}
        {activeView === 'explore' && (
          <div className="web-explore-view">
            {/* Hero Concert Spotlight Banner */}
            {!searchQuery && (
              <HeroSection 
                featuredEvent={featuredEvent}
                onBookNow={handleBookNow}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(featuredEvent.id)}
                onSelectEvent={handleOpenEvent}
              />
            )}

            {/* Catalog Grid with Filters & Sort */}
            <EventCatalog 
              events={events}
              genres={GENRES}
              selectedCity={selectedCity}
              searchQuery={searchQuery}
              onSelectEvent={handleOpenEvent}
              onBookNow={handleBookNow}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />

            {/* Footer */}
            <WebFooter onSelectView={setActiveView} />
          </div>
        )}

        {/* VIEW B: DIGITAL TICKET WALLET */}
        {activeView === 'wallet' && (
          <div className="web-wallet-view">
            <TicketWalletView 
              tickets={tickets}
              onOpenQR={handleOpenQR}
              onSaveToAppleWallet={handleSaveToAppleWallet}
              onExploreMore={() => setActiveView('explore')}
            />
            <WebFooter onSelectView={setActiveView} />
          </div>
        )}

        {/* VIEW C: SAVED / FAVORITES */}
        {activeView === 'favorites' && (
          <div className="web-favorites-view">
            <section className="web-catalog-section">
              <div className="catalog-container">
                <div className="catalog-header-row">
                  <div>
                    <div className="section-eyebrow-pill">
                      <span>❤️ Wishlist</span>
                    </div>
                    <h2 className="section-title">Saved Experiences</h2>
                    <p className="section-subtitle">
                      Your bookmarked live concerts, secret festivals, and underground shows.
                    </p>
                  </div>
                </div>

                {favoriteEvents.length > 0 ? (
                  <div className="events-responsive-grid">
                    {favoriteEvents.map(event => (
                      <article 
                        key={event.id}
                        className="catalog-event-card"
                        onClick={() => handleOpenEvent(event)}
                      >
                        <div className="card-media-wrap">
                          <img src={event.image} alt={event.title} className="card-media-img" />
                          <div className="card-media-dark-vignette"></div>
                          <div className="card-top-category-pill">
                            <span>🎵</span>
                            <span>{event.category}</span>
                          </div>
                          <button 
                            className="card-heart-btn active"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(event.id);
                            }}
                          >
                            ❤️
                          </button>
                        </div>
                        <div className="card-body-content">
                          <div className="card-date-venue-row">
                            <span className="card-date-badge">📅 {event.date}</span>
                            <span className="card-venue-text">📍 {event.venueShort}</span>
                          </div>
                          <h3 className="card-event-title">{event.title}</h3>
                          <p className="card-brief-desc">{event.description}</p>
                          <div className="card-footer-row">
                            <div className="card-price-block">
                              <span className="price-prefix">From</span>
                              <span className="price-bold">${event.price.toFixed(2)}</span>
                            </div>
                            <button 
                              className="card-book-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookNow(event);
                              }}
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="catalog-empty-state">
                    <span className="empty-emoji">🤍</span>
                    <h3 className="empty-title">No saved events yet</h3>
                    <p className="empty-desc">
                      Tap the heart icon on any concert card to save events to your personal wishlist.
                    </p>
                    <button 
                      className="empty-reset-btn"
                      onClick={() => setActiveView('explore')}
                    >
                      Browse Concerts
                    </button>
                  </div>
                )}
              </div>
            </section>
            <WebFooter onSelectView={setActiveView} />
          </div>
        )}

        {/* VIEW D: STANDALONE INTERACTIVE MOBILE SIMULATOR */}
        {activeView === 'mobile' && (
          <div className="standalone-mobile-canvas">
            <MobileFrame 
              initialScreen="home" 
              initialEventId="rock" 
              onEventSelected={(id) => {
                const ev = events.find(e => e.id === id);
                if (ev) handleOpenEvent(ev);
              }}
            />
          </div>
        )}

        {/* VIEW E: BEHANCE CASE STUDY & DESIGN SYSTEM SLIDES */}
        {activeView === 'slides' && (
          <div className="behance-case-study-canvas">
            {/* Floating Discreet Slide Dock */}
            <div className={`floating-presentation-dock ${showFloatingNav ? 'visible' : 'collapsed'}`}>
              <button 
                className="dock-toggle-btn"
                onClick={() => setShowFloatingNav(!showFloatingNav)}
                title="Toggle Slide Menu"
              >
                {showFloatingNav ? '✕' : '⚡ Slides'}
              </button>

              {showFloatingNav && (
                <div className="dock-pill-bar">
                  <button 
                    className={`dock-btn ${activeSlide === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveSlide('all')}
                  >
                    📜 All Slides
                  </button>
                  <button 
                    className={`dock-btn ${activeSlide === 'uikit' ? 'active' : ''}`}
                    onClick={() => setActiveSlide('uikit')}
                  >
                    1. UI Kit
                  </button>
                  <button 
                    className={`dock-btn ${activeSlide === 'colors' ? 'active' : ''}`}
                    onClick={() => setActiveSlide('colors')}
                  >
                    2. Color Palette
                  </button>
                  <button 
                    className={`dock-btn ${activeSlide === 'typography' ? 'active' : ''}`}
                    onClick={() => setActiveSlide('typography')}
                  >
                    3. Typography
                  </button>
                  <button 
                    className={`dock-btn ${activeSlide === 'flow' ? 'active' : ''}`}
                    onClick={() => setActiveSlide('flow')}
                  >
                    4. User Flow
                  </button>
                  <button 
                    className={`dock-btn ${activeSlide === 'studio' ? 'active' : ''}`}
                    onClick={() => setActiveSlide('studio')}
                  >
                    5. 3D Studio Mockup
                  </button>
                </div>
              )}
            </div>

            {/* Slide Sections */}
            {activeSlide === 'all' && (
              <div className="behance-continuous-stream">
                <section id="slide-uikit" className="stream-section">
                  <SlideUIKit 
                    onSelectEvent={(id) => {
                      const ev = events.find(e => e.id === id);
                      if (ev) handleOpenEvent(ev);
                    }}
                    onOpenQR={() => setShowQRModal(true)}
                  />
                </section>
                <section id="slide-colors" className="stream-section">
                  <SlideColorPalette />
                </section>
                <section id="slide-typography" className="stream-section">
                  <SlideTypography />
                </section>
                <section id="slide-flow" className="stream-section">
                  <SlideUserFlow onNavigateScreen={() => setActiveView('mobile')} />
                </section>
                <section id="slide-studio" className="stream-section">
                  <SlideStudioShowcase onNavigateHome={() => setActiveView('explore')} />
                </section>
              </div>
            )}

            {activeSlide === 'uikit' && <div className="single-slide-fullscreen"><SlideUIKit onOpenQR={() => setShowQRModal(true)} /></div>}
            {activeSlide === 'colors' && <div className="single-slide-fullscreen"><SlideColorPalette /></div>}
            {activeSlide === 'typography' && <div className="single-slide-fullscreen"><SlideTypography /></div>}
            {activeSlide === 'flow' && <div className="single-slide-fullscreen"><SlideUserFlow /></div>}
            {activeSlide === 'studio' && <div className="single-slide-fullscreen"><SlideStudioShowcase /></div>}
          </div>
        )}

      </main>

      {/* 3. Event Detail & Checkout Modal */}
      <EventModal 
        event={selectedModalEvent}
        isOpen={Boolean(selectedModalEvent)}
        onClose={() => setSelectedModalEvent(null)}
        onBookSuccess={handleBookSuccess}
        isFavorite={selectedModalEvent ? favorites.includes(selectedModalEvent.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 4. Gate QR Code Pass Modal */}
      <QRModal 
        isOpen={showQRModal} 
        onClose={() => setShowQRModal(false)}
        ticket={activeQRTicket || tickets[0]}
      />

      {/* 5. Slide-Over Notifications Drawer */}
      <NotificationDrawer 
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        notifications={notifications}
        onClearAll={handleClearNotifications}
      />

      {/* 6. Floating Toast Feedback System */}
      <ToastSystem 
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

    </div>
  );
}
