import Link from 'next/link'
import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0F] to-[#1A1A2E]">
      {/* Minimal header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FF8F5A] text-xl font-bold text-white">
              F
            </div>
            <span className="text-xl font-bold text-white">Frens</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>
    </div>
  )
}
