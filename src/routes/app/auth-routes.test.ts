import { isRedirect } from '@tanstack/react-router'
import { LocalStorage } from 'src/enums/localStorage'
import { AppRoutes } from 'src/routes/routeConstants/appRoutes'
import { Route as AuthenticatedRoute } from './_authenticated'
import { Route as AuthLoginRoute } from './auth.login'

const { ACCESS_TOKEN, REFRESH_TOKEN } = LocalStorage

const expectRedirect = (callback: () => void) => {
  try {
    callback()
  } catch (error) {
    expect(isRedirect(error)).toBe(true)
    return error as { options: Record<string, unknown> }
  }

  throw new Error('Expected route guard to throw a redirect')
}

describe('TanStack auth routes', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should redirect unauthenticated users to login with attempted URL', () => {
    const redirectError = expectRedirect(() => {
      AuthenticatedRoute.options.beforeLoad?.({
        context: { auth: { authenticated: false } },
        location: { href: '/reports?page=2' },
      } as never)
    })

    expect(redirectError.options).toEqual(
      expect.objectContaining({
        to: AppRoutes.AUTH.LOGIN,
        search: {
          redirect: '/reports?page=2',
        },
        replace: true,
      }),
    )
  })

  it('should allow authenticated users with tokens into protected routes', () => {
    localStorage.setItem(ACCESS_TOKEN, 'access-token')
    localStorage.setItem(REFRESH_TOKEN, 'refresh-token')

    expect(() => {
      AuthenticatedRoute.options.beforeLoad?.({
        context: { auth: { authenticated: true } },
        location: { href: '/' },
      } as never)
    }).not.toThrow()
  })

  it('should redirect authenticated login visitors to the safe redirect target', () => {
    const redirectError = expectRedirect(() => {
      AuthLoginRoute.options.beforeLoad?.({
        context: {
          auth: {
            authenticated: true,
            user: {},
          },
        },
        search: {
          redirect: '/dashboard',
        },
      } as never)
    })

    expect(redirectError.options).toEqual(
      expect.objectContaining({
        href: '/dashboard',
        replace: true,
      }),
    )
  })

  it('should fall back home when login redirect search is unsafe', () => {
    const validateSearch = AuthLoginRoute.options.validateSearch as (
      search: Record<string, unknown>,
    ) => unknown

    const search = validateSearch({
      redirect: 'https://example.com/dashboard',
    })

    const redirectError = expectRedirect(() => {
      AuthLoginRoute.options.beforeLoad?.({
        context: {
          auth: {
            authenticated: true,
            user: {},
          },
        },
        search,
      } as never)
    })

    expect(redirectError.options).toEqual(
      expect.objectContaining({
        href: AppRoutes.HOME,
        replace: true,
      }),
    )
  })
})
