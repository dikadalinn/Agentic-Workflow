'use client'

import { cn } from '@/lib/utils'

interface PlatformCardProps {
  platform: {
    id: string
    name: string
    icon: string
  }
  isSelected: boolean
  onClick: () => void
  disabled?: boolean
}

export function PlatformCard({ platform, isSelected, onClick, disabled }: PlatformCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group relative flex h-24 w-full items-center gap-3 rounded-xl border-2 bg-white/5 p-4 transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50',
        isSelected ? 'border-[#FF6B35] bg-[#FF6B35]/10' : 'border-white/10 hover:border-white/20'
      )}
    >
      {/* Platform icon */}
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all',
          isSelected ? 'bg-[#FF6B35]' : 'bg-white/10'
        )}
      >
        {platform.icon}
      </div>

      {/* Platform name */}
      <span
        className={cn(
          'font-semibold transition-colors',
          isSelected ? 'text-[#FF6B35]' : 'text-gray-300'
        )}
      >
        {platform.name}
      </span>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B35]">
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  )
}
