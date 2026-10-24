import React from 'react';
import { motion } from 'motion/react';
import './HomeSkeletonScreen.css';

export default function HomeSkeletonScreen() {
  return (
    <motion.div 
      className="home-skeleton-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* 1. Header Skeleton */}
      <div className="skel-header">
        <div className="skel-row-left">
          <div className="skel-circle skel-avatar" />
          <div className="skel-pill skel-location" />
        </div>
        <div className="skel-row-right">
          <div className="skel-circle skel-refresh" />
          <div className="skel-circle skel-bell" />
        </div>
      </div>

      {/* 2. Greeting Skeleton */}
      <div className="skel-greeting">
        <div className="skel-line skel-eyebrow" />
        <div className="skel-line skel-headline" />
        <div className="skel-line skel-subtext" />
      </div>

      {/* 3. Search Bar Skeleton */}
      <div className="skel-search-bar" />

      {/* 4. Category Chips Skeleton */}
      <div className="skel-chips-row">
        <div className="skel-pill skel-chip-active" />
        <div className="skel-pill skel-chip" />
        <div className="skel-pill skel-chip" />
        <div className="skel-pill skel-chip" />
        <div className="skel-pill skel-chip" />
      </div>

      {/* 6. Upcoming Event Card Skeleton */}
      <div className="skel-upcoming-card">
        <div className="skel-upcoming-thumb" />
        <div className="skel-upcoming-text">
          <div className="skel-line skel-upcoming-tag" />
          <div className="skel-line skel-upcoming-title" />
        </div>
        <div className="skel-circle skel-upcoming-btn" />
      </div>

      {/* 7. Popular Section Skeleton */}
      <div className="skel-section-header">
        <div className="skel-line skel-section-title" />
        <div className="skel-line skel-see-all" />
      </div>

      <div className="skel-carousel-row">
        <div className="skel-card-tall" />
        <div className="skel-card-tall" />
      </div>

      {/* 8. Nearby Section Skeleton */}
      <div className="skel-section-header">
        <div className="skel-line skel-section-title" />
        <div className="skel-line skel-see-all" />
      </div>

      <div className="skel-nearby-list">
        <div className="skel-nearby-row">
          <div className="skel-nearby-thumb" />
          <div className="skel-nearby-info">
            <div className="skel-line skel-nearby-cat" />
            <div className="skel-line skel-nearby-title" />
            <div className="skel-line skel-nearby-meta" />
          </div>
          <div className="skel-line skel-nearby-price" />
        </div>

        <div className="skel-nearby-row">
          <div className="skel-nearby-thumb" />
          <div className="skel-nearby-info">
            <div className="skel-line skel-nearby-cat" />
            <div className="skel-line skel-nearby-title" />
            <div className="skel-line skel-nearby-meta" />
          </div>
          <div className="skel-line skel-nearby-price" />
        </div>
      </div>
    </motion.div>
  );
}
