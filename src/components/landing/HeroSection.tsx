'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
} from '../shared/animations'

export function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const platformIcons = [
    {
      name: 'Twitch',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
        </svg>
      ),
      color: 'purple',
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      color: 'red',
    },
    {
      name: 'Kick',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.535 20.745l1.432-1.432-5.243-5.243h16.09v-2.026H6.724l5.243-5.243L10.535 5.37 1.878 14.06l8.657 6.685z" />
        </svg>
      ),
      color: 'green',
    },
    {
      name: 'TikTok',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 3.5h-15A1.5 1.5 0 0 0 3 5v14a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5V5a1.5 1.5 0 0 0-1.5-1.5zm-5.5 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm10 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      ),
      color: 'pink',
    },
  ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-32"
      style={{
        background: 'linear-gradient(to bottom, #0A0A0F, #1A1A2E)',
      }}
    >
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#FF6B35]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-5xl"
        >
          {/* Badge */}
          <motion.div variants={fadeIn} className="mb-8 flex justify-center">
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
              </span>
              Now available for all streaming platforms
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="mb-6 text-center text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="block text-white">Turn Song Requests</span>
            <span className="block bg-gradient-to-r from-[#FF6B35] via-[#FF8F5A] to-[#FFB347] bg-clip-text text-transparent">
              into Donations
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="mb-10 text-center text-lg text-gray-300 md:text-xl"
          >
            The OBS-ready platform for streamers. Let your viewers request songs and support you
            with donations.
          </motion.p>

          {/* Platform Icons with parallax floating */}
          <motion.div
            variants={fadeInUp}
            className="mb-10 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 md:gap-6"
          >
            {platformIcons.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="flex items-center gap-2"
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${
                    platform.color === 'purple'
                      ? 'purple'
                      : platform.color === 'red'
                        ? 'red'
                        : platform.color === 'green'
                          ? 'green'
                          : 'pink'
                  }-500/20 backdrop-blur-sm`}
                >
                  {platform.icon}
                </div>
                <span className="font-medium text-gray-300">{platform.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 107, 53, 0.3)',
                  '0 0 40px rgba(255, 107, 53, 0.6)',
                  '0 0 20px rgba(255, 107, 53, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Button
                size="lg"
                className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-base text-white hover:from-[#E55A2B] hover:to-[#FF6B35] sm:w-auto"
                asChild
              >
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 w-full border border-white/20 bg-white/5 text-base text-white hover:bg-white/10 sm:w-auto"
              asChild
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Visual - Glassmorphism OBS Overlay Mock */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-20 max-w-4xl"
        >
          {/* Glass card container */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-xl p-1"
          >
            {/* Glow border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF6B35]/20 via-purple-600/20 to-[#FF6B35]/20 opacity-50 blur-xl" />

            {/* OBS Overlay Mock */}
            <div className="relative rounded-2xl bg-black/80 backdrop-blur-md p-8">
              {/* Mock donation card */}
              <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <motion.div
                      animate={{
                        y: [-10, 10, -10],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                      className="relative"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8F5A] text-lg font-bold text-white">
                        M
                      </div>
                      <div className="absolute -inset-1 rounded-full bg-[#FF6B35]/30 blur-md" />
                    </motion.div>

                    <div>
                      <p className="font-semibold text-white">MusicFan42</p>
                      <p className="text-sm text-gray-400">Donated $5.00</p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center gap-2 rounded-full bg-[#FF6B35]/20 px-3 py-1 text-sm text-[#FF6B35]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                    </span>
                    Now Playing
                  </div>
                </div>

                {/* Song info */}
                <div className="mb-4 space-y-2">
                  <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-white/20 to-transparent" />
                  <div className="h-3 w-1/2 rounded-full bg-gradient-to-r from-white/15 to-transparent" />
                </div>

                {/* Play bar */}
                <div className="mb-4">
                  <div className="h-1 w-full rounded-full bg-white/10">
                    <div className="h-1 w-2/3 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A]" />
                  </div>
                </div>

                {/* Message */}
                <p className="text-sm italic text-gray-300">&quot;This song is amazing! 🔥&quot;</p>

                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 flex justify-center"
                >
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
                    <Play className="h-5 w-5 fill-current" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -right-8 top-1/4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <span className="text-2xl">🎵</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute -left-8 bottom-1/4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <span className="text-2xl">💰</span>
          </motion.div>

          {/* Glow effect */}
          <div className="absolute -inset-8 -z-10 mx-auto max-w-4xl bg-gradient-to-r from-[#FF6B35]/20 via-purple-600/20 to-[#FF6B35]/20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}
