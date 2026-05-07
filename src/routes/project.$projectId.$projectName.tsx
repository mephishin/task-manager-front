import { createFileRoute } from '@tanstack/react-router'
import {ProjectPage} from "../page/project/ProjectPage";

export const Route = createFileRoute('/project/$projectId/$projectName')({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId, projectName } = Route.useParams()

  return ProjectPage(projectId)
}
