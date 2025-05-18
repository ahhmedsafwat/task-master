import { getTasks } from '@/lib/server/quieries'
import { OverViewCard } from './overview-card'
import { OverViewTasksBody } from './overview-task-body'
import { OverViewTasksDialog } from './overview-task-header'

export async function OverViewTasks() {
  const tasksToShow = await getTasks()

  if (!tasksToShow.data) {
    return null
  }

  return (
    <OverViewCard
      title="Tasks"
      className="dark:bg-secondary bg-accent"
      bodyChildren={<OverViewTasksBody tasks={tasksToShow.data} />}
      headerChildren={<OverViewTasksDialog />}
    />
  )
}
