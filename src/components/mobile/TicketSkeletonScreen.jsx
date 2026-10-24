import React from 'react';
import { motion } from 'motion/react';
import './TicketSkeletonScreen.css';

export default function TicketSkeletonScreen() {
  return (
    <motion.div 
      className="ticket-skeleton-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      {/* Top Header */}
      <div className="skel-ticket-header">
        <div className="skel-circle skel-ticket-nav-btn" />
        <div className="skel-bar skel-ticket-screen-title" />
        <div className="skel-circle skel-ticket-nav-btn" />
      </div>

      {/* Physical Ticket Pass Skeleton */}
      <div className="skel-ticket-pass-container">
        <div className="skel-ticket-pass-card">
          {/* Top Artwork / Poster Area */}
          <div className="skel-ticket-artwork-box" />

          {/* Ticket Information Body */}
          <div className="skel-ticket-pass-body">
            <div className="skel-bar skel-tkt-eyebrow" />
            <div className="skel-bar skel-tkt-title" />
            
            <div className="skel-tkt-meta-grid">
              <div className="skel-tkt-meta-cell">
                <div className="skel-bar skel-meta-sub" />
                <div className="skel-bar skel-meta-val" />
              </div>
              <div className="skel-tkt-meta-cell">
                <div className="skel-bar skel-meta-sub" />
                <div className="skel-bar skel-meta-val" />
              </div>
            </div>

            {/* Perforated Divider Line */}
            <div className="skel-tkt-perforated-line" />

            {/* Barcode & Fast Track Section */}
            <div className="skel-tkt-qr-row">
              <div className="skel-qr-code-box" />
              <div className="skel-qr-info-lines">
                <div className="skel-bar skel-qr-hash" />
                <div className="skel-bar skel-qr-gate" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons (Apple Wallet & Share) */}
      <div className="skel-ticket-actions-row">
        <div className="skel-pill skel-wallet-btn" />
        <div className="skel-circle skel-share-btn" />
      </div>
    </motion.div>
  );
}
