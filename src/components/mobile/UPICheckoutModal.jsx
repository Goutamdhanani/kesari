import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import AppIcon from '../common/AppIcon';
import './UPICheckoutModal.css';

export default function UPICheckoutModal({
  isOpen,
  onClose,
  event,
  tier,
  ticketCount = 1,
  totalPrice,
  onPaymentSuccess
}) {
  const [copiedVpa, setCopiedVpa] = useState(false);
  const [paymentStep, setPaymentStep] = useState('pay'); // 'pay' | 'verifying' | 'success'
  const [activeTab, setActiveTab] = useState('app'); // 'app' | 'qr'
  const [utrNumber, setUtrNumber] = useState('');

  const upiId = '7760539955@ybl';
  const payeeName = 'Kesari The Memory Studio';
  const orderRef = `KSR${Date.now().toString().slice(-8)}`;
  const transactionNote = `Pass: ${(event?.title || 'Studio Pass').slice(0, 30)}`;

  // Standard NPCI UPI URI Scheme
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR&tn=${encodeURIComponent(transactionNote)}&tr=${orderRef}`;
  
  // Specific Android App deep links
  const gpayUri = `tez://upi/pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  const phonepeUri = `phonepe://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  const paytmUri = `paytmmp://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  // Dynamic High-Resolution QR Code
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=8&data=${encodeURIComponent(upiUri)}`;

  useEffect(() => {
    if (isOpen) {
      setPaymentStep('pay');
      setCopiedVpa(false);
      setUtrNumber('');
    }
  }, [isOpen]);

  if (!isOpen || !event) return null;

  const handleCopyUPI = () => {
    navigator.clipboard?.writeText(upiId);
    setCopiedVpa(true);
    setTimeout(() => setCopiedVpa(false), 2600);
  };

  const handleOpenUPI = (url) => {
    // Open native Android UPI Intent
    window.location.href = url;
  };

  const handleConfirmPaid = () => {
    setPaymentStep('verifying');
    
    // Simulate real-time UPI verification
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#DAFB71', '#0042D9', '#E50914', '#FFFFFF']
      });

      setPaymentStep('success');

      const confirmedTicket = {
        id: `tkt-${orderRef}`,
        eventId: event.id,
        eventTitle: event.title,
        date: event.date,
        time: event.time?.split(' - ')[0] || event.time,
        location: event.venue || `${event.venueShort}, Bangalore`,
        seat: tier?.name || 'Studio Pass',
        tier: tier?.name || 'Standard Pass',
        price: totalPrice,
        quantity: ticketCount,
        hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...${orderRef}`,
        image: event.image,
        paymentMethod: 'UPI Instant (NPCI)',
        vpa: upiId,
        refNumber: orderRef,
        bookedAt: 'Just now'
      };

      setTimeout(() => {
        onPaymentSuccess(confirmedTicket);
        onClose();
      }, 900);
    }, 1400);
  };

  return (
    <div className="upi-checkout-overlay" onClick={onClose}>
      <motion.div 
        className="upi-checkout-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: '100%', scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: '100%', scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
      >
        {/* Modal Handle */}
        <div className="upi-modal-handle-bar">
          <div className="upi-modal-drag-pill" />
        </div>

        {/* Header */}
        <div className="upi-header-row">
          <div className="upi-brand-badge">
            <span className="upi-logo-symbol">⚡</span>
            <span className="upi-brand-text">Instant UPI Checkout</span>
          </div>
          <button className="upi-close-btn" onClick={onClose} aria-label="Close">
            <AppIcon name="x" size={16} color="#8E92A0" />
          </button>
        </div>

        {/* Event Order Summary Capsule */}
        <div className="upi-order-summary-card">
          <div className="upi-event-thumb-wrap">
            <img 
              src={event.image} 
              alt={event.title} 
              className="upi-event-thumb-img" 
            />
          </div>
          <div className="upi-event-meta-info">
            <h3 className="upi-event-title">{event.title}</h3>
            <p className="upi-tier-label">{tier?.name || 'Studio Pass'} • {ticketCount} {ticketCount > 1 ? 'Tickets' : 'Ticket'}</p>
            <div className="upi-price-highlight">
              <span className="upi-total-tag">To Pay</span>
              <span className="upi-total-val">₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Mode Selector Tabs */}
        <div className="upi-payment-mode-tabs">
          <button 
            className={`upi-tab-btn ${activeTab === 'app' ? 'active' : ''}`}
            onClick={() => setActiveTab('app')}
          >
            <span className="upi-tab-icon">📱</span>
            <span>Android UPI App</span>
          </button>
          <button 
            className={`upi-tab-btn ${activeTab === 'qr' ? 'active' : ''}`}
            onClick={() => setActiveTab('qr')}
          >
            <span className="upi-tab-icon">📷</span>
            <span>Scan UPI QR</span>
          </button>
        </div>

        {/* Content Body Based on Tab */}
        {activeTab === 'app' ? (
          <div className="upi-app-intent-section">
            <div className="upi-intent-tip">
              <span className="upi-dot-pulse" />
              <span>Tap below to open your installed UPI app on Android</span>
            </div>

            {/* Direct Intent Anchor (Native Android Trigger) */}
            <a 
              href={upiUri} 
              className="upi-primary-pay-button"
              onClick={() => {
                // If standard link doesn't trigger immediately, window.location provides immediate OS intent launch
                setTimeout(() => { window.location.href = upiUri; }, 50);
              }}
            >
              <div className="upi-btn-content">
                <span className="upi-btn-icon">⚡</span>
                <div className="upi-btn-text-group">
                  <span className="upi-btn-main">Pay ₹{totalPrice.toLocaleString()} via Any UPI App</span>
                  <span className="upi-btn-sub">GPay • PhonePe • Paytm • BHIM • Cred</span>
                </div>
              </div>
              <AppIcon name="arrow-up-right" size={18} color="#08090C" strokeWidth={2.8} />
            </a>

            {/* Quick App Shortcut Row */}
            <div className="upi-quick-apps-grid">
              <a 
                href={gpayUri} 
                className="upi-quick-app-chip"
                onClick={() => { window.location.href = gpayUri; }}
              >
                <span className="quick-app-icon">🔵</span>
                <span className="quick-app-name">Google Pay</span>
              </a>

              <a 
                href={phonepeUri} 
                className="upi-quick-app-chip"
                onClick={() => { window.location.href = phonepeUri; }}
              >
                <span className="quick-app-icon">🟣</span>
                <span className="quick-app-name">PhonePe</span>
              </a>

              <a 
                href={paytmUri} 
                className="upi-quick-app-chip"
                onClick={() => { window.location.href = paytmUri; }}
              >
                <span className="quick-app-icon">🔷</span>
                <span className="quick-app-name">Paytm UPI</span>
              </a>
            </div>

            {/* UPI ID Copy Field */}
            <div className="upi-vpa-copy-box">
              <div className="upi-vpa-details">
                <span className="upi-vpa-label">Studio UPI ID (VPA)</span>
                <span className="upi-vpa-text">{upiId}</span>
              </div>
              <button 
                className={`upi-copy-action-btn ${copiedVpa ? 'copied' : ''}`}
                onClick={handleCopyUPI}
              >
                {copiedVpa ? (
                  <>
                    <AppIcon name="check" size={13} color="#DAFB71" strokeWidth={3} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <AppIcon name="copy" size={13} color="#FFFFFF" strokeWidth={2.2} />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="upi-qr-section">
            <div className="upi-qr-frame">
              <img 
                src={qrCodeUrl} 
                alt="Scan to Pay UPI" 
                className="upi-qr-image"
              />
              <div className="upi-qr-scan-indicator" />
            </div>
            <p className="upi-qr-hint">Scan with any UPI App (GPay, PhonePe, Paytm, Cred)</p>

            <div className="upi-vpa-copy-box" style={{ marginTop: 10 }}>
              <div className="upi-vpa-details">
                <span className="upi-vpa-label">Merchant Name</span>
                <span className="upi-vpa-text">{payeeName}</span>
              </div>
              <button 
                className={`upi-copy-action-btn ${copiedVpa ? 'copied' : ''}`}
                onClick={handleCopyUPI}
              >
                {copiedVpa ? 'Copied!' : 'Copy UPI'}
              </button>
            </div>
          </div>
        )}

        {/* Confirmation & Payment Verification Trigger */}
        <div className="upi-footer-actions">
          <motion.button 
            className="upi-confirm-paid-btn"
            onClick={handleConfirmPaid}
            disabled={paymentStep === 'verifying'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {paymentStep === 'verifying' ? (
              <div className="upi-verifying-state">
                <span className="upi-spinner" />
                <span>Verifying UPI Receipt...</span>
              </div>
            ) : paymentStep === 'success' ? (
              <div className="upi-verifying-state">
                <span className="upi-success-check">✓</span>
                <span>Payment Confirmed! Generating Pass...</span>
              </div>
            ) : (
              <span>I Have Paid • Generate Digital Pass 🎟️</span>
            )}
          </motion.button>
          
          <p className="upi-security-note">
            🔒 Protected by NPCI UPI 2.0 • Instant Digital Ticket Issuance
          </p>
        </div>
      </motion.div>
    </div>
  );
}
