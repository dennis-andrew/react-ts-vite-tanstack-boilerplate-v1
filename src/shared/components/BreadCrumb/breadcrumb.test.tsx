import React from 'react'
import BreadCrumb from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
// Constants
const ROUTES = [
  {
    title: 'Home',
    onClick: vi.fn(),
  },
  {
    title: 'Products',
    onClick: vi.fn(),
  },
  {
    title: 'Details',
    onClick: vi.fn(),
  },
]

const PARAMS = [
  {
    path: 'home',
    breadcrumbName: 'Home',
  },
  {
    path: 'products',
    breadcrumbName: 'Products',
  },
  {
    path: 'details',
    breadcrumbName: 'Details',
  },
]

// Setup Functions
const setupBreadCrumbWithRoutes = (props = {}) => {
  const defaultProps = {
    routes: ROUTES,
    params: [],
    ...props,
  }

  const renderResult = customRender(<BreadCrumb {...defaultProps} />, {
    withRouter: true,
    withContext: false,
  })

  return renderResult
}

const setupBreadCrumbWithParams = (props = {}) => {
  const defaultProps = {
    params: PARAMS,
    ...props,
  }

  const renderResult = customRender(<BreadCrumb {...defaultProps} />, {
    withRouter: true,
    withContext: false,
  })

  return renderResult
}

describe('<BreadCrumb />', () => {
  beforeEach(() => {
    ROUTES.forEach((route) => {
      if (route.onClick) {
        route.onClick.mockClear()
      }
    })
  })

  it('should render breadcrumb with routes', () => {
    setupBreadCrumbWithRoutes()

    ROUTES.forEach((route) => {
      expect(screen.getByText(route.title)).toBeInTheDocument()
    })
  })

  it('should render breadcrumb with params', () => {
    setupBreadCrumbWithParams()

    PARAMS.forEach((param) => {
      expect(screen.getByText(param.breadcrumbName)).toBeInTheDocument()
    })
  })

  it('should render breadcrumb with default separator', () => {
    const { container } = setupBreadCrumbWithRoutes()

    const separators = container.querySelectorAll('.ant-breadcrumb-separator')
    expect(separators.length).toBeGreaterThan(0)
  })

  it('should render breadcrumb with custom separator', () => {
    setupBreadCrumbWithRoutes({ separator: '>' })

    ROUTES.forEach((route) => {
      expect(screen.getByText(route.title)).toBeInTheDocument()
    })
  })

  it('should call onClick when route item is clicked', async () => {
    const { user } = setupBreadCrumbWithRoutes()

    const firstRoute = screen.getByText(ROUTES[0].title)
    await user.click(firstRoute)

    expect(ROUTES[0].onClick).toHaveBeenCalled()
  })

  it('should render last breadcrumb item as plain text with params', () => {
    setupBreadCrumbWithParams()

    const lastItem = screen.getByText(PARAMS[PARAMS.length - 1].breadcrumbName)
    expect(lastItem.tagName).toBe('SPAN')
  })

  it('should render non-last breadcrumb items as links with params', () => {
    setupBreadCrumbWithParams()

    const firstItem = screen.getByText(PARAMS[0].breadcrumbName)
    expect(firstItem.tagName).toBe('A')
  })

  it('should render breadcrumb items with custom className', () => {
    const routesWithClass = [
      {
        title: 'Custom Class Item',
        className: 'custom-breadcrumb-class',
      },
    ]

    const { container } = setupBreadCrumbWithRoutes({
      routes: routesWithClass,
    })

    const customClassItem = container.querySelector('.custom-breadcrumb-class')
    expect(customClassItem).toBeInTheDocument()
  })
})
