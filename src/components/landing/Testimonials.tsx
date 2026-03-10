'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star } from 'lucide-react'
import { mockTestimonials } from '@/lib/mock-data'
import { fadeInUp, staggerContainer } from '../shared/animations'

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof mockTestimonials)[0]
  index: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full border border-white/10 bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-xl transition-all hover:border-[#FF6B35]/30 hover:shadow-2xl hover:shadow-[#FF6B35]/10">
        <CardContent className="p-6">
          {/* Quote Icon with gradient */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
            className="mb-4"
          >
            <Quote className="h-10 w-10 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5A] bg-clip-text text-transparent opacity-50" />
          </motion.div>

          {/* Stars */}
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              >
                <Star className="h-5 w-5 fill-[#FF6B35] text-[#FF6B35]" />
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="mb-6 text-lg leading-relaxed text-gray-300">
            &quot;{testimonial.quote}&quot;
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-4">
            {/* Avatar with glowing ring */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8F5A] text-xl font-bold text-white">
                {testimonial.name.charAt(0)}
              </div>
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 0px rgba(255, 107, 53, 0.4)',
                    '0 0 0 8px rgba(255, 107, 53, 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute -inset-1 rounded-full bg-[#FF6B35]"
              />
            </motion.div>

            {/* Name & Platform */}
            <div>
              <p className="font-semibold text-white">{testimonial.name}</p>
              <p className="text-sm text-gray-400">{testimonial.platform}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
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
            Trusted by{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB347] bg-clip-text text-transparent">
              Streamers
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-400">
            Join hundreds of streamers who are already using Frens to engage with their community.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#FF6B35] text-[#FF6B35]" />
              ))}
            </div>
            <span className="font-medium text-white">
              Rated <span className="text-[#FF6B35]">4.9/5</span> by streamers worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
