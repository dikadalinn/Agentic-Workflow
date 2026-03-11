import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { motion } from 'framer-motion'
import { usePlayerStore } from '@/store/player.store'
import { useYouTubePlayer } from '@/hooks/use-youtube-player'

export function PlayerControls() {
  const { isPlaying, volume, setVolume, currentTime, duration, pause, play, skip } = usePlayerStore()
  const { play: playYouTube, pause: pauseYouTube, skip: skipYouTube, seekTo } = useYouTubePlayer()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pause()
      pauseYouTube()
    } else {
      play()
      playYouTube()
    }
  }

  const handleSkip = () => {
    skip()
    skipYouTube()
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
  }

  const handleSeek = (value: number[]) => {
    const time = value[0]
    seekTo(time)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 space-y-4"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={1}
          onValueChange={handleSeek}
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {volume === 0 ? (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Volume2 className="w-5 h-5 text-muted-foreground" />
          )}
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handlePlayPause}
            size="icon"
            variant="default"
            className="w-12 h-12 bg-primary-orange hover:bg-primary-orange/90 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-1" />
            )}
          </Button>

          <Button
            onClick={handleSkip}
            size="icon"
            variant="ghost"
            className="w-10 h-10 hover:bg-white/10 text-white"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
