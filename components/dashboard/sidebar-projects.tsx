'use client'

import { usePathname } from 'next/navigation'
import { NavigationItem } from './navigation-item'

import { type ElementType, useState, useEffect } from 'react'
import { getProjects } from '@/lib/server/projects-actions'
import Image from 'next/image'
import { Plus } from 'lucide-react'

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
          const projectData: Project[] = (data || []).map((p: Project) => ({
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
    <div title="projects" className="flex-1 overflow-y-auto">
      <div className="text-muted-foreground flex items-center justify-between rounded-md p-1.5 px-2 text-xs">
        <span>projects</span>
        <Plus className="hover:bg-accent size-5 cursor-pointer rounded-full p-1 transition-colors duration-300" />
      </div>
      <div className="space-y-1.5">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index + 'loading'}
                className="bg-muted mb-2 h-5 w-full animate-pulse rounded-md"
              />
            ))
          : projects.map((project) => {
              const isActive = pathname === `/projects/${project.id}`
              return (
                <>
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
                </>
              )
            })}
      </div>
    </div>
  )
}
