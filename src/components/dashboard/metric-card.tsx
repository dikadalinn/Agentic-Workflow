import { DollarSign, Users, Eye, Music, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TrendMetric } from '@/types/analytics'

interface MetricCardProps {
  title: string
  metric: TrendMetric | null
  icon: 'donations' | 'donors' | 'visits' | 'songs'
  countValue?: number
  className?: string
}

const iconMap = {
  donations: DollarSign,
  donors: Users,
  visits: Eye,
  songs: Music,
}

export function MetricCard({ title, metric, icon, countValue, className }: MetricCardProps) {
  const Icon = iconMap[icon]

  const renderValue = () => {
    if (icon === 'songs') {
      return countValue !== undefined ? countValue : '—'
    }
    if (icon === 'donations') {
      return metric ? `$${metric.value.toFixed(2)}` : '$0.00'
    }
    return metric ? metric.value : 0
  }

  const renderTrend = () => {
    if (icon === 'songs') {
      return null
    }

    if (!metric) {
      return (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Minus className="h-3 w-3" />
          <span>No data yet</span>
        </div>
      )
    }

    const isZeroChange = Math.abs(metric.percentageChange) < 0.1

    if (isZeroChange || metric.value === 0) {
      return (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Minus className="h-3 w-3" />
          <span>No change</span>
        </div>
      )
    }

    const isPositive = metric.trend === 'up'
    const trendColor = isPositive ? 'text-emerald-500' : 'text-red-500'
    const TrendIcon = isPositive ? TrendingUp : TrendingDown

    return (
      <div className={cn('flex items-center gap-1 text-sm', trendColor)}>
        <TrendIcon className="h-3 w-3" />
        <span>
          {Math.abs(metric.percentageChange).toFixed(1)}% vs last {getPreviousPeriodText()}
        </span>
      </div>
    )
  }

  const getPreviousPeriodText = () => {
    // This would ideally be passed as a prop or derived from date range
    return '7 days'
  }

  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 transition-all hover:border-white/20',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </div>
      </div>

      <div className="mb-2">
        <div className="text-3xl font-bold text-white tracking-tight">{renderValue()}</div>
      </div>

      {renderTrend()}
    </div>
  )
}
