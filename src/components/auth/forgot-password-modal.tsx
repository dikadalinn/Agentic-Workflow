'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth'

interface ForgotPasswordModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ForgotPasswordModal({ open, onOpenChange, onSuccess }: ForgotPasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true)
    setEmail(data.email)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setEmailSent(true)
    setIsLoading(false)

    // Call onSuccess callback after a delay
    if (onSuccess) {
      setTimeout(() => {
        onSuccess()
      }, 2000)
    }
  }

  const handleClose = () => {
    form.reset()
    setEmailSent(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-white/10 bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {!emailSent ? 'Reset Password' : 'Check Your Email'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {!emailSent
              ? 'Enter your email address and we\'ll send you a link to reset your password.'
              : `We've sent a password reset link to ${email}`}
          </DialogDescription>
        </DialogHeader>

        {!emailSent ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="h-12 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus:border-[#FF6B35] focus-visible:ring-[#FF6B35]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-white hover:from-[#E55A2B] hover:to-[#FF6B35]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reset Link
                  </>
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/20">
                <Mail className="h-8 w-8 text-[#10B981]" />
              </div>
            </div>
            <p className="text-center text-sm text-gray-400">
              The link will expire in 1 hour. If you don't receive the email, check your spam folder.
            </p>
            <Button
              onClick={handleClose}
              className="h-12 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] text-white hover:from-[#E55A2B] hover:to-[#FF6B35]"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
