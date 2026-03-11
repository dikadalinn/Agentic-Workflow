import { useEffect, useRef, useCallback } from 'react'
import { usePlayerStore } from '@/store/player.store'
import { loadYouTubeAPI, createPlayer } from '@/lib/youtube-player'

export function useYouTubePlayer() {
  const playerRef = useRef<YT.Player | null>(null)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const currentSong = usePlayerStore((state) => state.currentSong)
  const volume = usePlayerStore((state) => state.volume)
  const updateCurrentTime = usePlayerStore((state) => state.updateCurrentTime)
  const updateDuration = usePlayerStore((state) => state.updateDuration)

  const play = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.playVideo()
    }
  }, [])

  const pause = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.pauseVideo()
    }
  }, [])

  const skip = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0, true)
      playerRef.current.playVideo()
    }
  }, [])

  const seekTo = useCallback((time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true)
    }
  }, [])

  const setVolume = useCallback((vol: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(vol)
    }
  }, [])

  useEffect(() => {
    loadYouTubeAPI()
  }, [])

  useEffect(() => {
    if (!currentSong) {
      if (playerRef.current) {
        playerRef.current.stopVideo()
      }
      return
    }

    if (!playerRef.current) {
      playerRef.current = createPlayer(
        currentSong.youtubeId,
        (state) => {
          if (state === YT.PlayerState.ENDED) {
            usePlayerStore.getState().pause()
          }
        },
        (currentTime, duration) => {
          updateCurrentTime(currentTime)
          updateDuration(duration)
        }
      )
    } else {
      playerRef.current.loadVideoById(currentSong.youtubeId)
    }
  }, [currentSong?.youtubeId])

  useEffect(() => {
    if (isPlaying) {
      play()
    } else {
      pause()
    }
  }, [isPlaying, play, pause])

  useEffect(() => {
    setVolume(volume)
  }, [volume, setVolume])

  return {
    play,
    pause,
    skip,
    seekTo,
    setVolume,
  }
}
