'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import { fadeInUp, fadeIn, glowPulse, staggerContainer } from '../shared/animations'

function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    mouseX.set(e.clientX - rect.left - width / 2)
    mouseY.set(e.clientY - rect.top - height / 2)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        translateX: springX,
        translateY: springY,
      }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY, currentTarget } = event
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    mouseX.set((clientX - left - width / 2) / 50)
    mouseY.set((clientY - top - height / 2) / 50)
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-20 md:py-32"
      style={{
        background: 'linear-gradient(to bottom, #0A0A0F, #1A1A2E)',
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 via-purple-600/10 to-[#FF6B35]/10 opacity-50"
        style={{
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Large gradient orbs */}
      <motion.div
        className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#FF6B35]/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-[15%] h-8 w-8 rounded-full bg-white/10 blur-sm"
      />

      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-20 left-[15%] h-12 w-12 rounded-full bg-[#FF6B35]/10 blur-sm"
      />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Icon */}
          <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="relative"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#FF6B35] to-[#FF8F5A] text-white shadow-2xl shadow-orange-500/50 backdrop-blur-sm">
                <ArrowRight className="h-10 w-10" />
              </div>
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 0px rgba(255, 107, 53, 0.4)',
                    '0 0 0 20px rgba(255, 107, 53, 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute -inset-2 rounded-3xl bg-[#FF6B35]"
              />
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Ready to{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8F5A] to-[#FFB347] bg-clip-text text-transparent">
              engage your audience?
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p variants={fadeInUp} className="mb-10 text-xl text-gray-300">
            Join streamers who are already using Frens to turn song requests into donations.
          </motion.p>

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
              <Link href="/register" className="inline-block">
                <MagneticButton className="h-16 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] px-10 text-lg font-semibold text-white shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 sm:w-auto border-none">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
              </Link>
            </motion.div>
            <Button
              size="lg"
              variant="ghost"
              className="h-16 w-full border border-white/20 bg-white/5 px-10 text-lg font-semibold text-white hover:bg-white/10 sm:w-auto"
              asChild
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
          >
            {[
              { icon: Zap, text: 'Free to use' },
              { icon: Shield, text: 'Works with OBS' },
              { icon: Clock, text: 'Setup in minutes' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm transition-all"
              >
                <badge.icon className="h-5 w-5 text-[#FF6B35]" />
                <span className="font-medium text-gray-300">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={fadeInUp} className="mt-12">
            <p className="text-sm text-gray-500">
              Join <span className="font-semibold text-white">500+</span> streamers already using
              Frens
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
