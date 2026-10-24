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
      {/* 1. Curved Dome Skeleton */}
      <div className="skel-curved-dome">
        <div className="skel-dome-top">
          <div className="skel-pill skel-venue-capsule" />
          <div className="skel-dome-actions">
            <div className="skel-circle skel-sm-circle" />
            <div className="skel-circle skel-sm-circle" />
            <div className="skel-circle skel-avatar-circle" />
          </div>
        </div>

        <div className="skel-dome-card">
          <div className="skel-line skel-eyebrow" />
          <div className="skel-line skel-title-large" />
          <div className="skel-dome-footer">
            <div className="skel-line skel-timing" />
            <div className="skel-pill skel-btn-pill" />
          </div>
        </div>
      </div>

      {/* 2. Warm Sheet Skeleton */}
      <div className="skel-warm-sheet">
        {/* Vibe Orbs Skeleton */}
        <div className="skel-section-head">
          <div className="skel-line skel-label" />
          <div className="skel-line skel-meta" />
        </div>
        <div className="skel-vibe-orbs-row">
          <div className="skel-circle skel-vibe-orb" />
          <div className="skel-circle skel-vibe-orb" />
          <div className="skel-circle skel-vibe-orb" />
          <div className="skel-circle skel-vibe-orb" />
          <div className="skel-circle skel-vibe-orb" />
        </div>

        {/* Passes Skeleton */}
        <div className="skel-section-head" style={{ marginTop: 14 }}>
          <div className="skel-line skel-label" />
          <div className="skel-line skel-meta" />
        </div>
        <div className="skel-passes-row">
          <div className="skel-pass-card" />
          <div className="skel-pass-card" />
        </div>

        {/* Bento Duo Skeleton */}
        <div className="skel-bento-duo">
          <div className="skel-bento-box" />
          <div className="skel-bento-box" />
        </div>
      </div>
    </motion.div>
  );
}
