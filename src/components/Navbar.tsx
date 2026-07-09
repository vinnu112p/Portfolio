import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

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
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, {
          offset: 0,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
            src="/apple-touch-icon.png" 
            alt="Vinayak Avatar" 
            style={{
              width: showFullNavbar ? '38px' : '34px',
              height: showFullNavbar ? '38px' : '34px',
              borderRadius: '50%',
              objectFit: 'cover',
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
                {/* Home */}
                <button
                  onClick={() => handleNavClick('Home')}
                  className={`nav-item-btn ${activeSection === 'home' ? 'selected' : ''}`}
                  style={{
                    color: activeSection === 'home' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {activeSection === 'home' && (
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
                  Home
                </button>

                {/* About */}
                <button
                  onClick={() => handleNavClick('About')}
                  className={`nav-item-btn ${activeSection === 'about' ? 'selected' : ''}`}
                  style={{
                    color: activeSection === 'about' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {activeSection === 'about' && (
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
                  About
                </button>

                {/* Projects */}
                <button
                  onClick={() => handleNavClick('Projects')}
                  className={`nav-item-btn ${activeSection === 'projects' ? 'selected' : ''}`}
                  style={{
                    color: activeSection === 'projects' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {activeSection === 'projects' && (
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
                  Projects
                </button>

                {/* More Dropdown (contains: Experience, Skills, Achievements, Focus) */}
                <div
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                >
                  <button
                    className={`nav-item-btn ${['experience', 'skills', 'achievements', 'focus'].includes(activeSection) ? 'selected' : ''}`}
                    style={{
                      color: ['experience', 'skills', 'achievements', 'focus'].includes(activeSection) ? 'var(--text-primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {['experience', 'skills', 'achievements', 'focus'].includes(activeSection) && (
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
                    More
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          paddingTop: '10px',
                          zIndex: 1010,
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'var(--nav-bg)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '16px',
                            padding: '6px',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            minWidth: '140px',
                          }}
                        >
                          {['Experience', 'Skills', 'Achievements', 'Focus'].map((subItem) => {
                            const isSubSelected = activeSection === subItem.toLowerCase();
                            return (
                              <button
                                key={subItem}
                                onClick={() => {
                                  handleNavClick(subItem);
                                  setIsDropdownOpen(false);
                                }}
                                style={{
                                  padding: '8px 14px',
                                  borderRadius: '10px',
                                  border: 'none',
                                  background: isSubSelected ? 'rgba(255, 255, 255, 0.05)' : 'none',
                                  color: isSubSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                                  fontSize: '0.88rem',
                                  fontWeight: 500,
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  fontFamily: 'var(--font-body)',
                                  width: '100%',
                                  transition: 'background 0.2s, color 0.2s',
                                  whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                  e.currentTarget.style.color = 'var(--text-primary)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = isSubSelected ? 'rgba(255, 255, 255, 0.05)' : 'transparent';
                                  e.currentTarget.style.color = isSubSelected ? 'var(--text-primary)' : 'var(--text-secondary)';
                                }}
                              >
                                {subItem}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* Contact Pill Button */}
              <button
                onClick={() => handleNavClick('Contact')}
                className="nav-contact-btn"
              >
                Contact
              </button>
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
                  backgroundColor: 'var(--accent)',
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
          transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-item-btn:hover {
          color: var(--text-primary);
          background-color: rgba(255, 255, 255, 0.05); /* Smooth background pill hover */
        }
        [data-theme='light'] .nav-item-btn:hover {
          background-color: rgba(0, 0, 0, 0.04); /* Light mode highlight */
        }
        .nav-contact-btn {
          padding: 10px 24px;
          border-radius: 9999px;
          border: none;
          background-color: #ffffff; /* Dark mode default solid white */
          color: #000000;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-body);
          white-space: nowrap;
          transition: background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .nav-contact-btn:hover {
          background-color: var(--accent); /* Lime green in dark mode */
          color: #000000;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        }
        [data-theme='light'] .nav-contact-btn {
          background-color: #0d0d0d; /* Light mode default solid black */
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        [data-theme='light'] .nav-contact-btn:hover {
          background-color: var(--accent); /* Brand blue in light mode */
          color: #ffffff;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
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
