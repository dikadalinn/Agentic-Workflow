'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SuccessStepProps {
  displayName: string
  dashboardUrl: string
  onComplete: () => void
}

// Simple confetti component using Framer Motion
function Confetti() {
  const colors = ['#FF6B35', '#FF8F5A', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899']

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 2
        const duration = 2 + Math.random() * 2
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = 8 + Math.random() * 8
        const rotation = Math.random() * 360

        return (
          <motion.div
            key={i}
            initial={{
              y: -20,
              x: left + '%',
              opacity: 1,
              rotate: rotation,
            }}
            animate={{
              y: '100vh',
              x: [left + '%', left + (Math.random() * 40 - 20) + '%'],
              opacity: [1, 1, 0],
              rotate: rotation + 360,
            }}
            transition={{
              duration,
              delay,
              ease: 'easeIn',
            }}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
          />
        )
      })}
    </div>
  )
}

export function SuccessStep({ displayName, dashboardUrl, onComplete }: SuccessStepProps) {
  const [copied, setCopied] = useState(false)
  const profileUrl = `${window.location.origin}/${displayName}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleGoToDashboard = () => {
    // Mark onboarding as complete
    const data = localStorage.getItem('frens_onboarding')
    if (data) {
      const parsed = JSON.parse(data)
      parsed.isOnboarded = true
      localStorage.setItem('frens_onboarding', JSON.stringify(parsed))
    }

    onComplete()
  }

  return (
    <>
      <AnimatePresence>
        <Confetti />
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6 text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#10B981]/20"
        >
          <CheckCircle2 className="h-10 w-10 text-[#10B981]" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="mb-2 text-2xl font-bold text-white">You&apos;re all set! 🎉</h2>
          <p className="text-sm text-gray-400">
            Your profile is ready to start receiving song requests and donations
          </p>
        </motion.div>

        {/* Profile URL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <p className="mb-2 text-xs text-gray-400">Your Profile URL</p>
          <div className="flex items-center gap-2">
            <p className="flex-1 truncate text-sm font-semibold text-white">{profileUrl}</p>
            <Button
              onClick={handleCopyLink}
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-gray-400 hover:text-white"
            >
              {copied ? <Check className="h-4 w-4 text-[#10B981]" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-[#10B981]"
            >
              Copied to clipboard!
            </motion.p>
          )}
        </motion.div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="rounded-lg bg-[#FF6B35]/10 p-3 text-left"
        >
          <p className="text-xs text-gray-300">
            <span className="font-semibold text-[#FF6B35]">💡 Pro Tip:</span> Add your overlay to
            OBS from Settings → OBS Overlays to show live requests on stream
          </p>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button
            onClick={handleGoToDashboard}
            className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-base font-medium text-white hover:from-[#E55A2B] hover:to-[#FF6B35]"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </>
  )
}
