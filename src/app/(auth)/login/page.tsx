'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
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
import { ForgotPasswordModal } from '@/components/auth/forgot-password-modal'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { useAuthStore } from '@/store/auth.store'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const { login, user } = useAuthStore()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)

    try {
      // Mock login with localStorage
      await login(data.email, data.password)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if user is onboarded and redirect accordingly
      // For mock, we'll redirect to dashboard for now
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      // For mock, we'll still redirect
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const isEmailValid = form.formState.dirtyFields.email && !form.formState.errors.email
  const isPasswordValid = form.formState.dirtyFields.password && !form.formState.errors.password
  const isFormValid = form.formState.isValid

  return (
    <>
      <AuthFormWrapper title="Welcome Back">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                        className="h-12 bg-white/5 pl-12 pr-12 text-white placeholder:text-gray-500 focus:border-[#FF6B35] focus-visible:ring-[#FF6B35]"
                      />
                      {isEmailValid && (
                        <CheckCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Password</FormLabel>
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

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-600 bg-white/5 text-[#FF6B35] focus:ring-[#FF6B35] focus:ring-offset-0"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm font-medium text-[#FF6B35] hover:text-[#FF8F5A] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Error message */}
            {form.formState.errors.root && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">
                {form.formState.errors.root.message}
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-base font-medium text-white hover:from-[#E55A2B] hover:to-[#FF6B35] disabled:opacity-50"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                'Log In'
              )}
            </Button>

            {/* Register link */}
            <div className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-[#FF6B35] hover:text-[#FF8F5A] transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </AuthFormWrapper>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
        onSuccess={() => setShowForgotPassword(false)}
      />
    </>
  )
}
