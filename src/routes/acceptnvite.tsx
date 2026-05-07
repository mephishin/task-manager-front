import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/acceptnvite')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/acceptnvite"!</div>
}
