import * as React from 'react'
import {createRootRouteWithContext} from '@tanstack/react-router'
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {NavigationAppBar} from "../page/bar/NavigationAppBar";
import {NoPage} from "../page/noPage/NoPage";
import {AppContextType} from "../AuthProvider";

export const Route = createRootRouteWithContext<AppContextType>()({
    component: RootComponent,
    notFoundComponent: NoPage
})

function RootComponent() {
    return (
        <React.Fragment>
            <NavigationAppBar/>
            <TanStackRouterDevtools/>
        </React.Fragment>
    )
}



