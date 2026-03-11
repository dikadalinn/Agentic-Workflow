// YouTube IFrame API is loaded dynamically from external script
// Type declarations are in a separate file to avoid conflicts

export function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT) {
      resolve()
      return
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)
    window.onYouTubeIframeAPIReady = () => resolve()
  })
}

export function createPlayer(
  videoId: string,
  onStateChange: (state: number) => void,
  onProgress: (currentTime: number, duration: number) => void
): YT.Player | null {
  if (!window.YT) return null

  const player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: (event) => {
        onProgress(event.target.getCurrentTime(), event.target.getDuration())
      },
      onStateChange: (event) => {
        onStateChange(event.data)

        if (event.data === YT.PlayerState.PLAYING) {
          const updateTime = () => {
            if (player && player.getCurrentTime && player.getDuration) {
              onProgress(player.getCurrentTime(), player.getDuration())
            }
          }
          const interval = setInterval(updateTime, 1000)
          return () => clearInterval(interval)
        }
      },
    },
  })

  return player
}
