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
      <div className="skel-curved-dome">
        <div className="skel-dome-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div className="skel-pill" style={{ width: 110, height: 28, borderRadius: 8 }} />
          <div className="skel-dome-actions" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="skel-circle" style={{ width: 34, height: 34, borderRadius: '50%' }} />
            <div className="skel-circle" style={{ width: 34, height: 34, borderRadius: '50%' }} />
          </div>
        </div>

        <div className="skel-dome-card" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 22, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="skel-line" style={{ width: 120, height: 10, borderRadius: 4 }} />
          <div className="skel-line" style={{ width: 180, height: 18, borderRadius: 6 }} />
          <div className="skel-dome-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
            <div className="skel-line" style={{ width: 140, height: 10, borderRadius: 4 }} />
            <div className="skel-pill" style={{ width: 85, height: 26, borderRadius: 999 }} />
          </div>
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
