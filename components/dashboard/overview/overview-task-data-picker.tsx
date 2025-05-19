import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format, formatISO } from 'date-fns'
import { Button } from '@/components/ui/button'

import { AttrbuiteLable } from './overview-task-attrubites-lable'

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
  <div className="flex">
    <AttrbuiteLable label={label} icon={<CalendarIcon size={18} />} />
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
          {date ? format(new Date(date), 'PPP') : `Pick a date`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={(selectedDate) => {
            onSelect(
              selectedDate instanceof Date ? formatISO(selectedDate) : null,
            )
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    {/* Hidden input for form submission */}
    <input type="hidden" name={'start_date'} value={date ?? ''} />
    <input type="hidden" name={'due_date'} value={date ?? ''} />
  </div>
)
