'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/components/shared/animations'

interface AuthFormWrapperProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export function AuthFormWrapper({ children, title, className }: AuthFormWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={cn('min-h-screen flex items-center justify-center p-4', className)}
      style={{
        background: 'linear-gradient(to bottom, #0A0A0F, #1A1A2E)',
      }}
    >
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#FF6B35]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      {/* Form container */}
      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl"
        >
          {/* Glow effect */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF6B35]/5 via-purple-600/5 to-[#FF6B35]/5 blur-xl" />

          {/* Content */}
          <div className="relative">
            {title && (
              <h1 className="mb-8 text-center text-2xl font-bold text-white">
                {title}
              </h1>
            )}
            {children}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
