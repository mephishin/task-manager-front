import { createFileRoute } from '@tanstack/react-router'
import {TaskPage} from "../page/task/TaskPage";

export const Route = createFileRoute('/task/$key')({
  component: RouteComponent,
})

function RouteComponent() {
  const { key } = Route.useParams()
  return TaskPage(key)
}
