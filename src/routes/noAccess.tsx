import { createFileRoute } from '@tanstack/react-router'
import {NoAccessPage} from "../page/noAccess/NoAccessPage";

export const Route = createFileRoute('/noAccess')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NoAccessPage/>
}
