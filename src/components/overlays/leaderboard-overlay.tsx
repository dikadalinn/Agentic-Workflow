'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { OverlaySettings } from '@/types/overlay'
import { Trophy, Award, Medal } from 'lucide-react'

interface Donor {
  name: string
  totalAmount: number
  donationCount?: number
}

interface LeaderboardOverlayProps {
  settings: OverlaySettings
  isPreview?: boolean
  /** Donor data (from BroadcastChannel or mock) */
  donors?: Donor[]
}

export function LeaderboardOverlay({
  settings,
  isPreview = false,
  donors: propDonors,
}: LeaderboardOverlayProps) {
  const leaderboardConfig = settings.config?.leaderboardConfig
  const theme = settings.theme

  if (!leaderboardConfig) return null

  // Use prop donors if provided, otherwise use mock data
  const defaultDonors: Donor[] = [
    { name: 'MusicFan42', totalAmount: 157.5, donationCount: 12 },
    { name: 'StreamLover', totalAmount: 125.0, donationCount: 8 },
    { name: 'GamingKing', totalAmount: 98.5, donationCount: 5 },
    { name: 'MelodyMaster', totalAmount: 75.0, donationCount: 3 },
    { name: 'BeatDrop', totalAmount: 62.5, donationCount: 2 },
  ]

  const donorsToDisplay = (propDonors ?? defaultDonors)
    .slice(0, leaderboardConfig.maxDonors)
    .map((donor, index) => ({
      ...donor,
      rank: index + 1,
    }))

  const getThemeStyles = () => {
    switch (theme) {
      case 'default':
        return 'bg-gradient-to-br from-primary-orange/20 to-primary-orange/10 backdrop-blur-md border-white/10'
      case 'minimal':
        return 'bg-black/80 backdrop-blur-md border-white/10'
      case 'neon':
        return 'bg-black/90 border-primary-orange shadow-[0_0_20px_rgba(255,107,53,0.3)]'
      case 'retro':
        return 'bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-yellow-400/30'
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" fill="currentColor" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" fill="currentColor" />
      case 3:
        return <Award className="w-5 h-5 text-orange-600" fill="currentColor" />
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-white/50 text-sm font-bold">
            {rank}
          </span>
        )
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/20 border-yellow-500/50'
      case 2:
        return 'bg-gray-400/20 border-gray-400/50'
      case 3:
        return 'bg-orange-600/20 border-orange-600/50'
      default:
        return 'bg-white/5 border-white/10'
    }
  }

  return (
    <div className={`w-full h-full rounded-lg border p-4 ${getThemeStyles()}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-primary-orange" />
        <h3 className="text-white font-bold text-lg">Top Donors</h3>
      </div>

      {/* Donors List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {donorsToDisplay.map((donor, index) => (
            <motion.div
              key={donor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-2.5 rounded-lg border ${getRankStyle(donor.rank)}`}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-black/30 rounded-full">
                {getRankIcon(donor.rank)}
              </div>

              {/* Avatar Placeholder */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-orange/40 to-primary-orange/60 flex items-center justify-center text-white font-bold flex-shrink-0">
                {donor.name.charAt(0)}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{donor.name}</p>
              </div>

              {/* Amount */}
              {leaderboardConfig.showAmount && (
                <div className="flex-shrink-0">
                  <p className="text-primary-orange font-bold text-lg">
                    ${donor.totalAmount.toFixed(2)}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 text-center">
        <p className="text-white/50 text-xs">Donate to get on the leaderboard!</p>
      </div>
    </div>
  )
}
