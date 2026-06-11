import React from 'react'
import Navbar from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { SharedComponentsConstants } from 'src/constants/sharedComponents'
import { vi } from 'vitest'
const { getByText } = screen

// Mock Notification component
vi.mock('src/shared/components/Notification', () => ({
  default: vi.fn(),
}))

describe('<Navbar />', () => {
  it('should render navbar with logout text', () => {
    customRender(<Navbar />, { withRouter: false, withContext: false })

    expect(getByText(SharedComponentsConstants.LOGOUT_TEXT)).toBeInTheDocument()
  })

  it('should call notification when logout is clicked', async () => {
    const Notification = (await import('src/shared/components/Notification'))
      .default
    const { user } = customRender(<Navbar />, {
      withRouter: false,
      withContext: false,
    })

    const logoutItem = getByText(SharedComponentsConstants.LOGOUT_TEXT)
    await user.click(logoutItem)

    expect(Notification).toHaveBeenCalledWith(
      SharedComponentsConstants.LOGOUT_NOTIFICATION,
    )
  })
})
