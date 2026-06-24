import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../lib/assetsConfig';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Achievements', 'Focus', 'Contact'];
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    const sectionKey = section.toLowerCase();
    setActiveSection(sectionKey);
    const elementId = sectionKey === 'focus' ? 'current-focus' : sectionKey;
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showFullNavbar = !isScrolled || isHovered;

  return (
    <motion.header 
      initial={{ y: -50, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24, mass: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        zIndex: 1000,
        width: 'max-content',
        maxWidth: '95%',
      }}
    >
      <motion.div 
        layout
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: showFullNavbar ? '24px' : '12px',
          padding: showFullNavbar ? '10px 10px 10px 20px' : '8px 20px 8px 8px',
          borderRadius: '9999px',
          backgroundColor: 'var(--nav-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          cursor: !showFullNavbar ? 'pointer' : 'default',
        }}
      >
        {/* Avatar headshot */}
        <motion.div layout style={{ display: 'flex', alignItems: 'center' }}>
          <motion.img 
            layout
            src={ASSETS.duncanPortrait} 
            alt="Vinayak Avatar" 
            style={{
              width: showFullNavbar ? '38px' : '34px',
              height: showFullNavbar ? '38px' : '34px',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              border: '1px solid var(--border-color)',
            }}
          />
        </motion.div>

        {/* Dynamic Content Switching with Layout Transition */}
        <AnimatePresence mode="popLayout">
          {showFullNavbar ? (
            <motion.div
              key="full-nav"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              {/* Navigation items */}
              <nav className="nav-scroll-container">
                {navItems.map((item) => {
                  const isSelected = activeSection === item.toLowerCase();
                  return (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={`nav-item-btn ${isSelected ? 'selected' : ''}`}
                      style={{
                        color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                      }}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeNavBackground"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            zIndex: -1,
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {item}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          ) : (
            <motion.div
              key="shrunk-nav"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '0.94rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.02em',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                }}
              >
                Available for work
              </span>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--status-dot)',
                  boxShadow: 'var(--status-dot-shadow)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        .nav-scroll-container {
          display: flex;
          gap: 6px;
        }
        .nav-item-btn {
          position: relative;
          padding: 8px 16px;
          border-radius: 9999px;
          border: none;
          background: none;
          font-size: 0.92rem;
          font-weight: 500;
          cursor: pointer;
          font-family: var(--font-body);
          white-space: nowrap;
          transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-item-btn:hover {
          color: var(--text-primary);
        }
        .nav-item-btn::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 16px;
          right: 16px;
          height: 2px;
          border-radius: 9999px;
          background-color: var(--accent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-item-btn:hover::after {
          transform: scaleX(1);
        }
        @media (max-width: 900px) {
          .nav-scroll-container {
            max-width: 60vw;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .nav-scroll-container::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </motion.header>
  );
};
