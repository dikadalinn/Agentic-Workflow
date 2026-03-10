'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AvatarUpload } from './avatar-upload'
import { cn } from '@/lib/utils'

interface ProfileStepProps {
  onNext: () => void
  isLoading?: boolean
}

export function ProfileStep({ onNext, isLoading }: ProfileStepProps) {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [displayNameError, setDisplayNameError] = useState('')

  const handleDisplayNameChange = (value: string) => {
    setDisplayName(value)
    setDisplayNameError('')

    // Validate display name
    if (value.length > 0 && value.length < 3) {
      setDisplayNameError('Display name must be at least 3 characters')
    } else if (value.length > 30) {
      setDisplayNameError('Display name must be 30 characters or less')
    } else if (!/^[a-zA-Z0-9_]*$/.test(value)) {
      setDisplayNameError('Only letters, numbers, and underscores allowed')
    }
  }

  const handleNext = () => {
    // Validate
    if (displayName.length < 3) {
      setDisplayNameError('Display name must be at least 3 characters')
      return
    }
    if (!/^[a-zA-Z0-9_]+$/.test(displayName)) {
      setDisplayNameError('Only letters, numbers, and underscores allowed')
      return
    }

    // Mock uniqueness check - in production, this would be an API call
    const isUnique = mockCheckDisplayNameUnique(displayName)
    if (!isUnique) {
      setDisplayNameError('This display name is already taken')
      return
    }

    // Store in localStorage
    const data = {
      displayName,
      bio,
      avatarUrl,
    }
    localStorage.setItem('frens_onboarding_step1', JSON.stringify(data))

    onNext()
  }

  const handleSkip = () => {
    // Skip with default values
    const data = {
      displayName: `user_${Date.now().toString(36)}`,
      bio: '',
      avatarUrl: undefined,
    }
    localStorage.setItem('frens_onboarding_step1', JSON.stringify(data))
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
      {/* Avatar upload */}
      <div className="flex justify-center">
        <AvatarUpload value={avatarUrl} onChange={setAvatarUrl} />
      </div>

      {/* Display name */}
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-gray-300">
          Display Name <span className="text-[#FF6B35]">*</span>
        </Label>
        <Input
          id="displayName"
          value={displayName}
          onChange={(e) => handleDisplayNameChange(e.target.value)}
          placeholder="Enter your display name"
          className={cn(
            'bg-white/5 border-white/10 text-white placeholder:text-gray-500',
            displayNameError && 'border-red-500'
          )}
        />
        {displayNameError && <p className="text-xs text-red-500">{displayNameError}</p>}
        <p className="text-xs text-gray-500">frens.app/{displayName || '<name>'}</p>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-gray-300">
          Bio <span className="text-gray-500">(optional)</span>
        </Label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, 200))}
          placeholder="Tell viewers about yourself..."
          rows={3}
          className="flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF6B35] disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="flex justify-between">
          <p className="text-xs text-gray-500">Share a bit about yourself with your viewers</p>
          <p className={cn('text-xs', bio.length >= 200 ? 'text-red-500' : 'text-gray-500')}>
            {bio.length}/200
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-4">
        <Button
          onClick={handleNext}
          disabled={isLoading || displayName.length < 3 || !!displayNameError}
          className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-base font-medium text-white hover:from-[#E55A2B] hover:to-[#FF6B35]"
        >
          {isLoading ? 'Loading...' : 'Continue'}
        </Button>
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

// Mock function for display name uniqueness check
function mockCheckDisplayNameUnique(displayName: string): boolean {
  // In production, this would be an API call
  const takenNames = ['admin', 'moderator', 'test', 'user', 'streamer']
  return !takenNames.includes(displayName.toLowerCase())
}
