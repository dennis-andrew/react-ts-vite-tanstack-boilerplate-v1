import React from 'react'
import RestrictAccess from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { SharedComponentsConstants } from 'src/constants/sharedComponents'
describe('<RestrictAccess />', () => {
  it('should render restricted access message', () => {
    customRender(<RestrictAccess />, {
      withRouter: false,
      withContext: false,
    })

    expect(
      screen.getByText(SharedComponentsConstants.RESTRICTED_ACCESS_TEXT),
    ).toBeInTheDocument()
  })
})
