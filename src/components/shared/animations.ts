'use client'

import { Variants } from 'framer-motion'

/**
 * Reusable Framer Motion animation variants for the landing page
 */

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Simple fade in
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// Glow pulse animation for CTAs
export const glowPulse: Variants = {
  hidden: {
    boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)',
  },
  visible: {
    boxShadow: [
      '0 0 20px rgba(255, 107, 53, 0.3)',
      '0 0 40px rgba(255, 107, 53, 0.6)',
      '0 0 20px rgba(255, 107, 53, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Floating animation
export const float: Variants = {
  hidden: {
    y: 0,
  },
  visible: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// 3D tilt effect on hover
export const tilt3D: Variants = {
  hidden: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    rotateX: 5,
    rotateY: -5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

// Slide in from left
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Slide in from right
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Scale up
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Text reveal (staggered character by character)
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

// Parallax floating
export const parallaxFloat: Variants = {
  hidden: {
    y: 0,
    x: 0,
  },
  visible: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}
