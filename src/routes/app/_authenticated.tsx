import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { LocalStorage } from 'src/enums/localStorage'
import { AppRoutes } from 'src/routes/routeConstants/appRoutes'

const { ACCESS_TOKEN, REFRESH_TOKEN } = LocalStorage

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    const updatedAccess = localStorage.getItem(ACCESS_TOKEN)
    const updatedRefresh = localStorage.getItem(REFRESH_TOKEN)

    if (!updatedAccess || !updatedRefresh || !context.auth.authenticated) {
      throw redirect({
        to: AppRoutes.AUTH.LOGIN,
        search: {
          redirect: location.href,
        },
        replace: true,
      })
    }
  },
  component: AuthenticatedRoute,
})

function AuthenticatedRoute() {
  return <Outlet />
}
