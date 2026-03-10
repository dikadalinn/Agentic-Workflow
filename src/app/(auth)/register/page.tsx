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
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { useAuthStore } from '@/store/auth.store'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register: registerUser } = useAuthStore()

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)

    try {
      // Mock registration with localStorage
      await registerUser(data.email, data.password, data.email.split('@')[0])

      // Simulate email verification delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirect to verify-pending with email
      router.push(`/verify-pending?email=${encodeURIComponent(data.email)}`)
    } catch (error) {
      console.error('Registration error:', error)
      // For mock, we'll still redirect
      router.push(`/verify-pending?email=${encodeURIComponent(data.email)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const isEmailValid = form.formState.dirtyFields.email && !form.formState.errors.email
  const isPasswordValid = form.formState.dirtyFields.password && !form.formState.errors.password
  const isConfirmValid = form.formState.dirtyFields.confirmPassword && !form.formState.errors.confirmPassword
  const isFormValid = form.formState.isValid

  return (
    <AuthFormWrapper title="Create Account">
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

          {/* Confirm password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Confirm Password</FormLabel>
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          {/* Login link */}
          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-[#FF6B35] hover:text-[#FF8F5A] transition-colors"
            >
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </AuthFormWrapper>
  )
}
