'use client'

import { useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
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
  const [searchDropDown, setSearchDropDown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<userProfile[]>([])

  const dropDownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredUsers = useMemo(
    () =>
      searchQuery.trim() === ''
        ? users.filter((user) => !selectedUsers.some((p) => p.id === user.id))
        : users
            .filter((user) => !selectedUsers.some((p) => p.id === user.id))
            .filter((user) =>
              user.username?.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
    [searchQuery, users, selectedUsers],
  )

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!dropDownRef.current?.contains(document.activeElement)) {
        setSearchDropDown(false)
      }
    }, 150)
  }

  const handleUserSelect = (user: userProfile) => {
    const newSelectedUsers = [...selectedUsers, user]
    setSelectedUsers(newSelectedUsers)
    onItemSelect?.(newSelectedUsers.map((p) => p.id ?? ''))
    setSearchQuery('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleRemoveUser = (userId: string) => {
    const newSelectedUsers = selectedUsers.filter((p) => p.id !== userId)
    setSelectedUsers(newSelectedUsers)
    onItemSelect?.(newSelectedUsers.map((p) => p.id ?? ''))
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const displayedUsers = selectedUsers.slice(0, maxDisplayItems)
  const hiddenCount = selectedUsers.length - maxDisplayItems

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div className={className}>
      <div className="relative">
        <div
          ref={containerRef}
          className={cn(
            'hover:bg-accent/90 border-input bg-background focus-within:ring-ring flex w-full flex-wrap items-center gap-1 rounded-md border px-3 py-2 text-sm transition-colors focus-within:ring-1',
            searchDropDown && 'bg-accent rounded-b-none',
            disabled && 'cursor-not-allowed opacity-50',
          )}
          onClick={disabled ? undefined : handleContainerClick}
        >
          {displayedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-accent/80 flex items-center gap-1 rounded px-2 py-0.5 text-xs"
            >
              <span>{user.username}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveUser(user.id ?? '')
                  }}
                  className="text-muted-foreground hover:text-foreground rounded-full p-0.5"
                  aria-label={`Remove ${user.username}`}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}

          {hiddenCount > 0 && (
            <div className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs">
              +{hiddenCount} more
            </div>
          )}

          <Input
            ref={inputRef}
            placeholder={selectedUsers.length > 0 ? '' : placeholder}
            className="min-w-[120px] flex-1 border-none bg-transparent p-0 focus-visible:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => !disabled && setSearchDropDown(true)}
            onBlur={handleInputBlur}
            autoComplete="off"
            disabled={disabled}
            aria-expanded={searchDropDown}
            aria-haspopup={searchDropDown ? 'listbox' : undefined}
            aria-controls={searchDropDown ? `users-listbox` : undefined}
          />
        </div>
        <div
          ref={dropDownRef}
          id="users-listbox"
          role="listbox"
          className={cn(
            'bg-primary absolute right-0 top-full z-10 max-h-40 w-full overflow-auto rounded-md rounded-t-none shadow-lg transition-all duration-75',
            searchDropDown && !disabled
              ? 'visible scale-100'
              : 'pointer-events-none invisible opacity-0',
          )}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                tabIndex={0}
                key={user.id}
                className="hover:bg-accent focus:bg-accent cursor-pointer px-3 py-2 text-sm"
                onMouseDown={() => {
                  handleUserSelect(user)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleUserSelect(user)
                  }
                }}
                aria-label={`Select user ${user.username}`}
              >
                <div>{user.username}</div>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground flex h-20 items-center justify-center text-sm">
              <span>No users found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
