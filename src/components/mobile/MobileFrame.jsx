import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HomeScreen from './HomeScreen';
import OnboardingScreen from './OnboardingScreen';
import TicketScreen from './TicketScreen';
import EventDetailScreen from './EventDetailScreen';
import SearchScreen from './SearchScreen';
import ExploreEventsScreen from './ExploreEventsScreen';
import ProfileScreen from './ProfileScreen';
import NotificationsSheet from './NotificationsSheet';
import CitySelectorSheet from './CitySelectorSheet';
import QRModal from './QRModal';
import { FloatingBottomNav } from '../common/ControlWidgets';
import { MOCK_EVENTS, INITIAL_TICKETS } from '../../data/mockEvents';
import './MobileFrame.css';

const screenVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.16, ease: [0.19, 1, 0.22, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.12 } },
};

export default function MobileFrame({ 
  initialScreen = 'home',
  initialEventId = 'rock',
  onEventSelected = () => {}
}) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [selectedEventId, setSelectedEventId] = useState(initialEventId);
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [activeQRTicket, setActiveQRTicket] = useState(null);

  // Sheets & Modals
  const [showQRModal, setShowQRModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCitySelector, setShowCitySelector] = useState(false);

  // In-app Notification list
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      icon: '🎟️',
      title: 'Pass Ready for Gate Check-in',
      message: 'Your Jazz & Blues Studio pass is verified for Kesari - The Memory Studio, Bangalore.',
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
      title: 'Miles Quartet Added',
      message: 'Acoustic Lounge lineup updated with special studio session.',
      time: 'Yesterday'
    }
  ]);
  const [unreadCount, setUnreadCount] = useState(2);

  // In-app Toast Feedback Banner
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  useEffect(() => { setCurrentScreen(initialScreen); }, [initialScreen]);
  useEffect(() => { setSelectedEventId(initialEventId); }, [initialEventId]);

  const handleSelectEvent = (id) => {
    setSelectedEventId(id);
    setCurrentScreen('details');
    onEventSelected(id);
  };

  const handleBookSuccess = (newTicket) => {
    if (newTicket) {
      setTickets(prev => [newTicket, ...prev]);
      setActiveQRTicket(newTicket);
      showToast(`Pass confirmed for ${newTicket.eventTitle}! 🎟️`);
    }
    setCurrentScreen('ticket');
  };

  const handleOpenQR = (ticket) => {
    setActiveQRTicket(ticket || tickets[0]);
    setShowQRModal(true);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    showToast('All notifications cleared 🧹');
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    showToast(`Location set to ${city} 📍`);
  };

  return (
    <div className="eventjam-web-app-viewport">
      {/* Centered Modern Web App Stage (No artificial phone chassis or fake status bar) */}
      <main className="eventjam-app-stage" role="main" aria-label="Event Jam App">

        {/* In-App Feedback Micro Toast Banner */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              className="in-app-toast-pill"
              initial={{ opacity: 0, y: -20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.92 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen Viewport Container */}
        <div className="eventjam-screen-viewport">
          <AnimatePresence mode="wait">
            
            {/* 1. Home Screen */}
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
                  onNavigate={(scr) => setCurrentScreen(scr)}
                  onOpenNotifications={() => {
                    setShowNotifications(true);
                    setUnreadCount(0);
                  }}
                  onOpenCitySelector={() => setShowCitySelector(true)}
                  selectedCity={selectedCity}
                  unreadCount={unreadCount}
                />
              </motion.div>
            )}

            {/* 2. Search Screen */}
            {currentScreen === 'search' && (
              <motion.div
                key="search"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: '100%', height: '100%' }}
              >
                <SearchScreen 
                  events={MOCK_EVENTS}
                  onSelectEvent={handleSelectEvent}
                  onBack={() => setCurrentScreen('home')}
                  onTabChange={(tab) => {
                    if (tab === 'home') setCurrentScreen('home');
                    else if (tab === 'calendar') setCurrentScreen('explore');
                    else if (tab === 'ticket') setCurrentScreen('ticket');
                    else if (tab === 'profile') setCurrentScreen('profile');
                  }}
                />
              </motion.div>
            )}

            {/* 3. Explore & Calendar Screen */}
            {currentScreen === 'explore' && (
              <motion.div
                key="explore"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: '100%', height: '100%' }}
              >
                <ExploreEventsScreen 
                  events={MOCK_EVENTS}
                  selectedCity={selectedCity}
                  onSelectEvent={handleSelectEvent}
                  onBack={() => setCurrentScreen('home')}
                  onTabChange={(tab) => {
                    if (tab === 'home') setCurrentScreen('home');
                    else if (tab === 'search') setCurrentScreen('search');
                    else if (tab === 'ticket') setCurrentScreen('ticket');
                    else if (tab === 'profile') setCurrentScreen('profile');
                  }}
                  onOpenCitySelector={() => setShowCitySelector(true)}
                />
              </motion.div>
            )}

            {/* 4. Event Detail & Booking Screen */}
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
                  onBookSuccess={handleBookSuccess}
                />
              </motion.div>
            )}

            {/* 6. Ticket Screen */}
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
                  tickets={tickets}
                  onBack={() => setCurrentScreen('home')} 
                  onOpenQR={handleOpenQR}
                  onShowToast={showToast}
                />
              </motion.div>
            )}

            {/* 7. Profile & Wallet Screen */}
            {currentScreen === 'profile' && (
              <motion.div
                key="profile"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: '100%', height: '100%' }}
              >
                <ProfileScreen 
                  tickets={tickets}
                  onBack={() => setCurrentScreen('home')}
                  onOpenTickets={() => setCurrentScreen('ticket')}
                  onSelectEvent={handleSelectEvent}
                />
              </motion.div>
            )}

            {/* 8. Onboarding Screen */}
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

          </AnimatePresence>

          {/* Persistent Fixed Floating Navigation Bar (Never moves, never unmounts, anchored on top) */}
          {['home', 'search', 'explore', 'ticket', 'profile'].includes(currentScreen) && (
            <div className="mobile-fixed-bottom-nav-root">
              <FloatingBottomNav 
                activeTab={
                  currentScreen === 'home' ? 'home' :
                  currentScreen === 'search' ? 'search' :
                  currentScreen === 'explore' ? 'calendar' :
                  currentScreen === 'ticket' ? 'ticket' :
                  currentScreen === 'profile' ? 'profile' : 'home'
                }
                onTabChange={(tab) => {
                  if (tab === 'home') setCurrentScreen('home');
                  else if (tab === 'search') setCurrentScreen('search');
                  else if (tab === 'calendar') setCurrentScreen('explore');
                  else if (tab === 'ticket') setCurrentScreen('ticket');
                  else if (tab === 'profile') setCurrentScreen('profile');
                }}
              />
            </div>
          )}

          {/* Gate Check-in QR Modal */}
          <QRModal 
            isOpen={showQRModal} 
            onClose={() => setShowQRModal(false)}
            ticket={activeQRTicket || tickets[0]}
          />

          {/* Notifications Drawer Sheet */}
          <NotificationsSheet 
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            notifications={notifications}
            onClearAll={handleClearNotifications}
            onSelectNotification={(item) => {
              if (item.title.includes('Pass Ready')) setCurrentScreen('ticket');
              else if (item.title.includes('Rock Legends')) handleSelectEvent('rock');
              else if (item.title.includes('Miles Quartet')) handleSelectEvent('jazz');
            }}
          />

          {/* City Selector Sheet */}
          <CitySelectorSheet 
            isOpen={showCitySelector}
            onClose={() => setShowCitySelector(false)}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
          />
        </div>
      </main>
    </div>
  );
}
