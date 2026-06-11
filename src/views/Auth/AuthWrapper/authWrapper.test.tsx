import React from 'react'
import AuthWrapper from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
describe('<AuthWrapper />', () => {
  it('should render auth wrapper with layout text', () => {
    customRender(<AuthWrapper />, {
      withRouter: true,
      withContext: false,
    })

    expect(screen.getByText('AuthLayout')).toBeInTheDocument()
  })
})
