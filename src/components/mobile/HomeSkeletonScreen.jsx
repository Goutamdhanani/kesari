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
          <div className="skel-pill skel-venue-pill" />
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
      <div className="skel-search-capsule" />

      {/* 4. Stage Chips Skeleton */}
      <div className="skel-chips-row">
        <div className="skel-pill skel-chip-active" />
        <div className="skel-pill skel-chip" />
        <div className="skel-pill skel-chip" />
        <div className="skel-pill skel-chip" />
      </div>

      {/* 5. Spotlight Hero Skeleton */}
      <div className="skel-spotlight-card" />

      {/* 6. Bento Grid Skeleton (2x2) */}
      <div className="skel-bento-header">
        <div className="skel-line skel-bento-title" />
        <div className="skel-line skel-bento-badge" />
      </div>

      <div className="skel-bento-grid">
        <div className="skel-bento-card" />
        <div className="skel-bento-card" />
        <div className="skel-bento-card" />
        <div className="skel-bento-card" />
      </div>
    </motion.div>
  );
}
