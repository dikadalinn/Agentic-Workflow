import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressIndicator({ currentStep, totalSteps, className }: ProgressIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          {/* Step circle */}
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all',
              currentStep >= step ? 'bg-[#FF6B35] text-white' : 'bg-white/10 text-gray-400'
            )}
          >
            {step}
          </div>

          {/* Progress line (not shown after last step) */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                'h-0.5 w-8 transition-all',
                currentStep > step ? 'bg-[#FF6B35]' : 'bg-white/10'
              )}
            />
          )}
        </div>
      ))}

      {/* Step label */}
      <span className="ml-2 text-sm text-gray-400">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  )
}
