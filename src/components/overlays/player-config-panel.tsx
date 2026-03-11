'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { OverlaySettings } from '@/types/overlay'

interface PlayerConfigPanelProps {
  settings: OverlaySettings
  onUpdate: (updates: Partial<OverlaySettings>) => void
}

export function PlayerConfigPanel({ settings, onUpdate }: PlayerConfigPanelProps) {
  const playerConfig = settings.config?.playerConfig || {
    showQueue: true,
    showProgress: true,
    queueSize: 5,
    autoPlay: true,
  }

  const handleQueueToggle = (checked: boolean) => {
    onUpdate({
      config: {
        ...settings.config,
        playerConfig: {
          showQueue: checked,
          showProgress: playerConfig.showProgress,
          queueSize: playerConfig.queueSize,
          autoPlay: playerConfig.autoPlay,
        },
      },
    })
  }

  const handleProgressToggle = (checked: boolean) => {
    onUpdate({
      config: {
        ...settings.config,
        playerConfig: {
          showQueue: playerConfig.showQueue,
          showProgress: checked,
          queueSize: playerConfig.queueSize,
          autoPlay: playerConfig.autoPlay,
        },
      },
    })
  }

  const handleAutoPlayToggle = (checked: boolean) => {
    onUpdate({
      config: {
        ...settings.config,
        playerConfig: {
          showQueue: playerConfig.showQueue,
          showProgress: playerConfig.showProgress,
          queueSize: playerConfig.queueSize,
          autoPlay: checked,
        },
      },
    })
  }

  const handleQueueSizeChange = (value: string) => {
    onUpdate({
      config: {
        ...settings.config,
        playerConfig: {
          showQueue: playerConfig.showQueue,
          showProgress: playerConfig.showProgress,
          queueSize: Number(value),
          autoPlay: playerConfig.autoPlay,
        },
      },
    })
  }

  if (!playerConfig) return null

  return (
    <div className="space-y-6">
      {/* Show Queue Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="show-queue">Show Queue</Label>
          <p className="text-xs text-muted-foreground">
            Display upcoming song requests
          </p>
        </div>
        <Switch
          id="show-queue"
          checked={playerConfig.showQueue}
          onCheckedChange={handleQueueToggle}
        />
      </div>

      {/* Show Progress Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="show-progress">Show Progress Bar</Label>
          <p className="text-xs text-muted-foreground">
            Display current song progress
          </p>
        </div>
        <Switch
          id="show-progress"
          checked={playerConfig.showProgress}
          onCheckedChange={handleProgressToggle}
        />
      </div>

      {/* Auto Play Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="auto-play">Auto Play</Label>
          <p className="text-xs text-muted-foreground">
            Automatically play next song in queue
          </p>
        </div>
        <Switch
          id="auto-play"
          checked={playerConfig.autoPlay}
          onCheckedChange={handleAutoPlayToggle}
        />
      </div>

      {/* Queue Size */}
      <div className="space-y-2">
        <Label htmlFor="queue-size">Queue Display Size</Label>
        <Select
          value={playerConfig.queueSize.toString()}
          onValueChange={handleQueueSizeChange}
          disabled={!playerConfig.showQueue}
        >
          <SelectTrigger id="queue-size" className="bg-white/5 border-white/10">
            <SelectValue placeholder="Select queue size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 songs</SelectItem>
            <SelectItem value="4">4 songs</SelectItem>
            <SelectItem value="5">5 songs</SelectItem>
            <SelectItem value="6">6 songs</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Number of songs to show in queue
        </p>
      </div>
    </div>
  )
}
