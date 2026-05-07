import { createFileRoute } from '@tanstack/react-router'
import {AcceptInvitePage} from "../page/acceptInvite/AcceptInvitePage";
import {useProjectHttp} from "../hooks/query/project/useProjectHttp";
import {PROJECT_QUERY_KEYS} from "../hooks/query/project/useProject";

export const Route = createFileRoute('/acceptInvite')({
  component: RouteComponent,
  beforeLoad: async ({context}) => {
    const { axiosInstance } = context;
    const {getProjectByAuth} = useProjectHttp(axiosInstance);
    const authProject = await getProjectByAuth();

    if (authProject) {
      throw Route.redirect({
        to: `/`
      })
    }
  }
})

function RouteComponent() {
  return AcceptInvitePage()
}
