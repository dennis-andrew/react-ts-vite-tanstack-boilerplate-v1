import React from 'react'
import { renderWithContext } from 'src/shared/utils/tests.utils'
import Offline from '.'
import { SharedComponentsConstants } from 'src/constants/sharedComponents'
describe('<Offline />', () => {
  it('Should Render Error Message When offline is true', () => {
    const { getByText } = renderWithContext(<Offline isOffline />)

    expect(
      getByText(SharedComponentsConstants.OFFLINE_TEXT),
    ).toBeInTheDocument()
  })

  it('Should Render Error Message When offline is false', () => {
    const { container } = renderWithContext(<Offline isOffline={false} />)

    expect(container.getElementsByClassName('offline').length).toBe(0)
  })
})
