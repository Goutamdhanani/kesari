import React, { useState, useEffect } from 'react';
import SlideUIKit from './components/slides/SlideUIKit';
import SlideColorPalette from './components/slides/SlideColorPalette';
import SlideTypography from './components/slides/SlideTypography';
import SlideUserFlow from './components/slides/SlideUserFlow';
import SlideStudioShowcase from './components/slides/SlideStudioShowcase';
import MobileFrame from './components/mobile/MobileFrame';
import QRModal from './components/mobile/QRModal';
import AppIcon from './components/common/AppIcon';
import './App.css';

export default function App() {
  // activeSlide: 'all' | 'uikit' | 'colors' | 'typography' | 'flow' | 'studio' | 'mobile'
  const [activeSlide, setActiveSlide] = useState('all');
  const [showQRModal, setShowQRModal] = useState(false);
  const [mobileScreen, setMobileScreen] = useState('onboarding');
  const [mobileEventId, setMobileEventId] = useState('rock');
  const [showFloatingNav, setShowFloatingNav] = useState(true);

  // Keyboard navigation between slides: ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.defaultPrevented || e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      const slides = ['all', 'uikit', 'colors', 'typography', 'flow', 'studio', 'mobile'];
      const currentIndex = slides.indexOf(activeSlide);
      if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
        setActiveSlide(slides[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setActiveSlide(slides[currentIndex - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  const handleSelectEvent = (id) => {
    setMobileEventId(id);
    setMobileScreen('details');
    setActiveSlide('mobile');
  };

  const handleNavigateScreen = (screenName) => {
    setMobileScreen(screenName);
    setActiveSlide('mobile');
  };

  return (
    <div className="hyperactive-showcase-root">
      {/* Floating Discreet Slide Navigation Dock at Bottom-Center */}
      <div className={`floating-presentation-dock ${showFloatingNav ? 'visible' : 'collapsed'}`}>
        <button 
          className="dock-toggle-btn"
          onClick={() => setShowFloatingNav(!showFloatingNav)}
          title="Toggle Navigation Dock"
        >
          {showFloatingNav ? '✕' : '⚡ Menu'}
        </button>

        {showFloatingNav && (
          <div className="dock-pill-bar">
            <button 
              className={`dock-btn ${activeSlide === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSlide('all')}
            >
              📜 All Slides (Behance)
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
            <button 
              className={`dock-btn lime-dock-btn ${activeSlide === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveSlide('mobile')}
            >
              📱 Mobile App
            </button>
          </div>
        )}
      </div>

      {/* Main Presentation Surface */}
      <main className="presentation-canvas">
        
        {/* MODE: ALL SLIDES (Continuous Behance Case Study View) */}
        {activeSlide === 'all' && (
          <div className="behance-continuous-stream">
            <section id="slide-uikit" className="stream-section">
              <SlideUIKit 
                onSelectEvent={handleSelectEvent}
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
              <SlideUserFlow onNavigateScreen={handleNavigateScreen} />
            </section>

            <section id="slide-studio" className="stream-section">
              <SlideStudioShowcase onNavigateHome={() => handleNavigateScreen('home')} />
            </section>
          </div>
        )}

        {/* INDIVIDUAL SLIDE VIEWS */}
        {activeSlide === 'uikit' && (
          <div className="single-slide-fullscreen">
            <SlideUIKit 
              onSelectEvent={handleSelectEvent}
              onOpenQR={() => setShowQRModal(true)}
            />
          </div>
        )}

        {activeSlide === 'colors' && (
          <div className="single-slide-fullscreen">
            <SlideColorPalette />
          </div>
        )}

        {activeSlide === 'typography' && (
          <div className="single-slide-fullscreen">
            <SlideTypography />
          </div>
        )}

        {activeSlide === 'flow' && (
          <div className="single-slide-fullscreen">
            <SlideUserFlow onNavigateScreen={handleNavigateScreen} />
          </div>
        )}

        {activeSlide === 'studio' && (
          <div className="single-slide-fullscreen">
            <SlideStudioShowcase onNavigateHome={() => handleNavigateScreen('home')} />
          </div>
        )}

        {activeSlide === 'mobile' && (
          <div className="standalone-mobile-canvas">
            <MobileFrame initialScreen={mobileScreen} initialEventId={mobileEventId} onEventSelected={handleSelectEvent} />
          </div>
        )}

      </main>

      {/* Global QR Modal */}
      <QRModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
}
