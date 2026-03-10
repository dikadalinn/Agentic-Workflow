'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Music, Settings, LayoutTemplate, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth.store'

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Player & Queue',
    href: '/dashboard/player',
    icon: Music,
  },
  {
    title: 'Overlays',
    href: '/dashboard/overlays',
    icon: LayoutTemplate,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

interface SiteSidebarProps {
  className?: string
}

export function SiteSidebar({ className }: SiteSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  return (
    <aside className={cn('w-64 border-r bg-white h-screen sticky top-0', className)}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <Music className="h-6 w-6 text-primary-orange" />
          <span className="text-xl font-bold">Frens</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="border-b px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-orange/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary-orange" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.displayName || 'User'}</p>
            <p className="text-xs text-neutral-gray truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary-orange/10 text-primary-orange'
                  : 'text-neutral-gray hover:bg-neutral-light hover:text-neutral-dark'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-neutral-gray hover:text-error"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Log Out
        </Button>
      </div>
    </aside>
  )
}
