import React from 'react'
import LoginForm from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
// Mock the hooks
vi.mock('src/services/useAuthService', () => ({
  useLoginMutation: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}))

vi.mock('src/shared/hooks/useRedirect', () => ({
  default: vi.fn(() => ({
    redirectToHome: vi.fn(),
  })),
}))

describe('<LoginForm />', () => {
  it('should render login form with email and password fields', () => {
    customRender(<LoginForm />, {
      withRouter: true,
      withContext: false,
    })

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
  })

  it('should render submit button', () => {
    customRender(<LoginForm />, {
      withRouter: true,
      withContext: false,
    })

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
