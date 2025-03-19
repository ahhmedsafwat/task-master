'use client'

import { usePathname } from 'next/navigation'
import { NavigationItem } from './navigation-item'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Project } from '@/lib/types/types'

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
        <Plus className="hover:bg-accent size-6 cursor-pointer rounded-full p-1 transition-colors duration-300" />
      </div>
      <div className="space-y-1.5">
        {projects.map((project: Project) => {
          const isActive = pathname === `/projects/${project.id}`
          return (
            <NavigationItem
              href={`/projects/${project.id}`}
              title={project.name}
              isActive={isActive}
              key={project.id + project.name}
              icon={project.icon}
              customIcon={
                project.image ? (
                  <div className="mr-2 flex h-5 w-5 items-center justify-center">
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={20}
                      height={20}
                      className="rounded-sm object-cover"
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
