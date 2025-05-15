// 'use client'

// import type React from 'react'

// import { useState, useRef, useCallback } from 'react'
// import { X, Check } from 'lucide-react'
// import { cn } from '@/lib/utils'
// import { Input } from '@/components/ui/input'
// import { userProfile } from '@/lib/types/types'

// type MultiSelectProps = {
//   users: userProfile[]
//   placeholder?: string
//   onItemSelect?: (value: string[]) => void
//   maxDisplayItems?: number
//   disabled?: boolean
//   className?: string
// }

// export function MultiSelectAssignees({
//   users,
//   placeholder = 'Select options...',
//   maxDisplayItems = 3,
//   disabled = false,
//   onItemSelect,
// }: MultiSelectProps) {
//   const [open, setOpen] = useState(false)
//   const [selected, setSelected] = useState<string[]>([])
//   const [inputValue, setInputValue] = useState('')

//   const inputRef = useRef<HTMLInputElement>(null)

//   // Update filtered users whenever inputValue changes
//   const filteredUsers = users.filter((user) =>
//     user.username?.toLowerCase().includes(inputValue.toLowerCase()),
//   )

//   const handleSelect = useCallback(
//     (value: string) => {
//       // Prevent event bubbling
//       const newSelected = selected.includes(value)
//         ? selected.filter((item) => item !== value)
//         : [...selected, value]

//       setSelected(newSelected)
//       onItemSelect?.(newSelected)
//       setInputValue('')

//       // Focus the input after selection
//       setTimeout(() => {
//         inputRef.current?.focus()
//       }, 0)
//     },
//     [selected, onItemSelect],
//   )

//   const handleRemove = useCallback(
//     (value: string, e?: React.MouseEvent) => {
//       if (e) {
//         e.preventDefault()
//         e.stopPropagation()
//       }

//       const newSelected = selected.filter((item) => item !== value)
//       setSelected(newSelected)
//       onItemSelect?.(newSelected)
//     },
//     [selected, onItemSelect],
//   )

//   // Display selected items
//   const displaySelectedItems = () => {
//     if (selected.length === 0) {
//       return <span className="text-muted-foreground">{placeholder}</span>
//     }

//     const displayItems = [...selected]
//     const hasMore = selected.length > maxDisplayItems

//     if (hasMore) {
//       displayItems.splice(maxDisplayItems)
//     }

//     return (
//       <div className="flex flex-wrap gap-1">
//         {displayItems.map((value) => {
//           const option = users.find((opt) => opt?.id === value)
//           return (
//             <span
//               key={value}
//               className="bg-muted ring-border inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
//             >
//               {option?.username}
//               <button
//                 type="button"
//                 className="text-muted-foreground hover:bg-muted-foreground/20 ml-1 inline-flex items-center rounded-full"
//                 onClick={(e) => handleRemove(value, e)}
//                 aria-label={`Remove ${option?.username}`}
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </span>
//           )
//         })}
//         {hasMore && (
//           <span className="bg-muted inline-flex items-center rounded-md px-2 py-1 text-xs font-medium">
//             +{selected.length - maxDisplayItems} more
//           </span>
//         )}
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="p-2">
//         <Input
//           ref={inputRef}
//           placeholder="Search options..."
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="w-full"
//           autoComplete="off"
//         />
//       </div>

//       <div
//         className="max-h-60 overflow-auto py-1"
//         role="listbox"
//         aria-multiselectable="true"
//       >
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((option, index) => {
//             const isSelected = selected.includes(option.id ?? '')

//             return (
//               <div
//                 key={option.id}
//                 role="option"
//                 aria-selected={isSelected}
//                 className={cn(
//                   'flex cursor-pointer items-center gap-2 px-2 py-1.5 text-sm',

//                   isSelected ? 'bg-accent/50' : '',
//                 )}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   if (option.id) {
//                     handleSelect(option.id)
//                   }
//                 }}
//               >
//                 <div
//                   className={cn(
//                     'border-primary-foreground flex h-4 w-4 items-center justify-center rounded-sm border',
//                     isSelected
//                       ? 'bg-primary text-primary-foreground'
//                       : 'opacity-50',
//                   )}
//                 >
//                   {isSelected && <Check className="h-3 w-3" />}
//                 </div>
//                 <span>{option.username}</span>
//               </div>
//             )
//           })
//         ) : (
//           <div className="text-muted-foreground px-2 py-4 text-center text-sm">
//             No users found.
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
