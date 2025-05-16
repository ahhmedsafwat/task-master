'use client'

import { useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { UserPlus, X } from 'lucide-react'
import { userProfile } from '@/lib/types/types'
import Image from 'next/image'
import { AttrbuiteLable } from '../dashboard/overview/overview-task-attrubites-lable'

type MultiSelectProps = {
  users: userProfile[]
  placeholder?: string
  onItemSelect?: (value: string[]) => void
  maxDisplayItems?: number
  disabled?: boolean
  label: string
}

export function MultiSelectAssignees({
  users,
  placeholder = 'Select options...',
  maxDisplayItems = 3,
  disabled = false,
  onItemSelect,
  label,
}: MultiSelectProps) {
  const [searchDropDown, setSearchDropDown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<userProfile[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredUsers = useMemo(() => {
    return searchQuery.trim() === ''
      ? users.filter(
          (user) =>
            !selectedUsers.some((selectedUser) => selectedUser.id === user.id),
        )
      : users
          .filter(
            (user) =>
              !selectedUsers.some(
                (selectedUser) => selectedUser.id === user.id,
              ),
          )
          .filter((user) =>
            user.username?.toLowerCase().includes(searchQuery.toLowerCase()),
          )
  }, [searchQuery, users, selectedUsers])

  const handleInputBlur = () => {
    setTimeout(() => {
      if (
        !containerRef.current?.contains(document.activeElement) &&
        !dropDownRef.current?.contains(document.activeElement)
      ) {
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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Backspace' &&
      searchQuery === '' &&
      selectedUsers.length > 0
    ) {
      handleRemoveUser(selectedUsers[selectedUsers.length - 1].id ?? '')
    }
  }

  const displayedUsers = selectedUsers.slice(0, maxDisplayItems)
  const hiddenCount = selectedUsers.length - maxDisplayItems

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="relative flex items-center">
      <AttrbuiteLable label={label} icon={<UserPlus size={18} />} />
      <div
        ref={containerRef}
        className={cn(
          'hover:bg-accent/90 relative flex w-full flex-nowrap items-center gap-1 rounded-md px-2.5 text-sm transition-colors',
          searchDropDown && 'bg-accent rounded-b-none',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        onClick={disabled ? undefined : handleContainerClick}
      >
        {displayedUsers.map((user) => (
          <div
            key={user.id}
            className="bg-muted flex items-center gap-1 rounded px-2 py-1 text-xs"
          >
            <Image
              src={user.avatar_url ?? ''}
              alt={user.username ?? ''}
              width={5}
              height={5}
              className="h-5 w-5 rounded-full"
              unoptimized
            />
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
          placeholder={
            disabled
              ? 'choose a project to be able to assign users'
              : selectedUsers.length > 0
                ? ''
                : placeholder
          }
          className="min-w-[120px] flex-1 border-none px-0 ring-0 transition-colors focus-visible:border-none focus-visible:outline-none focus-visible:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => !disabled && setSearchDropDown(true)}
          onBlur={() => handleInputBlur()}
          autoComplete="off"
          disabled={disabled}
          onKeyDown={handleInputKeyDown}
          aria-expanded={searchDropDown}
          aria-haspopup={searchDropDown ? 'listbox' : undefined}
          aria-controls={searchDropDown ? `users-listbox` : undefined}
        />
        <div
          ref={dropDownRef}
          id="users-listbox"
          role="listbox"
          className={cn(
            'bg-card absolute right-0 top-full z-10 max-h-40 w-full overflow-auto rounded-md rounded-t-none shadow-lg transition-all duration-75',
            searchDropDown && !disabled
              ? 'visible scale-100'
              : 'pointer-events-none invisible opacity-0',
          )}
        >
          <div className="text-muted-foreground border-b px-3 py-1.5 text-xs">
            Select one or more people
          </div>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                tabIndex={0}
                key={user.id}
                className="hover:bg-accent focus:bg-accent flex cursor-pointer items-center gap-2 px-3 py-2 text-sm"
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
                <Image
                  src={user.avatar_url ?? ''}
                  alt={user.username ?? ''}
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full"
                  unoptimized
                />
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
