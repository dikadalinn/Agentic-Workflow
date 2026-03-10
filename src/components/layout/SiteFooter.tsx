'use client'

import Link from 'next/link'
import { Music, Twitter, MessageCircle, Github } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0F] mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8F5A] text-white">
                <Music className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">Frens</span>
            </Link>
            <p className="text-sm text-gray-400">Song requests & donations for streamers</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/#features" className="hover:text-[#FF6B35] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#FF6B35] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#FF6B35] transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/docs" className="hover:text-[#FF6B35] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF6B35] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FF6B35] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-[#FF6B35] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FF6B35] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col items-center gap-4 text-sm text-gray-400">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
              aria-label="Discord"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          <p>&copy; {new Date().getFullYear()} Frens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
