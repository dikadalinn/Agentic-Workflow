'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp } from '@/components/shared/animations'

export default function VerifyPendingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    setIsResending(true)
    setCanResend(false)
    setCountdown(30)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsResending(false)
  }

  const handleContinue = () => {
    // For mock purposes, we'll go to verify-success
    router.push('/verify-success')
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
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 flex justify-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FF8F5A]/20">
                <Mail className="h-10 w-10 text-[#FF6B35]" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-2 text-center text-2xl font-bold text-white"
            >
              Check Your Email
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6 text-center text-gray-400"
            >
              We've sent a verification link to{' '}
              <span className="font-medium text-white">{email || 'your email'}</span>
            </motion.p>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8 space-y-3 rounded-lg bg-white/5 p-4"
            >
              <p className="text-sm text-gray-300">
                To complete your registration:
              </p>
              <ol className="list-inside space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF6B35]" />
                  Check your inbox for the verification email
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF6B35]" />
                  Click the verification link in the email
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF6B35]" />
                  You'll be redirected to complete setup
                </li>
              </ol>
              <p className="mt-3 text-xs text-gray-500">
                The link will expire in 24 hours. If you don't see the email, check your spam folder.
              </p>
            </motion.div>

            {/* Resend button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="space-y-4"
            >
              <Button
                onClick={handleResendEmail}
                disabled={!canResend || isResending}
                variant="outline"
                className="h-12 w-full border-white/20 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : canResend ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                ) : (
                  `Resend in ${countdown}s`
                )}
              </Button>

              {/* Continue button (for mock/demo) */}
              <Button
                onClick={handleContinue}
                className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-base font-medium text-white hover:from-[#E55A2B] hover:to-[#FF6B35]"
              >
                I've Verified My Email
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Back to home */}
              <div className="text-center text-sm text-gray-400">
                Wrong email?{' '}
                <Link
                  href="/register"
                  className="font-medium text-[#FF6B35] hover:text-[#FF8F5A] transition-colors"
                >
                  Go back
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
