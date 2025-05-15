import { useMemo, useRef, useState } from 'react'
import { Input } from './input'
import { Label } from './label'
import { cn } from '@/lib/utils'

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
      <div className="relative flex items-center">
        <Label
          className="text-secondary-foreground hover:bg-accent hover:text-foreground mr-1.5 rounded-md px-2 py-2.5 transition-colors"
          htmlFor={label}
        >
          {label}
        </Label>
        <div className="relative w-full flex-1">
          {' '}
          <Input
            id={label}
            placeholder={placeholder}
            className={cn(
              'hover:bg-accent/90 w-full border-none ring-0 transition-colors focus-visible:border-none focus-visible:outline-none focus-visible:ring-0',
              searchDropDown && 'bg-accent rounded-b-none',
            )}
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
          <div
            ref={dropDownRef}
            id={`${label}-listbox`}
            role="listbox"
            className={cn(
              'bg-primary absolute right-0 top-full z-10 max-h-40 w-full overflow-auto rounded-md rounded-t-none shadow-lg transition-all duration-75',
              searchDropDown
                ? 'visible scale-100'
                : 'pointer-events-none invisible opacity-0',
            )}
          >
            {projects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  tabIndex={0}
                  key={project.id}
                  className="hover:bg-accent focus:bg-accent cursor-pointer px-3 py-2 text-sm"
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
              ))
            ) : (
              <div className="text-muted-foreground flex h-20 items-center justify-center text-sm">
                <span>No projects found</span>
              </div>
            )}
          </div>{' '}
        </div>
      </div>
    </div>
  )
}
