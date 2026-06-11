import { useLocation, useNavigate, useRouter } from '@tanstack/react-router'
import { AppRoutes } from 'src/routes/routeConstants/appRoutes'

type QueryParams = Record<string, unknown>

const { HOME } = AppRoutes

const useRedirect = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const router = useRouter()

  const navigateBack = () => router.history.back()

  const redirect = (props: {
    pathname?: string
    href?: string
    queryParams?: QueryParams
    hash?: string
    replace?: boolean
    state?: object
  }) => {
    const { pathname, href, queryParams, hash, replace, state } = props

    if (href) {
      navigate({
        href,
        replace,
        state,
      })
      return
    }

    if (!pathname) return

    navigate({
      to: pathname,
      search: queryParams,
      hash,
      replace,
      state,
    })
  }

  const redirectToHome = () => redirect({ pathname: HOME })

  return {
    location,
    redirect,
    navigate,
    navigateBack,
    redirectToHome,
  }
}

export default useRedirect
