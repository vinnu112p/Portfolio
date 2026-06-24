import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cloud, Workflow, Layers, Palette, ChevronDown } from 'lucide-react';

interface SubFocus {
  title: string;
  desc: string;
}

interface FocusNode {
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<any>;
  angle: number; // in degrees, North is -90
  subItems: SubFocus[];
}

const focusNodes: FocusNode[] = [
  {
    title: 'AI Systems',
    category: 'INTELLIGENT REASONING',
    description: 'Building intelligent applications, retrieval systems, AI-powered experiences, and practical integrations that solve real-world problems.',
    icon: Brain,
    angle: -90, // North
    subItems: [
      { title: 'Agentic Workflows', desc: 'Designing multi-agent systems and automated decision loops.' },
      { title: 'Retrieval-Augmented Generation (RAG)', desc: 'Building semantic search pipelines using vector databases.' },
      { title: 'Cognitive Integration', desc: 'Integrating deep learning models to perform complex reasoning tasks.' }
    ]
  },
  {
    title: 'Cloud Infrastructure',
    category: 'SCALABILITY & PROVISIONING',
    description: 'Exploring deployment strategies, cloud architecture, scalability, and production environments with AWS.',
    icon: Cloud,
    angle: -18, // East-North-East
    subItems: [
      { title: 'AWS Ecosystem', desc: 'Deploying services using EC2, Lambda, S3, RDS, and API Gateway.' },
      { title: 'Containerization', desc: 'Packaging applications with Docker for portable execution.' },
      { title: 'Serverless Architecture', desc: 'Architecting cost-efficient, auto-scaling event-driven functions.' }
    ]
  },
  {
    title: 'Automation & Workflows',
    category: 'EFFICIENCY & PIPELINES',
    description: 'Designing automation pipelines and workflow systems that improve efficiency and reduce manual effort using modern automation tools.',
    icon: Workflow,
    angle: 54, // East-South-East
    subItems: [
      { title: 'CI/CD Pipelines', desc: 'Automating code verification and deployments with GitHub Actions.' },
      { title: 'Scripted Automation', desc: 'Writing clean, robust scripts to automate administrative tasks.' },
      { title: 'Integration Hubs', desc: 'Connecting APIs to streamline data flows between business tools.' }
    ]
  },
  {
    title: 'System Design',
    category: 'ARCHITECTURE & PERFORMANCE',
    description: 'Understanding how large-scale applications are structured, optimized, and maintained in production environments.',
    icon: Layers,
    angle: 126, // West-South-West
    subItems: [
      { title: 'Microservices', desc: 'Breaking monolithic databases and logic into decoupled, scalable services.' },
      { title: 'Distributed Caching', desc: 'Implementing Redis and CDNs to lower latency and database load.' },
      { title: 'High Availability', desc: 'Load balancing and failover strategies for zero-downtime operations.' }
    ]
  },
  {
    title: 'Product Design',
    category: 'AESTHETICS & INTERACTION',
    description: 'Creating intuitive interfaces and meaningful user experiences that balance usability, aesthetics, and functionality.',
    icon: Palette,
    angle: 198, // West-North-West
    subItems: [
      { title: 'Micro-interactions', desc: 'Designing smooth transitions and tactile response animations.' },
      { title: 'Typography & Grid', desc: 'Creating visual hierarchy and layout balance for legibility.' },
      { title: 'User-Centric UX', desc: 'Researching user flows to reduce cognitive friction and drop-offs.' }
    ]
  }
];

// Degree lines inside compass (30-deg steps)
const tickAngles = Array.from({ length: 12 }).map((_, i) => i * 30);

// Diagonal angles for degree numbers (avoids overlap with nodes)
const diagonalDegrees = [
  { label: '045°', angle: -45 },
  { label: '135°', angle: 45 },
  { label: '225°', angle: 135 },
  { label: '315°', angle: 225 }
];

// Returns structural alignment settings for labels depending on radial quadrant
const getLabelAlignment = (angle: number) => {
  if (angle === -90) { // Top (North)
    return {
      xOffset: 0,
      yOffset: -34,
      transform: 'translate(-50%, -50%)',
      align: 'center' as const
    };
  }
  if (angle === -18 || angle === 54) { // Right side (East / South-East)
    return {
      xOffset: 34,
      yOffset: 0,
      transform: 'translate(0%, -50%)',
      align: 'left' as const
    };
  }
  if (angle === 126 || angle === 198) { // Left side (West / South-West)
    return {
      xOffset: -34,
      yOffset: 0,
      transform: 'translate(-100%, -50%)',
      align: 'right' as const
    };
  }
  return {
    xOffset: 0,
    yOffset: 34,
    transform: 'translate(-50%, -50%)',
    align: 'center' as const
  };
};

interface CurrentFocusProps {
  theme: string;
}

