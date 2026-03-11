import { motion } from 'framer-motion'
import { usePlayerStore } from '@/store/player.store'
import { formatTime } from '@/lib/utils'

export function NowPlaying() {
  const { currentSong, isPlaying, currentTime, duration } = usePlayerStore()

  if (!currentSong) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center"
      >
        <p className="text-muted-foreground">No song playing</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary-orange/10 to-transparent backdrop-blur-xl border border-primary-orange/20 rounded-xl p-6"
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 shadow-lg">
          <img
            src={currentSong.thumbnailUrl}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <motion.div
            animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-primary-orange uppercase tracking-wider">
                Now Playing
              </span>
              {isPlaying && (
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary-orange"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>

          <h2 className="text-xl font-bold text-white truncate">{currentSong.title}</h2>
          <p className="text-muted-foreground truncate">{currentSong.artist}</p>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Requested by {currentSong.donorName}</span>
            </div>
            <span className="text-primary-orange font-semibold">
              ${currentSong.donationAmount.toFixed(2)}
            </span>
          </div>

          <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-orange"
              initial={{ width: 0 }}
              animate={{
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
