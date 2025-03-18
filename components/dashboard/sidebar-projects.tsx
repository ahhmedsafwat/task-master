'use client'

import { usePathname } from 'next/navigation'
import { NavigationItem } from './navigation-item'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { ChevronRight } from 'lucide-react'
import { type ElementType, useState, useEffect } from 'react'
import { getProjects } from '@/lib/server/quieries'
import Image from 'next/image'

interface SidebarProjectsProps {
  onItemClick?: () => void
}

export interface Project {
  id: string
  name: string
  icon?: ElementType
  image?: string
}

export function SidebarProjects({ onItemClick }: SidebarProjectsProps) {
  const pathname = usePathname()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true)
      try {
        const { data, error } = await getProjects()
        if (data && !error) {
          // Transform the data to match our Project interface
          const projectData: Project[] = (data || []).map((p) => ({
            id: p.id,
            name: p.name,
            image: '/images/8.webp',
          }))
          setProjects(projectData)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()

    // Only refetch when the user changes
  }, [])

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
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index + 'loading'}
                className="bg-muted mb-2 h-5 w-full animate-pulse rounded-lg"
              />
            ))
          : projects.map((project) => {
              const isActive = pathname === `/projects/${project.id}`
              return (
                <NavigationItem
                  href={`/projects/${project.id}`}
                  title={project.name}
                  isActive={isActive}
                  key={project.id}
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
      </CollapsibleContent>
    </Collapsible>
  )
}
