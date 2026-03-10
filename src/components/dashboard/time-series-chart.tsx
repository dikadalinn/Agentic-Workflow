'use client'

import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'
import type { ChartDataPoint } from '@/types/analytics'

interface TimeSeriesChartProps {
  data: ChartDataPoint[]
  metric: 'traffic' | 'donations'
  dateRange: '7d' | '30d' | '90d' | 'all'
  className?: string
}

export function TimeSeriesChart({ data, metric, dateRange, className }: TimeSeriesChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const isEmpty = !data || data.length === 0

  if (isEmpty) {
    return (
      <div
        className={cn(
          'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 flex items-center justify-center',
          className
        )}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-white mb-2">No data yet</h3>
          <p className="text-muted-foreground mb-4">
            Share your profile to start receiving donations!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6', className)}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          onMouseMove={(e) => {
            if (e.activePayload && e.activePayload.length > 0) {
              const index = data.findIndex((d) => d.date === e.activePayload[0].payload.date)
              setHoveredIndex(index)
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id={`color-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value, index) => {
              // Show fewer labels for larger date ranges
              if (dateRange === '90d' && index % 7 !== 0) return ''
              if (dateRange === '30d' && index % 4 !== 0) return ''
              return value
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value) => (metric === 'donations' ? `$${value}` : value)}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                return (
                  <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">{payload[0].payload.date}</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {metric === 'donations' ? `$${payload[0].value}` : payload[0].value}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#FF6B35"
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#color-${metric})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
