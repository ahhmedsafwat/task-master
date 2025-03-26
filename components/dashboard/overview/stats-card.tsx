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
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp } from 'lucide-react'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

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
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
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
      <CardContent>
        <Separator className="mb-2" />
        <ChartContainer config={chartConfig} className="max-h-24 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
