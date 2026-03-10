'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Music, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SiteHeaderProps {
  showAuth?: boolean
}

export function SiteHeader({ showAuth = true }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/#features', label: 'Features' },
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/#pricing', label: 'Pricing' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0A0F]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0A0A0F]/90 transition-all duration-300',
        isScrolled ? 'shadow-lg shadow-black/50' : ''
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'flex h-16 items-center justify-between transition-all duration-300',
            isScrolled && 'h-14'
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8F5A] text-white"
            >
              <Music className="h-5 w-5" />
            </motion.div>
            <span
              className={cn(
                'font-bold text-white transition-all duration-300',
                isScrolled ? 'text-lg' : 'text-xl'
              )}
            >
              Frens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 transition-all hover:text-white hover:text-[#FF6B35]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          {showAuth && (
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size={isScrolled ? 'sm' : 'default'}
                className="text-gray-300 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link href="/login">Log In</Link>
              </Button>
              <Button
                className={cn(
                  'bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] hover:from-[#E55A2B] hover:to-[#FF6B35] text-white shadow-lg shadow-orange-500/30 transition-all duration-300',
                  isScrolled && 'h-9 px-4 text-sm'
                )}
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-300">
            <nav className="border-t border-white/10 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-4 text-lg font-medium text-gray-300 hover:bg-white/10 hover:text-[#FF6B35]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {showAuth && (
                <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg text-gray-300 hover:bg-white/10 hover:text-white"
                    asChild
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] hover:from-[#E55A2B] hover:to-[#FF6B35] text-white text-lg"
                    asChild
                  >
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
