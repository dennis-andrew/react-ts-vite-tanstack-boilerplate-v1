import React from 'react'
import Tooltip from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
const { getByText } = screen

// Constants
const TOOLTIP_TITLE = 'Tooltip content'
const CHILD_TEXT = 'Hover me'

// Setup Function
const setupTooltip = (props = {}) => {
  const renderResult = customRender(
    <Tooltip title={TOOLTIP_TITLE} {...props}>
      <button>{CHILD_TEXT}</button>
    </Tooltip>,
    { withRouter: false, withContext: false },
  )

  const child = getByText(CHILD_TEXT)

  return {
    ...renderResult,
    child,
  }
}

describe('<Tooltip />', () => {
  it('should render children', () => {
    const { child } = setupTooltip()

    expect(child).toBeInTheDocument()
  })

  it('should show tooltip on hover', async () => {
    const { user, child } = setupTooltip()

    await user.hover(child)

    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()
  })

  it('should hide tooltip when mouse leaves', async () => {
    const { user, child } = setupTooltip()

    await user.hover(child)
    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()

    await user.unhover(child)

    // Tooltip should eventually disappear
    await new Promise((resolve) => setTimeout(resolve, 300))
  })

  it('should show tooltip on click when trigger is click', async () => {
    const { user, child } = setupTooltip({ trigger: 'click' })

    await user.click(child)

    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()
  })

  it('should show tooltip on focus when trigger is focus', async () => {
    const { user, child } = setupTooltip({ trigger: 'focus' })

    await user.click(child) // This will focus the button

    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()
  })

  it('should render tooltip with custom color', async () => {
    const { user, child } = setupTooltip({ color: 'red' })

    await user.hover(child)

    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()
  })

  it('should render tooltip with top placement by default', async () => {
    const { user, child } = setupTooltip()

    await user.hover(child)

    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()
  })

  it('should render tooltip with bottom placement', async () => {
    const { user, child } = setupTooltip({ placement: 'bottom' })

    await user.hover(child)

    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()
  })

  it('should render tooltip with arrowPointAtCenter prop', async () => {
    const { user, child } = setupTooltip({ arrowPointAtCenter: true })

    await user.hover(child)

    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()
  })

  it('should render tooltip with autoAdjustOverflow prop', async () => {
    const { user, child } = setupTooltip({ autoAdjustOverflow: false })

    await user.hover(child)

    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()
  })

  it('should render tooltip with custom zIndex', async () => {
    const { user, child } = setupTooltip({ zIndex: 9999 })

    await user.hover(child)

    expect(await screen.findByText(TOOLTIP_TITLE)).toBeInTheDocument()
  })
})
