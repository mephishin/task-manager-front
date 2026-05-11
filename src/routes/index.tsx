import {createFileRoute} from '@tanstack/react-router'
import {useProjectHttp} from "../hooks/query/project/useProjectHttp";

export const Route = createFileRoute('/')({
    component: RouteComponent,
    beforeLoad: async ({context}) => {
        const {auth: {hasRole, ADMIN}, axiosInstance} = context;
        const {getProjectByAuth} = useProjectHttp(axiosInstance);
        const authProject = await getProjectByAuth()

        if (hasRole(ADMIN)) {
            throw Route.redirect({
                to: `/admin`
            })
        } else {
            if (authProject) {
                throw Route.redirect({
                    to: `/project/${authProject.key}`
                })
            } else {
                throw Route.redirect({
                    to: "/acceptInvite"
                })
            }
        }
    }
})

function RouteComponent() {
    return <></>
}
