import React from 'react'
import Home from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
describe('<Home />', () => {
  it('should render home page with navbar', () => {
    customRender(<Home />, {
      withRouter: true,
      withContext: true,
    })

    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })
})
