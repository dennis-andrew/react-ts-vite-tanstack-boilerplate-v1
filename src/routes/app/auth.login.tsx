import { createFileRoute, redirect } from '@tanstack/react-router'
import { validateRedirectSearch } from 'src/routes/redirectSearch'
import { AppRoutes } from 'src/routes/routeConstants/appRoutes'
import LoginForm from 'src/views/Auth/LoginForm'

export const Route = createFileRoute('/auth/login')({
  validateSearch: validateRedirectSearch,
  beforeLoad: ({ context, search }) => {
    if (context.auth.authenticated && context.auth.user) {
      throw redirect({
        href: search.redirect ?? AppRoutes.HOME,
        replace: true,
      })
    }
  },
  component: LoginForm,
})
