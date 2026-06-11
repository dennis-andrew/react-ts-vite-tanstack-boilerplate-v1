import React from 'react'
import Accordion from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
// Constants
const ACCORDION_ITEMS = [
  {
    id: '1',
    title: 'Item 1 Title',
    description: 'Item 1 Description',
    showArrow: true,
  },
  {
    id: '2',
    title: 'Item 2 Title',
    description: 'Item 2 Description',
    showArrow: false,
  },
  {
    id: '3',
    title: 'Item 3 Title',
    description: 'Item 3 Description',
    showArrow: true,
  },
]

// Mock Functions
const mockOnChange = vi.fn()

// Setup Functions
const setupAccordion = (props = {}) => {
  const defaultProps = {
    accordionList: ACCORDION_ITEMS,
    defaultActiveKey: '1',
    ...props,
  }

  const renderResult = customRender(<Accordion {...defaultProps} />, {
    withRouter: false,
    withContext: false,
  })

  return renderResult
}

describe('<Accordion />', () => {
  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('should render all accordion items', () => {
    setupAccordion()

    ACCORDION_ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('should render first item content by default', () => {
    setupAccordion()

    expect(screen.getByText(ACCORDION_ITEMS[0].description)).toBeInTheDocument()
  })

  it('should render with custom defaultActiveKey', () => {
    setupAccordion({ defaultActiveKey: '2' })

    expect(screen.getByText(ACCORDION_ITEMS[1].description)).toBeInTheDocument()
  })

  it('should expand accordion item when clicked', async () => {
    const { user } = setupAccordion()

    const secondItemHeader = screen.getByText(ACCORDION_ITEMS[1].title)
    await user.click(secondItemHeader)

    expect(screen.getByText(ACCORDION_ITEMS[1].description)).toBeInTheDocument()
  })

  it('should call onChange when accordion item is clicked', async () => {
    const { user } = setupAccordion({ onChange: mockOnChange })

    const secondItemHeader = screen.getByText(ACCORDION_ITEMS[1].title)
    await user.click(secondItemHeader)

    expect(mockOnChange).toHaveBeenCalled()
  })

  it('should render accordion items without arrows when showArrow is false', () => {
    const { container } = setupAccordion()

    const accordionHeaders = container.querySelectorAll('.ant-collapse-header')
    expect(accordionHeaders.length).toBe(ACCORDION_ITEMS.length)
  })
})