export const CurrentFocus: React.FC<CurrentFocusProps> = ({ theme }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [isCompassActive, setIsCompassActive] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Set up screen-size detection for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle device orientation events for live compass
  const handleOrientation = (e: DeviceOrientationEvent) => {
    const heading = (e as any).webkitCompassHeading !== undefined
      ? (e as any).webkitCompassHeading
      : (e.alpha !== null ? 360 - e.alpha : null);

    if (heading !== null) {
      setDeviceHeading(Math.round(heading));
    }
  };

  const toggleRealCompass = async () => {
    if (isCompassActive) {
      window.removeEventListener('deviceorientation', handleOrientation);
      setDeviceHeading(null);
      setIsCompassActive(false);
    } else {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
            setIsCompassActive(true);
          } else {
            alert('Compass access was denied. Please enable motion access to use the live compass.');
          }
        } catch (err) {
          console.error('Error requesting device orientation:', err);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
        setIsCompassActive(true);
      }
    }
  };

  // Clean up orientation listener
  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const isDark = theme === 'dark';
  const activeNode = focusNodes[activeIndex];

  // Map needle rotation. Compass needle points to top (0 deg rotation) by default.
  // Needle rotation = nodeAngle + 90
  const needleRotation = activeNode.angle + 90;

  return (
    <section
      id="current-focus"
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        position: 'relative',
        transition: 'background-color var(--transition-speed) ease',
      }}
    >
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '80px' }}>
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            Future Direction
          </span>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Current Focus
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              lineHeight: 1.5,
              fontWeight: 300,
            }}
          >
            The areas I am actively exploring to build more scalable, intelligent, and impactful digital products.
          </p>
        </div>

        {/* Large Layout Split */}
        {!isMobile ? (
          /* DESKTOP VIEW */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '440px 1fr',
              gap: '150px', // Gap between compass and details panel
              alignItems: 'center',
              minHeight: '480px',
            }}
          >
            {/* Left Column: Interactive Compass Instrument (Shifted Left) */}
            <div
              style={{
                position: 'relative',
                width: '440px',
                height: '440px',
                margin: '0 auto 0 -50px', // Shift left to utilize left gutter and prevent right overlap
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* SVG HUD Grid & Connection Lines */}
              <svg
                width="440"
                height="440"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  overflow: 'visible',
                  pointerEvents: 'none',
                }}
              >
                {/* Outer Ring Ticks */}
                {tickAngles.map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 220 + 172 * Math.cos(rad);
                  const y1 = 220 + 172 * Math.sin(rad);
                  const x2 = 220 + 180 * Math.cos(rad);
                  const y2 = 220 + 180 * Math.sin(rad);
                  return (
                    <line
                      key={angle}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--border-color)"
                      strokeWidth={angle % 90 === 0 ? 1.5 : 1}
                      opacity={0.3}
                    />
                  );
                })}

                {/* Instrument circular rings */}
                <circle cx="220" cy="220" r="170" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3 3" opacity={0.6} />
                <circle cx="220" cy="220" r="100" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="2 2" opacity={0.4} />

                {/* Compass Degree Numbers at Diagonal Angles */}
                {diagonalDegrees.map((deg, dIdx) => {
                  const rad = (deg.angle * Math.PI) / 180;
                  const x = 220 + 182 * Math.cos(rad);
                  const y = 220 + 182 * Math.sin(rad);
                  return (
                    <text
                      key={dIdx}
                      x={x}
                      y={y + 3}
                      textAnchor="middle"
                      fill="var(--text-secondary)"
                      fontSize="7"
                      opacity="0.35"
                      fontFamily="monospace"
                    >
                      {deg.label}
                    </text>
                  );
                })}

                {/* Radial Lines to Nodes */}
                {focusNodes.map((node, index) => {
                  const angleRad = (node.angle * Math.PI) / 180;
                  const isActive = index === activeIndex;
                  const currentR = isActive ? 100 : 145;
                  const endX = 220 + currentR * Math.cos(angleRad);
                  const endY = 220 + currentR * Math.sin(angleRad);

                  return (
                    <g key={index}>
                      <motion.line
                        x1="220"
                        y1="220"
                        animate={{
                          x2: endX,
                          y2: endY,
                          stroke: isActive ? 'var(--accent)' : 'var(--border-color)',
                          strokeWidth: isActive ? 2 : 1,
                          opacity: isActive ? 0.7 : 0.2,
                        }}
                        transition={{ type: 'spring', stiffness: 150, damping: 18 }}
                      />
                      
                      {/* Animated dashed marching pulse for active line */}
                      {isActive && (
                        <motion.line
                          x1="220"
                          y1="220"
                          animate={{
                            x2: endX,
                            y2: endY,
                            strokeDashoffset: [0, -20],
                          }}
                          transition={{
                            strokeDashoffset: { repeat: Infinity, duration: 0.8, ease: 'linear' },
                            x2: { type: 'spring', stiffness: 150, damping: 18 },
                            y2: { type: 'spring', stiffness: 150, damping: 18 },
                          }}
                          stroke="var(--accent)"
                          strokeWidth="2"
                          strokeDasharray="5 5"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Center Hub Dial & Rotating Pointer */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 10,
                  boxShadow: isDark 
                    ? '0 8px 30px rgba(0, 0, 0, 0.6), inset 0 2px 10px rgba(255,255,255,0.03)' 
                    : '0 8px 24px rgba(0,0,0,0.06), inset 0 2px 5px rgba(0,0,0,0.02)',
                }}
              >
                {/* Secondary inner ring */}
                <div style={{ position: 'absolute', inset: '4px', borderRadius: '50%', border: '1px dashed var(--border-color)', opacity: 0.35 }} />

                {/* Centered Pointer Needle */}
                <motion.div
                  animate={{ rotate: needleRotation }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  style={{
                    position: 'absolute',
                    width: '12px',
                    height: '74px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  {/* Top pointer - accent color */}
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderBottom: '37px solid var(--accent)',
                    filter: 'none',
                  }} />
                  
                  {/* Bottom tail - de-emphasized */}
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '37px solid var(--text-secondary)',
                    opacity: 0.35,
                  }} />
                </motion.div>

                {/* Center Cap Pivot */}
                <div style={{
                  position: 'absolute',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  border: '2px solid var(--accent)',
                  boxShadow: 'none',
                }} />
              </motion.div>

              {/* Orbiting Interactive Focus Nodes */}
              {focusNodes.map((node, index) => {
                const angleRad = (node.angle * Math.PI) / 180;
                const isActive = index === activeIndex;
                const currentR = isActive ? 100 : 145;
                
                const targetX = currentR * Math.cos(angleRad);
                const targetY = currentR * Math.sin(angleRad);

                // Compute quadrant-specific label offsets & alignments
                const alignInfo = getLabelAlignment(node.angle);
                const labelX = targetX + alignInfo.xOffset;
                const labelY = targetY + alignInfo.yOffset;

                return (
                  <React.Fragment key={index}>
                    {/* Focus Area Label (Dynamic positioning centered next to node) */}
                    <motion.div
                      animate={{
                        x: labelX,
                        y: labelY,
                        opacity: isActive ? 1 : 0.45,
                      }}
                      transition={{ type: 'spring', stiffness: 150, damping: 18 }}
                      style={{
                        position: 'absolute',
                        left: '220px',
                        top: '220px',
                        transform: alignInfo.transform,
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                        textShadow: 'none',
                        textAlign: alignInfo.align,
                        zIndex: 25,
                      }}
                    >
                      {node.title}
                    </motion.div>

                    {/* Orbiting Button */}
                    <motion.button
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      whileHover={{ scale: isActive ? 1.2 : 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        x: targetX,
                        y: targetY,
                        scale: isActive ? 1.2 : 0.9,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      transition={{ type: 'spring', stiffness: 150, damping: 18 }}
                      style={{
                        position: 'absolute',
                        left: '220px',
                        top: '220px',
                        transform: 'translate(-50%, -50%)',
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'var(--accent)' : 'var(--bg-card)',
                        border: isActive ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: isActive ? 'var(--accent-text)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 20,
                        outline: 'none',
                        transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
                      }}
                    >
                      {React.createElement(node.icon, { size: 18 })}
                    </motion.button>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Right Column: Selected Focus Details Panel */}
            <div 
              style={{ 
                position: 'relative', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                paddingRight: '60px', // Right gutter for fixed-widgets
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}
                >
                  {/* Title and Category Header */}
                  <div>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {activeNode.category}
                    </span>
                    <h3
                      style={{
                        fontSize: '2.2rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        lineHeight: 1.1,
                      }}
                    >
                      {activeNode.title}
                    </h3>
                  </div>

                  {/* Focus Description */}
                  <p
                    style={{
                      fontSize: '1.05rem',
                      lineHeight: '1.6',
                      color: 'var(--text-secondary)',
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {activeNode.description}
                  </p>

                  {/* Sub-Focus List */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '16px',
                      marginTop: '8px',
                    }}
                  >
                    {activeNode.subItems.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          padding: '16px 20px',
                          borderRadius: '16px',
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '16px',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
                        }}
                        className="sub-focus-item hover-scale"
                      >
                        {/* Glow indicator dot */}
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent)',
                            boxShadow: '0 0 8px var(--accent)',
                            marginTop: '6px',
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <h4
                            style={{
                              fontSize: '1rem',
                              fontWeight: 600,
                              color: 'var(--text-primary)',
                              marginBottom: '4px',
                            }}
                          >
                            {sub.title}
                          </h4>
                          <p
                            style={{
                              fontSize: '0.85rem',
                              color: 'var(--text-secondary)',
                              lineHeight: '1.45',
                              margin: 0,
                              fontWeight: 300,
                            }}
                          >
                            {sub.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* MOBILE VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Centered Mini Compass Indicator with Live Orientation support */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <motion.div
                animate={{ rotate: deviceHeading !== null ? -deviceHeading : 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                }}
              >
                {/* Compass degree markings and ticks */}
                <div style={{ position: 'absolute', inset: '4px', borderRadius: '50%', border: '1px dashed var(--border-color)', opacity: 0.3 }} />
                
                <svg width="130" height="130" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                  <circle cx="65" cy="65" r="50" fill="none" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                  {/* Degree indicators */}
                  <text x="65" y="14" textAnchor="middle" fill="var(--text-secondary)" fontSize="6" opacity="0.4" fontFamily="monospace">N</text>
                  <text x="120" y="67" textAnchor="start" fill="var(--text-secondary)" fontSize="6" opacity="0.4" fontFamily="monospace">E</text>
                  <text x="65" y="122" textAnchor="middle" fill="var(--text-secondary)" fontSize="6" opacity="0.4" fontFamily="monospace">S</text>
                  <text x="10" y="67" textAnchor="end" fill="var(--text-secondary)" fontSize="6" opacity="0.4" fontFamily="monospace">W</text>
                </svg>

                {/* Rotating Pointer */}
                <motion.div
                  animate={{ rotate: needleRotation }}
                  transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                  style={{
                    position: 'absolute',
                    width: '8px',
                    height: '104px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  {/* North pointer (accent) */}
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderBottom: '52px solid var(--accent)',
                  }} />
                  {/* South pointer (tail) */}
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '52px solid var(--text-secondary)',
                    opacity: 0.35,
                  }} />
                </motion.div>

                {/* Pivot */}
                <div style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  border: '1.5px solid var(--accent)',
                  boxShadow: 'none',
                }} />
              </motion.div>

              {/* Sync Compass Button for Mobile Devices */}
              <button
                onClick={toggleRealCompass}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  backgroundColor: isCompassActive ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isCompassActive ? 'var(--accent)' : 'var(--border-color)'}`,
                  color: isCompassActive ? 'var(--accent-text)' : 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
                {isCompassActive ? 'Live Compass: ON' : 'Sync Live Compass'}
              </button>
            </div>

            {/* Mobile Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {focusNodes.map((node, index) => {
                const isOpen = index === activeIndex;
                return (
                  <div
                    key={index}
                    style={{
                      borderRadius: '20px',
                      backgroundColor: 'var(--bg-card)',
                      border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--border-color)'}`,
                      overflow: 'hidden',
                      transition: 'border-color 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    }}
                  >
                    {/* Header Button */}
                    <button
                      onClick={() => setActiveIndex(index)}
                      style={{
                        width: '100%',
                        padding: '20px 24px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        outline: 'none',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: isOpen ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--border-color)'}`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: isOpen ? 'var(--accent-text)' : 'var(--text-primary)',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {React.createElement(node.icon, { size: 16 })}
                        </div>
                        <span style={{ fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.02em', textAlign: 'left' }}>
                          {node.title}
                        </span>
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>

                    {/* Accordion Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--border-color)' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: 'var(--accent)',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            display: 'block',
                            marginTop: '16px',
                            marginBottom: '6px',
                            textAlign: 'left',
                          }}
                        >
                          {node.category}
                        </span>
                        
                        <p
                          style={{
                            fontSize: '0.95rem',
                            lineHeight: '1.55',
                            color: 'var(--text-secondary)',
                            fontWeight: 300,
                            marginBottom: '20px',
                            textAlign: 'left',
                          }}
                        >
                          {node.description}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {node.subItems.map((sub, sIdx) => (
                            <div
                              key={sIdx}
                              style={{
                                padding: '14px 18px',
                                borderRadius: '14px',
                                backgroundColor: 'rgba(255,255,255,0.015)',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                textAlign: 'left',
                              }}
                            >
                              <div
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  backgroundColor: 'var(--accent)',
                                  boxShadow: '0 0 6px var(--accent)',
                                  marginTop: '6px',
                                  flexShrink: 0,
                                }}
                              />
                              <div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>
                                  {sub.title}
                                </h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0, fontWeight: 300 }}>
                                  {sub.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Closing Quote Banner */}
        <div
          style={{
            marginTop: '80px',
            paddingTop: '48px',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                lineHeight: '1.65',
                color: 'var(--text-primary)',
                fontWeight: 300,
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              "I believe great software is built by continuously exploring new technologies, refining existing skills, and understanding how systems evolve at scale."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
