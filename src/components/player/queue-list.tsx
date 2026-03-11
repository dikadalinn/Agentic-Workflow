import { useState } from 'react'
import { QueueItem } from './queue-item'
import { EmptyQueueState } from './empty-queue-state'
import { QueueItemModal } from './queue-item-modal'
import { useQueueStore } from '@/store/queue.store'
import { usePlayerStore } from '@/store/player.store'
import type { QueuedSong } from '@/types/player'

export function QueueList() {
  const { songs, reorderSongs, removeSong, playNext } = useQueueStore()
  const { currentSong, setCurrentSong, play, pause } = usePlayerStore()
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [selectedSong, setSelectedSong] = useState<QueuedSong | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) return

    reorderSongs(draggedIndex, dropIndex)
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleItemClick = (song: QueuedSong) => {
    setSelectedSong(song)
    setIsModalOpen(true)
  }

  const handleModalRemove = () => {
    if (selectedSong) {
      removeSong(selectedSong.id)
      if (currentSong?.id === selectedSong.id) {
        setCurrentSong(null)
        pause()
      }
    }
    setIsModalOpen(false)
    setSelectedSong(null)
  }

  const handleModalPlayNext = () => {
    if (selectedSong) {
      playNext(selectedSong.id)
      const updatedSongs = useQueueStore.getState().songs
      if (updatedSongs.length > 0) {
        setCurrentSong(updatedSongs[0])
        play()
      }
    }
    setIsModalOpen(false)
    setSelectedSong(null)
  }

  const handleItemPlayNext = (song: QueuedSong) => {
    playNext(song.id)
    const updatedSongs = useQueueStore.getState().songs
    if (updatedSongs.length > 0) {
      setCurrentSong(updatedSongs[0])
      play()
    }
  }

  const handleItemRemove = (song: QueuedSong) => {
    removeSong(song.id)
    if (currentSong?.id === song.id) {
      setCurrentSong(null)
      pause()
    }
  }

  if (songs.length === 0) {
    return <EmptyQueueState />
  }

  return (
    <>
      <div className="space-y-2">
        {songs.map((song, index) => (
          <QueueItem
            key={song.id}
            song={song}
            index={index}
            isCurrent={currentSong?.id === song.id}
            isDragging={draggedIndex === index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => handleItemClick(song)}
            onPlayNext={() => handleItemPlayNext(song)}
            onRemove={() => handleItemRemove(song)}
          />
        ))}
      </div>

      <QueueItemModal
        song={selectedSong}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSong(null)
        }}
        onRemove={handleModalRemove}
        onPlayNext={handleModalPlayNext}
      />
    </>
  )
}
