# Vinayak Patel - Developer Portfolio

A professional, high-performance developer portfolio built using React, TypeScript, and modern animation libraries. Designed with a clean, dark-themed, premium aesthetic, it showcases projects, achievements, skills, and professional experience.

## Key Features

- **Interactive 3D Hero Card**: A drag-responsive, 3D-perspective portrait card that anchors the hero section, integrated with custom smooth-fade scroll badges.
- **Glassmorphic Navigation**: A compact, floating navbar featuring dropdown categorization for auxiliary sections and custom theme-appropriate hover transitions.
- **Interactive Project Showcase**: A dynamic layout featuring horizontal auto-cycling releases alongside scrolling viewport previews of web applications.
- **Fluid Micro-Animations**: Built using GSAP ScrollTrigger and Framer Motion spring physics to create organic transitions, responsive hover states, and smooth physics.
- **Smooth Inertial Scrolling**: Integrated with Lenis scroll engine, fully synchronized with GSAP timelines and programmatic navbar scrollTo targets.
- **Secure Serverless Contact Form**: Implements client-side honeypot spam traps, localStorage-based rate-limiting (3-minute cooldown with countdown timer), and Web3Forms email forwarding.
- **Dynamic Theme Architecture**: Support for system/data-theme switching with tailored HSL color tokens for dark and light presentations.

## Tech Stack

- **Core**: React, TypeScript, Vite
- **Styling**: Vanilla CSS, Framer Motion
- **Animations**: GreenSock Animation Platform (GSAP), Lenis (Smooth Scroll)
- **Email Delivery**: Web3Forms API
- **Local Assets**: Cloudinary CDN (documents)

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vinnu112p/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Web3Forms access key:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
   ```
   *(You can obtain a free access key from [Web3Forms](https://web3forms.com/))*

### Development

Start the local development server:
```bash
npm run dev
```

### Production Build

Compile and bundle the application for production:
```bash
npm run build
```
The compiled assets will be generated in the `dist` directory, ready to be hosted on Vercel, Netlify, or any static provider.

## Design Attribution

The visual layout, design system guidelines, and aesthetic inspiration for this portfolio were inspired by the Portavia website.

## License

This project is open-source and available under the MIT License.
