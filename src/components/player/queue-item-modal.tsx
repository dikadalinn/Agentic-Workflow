import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { X, Play, Trash2, Clock, DollarSign, MessageSquare } from 'lucide-react'
import type { QueuedSong } from '@/types/player'
import { motion } from 'framer-motion'

interface QueueItemModalProps {
  song: QueuedSong | null
  open: boolean
  onClose: () => void
  onRemove: () => void
  onPlayNext: () => void
}

export function QueueItemModal({ song, open, onClose, onRemove, onPlayNext }: QueueItemModalProps) {
  if (!song) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-dark/95 backdrop-blur-xl border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Queue Item Details</DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <div className="flex gap-4 mb-6">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
              <img
                src={song.thumbnailUrl}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate">{song.title}</h3>
              <p className="text-muted-foreground">{song.artist}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 text-primary-orange mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Donation</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Donor:</span>
                  <span className="text-white font-medium">{song.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="text-white font-medium">${song.donationAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {song.message && (
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary-orange mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">Message</span>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{song.message}</p>
              </div>
            )}

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Requested</span>
              </div>
              <p className="text-sm text-white">
                {formatDistanceToNow(new Date(song.requestedAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={onPlayNext}
              variant="secondary"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Play Next
            </Button>
            <Button
              onClick={onRemove}
              variant="destructive"
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
