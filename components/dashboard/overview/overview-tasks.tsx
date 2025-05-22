import { getTasks } from '@/lib/server/quieries'
import { OverViewCard } from './overview-card'
import { OverViewTasksBody } from './overview-task-body'
import { OverViewTasksDialog } from './overview-task-dialog'
import { Suspense } from 'react'
import { CardsSkeleton } from './overview-skeletons'

async function TasksContent() {
  const tasksToShow = await getTasks()

  if (!tasksToShow.data) {
    return null
  }

  return <OverViewTasksBody tasks={tasksToShow.data} />
}

export async function OverViewTasks() {
  return (
    <OverViewCard
      title="Tasks"
      className="dark:bg-secondary bg-accent"
      bodyChildren={
        <Suspense fallback={<CardsSkeleton />}>
          <TasksContent />
        </Suspense>
      }
      headerChildren={<OverViewTasksDialog />}
    />
  )
}
