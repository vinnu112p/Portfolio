import React from 'react';
import { motion } from 'framer-motion';
import styles from './BadgeShowcase.module.css';

interface BadgeData {
  id: string;
  title: string;
  imageUrl: string;
  verificationUrl: string;
}

const badges: BadgeData[] = [
  {
    id: '74453dcb-f292-4eaa-970a-f532ebb346f0',
    title: 'ServiceNow Certified Application Developer (CAD)',
    imageUrl: 'https://images.credly.com/images/4291c91d-0de2-4294-93aa-a5e986d4368f/linkedin_thumb_Credential_Badge_-_Certified_Application_Developer.png',
    verificationUrl: 'https://www.credly.com/badges/74453dcb-f292-4eaa-970a-f532ebb346f0/public_url',
  },
  {
    id: 'a96a542d-7389-4696-bfbb-af72d1bd729c',
    title: 'Delivery Accreditation - Creator Studio',
    imageUrl: 'https://images.credly.com/images/b517dd7d-aab8-4e81-aa43-3e18f3611d5c/linkedin_thumb_blob',
    verificationUrl: 'https://www.credly.com/badges/a96a542d-7389-4696-bfbb-af72d1bd729c/public_url',
  },
  {
    id: '1e39f282-511d-4d5e-8b6a-bc23722378ef',
    title: 'Micro-Certification - Welcome to ServiceNow',
    imageUrl: 'https://images.credly.com/images/5a1dc59c-5961-40f6-88dd-3e6c366a3620/linkedin_thumb_Credential_Badge_-_Micro-Cert_-_Welcome_to_ServiceNow.png',
    verificationUrl: 'https://www.credly.com/badges/1e39f282-511d-4d5e-8b6a-bc23722378ef/public_url',
  },
  {
    id: 'a4359819-b0ae-451c-b903-869d075bc673',
    title: 'ServiceNow Certified System Administrator (CSA)',
    imageUrl: 'https://images.credly.com/images/cf2fd311-58c5-404e-b2aa-234b2ef7f994/linkedin_thumb_Credential_Badge_-_Certified_System_Administrator.png',
    verificationUrl: 'https://www.credly.com/badges/a4359819-b0ae-451c-b903-869d075bc673/public_url',
  },
  {
    id: 'd930349f-710c-41af-8a21-f43afa059ddc',
    title: 'Introduction to IoT',
    imageUrl: 'https://images.credly.com/images/fce226c2-0f13-4e17-b60c-24fa6ffd88cb/linkedin_thumb_Intro2IoT.png',
    verificationUrl: 'https://www.credly.com/badges/d930349f-710c-41af-8a21-f43afa059ddc/public_url',
  }
];

// Duplicate the list of badges to ensure a mathematically seamless looping marquee (2 copies matching translateX(-50%))
const marqueeBadges = [...badges, ...badges];

interface BadgeShowcaseProps {
  theme: string;
}

export const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({ theme }) => {
  return (
    <section id="badges" className={styles.section} data-theme={theme}>
      <div className={styles.container}>
        {/* Left copy column */}
        <motion.div
          className={styles.leftColumn}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className={styles.label}>Verified Badges</span>
          <h2 className={styles.title}>Credly Showcase</h2>
        </motion.div>

        {/* Right marquee column with 3D perspective */}
        <motion.div
          className={styles.rightColumn}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          <div className={styles.perspectiveWrapper}>
            <div className={styles.marqueeWrapper}>
              <div className={styles.marqueeTrack}>
                {marqueeBadges.map((badge, index) => (
                  <a
                    href={badge.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.badgeCard}
                    key={`${badge.id}-${index}`}
                    title={badge.title}
                    aria-label={`Verify ${badge.title} credential on Credly`}
                  >
                    <div className={styles.imageContainer}>
                      <img
                        src={badge.imageUrl}
                        alt={badge.title}
                        className={styles.badgeImage}
                        loading="lazy"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
