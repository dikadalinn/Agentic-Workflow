'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { OverlaySettings } from '@/types/overlay'
import { Heart, Music } from 'lucide-react'

interface AlertOverlayProps {
  settings: OverlaySettings
  isTriggered: boolean
  isPreview?: boolean
  /** Name of the donor (from BroadcastChannel or mock) */
  donorName?: string
  /** Donation amount (from BroadcastChannel or mock) */
  amount?: number
  /** Optional message from donor (from BroadcastChannel or mock) */
  message?: string
}

export function AlertOverlay({
  settings,
  isTriggered,
  isPreview = false,
  donorName = 'MusicFan42',
  amount = 5.0,
  message: customDonorMessage,
}: AlertOverlayProps) {
  const alertConfig = settings.config?.alertConfig
  const theme = settings.theme

  if (!alertConfig) return null

  const getAnimationVariant = () => {
    switch (alertConfig.animationStyle) {
      case 'pulse':
        return {
          initial: { scale: 0.5, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.5, opacity: 0 },
          transition: { duration: 0.3 },
        }
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.5 },
        }
      case 'slide':
        return {
          initial: { x: 300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 300, opacity: 0 },
          transition: { duration: 0.4, ease: 'easeOut' },
        }
      case 'shake':
        return {
          initial: { x: -10, opacity: 0 },
          animate: { x: [0, -10, 10, -10, 10, 0], opacity: 1 },
          exit: { opacity: 0, scale: 0.8 },
          transition: { duration: 0.6 },
        }
      case 'bounce':
        return {
          initial: { y: -50, opacity: 0 },
          animate: { y: [0, -30, -15, -7, 0], opacity: 1 },
          exit: { y: 50, opacity: 0 },
          transition: { duration: 0.5, ease: 'easeOut' },
        }
    }
  }

  const getThemeStyles = () => {
    switch (theme) {
      case 'default':
        return 'bg-gradient-to-r from-primary-orange/90 to-primary-orange/70 backdrop-blur-md border-white/20'
      case 'minimal':
        return 'bg-black/80 backdrop-blur-md border-white/10'
      case 'neon':
        return 'bg-black/90 border-primary-orange shadow-[0_0_20px_rgba(255,107,53,0.5)]'
      case 'retro':
        return 'bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-md border-yellow-400/30'
    }
  }

  const getThankYouMessage = () => {
    const defaultMessage = 'Thank you for the donation, {username}!'
    const templateMessage = alertConfig.customMessage || defaultMessage
    return templateMessage.replace('{username}', donorName)
  }

  // Empty state for preview
  if (!isTriggered && isPreview) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Heart className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Alert will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {isTriggered && (
        <motion.div
          {...getAnimationVariant()}
          className={`absolute bottom-4 right-4 left-4 max-w-md mx-auto p-4 rounded-xl border ${getThemeStyles()}`}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: 2, repeatDelay: 0.5 }}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    theme === 'minimal' ? 'bg-white/10' : 'bg-white/20'
                  }`}
                >
                  <Music className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 text-white">
              <h3 className="text-xl font-bold mb-1">New Donation!</h3>
              <p className="text-lg mb-1">
                <span className="text-primary-orange font-bold">${amount.toFixed(2)}</span>
              </p>
              <p className="text-sm opacity-90">{getThankYouMessage()}</p>
              {customDonorMessage && (
                <p className="text-sm opacity-75 mt-2 italic">&quot;{customDonorMessage}&quot;</p>
              )}
              {alertConfig.soundEnabled && (
                <div className="mt-2 flex items-center gap-1 text-xs opacity-70">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Sound Enabled
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
