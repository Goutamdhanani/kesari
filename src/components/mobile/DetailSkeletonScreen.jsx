import React from 'react';
import { motion } from 'motion/react';
import './DetailSkeletonScreen.css';

export default function DetailSkeletonScreen() {
  return (
    <motion.div 
      className="detail-skeleton-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      {/* Hero Poster Banner Skeleton with Back & Fav buttons */}
      <div className="skel-detail-hero">
        <div className="skel-hero-nav">
          <div className="skel-circle skel-hero-btn" />
          <div className="skel-circle skel-hero-btn" />
        </div>
      </div>

      {/* Main Details Sheet */}
      <div className="skel-detail-sheet">
        <div className="skel-pill skel-detail-badge" />
        <div className="skel-bar skel-detail-title" />
        <div className="skel-bar skel-detail-artist" />

        {/* Date, Time & Venue Chips */}
        <div className="skel-detail-info-row">
          <div className="skel-detail-info-item">
            <div className="skel-circle skel-info-icon" />
            <div className="skel-bar skel-info-line" />
          </div>
          <div className="skel-detail-info-item">
            <div className="skel-circle skel-info-icon" />
            <div className="skel-bar skel-info-line" />
          </div>
        </div>

        {/* Lineup Section Skeleton */}
        <div className="skel-detail-section">
          <div className="skel-bar skel-sec-title" />
          <div className="skel-lineup-avatars-row">
            <div className="skel-circle skel-lineup-avatar" />
            <div className="skel-circle skel-lineup-avatar" />
            <div className="skel-circle skel-lineup-avatar" />
          </div>
        </div>

        {/* Ticket Tiers Skeleton */}
        <div className="skel-detail-section">
          <div className="skel-bar skel-sec-title" />
          <div className="skel-tier-cards-column">
            <div className="skel-tier-card-active" />
            <div className="skel-tier-card" />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar Skeleton */}
      <div className="skel-detail-bottom-bar">
        <div className="skel-price-box">
          <div className="skel-bar skel-price-label" />
          <div className="skel-bar skel-price-num" />
        </div>
        <div className="skel-pill skel-book-btn" />
      </div>
    </motion.div>
  );
}
