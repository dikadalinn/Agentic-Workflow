'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ProgressIndicator } from '@/components/onboarding/progress-indicator'
import { ProfileStep } from '@/components/onboarding/profile-step'
import { PlatformStep } from '@/components/onboarding/platform-step'
import { SuccessStep } from '@/components/onboarding/success-step'
import { useAuthStore } from '@/store/auth.store'
import type { OnboardingData } from '@/types/user'

type Step = 'profile' | 'platform' | 'success'

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isAuthenticated, completeOnboarding } = useAuthStore()
  const [step, setStep] = useState<Step>('profile')
  const [isLoading, setIsLoading] = useState(false)

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Check if already onboarded
    if (user?.isOnboarded) {
      router.push('/dashboard')
      return
    }

    // Check for incomplete onboarding data
    const savedData = localStorage.getItem('frens_onboarding')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      if (parsed.isOnboarded) {
        completeOnboarding()
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, user, router, completeOnboarding])

  // Load saved progress on mount
  useEffect(() => {
    const step1Data = localStorage.getItem('frens_onboarding_step1')
    const step2Data = localStorage.getItem('frens_onboarding_step2')

    if (step1Data && step2Data) {
      // Both steps completed, go to success
      setStep('success')
    } else if (step1Data) {
      // Step 1 completed, go to step 2
      setStep('platform')
    }
  }, [])

  const handleNext = () => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      if (step === 'profile') {
        setStep('platform')
      } else if (step === 'platform') {
        setStep('success')
      }
    }, 500)
  }

  const handleBack = () => {
    if (step === 'platform') {
      setStep('profile')
    }
  }

  const handleComplete = () => {
    // Combine all data
    const step1Data = localStorage.getItem('frens_onboarding_step1')
    const step2Data = localStorage.getItem('frens_onboarding_step2')

    if (step1Data && step2Data) {
      const profileData = JSON.parse(step1Data)
      const platformData = JSON.parse(step2Data)

      const onboardingData: OnboardingData = {
        displayName: profileData.displayName,
        bio: profileData.bio,
        avatarUrl: profileData.avatarUrl,
        streamingPlatforms: platformData.streamingPlatforms,
        otherPlatform: platformData.otherPlatform,
        isOnboarded: true,
      }

      // Store complete onboarding data
      localStorage.setItem('frens_onboarding', JSON.stringify(onboardingData))

      // Update auth store
      completeOnboarding()
    }

    // Redirect to dashboard
    router.push('/dashboard')
  }

  // Get display name for success step
  const getDisplayName = () => {
    const step1Data = localStorage.getItem('frens_onboarding_step1')
    return step1Data ? JSON.parse(step1Data).displayName : user?.displayName || ''
  }

  const totalSteps = 3
  const currentStepNumber = step === 'profile' ? 1 : step === 'platform' ? 2 : 3

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom, #0A0A0F, #1A1A2E)' }}>
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
            {/* Header */}
            <AnimatePresence mode="wait">
              {step !== 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <ProgressIndicator currentStep={currentStepNumber} totalSteps={totalSteps} />
                  <h1 className="mt-6 text-center text-2xl font-bold text-white">
                    {step === 'profile' ? "Let's set you up" : 'Where do you stream?'}
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Steps */}
            <AnimatePresence mode="wait">
              {step === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProfileStep onNext={handleNext} isLoading={isLoading} />
                </motion.div>
              )}

              {step === 'platform' && (
                <motion.div
                  key="platform"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PlatformStep
                    onNext={handleNext}
                    onBack={handleBack}
                    isLoading={isLoading}
                  />
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SuccessStep
                    displayName={getDisplayName()}
                    dashboardUrl="/dashboard"
                    onComplete={handleComplete}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
