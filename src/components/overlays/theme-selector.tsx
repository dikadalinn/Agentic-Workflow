'use client'

import type { OverlaySettings } from '@/types/overlay'
import { Paintbrush } from 'lucide-react'

interface ThemeSelectorProps {
  settings: OverlaySettings
  onUpdate: (theme: 'default' | 'minimal' | 'neon' | 'retro') => void
}

export function ThemeSelector({ settings, onUpdate }: ThemeSelectorProps) {
  const themes = [
    {
      value: 'default' as const,
      name: 'Default',
      description: 'Classic orange gradient',
      preview: 'linear-gradient(135deg, #FF6B35 0%, #FF6B35AA 100%)',
    },
    {
      value: 'minimal' as const,
      name: 'Minimal',
      description: 'Clean black & white',
      preview: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
    },
    {
      value: 'neon' as const,
      name: 'Neon',
      description: 'Glowing orange borders',
      preview: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 100%)',
    },
    {
      value: 'retro' as const,
      name: 'Retro',
      description: '80s purple & pink',
      preview: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Paintbrush className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">Overlay Theme</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => onUpdate(theme.value)}
            className={`relative p-3 rounded-lg border-2 transition-all ${
              settings.theme === theme.value
                ? 'border-primary-orange ring-2 ring-primary-orange/20'
                : 'border-white/10 hover:border-white/20 hover:bg-white/5'
            }`}
          >
            {/* Theme Preview */}
            <div
              className="w-full h-16 rounded-md mb-2"
              style={{ background: theme.preview }}
            >
              {theme.value === 'neon' && (
                <div className="absolute inset-0 border-2 border-primary-orange/50 rounded-md" />
              )}
            </div>

            {/* Theme Info */}
            <div className="text-left">
              <h4 className="text-sm font-semibold text-white">
                {theme.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {theme.description}
              </p>
            </div>

            {/* Selected Indicator */}
            {settings.theme === theme.value && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 rounded-full bg-primary-orange flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
