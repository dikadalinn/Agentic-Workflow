export interface Donation {
  id: string
  streamerId: string
  donorName: string
  amount: number
  currency: string
  message?: string
  songId: string
  songTitle: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}
