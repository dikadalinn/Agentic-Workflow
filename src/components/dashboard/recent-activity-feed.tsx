'use client'

import { formatDistanceToNow } from 'date-fns'
import { ExternalLink, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RecentDonation } from '@/types/analytics'

interface RecentActivityFeedProps {
  donations: RecentDonation[]
  className?: string
}

export function RecentActivityFeed({ donations, className }: RecentActivityFeedProps) {
  const isEmpty = !donations || donations.length === 0

  if (isEmpty) {
    return (
      <div
        className={cn(
          'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6',
          className
        )}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-4">💸</div>
          <p className="text-muted-foreground">Donations will appear here as they come in</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6', className)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button
          disabled
          className="text-sm text-primary-orange hover:text-primary-orange-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
        >
          View All <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-3">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            {/* Donor Avatar */}
            <div className="flex-shrink-0">
              {donation.donorName ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-orange to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {donation.donorName.charAt(0).toUpperCase()}
                  </span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Donation Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white truncate">
                  {donation.donorName || 'Anonymous'}
                </span>
                <span className="text-sm font-semibold text-primary-orange">
                  ${donation.amount.toFixed(2)}
                </span>
              </div>
              {donation.songTitle && (
                <p className="text-xs text-muted-foreground truncate">"{donation.songTitle}"</p>
              )}
            </div>

            {/* Time Ago */}
            <div className="flex-shrink-0 text-xs text-muted-foreground whitespace-nowrap">
              {formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
