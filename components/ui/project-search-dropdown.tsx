import { useMemo, useRef, useState, useEffect } from 'react'
import { Input } from './input'
import { cn } from '@/lib/utils'
import { AttrbuiteLable } from '../dashboard/overview/overview-task-attrubites-lable'
import { Box } from 'lucide-react'

interface ProjectsSearchDropDownProps {
  projects: { id: string; name: string }[]
  label: string
  placeholder: string
  onProjectSelect: (value: string) => void
  disabled?: boolean
  initialSelectedProjectId?: string // Optional prop to set initial selected project
}

export const ProjectsSearchDropDown = ({
  projects,
  label,
  placeholder,
  onProjectSelect,
  disabled,
  initialSelectedProjectId,
}: ProjectsSearchDropDownProps) => {
  const [searchDropDown, setSearchDropDown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialSelectedProjectId || '',
  )

  const dropDownRef = useRef<HTMLDivElement>(null)

  // Set initial search query based on selected project
  useEffect(() => {
    if (initialSelectedProjectId) {
      const initialProject = projects.find(
        (project) => project.id === initialSelectedProjectId,
      )
      if (initialProject) {
        setSearchQuery(initialProject.name)
      }
    }
  }, [initialSelectedProjectId, projects])

  const filteredProjects = useMemo(
    () =>
      searchQuery.trim() === ''
        ? projects
        : projects.filter((project) =>
            project.name?.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
    [searchQuery, projects],
  )

  // Handle input change to check if selected project name is modified
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchQuery(newValue)

    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId,
    )

    // If we have a selected project and the input no longer matches it exactly
    if (
      selectedProject &&
      selectedProjectId &&
      newValue !== selectedProject.name
    ) {
      setSelectedProjectId('')
      onProjectSelect('')
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!dropDownRef.current?.contains(document.activeElement)) {
        setSearchDropDown(false)

        // Reset to selected project name if one exists, otherwise clear
        if (selectedProjectId) {
          const selectedProject = projects.find(
            (project) => project.id === selectedProjectId,
          )
          if (selectedProject) {
            setSearchQuery(selectedProject.name)
          }
        } else if (searchQuery.trim() !== '') {
          // If no project is selected but there's text, clear it
          setSearchQuery('')
        }
      }
    }, 150)
  }

  // Handle project selection
  const handleProjectSelect = (project: { id: string; name: string }) => {
    setSelectedProjectId(project.id)
    setSearchQuery(project.name)
    onProjectSelect(project.id)
    setSearchDropDown(false)
  }

  return (
    <div>
      <div className="relative flex items-center">
        <AttrbuiteLable label={label} icon={<Box size={18} />} />
        <div className="relative w-full">
          <Input
            id={label}
            placeholder={disabled ? `Task is private` : placeholder}
            className={cn(
              'h-8 w-full border-none ring-0 transition-colors focus-visible:border-none focus-visible:outline-none focus-visible:ring-0',
              searchDropDown && 'bg-accent rounded-b-none',
              !disabled && 'hover:bg-accent/90',
            )}
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setSearchDropDown(true)}
            onBlur={handleInputBlur}
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
              'bg-card absolute right-0 top-full z-10 max-h-40 w-full overflow-auto rounded-md rounded-t-none shadow-lg transition-all duration-75',
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
                    handleProjectSelect(project)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleProjectSelect(project)
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
