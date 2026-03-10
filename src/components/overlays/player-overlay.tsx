'use client'

import { motion } from 'framer-motion'
import type { OverlaySettings } from '@/types/overlay'
import { Play, Pause, SkipForward, Music, ListMusic } from 'lucide-react'
import { mockSongs } from '@/lib/mock-data'

interface PlayerOverlayProps {
  settings: OverlaySettings
  isPreview?: boolean
}

export function PlayerOverlay({ settings, isPreview = false }: PlayerOverlayProps) {
  const playerConfig = settings.config?.playerConfig
  const theme = settings.theme

  if (!playerConfig) return null

  // Mock current song and queue
  const currentSong = mockSongs[0]
  const queue = mockSongs.slice(1, playerConfig.queueSize + 1)

  const getThemeStyles = () => {
    switch (theme) {
      case 'default':
        return {
          player: 'bg-gradient-to-r from-primary-orange/20 to-primary-orange/10 backdrop-blur-md border-white/10',
          queue: 'bg-black/60 backdrop-blur-md border-white/10',
        }
      case 'minimal':
        return {
          player: 'bg-black/80 backdrop-blur-md border-white/10',
          queue: 'bg-black/50 backdrop-blur-md border-white/5',
        }
      case 'neon':
        return {
          player: 'bg-black/90 border-primary-orange shadow-[0_0_10px_rgba(255,107,53,0.3)]',
          queue: 'bg-black/70 border-primary-orange/50',
        }
      case 'retro':
        return {
          player: 'bg-gradient-to-br from-purple-900/80 to-pink-900/80 border-yellow-400/30',
          queue: 'bg-purple-900/50 border-yellow-400/20',
        }
    }
  }

  const themeStyles = getThemeStyles()

  return (
    <div className="w-full h-full flex flex-col gap-2 p-3">
      {/* Current Song Player */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`rounded-lg p-3 border ${themeStyles.player}`}
      >
        <div className="flex items-center gap-3">
          {/* Album Art */}
          <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-black/30">
            <img
              src={currentSong.thumbnailUrl}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Play className="w-5 h-5 text-white" fill="white" />
            </div>
          </div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-white font-semibold text-sm truncate">
                {currentSong.title}
              </h3>
              <div className="flex gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <p className="text-white/60 text-xs truncate">
              {currentSong.artist}
            </p>

            {/* Progress Bar */}
            {playerConfig.showProgress && (
              <div className="mt-2">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '35%' }}
                    transition={{ duration: 1 }}
                    className="h-full bg-primary-orange rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-white/50 text-xs">1:14</span>
                  <span className="text-white/50 text-xs">3:32</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Queue */}
      {playerConfig.showQueue && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`rounded-lg p-2 border ${themeStyles.queue} flex-1 overflow-hidden`}
        >
          <div className="flex items-center gap-2 mb-2">
            <ListMusic className="w-4 h-4 text-white/70" />
            <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wider">
              Up Next
            </h4>
          </div>

          {queue.length === 0 ? (
            <div className="text-center py-4 text-white/50 text-xs">
              Queue is empty! Waiting for song requests...
            </div>
          ) : (
            <div className="space-y-1 overflow-y-auto">
              {queue.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-white/40 text-xs font-semibold w-4">
                    {index + 1}
                  </span>
                  <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0 bg-black/30">
                    <img
                      src={song.thumbnailUrl}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs truncate">{song.title}</p>
                    <p className="text-white/50 text-xs truncate">{song.artist}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
