'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp } from 'lucide-react'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

interface StatsCardProps {
  title: string
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export const StatsCard = ({ title, description, trend }: StatsCardProps) => {
  const chartData = [
    { day: 'Saterday', desktop: 186 },
    { day: 'Sunday', desktop: 186 },
    { day: 'Monday', desktop: 305 },
    { day: 'Tuesday' },
    { day: 'Wednesday' },
    { day: 'Thursday' },
    { day: 'Firday' },
  ]

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: `${trend?.isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}`,
    },
  } satisfies ChartConfig
  return (
    <Card className={'w-[200px] grow gap-4 py-4'}>
      <CardHeader className="flex flex-col">
        <CardDescription className="font-geist-mono text-xs font-medium">
          {description}
        </CardDescription>
        <CardTitle className="flex flex-row items-center gap-2 text-xl font-medium">
          {title}
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
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel indicator="dashed" />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-desktop)',
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
