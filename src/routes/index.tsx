import { Suspense, useContext, useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { queryClient } from 'src/config/queryConfig'
import { AuthContext } from 'src/context/AuthContext'
import { routeTree } from 'src/routeTree.gen'
import {
  RouteErrorFallback,
  RouteNotFoundFallback,
  RoutePendingFallback,
} from './routeFallbacks'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: RoutePendingFallback,
  defaultErrorComponent: RouteErrorFallback,
  defaultNotFoundComponent: RouteNotFoundFallback,
  context: {
    auth: {},
    queryClient,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const AppRouter = () => {
  const auth = useContext(AuthContext)

  useEffect(() => {
    router.invalidate()
  }, [auth.authenticated, auth.user])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ auth, queryClient }} />
        {import.meta.env.DEV && (
          <TanStackRouterDevtools
            router={router}
            initialIsOpen={false}
            position="bottom-left"
          />
        )}
      </QueryClientProvider>
    </Suspense>
  )
}

export default AppRouter
