import { useState } from 'react'
import { Input } from './input'
import { Label } from './label'

interface ProjectsSearchDropDownProps {
  projects: { id: string; name: string }[]
  label: string
  placeholder: string
  searchQuery: string
  setSearchQuery: (query: string) => void
  onProjectSelect: (value: string) => void
  disabled?: boolean
}

export const ProjectsSearchDropDown = ({
  projects,
  label,
  placeholder,
  searchQuery,
  onProjectSelect,
  setSearchQuery,
  disabled,
}: ProjectsSearchDropDownProps) => {
  const [searchDropDown, setSearchDropDown] = useState(false)

  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        placeholder={placeholder}
        className="w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setSearchDropDown(true)}
        onBlur={() => setTimeout(() => setSearchDropDown(false), 150)} // Timeout to allow click on dropdown
        autoComplete="off"
        disabled={disabled}
      />
      {searchDropDown && projects.length > 0 && (
        <div className="bg-popover absolute z-10 mt-1 max-h-40 w-[calc(100%-20px)] overflow-auto rounded-md shadow-md">
          {projects.map((project) => (
            <div
              key={project.id}
              className="hover:bg-accent cursor-pointer px-3 py-2"
              tabIndex={0} // Make it focusable
              onMouseDown={() => {
                // Use onMouseDown to fire before onBlur
                onProjectSelect(project.id)
                setSearchQuery(project.name || '')
                setSearchDropDown(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onProjectSelect(project.id)
                  setSearchQuery(project.name || '')
                  setSearchDropDown(false)
                }
              }}
              aria-label={`Select item ${project.name}`}
            >
              <div>{project.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
