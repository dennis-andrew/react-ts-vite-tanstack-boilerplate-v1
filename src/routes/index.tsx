import { Suspense, useContext, useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { queryClient } from 'src/config/queryConfig'
import { AuthContext } from 'src/context/AuthContext'
import { routeTree } from 'src/routeTree.gen'

export const router = createRouter({
  routeTree,
  context: {
    auth: {},
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
        <RouterProvider router={router} context={{ auth }} />
      </QueryClientProvider>
    </Suspense>
  )
}

export default AppRouter
