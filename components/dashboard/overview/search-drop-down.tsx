import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface searchDropDownProps {
  items: { id: string; name: string; email?: string }[]
  placeholder: string
  searchQuery: string
  setSearchQuery: (query: string) => void
  disabled?: boolean
  onItemSelect: (id: string, name: string) => void
}

export const SearchDropDown = ({
  items,
  placeholder,
  onItemSelect,
  searchQuery,
  setSearchQuery,
  disabled,
}: searchDropDownProps) => {
  const [searchDropDown, setSearchDropDown] = useState(false)

  return (
    <div>
      <Input
        id="item-search"
        placeholder={placeholder}
        className="w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setSearchDropDown(true)}
        onBlur={() => setTimeout(() => setSearchDropDown(false), 150)} // Timeout to allow click on dropdown
        autoComplete="off"
        disabled={disabled}
      />
      {searchDropDown && searchQuery.length > 0 && items.length > 0 && (
        <div className="bg-popover absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md shadow-md">
          {items.map((item) => (
            <div
              key={item.id}
              className="hover:bg-accent cursor-pointer px-3 py-2"
              tabIndex={0} // Make it focusable
              onMouseDown={() => {
                // Use onMouseDown to fire before onBlur
                onItemSelect(item.id, item.name)
                setSearchQuery(item.name || '')
                setSearchDropDown(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onItemSelect(item.id, item.name)
                  setSearchQuery(item.name || '')
                  setSearchDropDown(false)
                }
              }}
              aria-label={`Select item ${item.name}`}
            >
              <div>{item.name}</div>
              {item.email && (
                <div className="text-muted-foreground text-xs">
                  {item.email}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
