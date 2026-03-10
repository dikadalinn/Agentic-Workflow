'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, Monitor, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import { fadeInUp, fadeIn, staggerContainer } from '../shared/animations'

interface StepProps {
  number: number
  icon: React.ElementType
  title: string
  description: string
  isLast: boolean
  index: number
}

function Step({ number, icon: Icon, title, description, isLast, index }: StepProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      custom={index}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connecting line (not last) */}
      {!isLast && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
          className="absolute -right-16 top-10 hidden h-0.5 w-32 origin-left bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] md:block"
        >
          <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF6B35]" />
        </motion.div>
      )}

      {/* Icon Circle */}
      <div className="mb-6 relative">
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FF8F5A] text-white shadow-lg shadow-orange-500/30 backdrop-blur-sm">
            <Icon className="h-10 w-10" />
          </div>
        </motion.div>

        {/* Step Number Badge */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-100 text-sm font-bold text-[#FF6B35] shadow-lg"
        >
          {number}
        </motion.div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-[#FF6B35] transition-colors">
          {title}
        </h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up',
      description: 'Create your account in seconds',
    },
    {
      icon: Monitor,
      title: 'Add to OBS',
      description: 'Copy your overlay URL to OBS Browser Source',
    },
    {
      icon: Zap,
      title: 'Start Earning',
      description: 'Share your profile and receive song requests',
    },
  ]

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative overflow-hidden py-20"
      style={{
        background: 'linear-gradient(to bottom, #0A0A0F, #1A1A2E)',
      }}
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-[#FF6B35]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-600/5 blur-3xl" />

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
            Get started in{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB347] bg-clip-text text-transparent">
              3 simple steps
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-400">
            From sign-up to your first donation in minutes. No technical expertise required.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
              index={index}
            />
          ))}
        </div>

        {/* Animated line connecting steps on mobile */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 mx-auto max-w-md overflow-hidden md:hidden"
        >
          <div className="relative h-0.5 w-full bg-white/10">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute inset-0 h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A]"
            />
          </div>
        </motion.div>

        {/* Quick Benefits */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto mt-16 max-w-4xl"
        >
          <motion.div variants={fadeInUp} className="grid gap-6 md:grid-cols-3">
            {['Free to use', 'Works with OBS', 'Setup in minutes'].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#FF6B35]" />
                <span className="font-medium text-white">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
