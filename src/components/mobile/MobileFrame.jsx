import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HomeScreen from './HomeScreen';
import OnboardingScreen from './OnboardingScreen';
import TicketScreen from './TicketScreen';
import EventDetailScreen from './EventDetailScreen';
import QRModal from './QRModal';
import './MobileFrame.css';

const SCREEN_TABS = [
  { id: 'home',       label: '🏠 Home', },
  { id: 'onboarding', label: '🚀 Onboarding', },
  { id: 'ticket',     label: '🎟️ Ticket', },
  { id: 'details',    label: '🎸 Event', },
];

const screenVariants = {
  initial: { opacity: 0, x: 18 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.19, 1, 0.22, 1] } },
  exit:    { opacity: 0, x: -18, transition: { duration: 0.16 } },
};

export default function MobileFrame({ 
  initialScreen = 'onboarding',
  initialEventId = 'rock',
  onEventSelected = () => {}
}) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [selectedEventId, setSelectedEventId] = useState(initialEventId);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => { setCurrentScreen(initialScreen); }, [initialScreen]);
  useEffect(() => { setSelectedEventId(initialEventId); }, [initialEventId]);

  const handleSelectEvent = (id) => {
    setSelectedEventId(id);
    setCurrentScreen('details');
    onEventSelected(id);
  };

  const goTo = (screen) => setCurrentScreen(screen);

  return (
    <div className="mobile-frame-showcase">
      {/* Screen Quick-Switcher */}
      <div className="frame-screen-switcher" role="tablist" aria-label="Mobile screen preview">
        <span className="switcher-label">Preview:</span>
        {SCREEN_TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={currentScreen === tab.id}
            className={`switch-tab-btn ${currentScreen === tab.id ? 'active' : ''}`}
            onClick={() => goTo(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* iPhone Device Frame */}
      <div className="iphone-outer-chassis" role="presentation" aria-label="iPhone mobile preview">
        
        {/* Dynamic Island */}
        <div className="iphone-dynamic-island" aria-hidden="true">
          <div className="island-camera-lens" />
        </div>

        {/* Status Bar */}
        <div className="iphone-status-bar" aria-hidden="true">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            {/* Signal Bars */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
              <rect x="0" y="9" width="3" height="3" rx="0.5"/>
              <rect x="4.5" y="6.5" width="3" height="5.5" rx="0.5"/>
              <rect x="9" y="3.5" width="3" height="8.5" rx="0.5"/>
              <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
            </svg>
            {/* WiFi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 3C5.5 3 3.2 3.9 1.5 5.5L0 4C2.1 1.5 5 0 8 0C11 0 13.9 1.5 16 4L14.5 5.5C12.8 3.9 10.5 3 8 3ZM8 7C6.5 7 5.2 7.6 4.2 8.5L2.7 7C4 5.8 5.9 5 8 5C10.1 5 12 5.8 13.3 7L11.8 8.5C10.8 7.6 9.5 7 8 7ZM8 11C7.2 11 6.5 11.3 6 11.8L8 14L10 11.8C9.5 11.3 8.8 11 8 11Z" fill="currentColor"/>
            </svg>
            {/* Battery */}
            <div className="battery-indicator-wrap">
              <div className="battery-level-bar" />
            </div>
          </div>
        </div>

        {/* Screen Viewport */}
        <div className="iphone-screen-viewport">
          <AnimatePresence mode="wait">
            {currentScreen === 'home' && (
              <motion.div
                key="home"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: '100%', height: '100%' }}
              >
                <HomeScreen 
                  onSelectEvent={handleSelectEvent}
                  onOpenTicket={() => setCurrentScreen('ticket')}
                  onOpenNotifications={() => {}}
                />
              </motion.div>
            )}

            {currentScreen === 'onboarding' && (
              <motion.div
                key="onboarding"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: '100%', height: '100%' }}
              >
                <OnboardingScreen onFinish={() => setCurrentScreen('home')} />
              </motion.div>
            )}

            {currentScreen === 'ticket' && (
              <motion.div
                key="ticket"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: '100%', height: '100%' }}
              >
                <TicketScreen 
                  onBack={() => setCurrentScreen('home')} 
                  onOpenQR={() => setShowQRModal(true)}
                />
              </motion.div>
            )}

            {currentScreen === 'details' && (
              <motion.div
                key="details"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: '100%', height: '100%' }}
              >
                <EventDetailScreen 
                  eventId={selectedEventId}
                  onBack={() => setCurrentScreen('home')}
                  onBookSuccess={() => {
                    setCurrentScreen('ticket');
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* QR Modal */}
          <QRModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
        </div>

        {/* Home Indicator */}
        <div className="iphone-home-indicator" aria-hidden="true" />
      </div>
    </div>
  );
}
