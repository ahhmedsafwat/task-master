import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface overViewCardProps {
  bodyChildren?: React.ReactNode
  headerChildren?: React.ReactNode
  className?: string
  title: string
}

export const OverViewCard = ({
  bodyChildren,
  headerChildren,
  title,
  className,
}: overViewCardProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription>{headerChildren}</CardDescription>
      </CardHeader>
      <CardContent>{bodyChildren}</CardContent>
    </Card>
  )
}
