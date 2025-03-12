import { usePathname } from 'next/navigation'

import type { Project } from './sidebar-data'
import { NavigationItem } from './navigation-item'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { ChevronRight } from 'lucide-react'

interface SidebarProjectsProps {
  projects: Project[]
  onItemClick?: () => void
}

export function SidebarProjects({
  projects,
  onItemClick,
}: SidebarProjectsProps) {
  const pathname = usePathname()

  return (
    <Collapsible
      title="projects"
      className="group/collapsible flex-1 space-y-2 overflow-y-auto"
      defaultOpen
    >
      <CollapsibleTrigger className="text-muted-foreground hover:bg-accent hover:text-primary-foreground flex w-full cursor-pointer items-center justify-between rounded-md p-0.5 px-2 text-xs">
        <span>projects</span>
        <ChevronRight className="size-5 transform transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {projects.map((project, index) => {
          const isActive = project.id === pathname
          return (
            <NavigationItem
              href={project.id}
              title={project.name}
              isActive={isActive}
              key={index}
              icon={project.icon}
              onClick={onItemClick}
            />
          )
        })}
      </CollapsibleContent>
    </Collapsible>
  )
}
