export type DateRange = '7d' | '30d' | '90d' | 'all'
export type MetricType = 'traffic' | 'donations'

export interface DashboardMetrics {
  totalDonations: TrendMetric
  totalDonors: TrendMetric
  profileVisits: TrendMetric
  topSongsCount: number
}

export interface TrendMetric {
  value: number
  previousValue: number
  percentageChange: number
  trend: 'up' | 'down' | 'neutral'
}

export interface ChartDataPoint {
  date: string
  value: number
}

export interface SongRequest {
  id: string
  title: string
  artist: string
  thumbnailUrl: string
  requestCount: number
}

export interface RecentDonation {
  id: string
  donorName: string | null
  amount: number
  songTitle?: string
  createdAt: string
}

export interface DashboardData {
  metrics: DashboardMetrics
  chartData: ChartDataPoint[]
  topSongs: SongRequest[]
  recentDonations: RecentDonation[]
}
