'use client'

import { motion } from 'framer-motion'

/**
 * Animated Background Component
 * Creates a premium gradient mesh background with floating orbs and particles
 */

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#1A1A2E] to-[#0A0A0F]" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#1A1A2E] to-[#FF6B35]/10"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating Orange Orb 1 */}
      <motion.div
        className="absolute top-20 left-10 h-96 w-96 rounded-full bg-[#FF6B35]/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Orange Orb 2 */}
      <motion.div
        className="absolute top-40 right-20 h-80 w-80 rounded-full bg-[#FF6B35]/15 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Purple Orb */}
      <motion.div
        className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Small floating particles */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-white/30"
        animate={{
          y: [-20, 20, -20],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 h-3 w-3 rounded-full bg-[#FF6B35]/40"
        animate={{
          y: [30, -30, 30],
          x: [-10, 10, -10],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/2 h-2 w-2 rounded-full bg-white/20"
        animate={{
          y: [-25, 25, -25],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 h-4 w-4 rounded-full bg-purple-500/30"
        animate={{
          y: [20, -20, 20],
          x: [15, -15, 15],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/5 h-3 w-3 rounded-full bg-[#FF6B35]/30"
        animate={{
          y: [-15, 15, -15],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0F]" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
