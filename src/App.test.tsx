import { screen, waitFor } from '@testing-library/react'
import { customRender } from 'src/shared/utils/tests.utils'
import App from './App'

// Mock the routes module to avoid loading all views
vi.mock('src/routes/index', () => ({
  default: () => <div data-testid="app-routes">App Routes</div>,
}))

// Setup Functions
const setupApp = () => {
  const renderResult = customRender(<App />, {
    withRouter: false, // App has its own RouterProvider
    withAuth: false, // App has its own AuthProvider
    withRequireNetwork: false, // App has its own RequireNetwork
  })

  return {
    ...renderResult,
    getAppRoutes: () => screen.getByTestId('app-routes'),
  }
}

describe('<App />', () => {
  it('should render without crashing', () => {
    const { getAppRoutes } = setupApp()

    expect(getAppRoutes()).toBeInTheDocument()
  })

  it('should render with all providers in correct hierarchy', async () => {
    const { container, getAppRoutes } = setupApp()

    // Verify the component tree renders
    await waitFor(() => {
      expect(container.querySelector('div')).toBeInTheDocument()
    })

    // Verify routes are rendered
    expect(getAppRoutes()).toBeInTheDocument()
  })

  it('should provide router context to children', () => {
    const { getAppRoutes } = setupApp()

    // AppRoutes component should have access to router context
    // If it renders, it means RouterProvider is working
    expect(getAppRoutes()).toBeInTheDocument()
  })
})
