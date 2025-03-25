import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatsCardProps) {
  return (
    <Card className={'w-[200px] grow gap-4 py-4'}>
      <CardHeader className="flex flex-row items-center gap-2">
        <Icon className="h-4 w-4" />
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={cn({
          'flex-1': !description,
        })}
      >
        <Separator className="mb-2" />
        <div className={cn('text-2xl font-bold')}>{value}</div>
        {description && (
          <p className="text-muted-foreground text-xs">
            {trend && (
              <span
                className={cn(
                  trend.isPositive ? 'text-success' : 'text-red-500',
                )}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
