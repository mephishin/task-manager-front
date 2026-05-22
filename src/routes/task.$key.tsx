import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {TaskPage} from "../page/task/TaskPage";
import {useProjectHttp} from "../hooks/query/project/useProjectHttp";
import {PROJECT_QUERY_KEYS} from "../hooks/query/project/useProject";
import { useTaskHttp } from '../hooks/query/task/useTaskHttp';

export const Route = createFileRoute('/task/$key')({
  component: RouteComponent,
    beforeLoad: async ({ context, params}) => {
        const { axiosInstance } = context;
        const { getProjectByAuth} = useProjectHttp(axiosInstance);
        const { getTask } = useTaskHttp(axiosInstance);
        const authProject = await getProjectByAuth()
        const task = await getTask(params.key);

        if (!authProject || authProject.key !== task.project.id) {
            throw Route.redirect({
                to: `/`
            })
        }
  }
})

function RouteComponent() {
  const { key } = Route.useParams()

  return TaskPage(key)
}
