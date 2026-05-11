import {createFileRoute} from '@tanstack/react-router'
import {AcceptInvitePage} from "../page/acceptInvite/AcceptInvitePage";
import {useProjectHttp} from "../hooks/query/project/useProjectHttp";

export const Route = createFileRoute('/acceptInvite')({
    component: RouteComponent,
    beforeLoad: async ({context}) => {
        const {axiosInstance} = context;
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
