import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ChevronDown } from 'lucide-react';
import styles from './Contact.module.css';
import { ASSETS } from '../lib/assetsConfig';

interface ContactProps {
  theme: string;
}

const dropdownOptions = [
  "Internship / Job Opportunity",
  "Project Collaboration",
  "Freelance Web Development",
  "Research / Open Source",
  "General Inquiry / Say Hi"
];

export const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || !inquiryType || inquiryType === 'Select...') {
      alert('Please fill out all fields and select a service/inquiry type.');
      return;
    }

    setStatus('submitting');

    // Simulate API submission
    setTimeout(() => {
      setStatus('success');
      // Trigger canvas-confetti explosion
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: theme === 'light' ? ['#5b65f2', '#ffffff', '#22c55e', '#FAF9F6'] : ['#d6f672', '#ffffff', '#22c55e', '#141414']
      });
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setInquiryType('');
    setMessage('');
    setStatus('idle');
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        
        {/* Header Block */}
        <div className={styles.headerBlock}>
          <h2 className={styles.title}>Let's work together</h2>
          <p className={styles.description}>
            Let's build something impactful together—whether it's an internship, a project collaboration, or your next big software idea.
          </p>
        </div>

        {/* Content Grid */}
        <div className={styles.grid}>
          
          {/* Left Column: Portrait Card */}
          <div className={styles.portraitColumn}>
            <div 
              className={styles.portraitWrapper}
              onMouseEnter={() => setIsPortraitHovered(true)}
              onMouseLeave={() => setIsPortraitHovered(false)}
            >
              <div className={styles.portraitCard}>
                <img 
                  src={ASSETS.duncanPortrait} 
                  alt="Vinayak Patel" 
                  className={styles.portraitImage}
                />
              </div>

              {/* Floating Hi/Wave badge */}
              <div className={styles.overlayBadge}>
                <div className={styles.badgeContent}>
                  <AnimatePresence mode="wait">
                    {isPortraitHovered ? (
                      <motion.div
                        key="hand"
                        initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          rotate: [0, -15, 15, -15, 15, 0], 
                          opacity: 1 
                        }}
                        exit={{ scale: 0.5, rotate: 30, opacity: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {/* Waving hand print SVG (matches Hero page hand icon exactly) */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--accent-text)" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2c-.55 0-1 .45-1 1v7.15l-1.38-.92c-.55-.36-1.29-.29-1.76.18-.47.47-.54 1.21-.18 1.76l3.37 5.05c1.45 2.17 3.88 3.46 6.5 3.46h.45c1.1 0 2-.9 2-2V9c0-.55-.45-1-1-1s-1 .45-1 1v2h-1V6.5c0-.55-.45-1-1-1s-1 .45-1 1V11h-1V4.5c0-.55-.45-1-1-1s-1 .45-1 1V11h-1V4.5c0-.55-.45-1-1-1s-1 .45-1 1V2z" />
                        </svg>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Hi
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className={styles.formColumn}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className={styles.successMessage}
                >
                  <div className={styles.successIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Message Sent!</h3>
                  <p className={styles.successText}>
                    Thank you for reaching out, {name}. Your inquiry about <strong>{inquiryType}</strong> has been received, and I'll get back to you shortly.
                  </p>
                  <button onClick={handleReset} className={styles.resetBtn}>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.form}
                >
                  <div className={styles.formRow}>
                    {/* Name */}
                    <div className={styles.inputGroup}>
                      <label className={styles.label} style={{ color: 'var(--accent)' }}>Name</label>
                      <input 
                        type="text" 
                        placeholder="John Smith" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                        required
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Email */}
                    <div className={styles.inputGroup}>
                      <label className={styles.label} style={{ color: 'var(--accent)' }}>Email</label>
                      <input 
                        type="email" 
                        placeholder="johnsmith@gmail.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>

                  {/* Purpose / Inquiry Type (Select Dropdown) */}
                  <div className={styles.inputGroup} ref={dropdownRef}>
                    <label className={styles.label} style={{ color: 'var(--accent)' }}>Inquiry Type ?</label>
                    <div className={styles.selectWrapper}>
                      <button
                        type="button"
                        onClick={() => status !== 'submitting' && setIsDropdownOpen(!isDropdownOpen)}
                        className={styles.selectHeader}
                        style={{
                          borderColor: isDropdownOpen ? 'var(--accent)' : 'var(--border-color)'
                        }}
                        disabled={status === 'submitting'}
                      >
                        <span style={{ opacity: inquiryType ? 1 : 0.5 }}>
                          {inquiryType || 'Select...'}
                        </span>
                        <ChevronDown 
                          size={18} 
                          className={styles.selectChevron}
                          style={{
                            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            color: isDropdownOpen ? 'var(--accent)' : 'var(--text-secondary)'
                          }}
                        />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className={styles.selectOptionsList}
                          >
                            {dropdownOptions.map((option) => (
                              <li key={option} className={styles.selectOptionWrapper}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setInquiryType(option);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`${styles.selectOption} ${inquiryType === option ? styles.selectOptionSelected : ''}`}
                                >
                                  {option}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Message */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label} style={{ color: 'var(--accent)' }}>What Can I Help You...</label>
                    <textarea 
                      placeholder="Hello, I'd like to enquire about..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={styles.textarea}
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Solid Lime-Green Footer (Spanning Full Width) */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          
          <div className={styles.footerColumns}>
            
            {/* Column 1: Email */}
            <div className={styles.footerCol}>
              <span className={styles.footerLabel}>Email :</span>
              <a href="mailto:patelvinnu.112@gmail.com" className={styles.footerValue}>
                patelvinnu.112@gmail.com
              </a>
            </div>

            {/* Column 2: Call Today */}
            <div className={styles.footerCol}>
              <span className={styles.footerLabel}>Call Today :</span>
              <a href="tel:+918160127620" className={styles.footerValue}>
                +91 8160127620
              </a>
            </div>

            {/* Column 3: Social Connect */}
            <div className={styles.footerCol}>
              <span className={styles.footerLabel}>Social :</span>
              <div className={styles.socialRow}>
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/vinayakpatell" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialLink}
                  aria-label="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                
                {/* GitHub */}
                <a 
                  href="https://github.com/vinnu112p" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialLink}
                  aria-label="GitHub"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a 
                  href="https://x.com/Patelvinnu112" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialLink}
                  aria-label="X (Twitter)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/vinnuuuu_35/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Divider Line */}
          <div className={styles.footerDivider} />

          {/* Bottom Copyright area - removed Created by and Made in Framer */}
          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>
              &copy; Copyright 2026. All Rights Reserved by Vinayak Patel
            </p>
          </div>

        </div>
      </footer>
    </section>
  );
};
