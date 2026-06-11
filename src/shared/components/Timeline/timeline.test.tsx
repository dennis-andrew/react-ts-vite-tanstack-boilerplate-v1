import React from 'react'
import Timeline from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { ClockCircleOutlined } from '@ant-design/icons'
// Constants
const TIMELINE_ITEMS = [
  {
    label: '2024-01-01',
    children: 'Event 1',
    color: 'green',
  },
  {
    label: '2024-01-02',
    children: 'Event 2',
    color: 'blue',
  },
  {
    label: '2024-01-03',
    children: 'Event 3',
    color: 'red',
  },
]

// Setup Functions
const setupTimeline = (props = {}) => {
  const defaultProps = {
    items: TIMELINE_ITEMS,
    ...props,
  }

  const renderResult = customRender(<Timeline {...defaultProps} />, {
    withRouter: false,
    withContext: false,
  })

  return renderResult
}

describe('<Timeline />', () => {
  it('should render all timeline items', () => {
    setupTimeline()

    TIMELINE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
      expect(screen.getByText(item.children)).toBeInTheDocument()
    })
  })

  it('should render timeline with default mode (left)', () => {
    const { container } = setupTimeline()

    const timeline = container.querySelector('.ant-timeline')
    expect(timeline).toBeInTheDocument()
  })

  it('should render timeline with alternate mode', () => {
    setupTimeline({ mode: 'alternate' })

    TIMELINE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.children)).toBeInTheDocument()
    })
  })

  it('should render timeline with right mode', () => {
    setupTimeline({ mode: 'right' })

    TIMELINE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.children)).toBeInTheDocument()
    })
  })

  it('should render timeline with pending status', () => {
    setupTimeline({ pending: true })

    TIMELINE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.children)).toBeInTheDocument()
    })
  })

  it('should render timeline with pending text', () => {
    const pendingText = 'Loading...'
    setupTimeline({ pending: pendingText })

    expect(screen.getByText(pendingText)).toBeInTheDocument()
  })

  it('should render timeline in reverse order', () => {
    setupTimeline({ reverse: true })

    TIMELINE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.children)).toBeInTheDocument()
    })
  })

  it('should render timeline with custom pending dot', () => {
    const { container } = setupTimeline({
      pending: true,
      pendingDot: <ClockCircleOutlined />,
    })

    const pendingDot = container.querySelector('.anticon-clock-circle')
    expect(pendingDot).toBeInTheDocument()
  })

  it('should render timeline items with custom dots', () => {
    const itemsWithDot = [
      {
        label: '2024-01-01',
        children: 'Event with custom dot',
        dot: <ClockCircleOutlined />,
      },
    ]

    const { container } = setupTimeline({ items: itemsWithDot })

    const customDot = container.querySelector('.anticon-clock-circle')
    expect(customDot).toBeInTheDocument()
  })
})
