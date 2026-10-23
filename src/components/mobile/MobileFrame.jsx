import React, { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen';
import OnboardingScreen from './OnboardingScreen';
import TicketScreen from './TicketScreen';
import EventDetailScreen from './EventDetailScreen';
import QRModal from './QRModal';
import './MobileFrame.css';

export default function MobileFrame({ 
  initialScreen = 'onboarding',
  initialEventId = 'rock',
  onEventSelected = () => {}
}) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [selectedEventId, setSelectedEventId] = useState(initialEventId);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    setCurrentScreen(initialScreen);
  }, [initialScreen]);

  useEffect(() => {
    setSelectedEventId(initialEventId);
  }, [initialEventId]);

  const handleSelectEvent = (id) => {
    setSelectedEventId(id);
    setCurrentScreen('details');
    onEventSelected(id);
  };

  return (
    <div className="mobile-frame-showcase">
      {/* Screen Quick-Switcher Bar */}
      <div className="frame-screen-switcher">
        <span className="switcher-label">Mobile Screen:</span>
        <button 
          className={`switch-tab-btn ${currentScreen === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('home')}
        >
          🏠 Home Feed
        </button>
        <button 
          className={`switch-tab-btn ${currentScreen === 'onboarding' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('onboarding')}
        >
          🚀 Onboarding
        </button>
        <button 
          className={`switch-tab-btn ${currentScreen === 'ticket' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('ticket')}
        >
          🎟️ Digital Ticket
        </button>
        <button 
          className={`switch-tab-btn ${currentScreen === 'details' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('details')}
        >
          🎸 Event Details
        </button>
      </div>

      {/* Realistic iPhone Device Frame */}
      <div className="iphone-outer-chassis">
        {/* Dynamic Island */}
        <div className="iphone-dynamic-island">
          <div className="island-camera-lens"></div>
        </div>

        {/* Status Bar */}
        <div className="iphone-status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <path d="M1 9.5C1 9.22386 1.22386 9 1.5 9H2.5C2.77614 9 3 9.22386 3 9.5V10.5C3 10.7761 2.77614 11 2.5 11H1.5C1.22386 11 1 10.7761 1 10.5V9.5Z" fill="currentColor"/>
              <path d="M5 7C5 6.72386 5.22386 6.5 5.5 6.5H6.5C6.77614 6.5 7 6.72386 7 7V10.5C7 10.7761 6.77614 11 6.5 11H5.5C5.22386 11 5 10.7761 5 10.5V7Z" fill="currentColor"/>
              <path d="M9 4.5C9 4.22386 9.22386 4 9.5 4H10.5C10.7761 4 11 4.22386 11 4.5V10.5C11 10.7761 10.7761 11 10.5 11H9.5C9.22386 11 9 10.7761 9 10.5V4.5Z" fill="currentColor"/>
              <path d="M13 1.5C13 1.22386 13.224 1 13.5 1H14.5C14.776 1 15 1.22386 15 1.5V10.5C15 10.7761 14.776 11 14.5 11H13.5C13.224 11 13 10.7761 13 10.5V1.5Z" fill="currentColor"/>
            </svg>
            <svg width="15" height="11" viewBox="0 0 16 11" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 0.5C4.8 0.5 1.9 1.9 0 4.1L8 11L16 4.1C14.1 1.9 11.2 0.5 8 0.5ZM2.3 4.9C3.8 3.4 5.8 2.5 8 2.5C10.2 2.5 12.2 3.4 13.7 4.9L8 9.8L2.3 4.9Z" fill="currentColor"/>
            </svg>
            <div className="battery-indicator-wrap">
              <div className="battery-level-bar"></div>
            </div>
          </div>
        </div>

        {/* Screen Content Viewport */}
        <div className="iphone-screen-viewport">
          {currentScreen === 'home' && (
            <HomeScreen 
              onSelectEvent={handleSelectEvent}
              onOpenTicket={() => setCurrentScreen('ticket')}
              onOpenNotifications={() => alert("Gregory, you have 1 unread notification: Doors for Jazz & Blues Festival open at 15:00 PM!")}
            />
          )}

          {currentScreen === 'onboarding' && (
            <OnboardingScreen onFinish={() => setCurrentScreen('home')} />
          )}

          {currentScreen === 'ticket' && (
            <TicketScreen 
              onBack={() => setCurrentScreen('home')} 
              onOpenQR={() => setShowQRModal(true)}
            />
          )}

          {currentScreen === 'details' && (
            <EventDetailScreen 
              eventId={selectedEventId}
              onBack={() => setCurrentScreen('home')}
              onBookSuccess={() => {
                alert("🎉 Ticket confirmed for Gregory Jenkins! Check your digital pass in My Tickets.");
                setCurrentScreen('ticket');
              }}
            />
          )}

          {/* QR Scanner Modal Overlay */}
          <QRModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
        </div>

        {/* iPhone Bottom Home Indicator Bar */}
        <div className="iphone-home-indicator"></div>
      </div>
    </div>
  );
}
