'use client'

import type React from 'react'

import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  useCallback,
} from 'react'
import { X, Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { userProfile } from '@/lib/types/types'

type MultiSelectProps = {
  users: userProfile[]
  placeholder?: string
  onItemSelect?: (value: string[]) => void
  maxDisplayItems?: number
  disabled?: boolean
  className?: string
}

export function MultiSelectAssignees({
  users,
  placeholder = 'Select options...',
  maxDisplayItems = 3,
  disabled = false,
  onItemSelect,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Update filtered users whenever inputValue changes
  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(inputValue.toLowerCase()),
  )

  // Reset active index when filtered results change
  useEffect(() => {
    setActiveIndex(-1)
  }, [inputValue])

  const handleSelect = useCallback(
    (value: string) => {
      // Prevent event bubbling
      const newSelected = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]

      setSelected(newSelected)
      onItemSelect?.(newSelected)
      setInputValue('')

      // Focus the input after selection
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    },
    [selected, onItemSelect],
  )

  const handleRemove = useCallback(
    (value: string, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      const newSelected = selected.filter((item) => item !== value)
      setSelected(newSelected)
      onItemSelect?.(newSelected)
    },
    [selected, onItemSelect],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const optionsLength = filteredUsers.length

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev < optionsLength - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : optionsLength - 1))
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault()
        const selectedUser = filteredUsers[activeIndex]
        if (selectedUser && selectedUser.id) {
          handleSelect(selectedUser.id)
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      } else if (
        e.key === 'Backspace' &&
        inputValue === '' &&
        selected.length > 0
      ) {
        handleRemove(selected[selected.length - 1])
      }
    },
    [
      activeIndex,
      filteredUsers,
      handleRemove,
      handleSelect,
      inputValue,
      selected,
    ],
  )

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[activeIndex] as HTMLElement
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [activeIndex])

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Display selected items
  const displaySelectedItems = () => {
    if (selected.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>
    }

    const displayItems = [...selected]
    const hasMore = selected.length > maxDisplayItems

    if (hasMore) {
      displayItems.splice(maxDisplayItems)
    }

    return (
      <div className="flex flex-wrap gap-1">
        {displayItems.map((value) => {
          const option = users.find((opt) => opt?.id === value)
          return (
            <span
              key={value}
              className="bg-muted ring-border inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
            >
              {option?.username}
              <button
                type="button"
                className="text-muted-foreground hover:bg-muted-foreground/20 ml-1 inline-flex items-center rounded-full"
                onClick={(e) => handleRemove(value, e)}
                aria-label={`Remove ${option?.username}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )
        })}
        {hasMore && (
          <span className="bg-muted inline-flex items-center rounded-md px-2 py-1 text-xs font-medium">
            +{selected.length - maxDisplayItems} more
          </span>
        )}
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'h-auto min-h-10 w-full justify-between px-3 py-2',
            'text-left font-normal',
            className,
          )}
          disabled={disabled}
          onClick={() => setOpen(true)}
        >
          <div className="mr-2 flex flex-grow flex-wrap gap-1">
            {displaySelectedItems()}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-full p-0" align="start">
        <div className="flex flex-col">
          <div className="p-2">
            <Input
              ref={inputRef}
              placeholder="Search options..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full"
              autoComplete="off"
            />
          </div>

          <div
            ref={listRef}
            className="max-h-60 overflow-auto py-1"
            role="listbox"
            aria-multiselectable="true"
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((option, index) => {
                const isSelected = selected.includes(option.id ?? '')
                const isActive = index === activeIndex

                return (
                  <div
                    key={option.id}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 px-2 py-1.5 text-sm',
                      isActive ? 'bg-accent' : 'hover:bg-muted',
                      isSelected ? 'bg-accent/50' : '',
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (option.id) {
                        handleSelect(option.id)
                      }
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div
                      className={cn(
                        'border-primary flex h-4 w-4 items-center justify-center rounded-sm border',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50',
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span>{option.username}</span>
                  </div>
                )
              })
            ) : (
              <div className="text-muted-foreground px-2 py-4 text-center text-sm">
                No users found.
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
