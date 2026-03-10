'use client'

import { BarChart2, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricToggleProps {
  value: 'traffic' | 'donations'
  onChange: (value: 'traffic' | 'donations') => void
}

export function MetricToggle({ value, onChange }: MetricToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
      <button
        onClick={() => onChange('traffic')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
          value === 'traffic'
            ? 'bg-primary-orange text-white'
            : 'text-muted-foreground hover:text-white'
        )}
      >
        <BarChart2 className="h-4 w-4" />
        Traffic
      </button>

      <button
        onClick={() => onChange('donations')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
          value === 'donations'
            ? 'bg-primary-orange text-white'
            : 'text-muted-foreground hover:text-white'
        )}
      >
        <DollarSign className="h-4 w-4" />
        Donations
      </button>
    </div>
  )
}
