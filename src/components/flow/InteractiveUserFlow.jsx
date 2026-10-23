import React, { useState } from 'react';
import { motion } from 'motion/react';
import './InteractiveUserFlow.css';

// Exact coordinate map matching Behance User Flow Slide
const NODES = [
  // Level 0: Splash (Root)
  { id: 'splash', label: 'Splash Screen', x: 500, y: 45, type: 'root', screen: 'onboarding' },

  // Level 1: Auth
  { id: 'forgot', label: 'Forget Password', x: 310, y: 125, type: 'standard', screen: 'onboarding' },
  { id: 'login', label: 'Log In', x: 500, y: 125, type: 'standard', screen: 'home' },
  { id: 'signup', label: 'Sign Up', x: 690, y: 125, type: 'standard', screen: 'onboarding' },

  // Level 2: Dashboard
  { id: 'dashboard', label: 'Dashboard', x: 500, y: 205, type: 'standard', screen: 'home' },

  // Level 3: Navigation Hubs (5 Columns)
  { id: 'home', label: 'Home', x: 130, y: 290, type: 'standard', screen: 'home' },
  { id: 'favorites', label: 'Favorites', x: 315, y: 290, type: 'standard', screen: 'details' },
  { id: 'search', label: 'Search', x: 500, y: 290, type: 'standard', screen: 'home' },
  { id: 'mytickets', label: 'My Tickets', x: 685, y: 290, type: 'standard', screen: 'ticket' },
  { id: 'profile', label: 'Profile', x: 870, y: 290, type: 'standard', screen: 'ticket' },

  // Level 4: Category / Sub-actions
  { id: 'categories', label: 'Categories', x: 210, y: 375, type: 'standard', screen: 'home' },
  { id: 'filters', label: 'Filters', x: 420, y: 375, type: 'standard', screen: 'home' },
  { id: 'upcoming', label: 'Upcoming', x: 605, y: 375, type: 'standard', screen: 'ticket' },
  { id: 'past', label: 'Past', x: 745, y: 375, type: 'standard', screen: 'ticket' },
  { id: 'profileinfo', label: 'Profile Info', x: 920, y: 375, type: 'standard', screen: 'ticket' },

  // Level 5: Detailed Views
  { id: 'details', label: 'Event Details', x: 210, y: 460, type: 'standard', screen: 'details' },
  { id: 'selectevent', label: 'Select Event', x: 470, y: 460, type: 'standard', screen: 'details' },
  { id: 'notification', label: 'Notification', x: 830, y: 460, type: 'standard', screen: 'ticket' },

  // Level 6: Action Junctions
  { id: 'addtocard', label: 'Add to Card', x: 340, y: 545, type: 'standard', screen: 'details' },
  { id: 'screenticket', label: 'Screen Ticket', x: 680, y: 545, type: 'standard', screen: 'ticket' },

  // Level 7: Final Checkouts & Gate
  { id: 'checkout', label: 'Checkout', x: 340, y: 630, type: 'standard', screen: 'details' },
  { id: 'qrcode', label: 'QR Code', x: 585, y: 630, type: 'standard', screen: 'ticket' },
  { id: 'download', label: 'Download', x: 775, y: 630, type: 'standard', screen: 'ticket' }
];

// Structural Branch Connections matching Behance Flow
const EDGES = [
  // Splash to Auth
  { from: 'splash', to: 'forgot' },
  { from: 'splash', to: 'login' },
  { from: 'splash', to: 'signup' },

  // Login to Dashboard
  { from: 'login', to: 'dashboard' },

  // Dashboard to 5 Tabs
  { from: 'dashboard', to: 'home' },
  { from: 'dashboard', to: 'favorites' },
  { from: 'dashboard', to: 'search' },
  { from: 'dashboard', to: 'mytickets' },
  { from: 'dashboard', to: 'profile' },

  // Tabs to Sub-levels
  { from: 'home', to: 'categories' },
  { from: 'search', to: 'filters' },
  { from: 'mytickets', to: 'upcoming' },
  { from: 'mytickets', to: 'past' },
  { from: 'profile', to: 'profileinfo' },

  // Sub-levels to Detail
  { from: 'categories', to: 'details' },
  { from: 'filters', to: 'selectevent' },
  { from: 'profileinfo', to: 'notification' },

  // Detail to Add to Card
  { from: 'details', to: 'addtocard' },
  { from: 'selectevent', to: 'addtocard' },

  // Upcoming to Screen Ticket
  { from: 'upcoming', to: 'screenticket' },

  // Bottom actions
  { from: 'addtocard', to: 'checkout' },
  { from: 'screenticket', to: 'qrcode' },
  { from: 'screenticket', to: 'download' }
];

export default function InteractiveUserFlow({ onNavigateScreen = () => {} }) {
  const [activeNode, setActiveNode] = useState(null);

  // Generate cubic bezier curve between two nodes
  const getPath = (source, target) => {
    const s = NODES.find(n => n.id === source);
    const t = NODES.find(n => n.id === target);
    if (!s || !t) return '';

    const startX = s.x;
    const startY = s.y + 16;
    const endX = t.x;
    const endY = t.y - 16;
    const midY = (startY + endY) / 2;

    return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
  };

  return (
    <div className="flow-interactive-wrapper">
      <svg 
        className="flow-canvas-svg" 
        viewBox="0 0 1000 700" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF8248" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#292522" stopOpacity="0.6" />
          </linearGradient>
          <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connecting Edges */}
        {EDGES.map((edge, idx) => {
          const isHighlighted = activeNode && (edge.from === activeNode || edge.to === activeNode);
          return (
            <g key={idx}>
              {/* Background dark pipe */}
              <path
                d={getPath(edge.from, edge.to)}
                fill="none"
                stroke="#2B303C"
                strokeWidth={isHighlighted ? "2.5" : "1.8"}
                strokeLinecap="round"
                className="flow-base-edge"
              />
              {/* Highlight active energy line */}
              {isHighlighted && (
                <path
                  d={getPath(edge.from, edge.to)}
                  fill="none"
                  stroke="url(#edgeGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="flow-active-pulse"
                />
              )}
            </g>
          );
        })}

        {/* Junction anchor dots */}
        {NODES.map(node => (
          <circle
            key={`dot-${node.id}`}
            cx={node.x}
            cy={node.y - 16}
            r="3"
            fill="#FFFFFF"
            className="flow-junction-dot"
          />
        ))}
      </svg>

      {/* HTML Interactive Nodes positioned over SVG canvas */}
      <div className="flow-nodes-overlay">
        {NODES.map((node) => {
          const isRoot = node.type === 'root';
          const isCurrentActive = activeNode === node.id;

          return (
            <motion.div
              key={node.id}
              className={`flow-node-pill ${isRoot ? 'pill-root-lime' : 'pill-standard'} ${isCurrentActive ? 'node-active' : ''}`}
              style={{
                left: `${(node.x / 1000) * 100}%`,
                top: `${(node.y / 700) * 100}%`
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => onNavigateScreen(node.screen)}
              title={`Click to jump to ${node.label} (${node.screen} screen)`}
            >
              <span className="node-text">{node.label}</span>
              {isRoot && <span className="root-pulse-ring" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
