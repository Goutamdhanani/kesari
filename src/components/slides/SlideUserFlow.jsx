import React, { useState } from 'react';
import { motion } from 'motion/react';
import InteractiveUserFlow from '../flow/InteractiveUserFlow';
import './SlideUserFlow.css';

export default function SlideUserFlow({ onNavigateScreen = () => {} }) {
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' | 'reference'

  return (
    <motion.section 
      className="behance-slide-userflow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Header */}
      <div className="flow-header">
        <h2 className="flow-title">User Flow</h2>
        <div className="flow-header-right">
          <div className="flow-view-toggle">
            <button 
              className={`flow-toggle-chip ${viewMode === 'interactive' ? 'active' : ''}`}
              onClick={() => setViewMode('interactive')}
            >
              ⚡ Interactive Flow Engine
            </button>
            <button 
              className={`flow-toggle-chip ${viewMode === 'reference' ? 'active' : ''}`}
              onClick={() => setViewMode('reference')}
            >
              📷 Behance Spec
            </button>
          </div>
          <p className="flow-statement">
            We’ve streamlined the flow to ensure users can purchase tickets in seconds without any confusing hurdles.
          </p>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div className="flow-diagram-stage">
        {viewMode === 'interactive' ? (
          <InteractiveUserFlow onNavigateScreen={onNavigateScreen} />
        ) : (
          <div className="flow-diagram-container">
            <img 
              src="/assets/clean_flowchart_tree.png" 
              alt="User Flow Architecture Spec" 
              className="flow-diagram-img" 
            />
          </div>
        )}
      </div>
    </motion.section>
  );
}
