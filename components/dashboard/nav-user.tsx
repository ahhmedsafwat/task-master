'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { ChevronsUpDown, LogOut, Settings } from 'lucide-react'
import { ThemeToggle } from '../ui/theme-toggle'
import { getuser, signOut } from '@/lib/server/actions'
import { UserProfileCard } from './user-profile-card'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export const NavUser = () => {
  const [userData, setUserData] = useState<{
    username?: string
    email?: string
    image?: string
  } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await getuser()
      if (user) {
        setUserData({
          username: user.user_metadata?.username || user.email?.split('@')[0],
          email: user.email || '',
          image: user.user_metadata?.avatar_url,
        })
      }
    }

    fetchUserProfile()
  }, [supabase])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:bg-accent bg-background relative flex cursor-pointer items-center justify-between rounded-lg border py-2 pl-2 pr-2 shadow-lg transition-all">
          <UserProfileCard
            name={userData?.username || ''}
            email={userData?.email || ''}
            image={userData?.image}
          />
          <ChevronsUpDown size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <UserProfileCard
            name={userData?.username || ''}
            email={userData?.email || ''}
            image={userData?.image}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-3">
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3">
          <ThemeToggle />
          <span>theme</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => {
            await signOut()
          }}
        >
          <LogOut className="text-destructive focus:text-destructive" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
