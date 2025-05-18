import { useState } from 'react'
import { AttrbuiteLable } from './overview-task-attrubites-lable'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Priority and Status selection component
export const Selections = ({
  label,
  icon: Icon,
  options,
  updateFormData,
  defaultValue,
}: {
  label: string
  defaultValue?: string
  icon: React.ReactNode
  options: { option: string; icon: React.ReactNode }[]
  updateFormData: (field: string, value: any) => void
}) => {
  const [selectedValue, setSelectedValue] = useState<string>()

  return (
    <div className="flex gap-2">
      <AttrbuiteLable label={label.toLowerCase()} icon={Icon} />
      <Select
        name={label.toLowerCase()}
        value={selectedValue || defaultValue}
        onValueChange={(value) => {
          setSelectedValue(value)
          updateFormData(label.toLowerCase(), value)
        }}
      >
        <SelectTrigger
          className="bg-secondary w-full border-none"
          id={label.toLowerCase()}
        >
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.option} value={opt.option}>
              <span>{opt.icon}</span>
              <span>{opt.option}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
