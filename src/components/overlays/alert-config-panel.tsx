'use client'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import type { OverlaySettings } from '@/types/overlay'
import { Play, Volume2, VolumeX } from 'lucide-react'

interface AlertConfigPanelProps {
  settings: OverlaySettings
  onUpdate: (updates: Partial<OverlaySettings>) => void
}

export function AlertConfigPanel({ settings, onUpdate }: AlertConfigPanelProps) {
  const alertConfig = settings.config?.alertConfig

  const handleAnimationChange = (value: string) => {
    onUpdate({
      config: {
        ...settings.config,
        alertConfig: {
          ...alertConfig,
          animationStyle: value as 'pulse' | 'fade' | 'slide' | 'shake' | 'bounce',
        },
      },
    })
  }

  const handleSoundToggle = (checked: boolean) => {
    onUpdate({
      config: {
        ...settings.config,
        alertConfig: {
          ...alertConfig,
          soundEnabled: checked,
        },
      },
    })
  }

  const handleDurationChange = (value: number) => {
    onUpdate({
      config: {
        ...settings.config,
        alertConfig: {
          ...alertConfig,
          duration: value,
        },
      },
    })
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      config: {
        ...settings.config,
        alertConfig: {
          ...alertConfig,
          customMessage: e.target.value,
        },
      },
    })
  }

  if (!alertConfig) return null

  return (
    <div className="space-y-6">
      {/* Animation Style */}
      <div className="space-y-2">
        <Label htmlFor="animation-style">Animation Style</Label>
        <Select
          value={alertConfig.animationStyle}
          onValueChange={handleAnimationChange}
        >
          <SelectTrigger id="animation-style" className="bg-white/5 border-white/10">
            <SelectValue placeholder="Select animation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pulse">Pulse</SelectItem>
            <SelectItem value="fade">Fade</SelectItem>
            <SelectItem value="slide">Slide</SelectItem>
            <SelectItem value="shake">Shake</SelectItem>
            <SelectItem value="bounce">Bounce</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          How the alert appears when a donation is received
        </p>
      </div>

      {/* Sound Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="sound-toggle">Sound Effects</Label>
          <p className="text-xs text-muted-foreground">
            Play sound when alert triggers
          </p>
        </div>
        <div className="flex items-center gap-2">
          {alertConfig.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-muted-foreground" />
          ) : (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          )}
          <Switch
            id="sound-toggle"
            checked={alertConfig.soundEnabled}
            onCheckedChange={handleSoundToggle}
          />
        </div>
      </div>

      {/* Duration Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="duration">Alert Duration</Label>
          <span className="text-sm text-muted-foreground">{alertConfig.duration}s</span>
        </div>
        <input
          id="duration"
          type="range"
          min="3"
          max="10"
          step="1"
          value={alertConfig.duration}
          onChange={(e) => handleDurationChange(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-orange"
        />
        <p className="text-xs text-muted-foreground">
          How long the alert stays visible
        </p>
      </div>

      {/* Custom Message */}
      <div className="space-y-2">
        <Label htmlFor="custom-message">Custom Alert Message</Label>
        <Input
          id="custom-message"
          placeholder="Thank you for the donation, {username}!"
          value={alertConfig.customMessage || ''}
          onChange={handleMessageChange}
          className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
        />
        <p className="text-xs text-muted-foreground">
          Use {'{username}'} as placeholder for donor name
        </p>
      </div>

      {/* Test Alert Button */}
      <Button
        onClick={() => window.dispatchEvent(new CustomEvent('test-alert', { detail: settings }))}
        className="w-full bg-primary-orange hover:bg-primary-orange-hover text-white"
      >
        <Play className="w-4 h-4 mr-2" />
        Test Alert Animation
      </Button>
    </div>
  )
}
