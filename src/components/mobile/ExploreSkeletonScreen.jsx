import React from 'react';
import { motion } from 'motion/react';
import './ExploreSkeletonScreen.css';

export default function ExploreSkeletonScreen() {
  return (
    <motion.div 
      className="explore-skeleton-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      {/* 1. Curved Obsidian Dome Skeleton */}
      <div className="skel-explore-curved-dome">
        <div className="skel-explore-dome-nav">
          <div className="skel-circle skel-explore-back-btn" />
          <div className="skel-explore-title-box">
            <div className="skel-line skel-explore-beacon-line" />
            <div className="skel-line skel-explore-heading-line" />
          </div>
          <div className="skel-pill skel-explore-venue-pill" />
        </div>

        {/* Date Tabs inside Dome */}
        <div className="skel-explore-date-tabs">
          <div className="skel-pill skel-date-pill active" />
          <div className="skel-pill skel-date-pill" />
          <div className="skel-pill skel-date-pill" />
          <div className="skel-pill skel-date-pill" />
        </div>
      </div>

      {/* 2. Warm Alabaster Sheet Skeleton */}
      <div className="skel-explore-warm-sheet">
        {/* Vibe Pills Row */}
        <div className="skel-explore-vibe-row">
          <div className="skel-pill skel-vibe-pill active" />
          <div className="skel-pill skel-vibe-pill" />
          <div className="skel-pill skel-vibe-pill" />
          <div className="skel-pill skel-vibe-pill" />
        </div>

        {/* Section Header */}
        <div className="skel-explore-meta-row">
          <div className="skel-line skel-section-title-line" />
          <div className="skel-line skel-section-count-line" />
        </div>

        {/* Poster Pass Cards Skeleton */}
        <div className="skel-explore-cards-stream">
          {[1, 2].map((item) => (
            <div key={item} className="skel-explore-poster-card">
              <div className="skel-card-top-badges">
                <div className="skel-pill skel-stage-pill" />
                <div className="skel-circle skel-arrow-pill" />
              </div>

              <div className="skel-card-drawer">
                <div className="skel-line skel-drawer-time" />
                <div className="skel-line skel-drawer-title" />
                <div className="skel-line skel-drawer-artist" />
                <div className="skel-drawer-footer">
                  <div className="skel-line skel-drawer-price" />
                  <div className="skel-pill skel-drawer-btn" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
