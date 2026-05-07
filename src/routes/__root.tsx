import * as React from 'react'
import {Outlet, createRootRouteWithContext} from '@tanstack/react-router'
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {NavigationAppBar} from "../page/bar/NavigationAppBar";
import {NoPage} from "../page/noPage/NoPage";
import {useProjectHttp} from "../hooks/query/project/useProjectHttp";
import {PROJECT_QUERY_KEYS} from "../hooks/query/project/useProject";
import {AppContextType} from "../AuthProvider";

export const Route = createRootRouteWithContext<AppContextType>()({
    component: RootComponent,
    beforeLoad: async ({context}) => {
        const { getProjectByAuth } = useProjectHttp(context.axiosInstance);
        const authProject =  await context.queryClient.ensureQueryData({
            queryKey: [PROJECT_QUERY_KEYS.get, context.auth.getId()],
            queryFn: getProjectByAuth
        })

        if (!authProject) {
            throw Route.redirect({
                to: '/noAccess'
            })
        }
    },
    notFoundComponent: NoPage
})

function RootComponent() {
    return (
        <React.Fragment>
            <NavigationAppBar/>
            <Outlet/>
            <TanStackRouterDevtools/>
        </React.Fragment>
    )
}



