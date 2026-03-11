'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { OverlaySettings } from '@/types/overlay'

interface LeaderboardConfigPanelProps {
  settings: OverlaySettings
  onUpdate: (updates: Partial<OverlaySettings>) => void
}

export function LeaderboardConfigPanel({ settings, onUpdate }: LeaderboardConfigPanelProps) {
  const leaderboardConfig = settings.config?.leaderboardConfig || {
    maxDonors: 5,
    showAmount: true,
  }

  const handleMaxDonorsChange = (value: string) => {
    onUpdate({
      config: {
        ...settings.config,
        leaderboardConfig: {
          maxDonors: Number(value) as 3 | 5 | 10,
          showAmount: leaderboardConfig.showAmount,
        },
      },
    })
  }

  const handleShowAmountToggle = (checked: boolean) => {
    onUpdate({
      config: {
        ...settings.config,
        leaderboardConfig: {
          maxDonors: leaderboardConfig.maxDonors,
          showAmount: checked,
        },
      },
    })
  }

  if (!leaderboardConfig) return null

  return (
    <div className="space-y-6">
      {/* Max Donors */}
      <div className="space-y-2">
        <Label htmlFor="max-donors">Number of Top Donors</Label>
        <Select
          value={leaderboardConfig.maxDonors.toString()}
          onValueChange={handleMaxDonorsChange}
        >
          <SelectTrigger id="max-donors" className="bg-white/5 border-white/10">
            <SelectValue placeholder="Select number" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">Top 3 donors</SelectItem>
            <SelectItem value="5">Top 5 donors</SelectItem>
            <SelectItem value="10">Top 10 donors</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          How many top donors to display on the leaderboard
        </p>
      </div>

      {/* Show Amount Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="show-amount">Show Donation Amount</Label>
          <p className="text-xs text-muted-foreground">
            Display total donation amount for each donor
          </p>
        </div>
        <Switch
          id="show-amount"
          checked={leaderboardConfig.showAmount}
          onCheckedChange={handleShowAmountToggle}
        />
      </div>
    </div>
  )
}
