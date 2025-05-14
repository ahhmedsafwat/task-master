import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

// Date picker field component
export const DatePickerField = ({
  id,
  label,
  date,
  onSelect,
}: {
  id: string
  label: string
  date: string | null
  onSelect: (date: string | null) => void
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
          aria-label={
            date
              ? `Selected ${label.toLowerCase()}: ${format(new Date(date), 'PPP')}`
              : `Pick a ${label.toLowerCase()}`
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(new Date(date), 'PPP') : `Pick a date`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={(selectedDate) => {
            onSelect(
              selectedDate instanceof Date ? selectedDate.toISOString() : null,
            )
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    {/* Hidden input for form submission */}
    <input type="hidden" name={id.toLowerCase()} value={date ?? ''} />
  </div>
)
