import { useMemo, useRef, useState } from 'react'
import { Input } from './input'
import { Label } from './label'

interface ProjectsSearchDropDownProps {
  projects: { id: string; name: string }[]
  label: string
  placeholder: string
  onProjectSelect: (value: string) => void
  disabled?: boolean
}

export const ProjectsSearchDropDown = ({
  projects,
  label,
  placeholder,
  onProjectSelect,
  disabled,
}: ProjectsSearchDropDownProps) => {
  const [searchDropDown, setSearchDropDown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const dropDownRef = useRef<HTMLDivElement>(null)

  const filteredProjects = useMemo(
    () =>
      searchQuery.trim() === ''
        ? projects
        : projects.filter((project) =>
            project.name?.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
    [searchQuery, projects],
  )

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!dropDownRef.current?.contains(document.activeElement)) {
        setSearchDropDown(false)
      }
    }, 150)
  }

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
        onBlur={handleInputBlur} // Timeout to allow click on dropdown
        autoComplete="off"
        disabled={disabled}
        aria-expanded={searchDropDown}
        aria-haspopup={searchDropDown ? 'listbox' : undefined}
        aria-controls={searchDropDown ? `${label}-listbox` : undefined}
      />
      {searchDropDown && projects.length > 0 && (
        <div
          ref={dropDownRef}
          id={`${label}-listbox`}
          role="listbox"
          className="bg-popover absolute z-10 mt-1 max-h-40 w-[calc(100%-20px)] overflow-auto rounded-md shadow-md"
        >
          {filteredProjects.map((project) => (
            <div
              tabIndex={0} // Make it focusable
              key={project.id}
              className="hover:bg-accent cursor-pointer px-3 py-2"
              onMouseDown={() => {
                // Use onMouseDown to fire before onBlur
                onProjectSelect(project.id)
                setSearchQuery(project.name)
                setSearchDropDown(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onProjectSelect(project.id)
                  setSearchQuery(project.name)
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
