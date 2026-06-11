import React from 'react'
import Button from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { vi } from 'vitest'
const { getByRole } = screen

// Constants
const BUTTON_TEXT = 'Click Me'
const CUSTOM_CLASS = 'custom-button-class'
const MODULE_CLASS = 'module-button-class'

// Mock Functions
const mockClickHandler = vi.fn()

// Setup Functions
const setupButton = (props = {}) => {
  const renderResult = customRender(<Button {...props}>{BUTTON_TEXT}</Button>, {
    withRouter: false,
    withContext: false,
  })

  const button = getByRole(DOM_ELEMENT_ROLE.BUTTON, { name: BUTTON_TEXT })

  return {
    ...renderResult,
    button,
  }
}

describe('<Button />', () => {
  beforeEach(() => {
    mockClickHandler.mockClear()
  })

  it('should render button with children text', () => {
    const { button } = setupButton()

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(BUTTON_TEXT)
  })

  it('should render button with default htmlType as button', () => {
    const { button } = setupButton()

    expect(button).toHaveAttribute('type', 'button')
  })

  it('should render button with submit htmlType', () => {
    const { button } = setupButton({ htmlType: 'submit' })

    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should call clickHandler when button is clicked', async () => {
    const { user, button } = setupButton({ clickHandler: mockClickHandler })

    await user.click(button)

    expect(mockClickHandler).toHaveBeenCalledTimes(1)
  })

  it('should not call clickHandler when button is disabled', async () => {
    const { user, button } = setupButton({
      clickHandler: mockClickHandler,
      disabled: true,
    })

    await user.click(button)

    expect(mockClickHandler).not.toHaveBeenCalled()
  })

  it('should render button with custom className', () => {
    const { container } = setupButton({ className: CUSTOM_CLASS })

    const buttonWrapper = container.querySelector(`.${CUSTOM_CLASS}`)

    expect(buttonWrapper).toBeInTheDocument()
  })

  it('should render button with moduleClassName', () => {
    const { container } = setupButton({ moduleClassName: MODULE_CLASS })

    const buttonWrapper = container.querySelector('.button')

    expect(buttonWrapper).toBeInTheDocument()
  })

  it('should render button without className when not provided', () => {
    const { container } = setupButton()

    const buttonWrapper = container.querySelector('.button')

    expect(buttonWrapper).toBeInTheDocument()
    expect(buttonWrapper?.classList.contains(CUSTOM_CLASS)).toBeFalsy()
  })

  it('should render button without moduleClassName when not provided', () => {
    const { container } = setupButton()

    const buttonWrapper = container.querySelector('.button')

    expect(buttonWrapper).toBeInTheDocument()
    expect(buttonWrapper?.classList.contains(MODULE_CLASS)).toBeFalsy()
  })

  it('should render button with icon', () => {
    const mockIcon = <span data-testid="test-icon">Icon</span>
    customRender(<Button icon={mockIcon}>{BUTTON_TEXT}</Button>, {
      withRouter: false,
      withContext: false,
    })

    const icon = screen.getByTestId('test-icon')
    expect(icon).toBeInTheDocument()
  })

  it('should render button as disabled', () => {
    const { button } = setupButton({ disabled: true })

    expect(button).toBeDisabled()
  })

  it('should render button in loading state', () => {
    customRender(<Button loading={true}>{BUTTON_TEXT}</Button>, {
      withRouter: false,
      withContext: false,
    })

    const button = screen.getByRole(DOM_ELEMENT_ROLE.BUTTON, {
      name: /Click Me/i,
    })
    expect(button).toHaveClass('ant-btn-loading')
  })

  it('should render button with small size', () => {
    const { button } = setupButton({ size: 'small' })

    expect(button).toHaveClass('small')
  })

  it('should render button with type prop', () => {
    const { button } = setupButton({ type: 'primary' })

    expect(button).toHaveClass('ant-btn-primary')
  })

  it('should render button with name attribute', () => {
    const buttonName = 'test-button'
    const { button } = setupButton({ name: buttonName })

    expect(button).toHaveAttribute('name', buttonName)
  })

  it('should render link button with href', () => {
    const href = 'https://example.com'
    customRender(<Button href={href}>{BUTTON_TEXT}</Button>, {
      withRouter: false,
      withContext: false,
    })

    const link = screen.getByRole('link', { name: BUTTON_TEXT })
    expect(link).toHaveAttribute('href', href)
  })

  it('should render link button with target', () => {
    customRender(
      <Button href="https://example.com" target="_blank">
        {BUTTON_TEXT}
      </Button>,
      { withRouter: false, withContext: false },
    )

    const link = screen.getByRole('link', { name: BUTTON_TEXT })
    expect(link).toHaveAttribute('target', '_blank')
  })
})
