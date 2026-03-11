import { Play, MoreVertical, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import type { QueuedSong } from '@/types/player'
import { formatDistanceToNow } from 'date-fns'

interface QueueItemProps {
  song: QueuedSong
  index: number
  isCurrent: boolean
  isDragging?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  onDragEnd?: () => void
  onPlayNext?: () => void
  onRemove?: () => void
  onClick?: () => void
}

export function QueueItem({
  song,
  index,
  isCurrent,
  isDragging = false,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onPlayNext,
  onRemove,
  onClick,
}: QueueItemProps) {
  const handlePlayNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    onPlayNext?.()
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove?.()
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`
        group relative flex items-center gap-4 p-3 rounded-lg border transition-all
        ${isCurrent
          ? 'bg-primary-orange/10 border-primary-orange/50'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      <div className="flex items-center justify-center w-6 text-muted-foreground">
        {isCurrent ? (
          <Play className="w-3 h-3 text-primary-orange fill-current" />
        ) : (
          <GripVertical className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
        <img
          src={song.thumbnailUrl}
          alt={song.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-medium truncate ${isCurrent ? 'text-primary-orange' : 'text-white'}`}>
          {song.title}
        </h4>
        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span>${song.donationAmount.toFixed(2)}</span>
          <span>•</span>
          <span>{song.donorName}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          onClick={handlePlayNext}
          size="icon"
          variant="ghost"
          className="h-8 w-8 hover:bg-white/10"
        >
          <Play className="w-4 h-4" />
        </Button>
      </div>

      {isCurrent && (
        <motion.div
          layoutId="now-playing-indicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-primary-orange rounded-l-lg"
        />
      )}
    </motion.div>
  )
}
