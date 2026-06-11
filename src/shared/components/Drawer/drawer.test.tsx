import Drawer from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
const { getByText, queryByText } = screen

// Constants
const DRAWER_TITLE = 'Test Drawer'
const DRAWER_CONTENT = 'This is drawer content'
const CUSTOM_WIDTH = 500

// Mock Functions
const mockOnClose = vi.fn()

// Setup Functions
const setupDrawer = (props = {}) => {
  const defaultProps = {
    title: DRAWER_TITLE,
    closable: true,
    onClose: mockOnClose,
    open: true,
    ...props,
  }

  const renderResult = customRender(
    <Drawer {...defaultProps}>
      <div>{DRAWER_CONTENT}</div>
    </Drawer>,
    { withRouter: false, withContext: false },
  )

  return renderResult
}

describe('<Drawer />', () => {
  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('should render drawer when open is true', () => {
    setupDrawer({ open: true })

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })

  it('should not render drawer when open is false', () => {
    setupDrawer({ open: false })

    expect(queryByText(DRAWER_CONTENT)).not.toBeInTheDocument()
  })

  it('should render drawer with title', () => {
    setupDrawer()

    expect(getByText(DRAWER_TITLE)).toBeInTheDocument()
  })

  it('should render drawer with custom width', () => {
    setupDrawer({ width: CUSTOM_WIDTH })

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })

  it('should render drawer children', () => {
    setupDrawer()

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })

  it('should render drawer with default placement (right)', () => {
    setupDrawer()

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })

  it('should render drawer with left placement', () => {
    setupDrawer({ placement: 'left' })

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })

  it('should render drawer with top placement', () => {
    setupDrawer({ placement: 'top' })

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })

  it('should render drawer with bottom placement', () => {
    setupDrawer({ placement: 'bottom' })

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })

  it('should render drawer with small size', () => {
    setupDrawer({ size: 'small' })

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })

  it('should render drawer with large size', () => {
    setupDrawer({ size: 'large' })

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })

  it('should render drawer with custom footer', () => {
    const footerText = 'Custom Footer'
    const footer = <div>{footerText}</div>
    setupDrawer({ footer })

    expect(getByText(footerText)).toBeInTheDocument()
  })

  it('should render drawer with custom zIndex', () => {
    setupDrawer({ zIndex: 2000 })

    expect(getByText(DRAWER_CONTENT)).toBeInTheDocument()
  })
})
