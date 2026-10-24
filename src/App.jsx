import React, { useState, useEffect } from 'react';
import MobileFrame from './components/mobile/MobileFrame';
import QRModal from './components/mobile/QRModal';
import SlideUIKit from './components/slides/SlideUIKit';
import SlideColorPalette from './components/slides/SlideColorPalette';
import SlideTypography from './components/slides/SlideTypography';
import SlideUserFlow from './components/slides/SlideUserFlow';
import SlideStudioShowcase from './components/slides/SlideStudioShowcase';
import { MOCK_EVENTS, INITIAL_TICKETS } from './data/mockEvents';
import './App.css';

export default function App() {
  // Primary Navigation View: 'mobile' (default) | 'slides'
  const [activeView, setActiveView] = useState('mobile');

  // Slide Deck Mode States
  const [activeSlide, setActiveSlide] = useState('all');
  const [showFloatingNav, setShowFloatingNav] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [activeQRTicket, setActiveQRTicket] = useState(INITIAL_TICKETS[0]);

  // Keyboard navigation for Behance slides: ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowQRModal(false);
      }
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

  return (
    <div className="hyperactive-showcase-root">
      
      {/* 1. Global Minimalist View Switcher Bar */}
      <header className="global-top-capsule-bar">
        <div className="capsule-nav-container">
          <div className="app-brand-badge">
            <span className="brand-dot" />
            <span className="brand-name">EVENT JAM</span>
          </div>

          <div className="view-switch-pills" role="tablist" aria-label="Application view">
            <button
              role="tab"
              aria-selected={activeView === 'mobile'}
              className={`view-pill-btn ${activeView === 'mobile' ? 'active' : ''}`}
              onClick={() => {
                setActiveView('mobile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>📱 Mobile App</span>
            </button>

            <button
              role="tab"
              aria-selected={activeView === 'slides'}
              className={`view-pill-btn ${activeView === 'slides' ? 'active' : ''}`}
              onClick={() => {
                setActiveView('slides');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>🎨 Behance Presentation</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Presentation Canvas */}
      <main className="presentation-canvas">

        {/* VIEW 1: STANDALONE INTERACTIVE MOBILE APPLICATION */}
        {activeView === 'mobile' && (
          <div className="standalone-mobile-canvas">
            <MobileFrame 
              initialScreen="home" 
              initialEventId="rock" 
            />
          </div>
        )}

        {/* VIEW 2: BEHANCE CASE STUDY & DESIGN SYSTEM PRESENTATION */}
        {activeView === 'slides' && (
          <div className="behance-case-study-canvas">
            {/* Floating Slide Navigation Dock */}
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

            {/* Continuous Stream of Slides */}
            {activeSlide === 'all' && (
              <div className="behance-continuous-stream">
                <section id="slide-uikit" className="stream-section">
                  <SlideUIKit 
                    onSelectEvent={() => setActiveView('mobile')}
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
                  <SlideStudioShowcase onNavigateHome={() => setActiveView('mobile')} />
                </section>
              </div>
            )}

            {/* Single Slide Views */}
            {activeSlide === 'uikit' && (
              <div className="single-slide-fullscreen">
                <SlideUIKit onOpenQR={() => setShowQRModal(true)} onSelectEvent={() => setActiveView('mobile')} />
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
                <SlideUserFlow onNavigateScreen={() => setActiveView('mobile')} />
              </div>
            )}
            {activeSlide === 'studio' && (
              <div className="single-slide-fullscreen">
                <SlideStudioShowcase onNavigateHome={() => setActiveView('mobile')} />
              </div>
            )}
          </div>
        )}

      </main>

      {/* Slide QR Modal for previewing Gate Pass */}
      <QRModal 
        isOpen={showQRModal} 
        onClose={() => setShowQRModal(false)}
        ticket={activeQRTicket}
      />

    </div>
  );
}
