'use client'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface StatsCardProps {
  title: string
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export const StatsCard = ({ title, description, trend }: StatsCardProps) => {
  return (
    <Card className={'min-w-[180px] grow py-4 shadow-md'}>
      <CardHeader className="flex flex-col">
        <CardDescription className="font-geist-mono flex items-center gap-3 text-xs font-medium">
          <span>{description}</span>
          <span>
            {trend && (
              <div className="text-sm">
                <span
                  className={cn(
                    'justify-center, flex items-center',
                    trend.isPositive ? 'text-success' : 'text-destructive',
                  )}
                >
                  <span> {trend.value}</span>
                  <span>
                    {trend.isPositive ? (
                      <ArrowUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    )}
                  </span>
                </span>
              </div>
            )}
          </span>
        </CardDescription>
        <CardTitle className="flex flex-row items-center gap-2 text-xl font-medium">
          {title}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
