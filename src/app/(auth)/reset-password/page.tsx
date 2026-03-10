'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const token = searchParams.get('token')

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)

      // Auto-redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      console.error('Reset password error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isPasswordValid = form.formState.dirtyFields.password && !form.formState.errors.password
  const isConfirmValid = form.formState.dirtyFields.confirmPassword && !form.formState.errors.confirmPassword
  const isFormValid = form.formState.isValid

  // Show error state if no token provided
  if (!token && !isSuccess) {
    return (
      <AuthFormWrapper title="Invalid Link">
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <Lock className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <p className="text-gray-400">
            This password reset link is invalid or has expired.
          </p>
          <Button
            onClick={() => router.push('/login')}
            className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-base font-medium text-white hover:from-[#E55A2B] hover:to-[#FF6B35]"
          >
            Request a New Link
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </AuthFormWrapper>
    )
  }

  // Show success state
  if (isSuccess) {
    return (
      <AuthFormWrapper title="Password Reset">
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/20">
              <CheckCircle2 className="h-8 w-8 text-[#10B981]" />
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">Password Updated!</h3>
            <p className="text-sm text-gray-400">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
          </div>
          <Button
            onClick={() => router.push('/login')}
            className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-base font-medium text-white hover:from-[#E55A2B] hover:to-[#FF6B35]"
          >
            Go to Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </AuthFormWrapper>
    )
  }

  // Show form
  return (
    <AuthFormWrapper title="Reset Password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-12 bg-white/5 pl-12 pr-12 text-white placeholder:text-gray-500 focus:border-[#FF6B35] focus-visible:ring-[#FF6B35]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Confirm New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-12 bg-white/5 pl-12 pr-12 text-white placeholder:text-gray-500 focus:border-[#FF6B35] focus-visible:ring-[#FF6B35]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password requirements hint */}
          <div className="space-y-2 rounded-lg bg-white/5 p-4">
            <p className="text-sm font-medium text-gray-300">Password must contain:</p>
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className={isPasswordValid ? 'text-green-500' : 'text-gray-500'}>•</span>
                At least 8 characters
              </li>
              <li className="flex items-center gap-2">
                <span className={isPasswordValid ? 'text-green-500' : 'text-gray-500'}>•</span>
                At least one number
              </li>
              <li className="flex items-center gap-2">
                <span className={isPasswordValid ? 'text-green-500' : 'text-gray-500'}>•</span>
                At least one special character
              </li>
            </ul>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-base font-medium text-white hover:from-[#E55A2B] hover:to-[#FF6B35] disabled:opacity-50"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Resetting password...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>

          {/* Back to login */}
          <div className="text-center text-sm text-gray-400">
            Remember your password?{' '}
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="font-medium text-[#FF6B35] hover:text-[#FF8F5A] transition-colors"
            >
              Log in
            </button>
          </div>
        </form>
      </Form>
    </AuthFormWrapper>
  )
}
