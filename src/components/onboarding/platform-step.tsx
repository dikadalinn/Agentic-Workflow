'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlatformCard } from './platform-card'
import type { StreamingPlatform } from '@/types/user'

interface PlatformStepProps {
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

const PLATFORMS = [
  { id: 'twitch', name: 'Twitch', icon: '📺' },
  { id: 'youtube', name: 'YouTube', icon: '▶️' },
  { id: 'kick', name: 'Kick', icon: '🎯' },
  { id: 'tiktok', name: 'TikTok Live', icon: '🎵' },
  { id: 'other', name: 'Other', icon: '🌐' },
] as const

export function PlatformStep({ onNext, onBack, isLoading }: PlatformStepProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<StreamingPlatform[]>([])
  const [otherPlatform, setOtherPlatform] = useState('')
  const [error, setError] = useState('')

  const handleTogglePlatform = (platformId: StreamingPlatform) => {
    setError('')
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platformId))
      if (platformId === 'other') {
        setOtherPlatform('')
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId])
    }
  }

  const handleNext = () => {
    // Validate at least one platform
    if (selectedPlatforms.length === 0) {
      setError('Please select at least one platform')
      return
    }

    // If "other" is selected, validate otherPlatform
    if (selectedPlatforms.includes('other') && !otherPlatform.trim()) {
      setError('Please specify the platform name')
      return
    }

    // Store in localStorage
    const data = {
      streamingPlatforms: selectedPlatforms,
      otherPlatform: selectedPlatforms.includes('other') ? otherPlatform : undefined,
    }
    localStorage.setItem('frens_onboarding_step2', JSON.stringify(data))

    onNext()
  }

  const handleBack = () => {
    // Save current state before going back
    const data = {
      streamingPlatforms: selectedPlatforms,
      otherPlatform: selectedPlatforms.includes('other') ? otherPlatform : undefined,
    }
    localStorage.setItem('frens_onboarding_step2', JSON.stringify(data))
    onBack()
  }

  const handleSkip = () => {
    // Skip with default platform
    const data = {
      streamingPlatforms: ['other'] as StreamingPlatform[],
      otherPlatform: 'Other',
    }
    localStorage.setItem('frens_onboarding_step2', JSON.stringify(data))
    onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="mb-2 text-lg font-semibold text-white">Where do you stream?</h2>
        <p className="text-sm text-gray-400">
          Select all platforms where you stream. You can add more later in settings.
        </p>
      </div>

      {/* Platform grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            isSelected={selectedPlatforms.includes(platform.id as StreamingPlatform)}
            onClick={() => handleTogglePlatform(platform.id as StreamingPlatform)}
          />
        ))}
      </div>

      {/* Other platform input */}
      <AnimatePresence>
        {selectedPlatforms.includes('other') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 overflow-hidden"
          >
            <Label htmlFor="otherPlatform" className="text-gray-300">
              Platform Name <span className="text-[#FF6B35]">*</span>
            </Label>
            <Input
              id="otherPlatform"
              value={otherPlatform}
              onChange={(e) => {
                setOtherPlatform(e.target.value)
                setError('')
              }}
              placeholder="e.g., Facebook Live, Trovo"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Actions */}
      <div className="space-y-3 pt-4">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isLoading}
            className="flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={isLoading || selectedPlatforms.length === 0}
            className="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-white hover:from-[#E55A2B] hover:to-[#FF6B35]"
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </Button>
        </div>
        <button
          type="button"
          onClick={handleSkip}
          className="h-12 w-full text-sm text-gray-400 transition-colors hover:text-gray-300"
        >
          Skip for now
        </button>
      </div>
    </motion.div>
  )
}
