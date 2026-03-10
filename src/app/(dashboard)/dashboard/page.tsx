'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { MetricCard } from '@/components/dashboard/metric-card'
import { TimeSeriesChart } from '@/components/dashboard/time-series-chart'
import { MetricToggle } from '@/components/dashboard/metric-toggle'
import { DateRangePicker } from '@/components/dashboard/date-range-picker'
import { TopSongsList } from '@/components/dashboard/top-songs-list'
import { RecentActivityFeed } from '@/components/dashboard/recent-activity-feed'
import {
  generateMockDashboardMetrics,
  generateMockChartData,
  generateMockTopSongs,
  generateMockRecentDonations,
} from '@/lib/mock-data'
import type { DateRange, MetricType, DashboardData } from '@/types/analytics'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, checkAuth } = useAuthStore()

  const [dateRange, setDateRange] = useState<DateRange>('7d')
  const [metricType, setMetricType] = useState<MetricType>('traffic')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    checkAuth()
  }, [checkAuth])

  const loadDashboardData = useCallback(() => {
    setIsLoading(true)

    setTimeout(() => {
      const metrics = generateMockDashboardMetrics(dateRange)
      const chartData = generateMockChartData(metricType, dateRange)
      const topSongs = generateMockTopSongs()
      const recentDonations = generateMockRecentDonations()

      setDashboardData({
        metrics,
        chartData,
        topSongs,
        recentDonations,
      })
      setIsLoading(false)
    }, 500)
  }, [dateRange, metricType])

  // Load dashboard data initially
  useEffect(() => {
    loadDashboardData()
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const authCheckTimeout = setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.push('/login')
        return
      }

      if (!user.isOnboarded) {
        router.push('/onboarding')
        return
      }
    }, 100)

    return () => clearTimeout(authCheckTimeout)
  }, [isMounted, isAuthenticated, user, router])

  // Reload dashboard data when date range or metric type changes
  useEffect(() => {
    if (isMounted && isAuthenticated && user?.isOnboarded) {
      loadDashboardData()
    }
  }, [dateRange, metricType])

  if (isLoading) {
    return (
      <div className="p-8 animate-pulse">
        <div className="h-8 bg-white/10 rounded w-64 mb-6" />
        <div className="grid grid-cols-4 gap-6 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-white/5 rounded-xl" />
          ))}
        </div>
        <div className="h-80 bg-white/5 rounded-xl mb-6" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-96 bg-white/5 rounded-xl" />
          <div className="h-96 bg-white/5 rounded-xl" />
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Dashboard</h2>
          <p className="text-muted-foreground">Please wait...</p>
        </div>
      </div>
    )
  }

  const hasAnyData =
    dashboardData.metrics.totalDonations.value > 0 ||
    dashboardData.metrics.totalDonors.value > 0 ||
    dashboardData.metrics.profileVisits.value > 0 ||
    dashboardData.topSongs.length > 0 ||
    dashboardData.recentDonations.length > 0

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.displayName || 'Streamer'}!
          </p>
        </div>

        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Donations"
          metric={dashboardData.metrics.totalDonations}
          icon="donations"
        />
        <MetricCard
          title="Total Donors"
          metric={dashboardData.metrics.totalDonors}
          icon="donors"
        />
        <MetricCard
          title="Profile Visits"
          metric={dashboardData.metrics.profileVisits}
          icon="visits"
        />
        <MetricCard
          title="Top Songs"
          metric={null}
          icon="songs"
          countValue={dashboardData.metrics.topSongsCount}
        />
      </div>

      {/* Time Series Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <MetricToggle value={metricType} onChange={setMetricType} />
        </div>

        {!hasAnyData ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">No data yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Share your profile to start receiving donations and song requests!
              </p>
              <div className="text-sm text-muted-foreground">
                Your profile URL:{' '}
                <span className="text-primary-orange font-mono">
                  {typeof window !== 'undefined' ? window.location.origin : ''}/{user?.displayName}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <TimeSeriesChart
            data={dashboardData.chartData}
            metric={metricType}
            dateRange={dateRange}
          />
        )}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSongsList songs={dashboardData.topSongs} />
        <RecentActivityFeed donations={dashboardData.recentDonations} />
      </div>
    </div>
  )
}
