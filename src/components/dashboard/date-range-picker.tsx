'use client'

import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DateRange } from '@/types/analytics'

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'all', label: 'All Time' },
]

interface DateRangePickerProps {
  value: DateRange
  onChange: (value: DateRange) => void
  className?: string
}

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const selectedOption = dateRangeOptions.find((opt) => opt.value === value)

  return (
    <div className={cn('relative', className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DateRange)}
        className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-10 text-sm text-white hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-orange/50 cursor-pointer transition-all"
      >
        {dateRangeOptions.map((option) => (
          <option key={option.value} value={option.value} className="bg-neutral-dark text-white">
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  )
}
