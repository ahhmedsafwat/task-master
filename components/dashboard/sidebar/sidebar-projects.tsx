'use client'
import { usePathname } from 'next/navigation'
import { NavigationItem } from './navigation-item'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Tables } from '@/lib/types/database.types'

interface SidebarProjectsProps {
  onItemClick?: () => void
  projects: Tables<'projects'>[]
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
                variant={'inverted'}
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
        {projects.map((project: Tables<'projects'>) => {
          const isActive = pathname === `/dashboard/projects/${project.name}`
          return (
            <NavigationItem
              href={`/dashboard/projects/${project.name}`}
              title={project.name}
              isActive={isActive}
              key={project.id + project.name}
              customIcon={
                project.project_covers ? (
                  <Image
                    src={project.project_covers}
                    alt={project.name}
                    height={24}
                    width={24}
                    className="rounded-sm object-cover"
                    unoptimized
                  />
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
