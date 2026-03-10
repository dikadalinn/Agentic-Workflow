'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, DollarSign, MonitorPlay, BarChart3, LucideIcon } from 'lucide-react'
import { fadeInUp, staggerContainer, tilt3D } from '../shared/animations'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  index: number
}

const iconMap: Record<string, LucideIcon> = {
  Music,
  DollarSign,
  MonitorPlay,
  BarChart3,
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const Icon = iconMap[icon] || Music

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      custom={index}
      whileHover="hover"
    >
      <motion.div variants={tilt3D} style={{ transformStyle: 'preserve-3d' }} className="h-full">
        <Card className="group h-full border border-white/10 bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-[#FF6B35]/10">
          <CardHeader>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B35]/20 to-[#FF8F5A]/20 text-[#FF6B35] backdrop-blur-sm transition-all group-hover:from-[#FF6B35] group-hover:to-[#FF8F5A] group-hover:text-white"
            >
              <Icon className="h-7 w-7" />
            </motion.div>
            <CardTitle className="text-xl text-white group-hover:text-[#FF6B35] transition-colors">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base leading-relaxed text-gray-400">
              {description}
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export function FeatureCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: 'Music',
      title: 'Music Requests',
      description: 'Let viewers request songs with their donations. Your queue, your rules.',
    },
    {
      icon: 'DollarSign',
      title: 'Donate & Earn',
      description:
        'Earn money while engaging with your audience. Every song request is a donation.',
    },
    {
      icon: 'MonitorPlay',
      title: 'OBS Overlays',
      description: 'Beautiful, customizable overlays that work with any streaming platform.',
    },
    {
      icon: 'BarChart3',
      title: 'Stats Dashboard',
      description: 'Track your donations, top songs, and audience engagement in real-time.',
    },
  ]

  return (
    <section
      id="features"
      ref={ref}
      className="relative overflow-hidden py-20"
      style={{
        background: 'linear-gradient(to bottom, #1A1A2E, #0A0A0F)',
      }}
    >
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FF6B35]/5 to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB347] bg-clip-text text-transparent">
              engage your audience
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-400">
            Powerful features designed to make song requests and donations seamless for both you and
            your viewers.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
