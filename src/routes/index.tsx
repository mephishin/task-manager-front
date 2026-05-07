import {createFileRoute} from '@tanstack/react-router'
import {useProjectHttp} from "../hooks/query/project/useProjectHttp";
import {PROJECT_QUERY_KEYS} from "../hooks/query/project/useProject";

export const Route = createFileRoute('/')({
    component: RouteComponent,
    beforeLoad: async ({context}) => {
        const {getProjectByAuth} = useProjectHttp(context.axiosInstance);
        const authProject = await context.queryClient.ensureQueryData({
            queryKey: [PROJECT_QUERY_KEYS.get, context.auth.getId()],
            queryFn: getProjectByAuth
        })


        throw Route.redirect({
            to: `/project/${authProject.key}/${authProject.name}`
        })
    }
})

function RouteComponent() {
    return <div>Hello "/"!</div>
}
