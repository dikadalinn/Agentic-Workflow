'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface OverlayURLGeneratorProps {
  type: 'alert' | 'player' | 'leaderboard'
  streamerId: string
}

export function OverlayURLGenerator({ type, streamerId }: OverlayURLGeneratorProps) {
  const [copied, setCopied] = useState(false)

  const getOverlayUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    return `${baseUrl}/overlay/${type}/${streamerId}`
  }

  const handleCopy = async () => {
    const url = getOverlayUrl()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('URL copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy URL')
    }
  }

  const handleOpenOverlay = () => {
    const url = getOverlayUrl()
    window.open(url, '_blank')
  }

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Copy className="w-5 h-5 text-primary-orange" />
          Overlay URL
        </CardTitle>
        <CardDescription>
          Copy this URL and paste it into OBS Browser Source
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* URL Input */}
        <div className="flex gap-2">
          <Input
            value={getOverlayUrl()}
            readOnly
            className="bg-white/5 border-white/10 text-white font-mono text-sm"
          />
          <Button
            onClick={handleCopy}
            variant={copied ? 'default' : 'outline'}
            className={copied ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Open Button */}
        <Button
          onClick={handleOpenOverlay}
          variant="outline"
          className="w-full border-white/20 hover:bg-white/10 text-white"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open Overlay in New Tab
        </Button>

        {/* Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• This URL works without authentication</p>
          <p>• Changes you make apply instantly</p>
          <p>• Compatible with OBS, Streamlabs, and more</p>
        </div>
      </CardContent>
    </Card>
  )
}
