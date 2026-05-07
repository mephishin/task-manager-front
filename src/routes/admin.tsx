import { createFileRoute } from '@tanstack/react-router'
import {AdminPage} from "../page/admin/AdminPage";

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: async ({context}) => {
    const {auth: {hasRole, ADMIN}} = context;

    if (!hasRole(ADMIN)) {
      throw Route.redirect({
        to: `/`
      })
    }
  }
})

function RouteComponent() {
  return AdminPage()
}
