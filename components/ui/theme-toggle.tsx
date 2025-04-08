'use client'
import { Laptop, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-muted inline-flex w-fit items-center gap-1 rounded-2xl">
      <Button
        variant="ghost"
        size="icon"
        className={`text-foreground hover:bg-secondary size-6 cursor-pointer rounded-full ${theme === 'system' ? 'bg-background shadow-sm' : ''}`}
        onClick={() => setTheme('system')}
      >
        <Laptop className="h-4 w-4" />
        <span className="sr-only">System theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`text-foreground hover:bg-accent size-6 cursor-pointer rounded-full ${theme === 'light' ? 'bg-background shadow-sm' : ''}`}
        onClick={() => setTheme('light')}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`text-foreground hover:bg-accent size-6 cursor-pointer rounded-full ${theme === 'dark' ? 'bg-background shadow-sm' : ''}`}
        onClick={() => setTheme('dark')}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark theme</span>
      </Button>
    </div>
  )
}
