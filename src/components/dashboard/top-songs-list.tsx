import { ExternalLink, Music } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SongRequest } from '@/types/analytics'

interface TopSongsListProps {
  songs: SongRequest[]
  className?: string
}

export function TopSongsList({ songs, className }: TopSongsListProps) {
  const isEmpty = !songs || songs.length === 0

  if (isEmpty) {
    return (
      <div
        className={cn(
          'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6',
          className
        )}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Top Songs</h3>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Music className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Songs you receive will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6', className)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Top Songs</h3>
        <button
          disabled
          className="text-sm text-primary-orange hover:text-primary-orange-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
        >
          View All <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-3">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
          >
            {/* Rank */}
            <div
              className={cn(
                'flex items-center justify-center w-6 h-6 rounded text-xs font-bold',
                index === 0
                  ? 'bg-primary-orange text-white'
                  : index === 1
                    ? 'bg-orange-500 text-white'
                    : index === 2
                      ? 'bg-orange-600 text-white'
                      : 'bg-white/10 text-muted-foreground'
              )}
            >
              {index + 1}
            </div>

            {/* Thumbnail */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
              <img
                src={song.thumbnailUrl}
                alt={song.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">{song.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
            </div>

            {/* Request Count */}
            <div className="flex-shrink-0">
              <span className="text-sm font-medium text-white">{song.requestCount}</span>
              <span className="text-xs text-muted-foreground ml-1">req</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
