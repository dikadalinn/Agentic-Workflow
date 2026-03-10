'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateCardProps {
  displayName?: string
  className?: string
}

export function EmptyStateCard({ displayName, className }: EmptyStateCardProps) {
  const [copied, setCopied] = useState(false)

  const profileUrl = displayName
    ? `${window.location.origin}/${displayName}`
    : window.location.origin

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return (
    <div
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center ${className}`}
    >
      <div className="text-6xl mb-4">📊</div>
      <h3 className="text-xl font-semibold text-white mb-2">No data yet</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Share your profile to start receiving donations and song requests!
      </p>

      <Button
        onClick={handleCopyLink}
        className="bg-primary-orange hover:bg-primary-orange-hover text-white"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy Profile Link
          </>
        )}
      </Button>
    </div>
  )
}
