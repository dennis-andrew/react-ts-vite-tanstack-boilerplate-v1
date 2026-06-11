import React from 'react'
import RegisterForm from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
describe('<RegisterForm />', () => {
  it('should render register page', () => {
    customRender(<RegisterForm />, {
      withRouter: false,
      withContext: false,
    })

    expect(screen.getByText('Register Page')).toBeInTheDocument()
  })
})
