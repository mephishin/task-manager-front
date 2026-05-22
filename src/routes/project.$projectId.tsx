import { createFileRoute } from '@tanstack/react-router'
import {ProjectPage} from "../page/project/ProjectPage";
import {useProjectHttp} from "../hooks/query/project/useProjectHttp";
import {PROJECT_QUERY_KEYS} from "../hooks/query/project/useProject";

export const Route = createFileRoute('/project/$projectId')({
  component: RouteComponent,
  beforeLoad: async ({context, params}) => {
      const { axiosInstance } = context;
    const {getProjectByAuth} = useProjectHttp(axiosInstance);
    const authProject = await getProjectByAuth()

      if (!authProject || authProject.key !== params.projectId) {
                throw Route.redirect({
                    to: `/`
                })
            }
  }
})

function RouteComponent() {
  const { projectId } = Route.useParams()

  return ProjectPage(projectId)
}
