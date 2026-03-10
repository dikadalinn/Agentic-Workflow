import { z } from 'zod'
import type { StreamingPlatform } from '@/types/user'

export const onboardingSchema = z.object({
  displayName: z
    .string()
    .min(3, 'Display name must be at least 3 characters')
    .max(30, 'Display name must be 30 characters or less')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
  bio: z.string().max(200, 'Bio must be 200 characters or less').optional(),
  streamingPlatforms: z
    .array(z.enum(['twitch', 'youtube', 'kick', 'tiktok', 'other'] as const))
    .min(1, 'Select at least one platform'),
  otherPlatform: z.string().optional(),
})

export type OnboardingInput = z.infer<typeof onboardingSchema>
