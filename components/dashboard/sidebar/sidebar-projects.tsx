'use client'
import { usePathname } from 'next/navigation'
import { NavigationItem } from './navigation-item'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Project } from '@/lib/types/types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

interface SidebarProjectsProps {
  onItemClick?: () => void
  projects: Project[]
}

export function SidebarProjects({
  onItemClick,
  projects,
}: SidebarProjectsProps) {
  const pathname = usePathname()

  return (
    <div title="projects" className="flex-1 overflow-y-auto">
      <div className="text-muted-foreground flex items-center justify-between rounded-md p-1.5 px-2 text-xs">
        <span>projects</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={'link'}
                className="hover:bg-secondary-foreground bg-accent-foreground box-content size-3 cursor-pointer rounded-md p-0.5 transition-colors duration-300"
              >
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create project</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-1.5">
        {projects.map((project: Project) => {
          const isActive = pathname === `/dashboard/projects/${project.name}`
          return (
            <NavigationItem
              href={`/dashboard/projects/${project.name}`}
              title={project.name}
              isActive={isActive}
              key={project.id + project.name}
              icon={project.icon}
              customIcon={
                project.project_covers ? (
                  <div className="mr-2">
                    <Image
                      src={project.project_covers}
                      alt={project.name}
                      height={24}
                      width={24}
                      className="rounded-sm object-cover"
                      unoptimized
                    />
                  </div>
                ) : undefined
              }
              onClick={onItemClick}
            />
          )
        })}
      </div>
    </div>
  )
}
