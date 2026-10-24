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
      {/* Top Header */}
      <div className="skel-explore-header">
        <div className="skel-header-left">
          <div className="skel-circle skel-back-circle" />
          <div className="skel-header-titles">
            <div className="skel-bar skel-title-bar" />
            <div className="skel-bar skel-sub-bar" />
          </div>
        </div>
        <div className="skel-pill skel-city-chip" />
      </div>

      {/* Timeline Filter Pills */}
      <div className="skel-explore-timeline-row">
        <div className="skel-pill skel-timeline-pill-active" />
        <div className="skel-pill skel-timeline-pill" />
        <div className="skel-pill skel-timeline-pill" />
      </div>

      {/* Category Filter Pills */}
      <div className="skel-explore-category-row">
        <div className="skel-pill skel-cat-pill" />
        <div className="skel-pill skel-cat-pill" />
        <div className="skel-pill skel-cat-pill" />
        <div className="skel-pill skel-cat-pill" />
      </div>

      {/* Events Grid / Cards */}
      <div className="skel-explore-cards-list">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skel-explore-event-card">
            <div className="skel-card-poster" />
            <div className="skel-card-body">
              <div className="skel-card-top-row">
                <div className="skel-bar skel-card-date" />
                <div className="skel-pill skel-card-badge" />
              </div>
              <div className="skel-bar skel-card-title" />
              <div className="skel-bar skel-card-venue" />
              <div className="skel-card-footer">
                <div className="skel-bar skel-card-price" />
                <div className="skel-circle skel-card-action" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
