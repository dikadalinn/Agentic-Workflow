'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp } from '@/components/shared/animations'

export default function VerifySuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/onboarding')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleContinue = () => {
    router.push('/onboarding')
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom, #0A0A0F, #1A1A2E)' }}>
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#FF6B35]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl"
        >
          {/* Glow effect */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF6B35]/5 via-purple-600/5 to-[#FF6B35]/5 blur-xl" />

          <div className="relative">
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
              className="mb-6 flex justify-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#10B981]/20">
                <CheckCircle2 className="h-10 w-10 text-[#10B981]" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-2 text-center text-2xl font-bold text-white"
            >
              Email Verified!
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8 text-center text-gray-400"
            >
              Your account has been successfully verified. Let&apos;s set up your profile!
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8 flex items-center justify-center gap-2 text-sm text-gray-400"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35]/20 text-[#FF6B35]">
                {countdown}
              </div>
              <span>Setting up your profile...</span>
            </motion.div>

            {/* Continue button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button
                onClick={handleContinue}
                className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-base font-medium text-white hover:from-[#E55A2B] hover:to-[#FF6B35]"
              >
                Setup Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
