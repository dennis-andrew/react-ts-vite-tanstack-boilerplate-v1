import React from 'react'
import { render as rtlRender, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterContextProvider,
} from '@tanstack/react-router'
import { type FieldValues } from 'react-hook-form'
import { AuthProvider } from 'src/context/AuthContext'
import RequireNetwork from 'src/shared/components/HOC/requireNetwork'
import Form, { type FormProps } from 'src/shared/components/Form'

// Type Definitions
interface ProvidersOptions<T extends FieldValues> {
  withRouter?: boolean
  initialEntries?: string[]
  withContext?: boolean
  withAuth?: boolean
  withRequireNetwork?: boolean
  withQueryClient?: boolean
  queryClient?: QueryClient
  withForm?: boolean
  formProps?: Omit<FormProps<T>, 'children'>
  formRenderProp?: boolean
}

export interface CustomRenderOptions<T extends FieldValues = FieldValues>
  extends Omit<RenderOptions, 'wrapper'>,
    ProvidersOptions<T> {}

// Default QueryClient configuration for testing
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  })

const createTestRouter = (
  children: React.ReactNode,
  initialEntries: string[],
) => {
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <>{children}</>,
  })

  const catchAllRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$',
    component: () => <>{children}</>,
  })

  const routeTree = rootRoute.addChildren([indexRoute, catchAllRoute])

  return createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries,
    }),
  })
}

type TestRouter = ReturnType<typeof createTestRouter>

interface RenderReturn extends ReturnType<typeof rtlRender> {
  user: ReturnType<(typeof userEvent)['setup']>
  router?: TestRouter
}

// Main render utility
export function customRender<T extends FieldValues = FieldValues>(
  ui: React.ReactElement,
  options: CustomRenderOptions<T> = {},
): RenderReturn {
  const {
    withRouter = true,
    initialEntries = ['/'],
    withContext,
    withAuth = true,
    withRequireNetwork = true,
    withQueryClient = false,
    queryClient,
    withForm = false,
    formProps,
    formRenderProp = false,
    ...rtlOptions
  } = options

  // Backwards compatibility: withContext overrides withAuth and withRequireNetwork
  const useAuth = withContext ?? withAuth
  const useNetwork = withContext ?? withRequireNetwork

  // Lazy QueryClient creation
  const getQueryClient = () => queryClient ?? createTestQueryClient()
  let testRouter: TestRouter | undefined

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    // Define wrappers in order (innermost to outermost)
    const wrappers: Array<{
      condition: boolean
      wrap: (node: React.ReactNode) => React.ReactNode
    }> = [
      {
        condition: useAuth,
        wrap: (node) => <AuthProvider>{node}</AuthProvider>,
      },
      {
        condition: useNetwork,
        wrap: (node) => <RequireNetwork>{node}</RequireNetwork>,
      },
      {
        condition: withQueryClient,
        wrap: (node) => (
          <QueryClientProvider client={getQueryClient()}>
            {node}
          </QueryClientProvider>
        ),
      },
      {
        condition: withRouter,
        wrap: (node) => {
          testRouter ??= createTestRouter(node, initialEntries as string[])

          return (
            <RouterContextProvider router={testRouter}>
              {node}
            </RouterContextProvider>
          )
        },
      },
      {
        condition: withForm && !!formProps,
        wrap: (node) =>
          formRenderProp ? (
            <Form {...(formProps as FormProps<T>)}>
              {(methods) =>
                typeof children === 'function'
                  ? (children as (methods: unknown) => React.ReactNode)(methods)
                  : node
              }
            </Form>
          ) : (
            <Form {...(formProps as FormProps<T>)}>{() => node}</Form>
          ),
      },
    ]

    // Apply wrappers conditionally
    return wrappers.reduce<React.ReactNode>(
      (tree, { condition, wrap }) => (condition ? wrap(tree) : tree),
      children,
    ) as React.ReactElement
  }

  const renderResult = rtlRender(ui, { wrapper: Wrapper, ...rtlOptions })

  return {
    user: userEvent.setup({ delay: null }),
    router: testRouter,
    ...renderResult,
  }
}

// Convenience aliases
export const renderWithRouterAndForm = <T extends FieldValues>(
  ui: React.ReactElement,
  opts?: Omit<CustomRenderOptions<T>, 'withRouter' | 'withForm'> & {
    formProps: CustomRenderOptions<T>['formProps']
  },
) => customRender<T>(ui, { ...opts, withRouter: true, withForm: true })

export const render = (ui: React.ReactElement, opts?: CustomRenderOptions) =>
  customRender(ui, opts)

// Backwards compatibility alias
export const renderWithContext = (
  ui: React.ReactElement,
  options?: RenderOptions,
): RenderReturn => customRender(ui, options)
