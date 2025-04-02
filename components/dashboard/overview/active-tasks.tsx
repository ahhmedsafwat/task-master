'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tables } from '@/lib/types/database.types'
import { useState } from 'react'

type Task = Tables<'tasks'>

// Mock data - replace with real data from your backend
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the project',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    creator_id: 'user1',
    is_private: false,
    project_id: null,
    due_date: null,
    start_date: null,
    markdown_content: null,
  },
  // Add more mock tasks as needed
]

export function ActiveTasks() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  const filteredTasks = mockTasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Active Tasks</h2>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="BACKLOG">Backlog</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-1">
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-muted-foreground text-sm">
                {task.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  task.status === 'IN_PROGRESS'
                    ? 'bg-blue-100 text-blue-700'
                    : task.status === 'COMPLETED'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                }`}
              >
                {task.status}
              </span>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  task.priority === 'HIGH'
                    ? 'bg-red-100 text-red-700'
                    : task.priority === 'MEDIUM'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
