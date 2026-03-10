import { QueueItem, Donation, Song } from '@/types'
import type {
  DashboardMetrics,
  ChartDataPoint,
  SongRequest,
  RecentDonation,
  DateRange,
  MetricType,
} from '@/types/analytics'

export const mockSongs: Song[] = [
  {
    id: 'song-1',
    youtubeVideoId: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg',
    duration: 212,
  },
  {
    id: 'song-2',
    youtubeVideoId: 'kJQP7kiw5Fk',
    title: 'Despacito',
    artist: 'Luis Fonsi',
    thumbnailUrl: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/default.jpg',
    duration: 279,
  },
  {
    id: 'song-3',
    youtubeVideoId: '9bZkp7q19f0',
    title: 'Gangnam Style',
    artist: 'PSY',
    thumbnailUrl: 'https://i.ytimg.com/vi/9bZkp7q19f0/default.jpg',
    duration: 252,
  },
  {
    id: 'song-4',
    youtubeVideoId: 'JGwWNGJdvx8',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    thumbnailUrl: 'https://i.ytimg.com/vi/JGwWNGJdvx8/default.jpg',
    duration: 234,
  },
  {
    id: 'song-5',
    youtubeVideoId: 'fRh_vgS2dFE',
    title: 'Sorry',
    artist: 'Justin Bieber',
    thumbnailUrl: 'https://i.ytimg.com/vi/fRh_vgS2dFE/default.jpg',
    duration: 200,
  },
]

export const mockDonations: Donation[] = [
  {
    id: 'donation-1',
    streamerId: 'mock-user-1',
    donorName: 'MusicFan42',
    amount: 5,
    currency: 'USD',
    message: 'Play this song please! 🎵',
    songId: 'song-1',
    songTitle: 'Never Gonna Give You Up',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'donation-2',
    streamerId: 'mock-user-1',
    donorName: 'StreamLover',
    amount: 10,
    currency: 'USD',
    message: "You're the best streamer!",
    songId: 'song-2',
    songTitle: 'Despacito',
    status: 'pending',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'donation-3',
    streamerId: 'mock-user-1',
    donorName: 'GamingKing',
    amount: 25,
    currency: 'USD',
    message: 'This song is amazing! 🔥',
    songId: 'song-3',
    songTitle: 'Gangnam Style',
    status: 'completed',
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
]

export const mockQueue: QueueItem[] = [
  {
    id: 'queue-1',
    song: mockSongs[0],
    donorName: 'MusicFan42',
    amount: 5,
    message: 'Play this song please! 🎵',
    requestedAt: new Date(Date.now() - 3600000).toISOString(),
    status: 'pending',
  },
  {
    id: 'queue-2',
    song: mockSongs[1],
    donorName: 'StreamLover',
    amount: 10,
    message: "You're the best streamer!",
    requestedAt: new Date(Date.now() - 7200000).toISOString(),
    status: 'pending',
  },
  {
    id: 'queue-3',
    song: mockSongs[2],
    donorName: 'GamingKing',
    amount: 25,
    message: 'This song is amazing! 🔥',
    requestedAt: new Date(Date.now() - 10800000).toISOString(),
    status: 'playing',
  },
]

export const mockDashboardMetrics = {
  totalDonations: 1575.5,
  totalRequests: 42,
  uniqueDonors: 28,
  averageDonation: 37.51,
  donationsThisWeek: 325.0,
  requestsThisWeek: 12,
}

export const mockTopSongs = [
  {
    song: mockSongs[0],
    requestCount: 8,
    totalDonations: 45,
  },
  {
    song: mockSongs[1],
    requestCount: 6,
    totalDonations: 60,
  },
  {
    song: mockSongs[2],
    requestCount: 5,
    totalDonations: 125,
  },
  {
    song: mockSongs[3],
    requestCount: 4,
    totalDonations: 20,
  },
  {
    song: mockSongs[4],
    requestCount: 3,
    totalDonations: 15,
  },
]

export const mockRecentActivity = [
  {
    id: 'activity-1',
    type: 'donation',
    donorName: 'MusicFan42',
    amount: 5,
    songTitle: 'Never Gonna Give You Up',
    createdAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    type: 'donation',
    donorName: 'StreamLover',
    amount: 10,
    songTitle: 'Despacito',
    createdAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    type: 'donation',
    donorName: 'GamingKing',
    amount: 25,
    songTitle: 'Gangnam Style',
    createdAt: new Date(Date.now() - 900000).toISOString(),
  },
  {
    type: 'queue_added',
    donorName: 'MusicLover',
    songTitle: 'Shape of You',
    createdAt: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    type: 'song_played',
    songTitle: 'Never Gonna Give You Up',
    createdAt: new Date(Date.now() - 1500000).toISOString(),
  },
]

// Landing page mock data
export const mockTestimonials = [
  {
    id: '1',
    name: 'Sarah_Streams',
    avatar: '/images/testimonials/avatar-1.jpg',
    quote:
      'Frens transformed how I interact with my audience! The OBS overlay is seamless and my donations have tripled.',
    platform: 'Twitch',
  },
  {
    id: '2',
    name: 'GamingKing99',
    avatar: '/images/testimonials/avatar-2.jpg',
    quote: 'Finally a platform that combines song requests with donations. My viewers love it!',
    platform: 'YouTube',
  },
  {
    id: '3',
    name: 'CreativeVibes',
    avatar: '/images/testimonials/avatar-3.jpg',
    quote:
      'Setup took less than 5 minutes. The analytics help me understand what my community wants to hear.',
    platform: 'Kick',
  },
]

export const featureHighlights = [
  {
    icon: 'Music',
    title: 'Music Requests',
    description: 'Let viewers request songs with their donations. Your queue, your rules.',
  },
  {
    icon: 'DollarSign',
    title: 'Donate & Earn',
    description: 'Earn money while engaging with your audience. Every song request is a donation.',
  },
  {
    icon: 'MonitorPlay',
    title: 'OBS Overlays',
    description: 'Beautiful, customizable overlays that work with any streaming platform.',
  },
  {
    icon: 'BarChart3',
    title: 'Stats Dashboard',
    description: 'Track your donations, top songs, and audience engagement in real-time.',
  },
]

// Analytics Dashboard Mock Data Functions

export function generateMockDashboardMetrics(dateRange: DateRange): DashboardMetrics {
  // Base values that change based on date range
  const multipliers = {
    '7d': 1,
    '30d': 4.2,
    '90d': 11.5,
    all: 15.8,
  }

  const multiplier = multipliers[dateRange]

  // Generate some realistic variance
  const variance = () => 0.9 + Math.random() * 0.2 // 0.9 to 1.1

  const currentDonations = Math.round(1234.56 * multiplier * variance() * 100) / 100
  const previousDonations = Math.round(1097.12 * multiplier * variance() * 100) / 100

  const currentDonors = Math.round(42 * multiplier * variance())
  const previousDonors = Math.round(39 * multiplier * variance())

  const currentVisits = Math.round(892 * multiplier * variance())
  const previousVisits = Math.round(911 * multiplier * variance())

  return {
    totalDonations: {
      value: currentDonations,
      previousValue: previousDonations,
      percentageChange: ((currentDonations - previousDonations) / previousDonations) * 100,
      trend:
        currentDonations > previousDonations
          ? 'up'
          : currentDonations < previousDonations
            ? 'down'
            : 'neutral',
    },
    totalDonors: {
      value: currentDonors,
      previousValue: previousDonors,
      percentageChange: ((currentDonors - previousDonors) / previousDonors) * 100,
      trend:
        currentDonors > previousDonors ? 'up' : currentDonors < previousDonors ? 'down' : 'neutral',
    },
    profileVisits: {
      value: currentVisits,
      previousValue: previousVisits,
      percentageChange: ((currentVisits - previousVisits) / previousVisits) * 100,
      trend:
        currentVisits > previousVisits ? 'up' : currentVisits < previousVisits ? 'down' : 'neutral',
    },
    topSongsCount: Math.round(12 * variance()),
  }
}

export function generateMockChartData(metric: MetricType, dateRange: DateRange): ChartDataPoint[] {
  const dataPoints: ChartDataPoint[] = []
  const now = new Date()

  let days = 7
  if (dateRange === '30d') days = 30
  else if (dateRange === '90d') days = 90
  else if (dateRange === 'all') days = 180

  const baseValue = metric === 'donations' ? 150 : 400

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    // Generate realistic-looking data with some randomness
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const randomFactor = 0.7 + Math.random() * 0.6

    let value = baseValue * randomFactor
    if (isWeekend) value *= 1.3 // Higher traffic/donations on weekends

    value = Math.round(value)

    dataPoints.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value,
    })
  }

  return dataPoints
}

export function generateMockTopSongs(): SongRequest[] {
  const additionalSongs = [
    {
      id: 'song-6',
      youtubeVideoId: 'CevxZvSJLk8',
      title: 'Roar',
      artist: 'Katy Perry',
      thumbnailUrl: 'https://i.ytimg.com/vi/CevxZvSJLk8/default.jpg',
      duration: 236,
    },
    {
      id: 'song-7',
      youtubeVideoId: 'hT_nvWreIhg',
      title: 'Counting Stars',
      artist: 'OneRepublic',
      thumbnailUrl: 'https://i.ytimg.com/vi/hT_nvWreIhg/default.jpg',
      duration: 254,
    },
  ]

  const allSongs = [...mockSongs, ...additionalSongs]

  // Sort by request count and take top 5
  return allSongs
    .map((song, index) => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      thumbnailUrl: song.thumbnailUrl,
      requestCount: Math.max(1, Math.round((10 - index) * (0.8 + Math.random() * 0.4))),
    }))
    .sort((a, b) => b.requestCount - a.requestCount)
    .slice(0, 5)
    .map((song, index) => ({
      ...song,
      requestCount: Math.round(song.requestCount * (1 - index * 0.15)), // Gradually decrease counts
    }))
}

export function generateMockRecentDonations(): RecentDonation[] {
  const donors = [
    { name: 'MusicFan42', displayName: 'MusicFan42' },
    { name: 'StreamLover', displayName: 'StreamLover' },
    { name: 'GamingKing', displayName: 'GamingKing' },
    { name: 'MelodyMaster', displayName: 'MelodyMaster' },
    { name: 'BeatDrop', displayName: 'BeatDrop' },
    { name: 'RockStar99', displayName: 'RockStar99' },
    { name: 'JazzFan', displayName: 'JazzFan' },
    { name: 'PopPrincess', displayName: 'PopPrincess' },
    null, // Anonymous
    null, // Anonymous
  ]

  const songs = mockSongs

  const donations: RecentDonation[] = []

  for (let i = 0; i < 10; i++) {
    const donor = donors[i]
    const song = songs[Math.floor(Math.random() * songs.length)]
    const timeOffset = Math.random() * 24 * 60 * 60 * 1000 // Within last 24 hours

    donations.push({
      id: `recent-donation-${i + 1}`,
      donorName: donor?.displayName || null,
      amount: Math.round((1 + Math.random() * 49) * 100) / 100, // $1.00 - $50.00
      songTitle: song.title,
      createdAt: new Date(Date.now() - timeOffset).toISOString(),
    })
  }

  return donations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}
