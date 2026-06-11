import Tabs from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
const { getByText } = screen

// Mock Data
const mockTabItems = [
  {
    key: '1',
    label: 'Tab 1',
    children: <div>Content 1</div>,
  },
  {
    key: '2',
    label: 'Tab 2',
    children: <div>Content 2</div>,
  },
  {
    key: '3',
    label: 'Tab 3',
    children: <div>Content 3</div>,
    disabled: true,
  },
]

// Setup Function
const setupTabs = (props = {}) => {
  const renderResult = customRender(<Tabs items={mockTabItems} {...props} />, {
    withRouter: false,
    withContext: false,
  })

  return renderResult
}

describe('<Tabs />', () => {
  it('should render tabs with all labels', () => {
    setupTabs()

    expect(getByText('Tab 1')).toBeInTheDocument()
    expect(getByText('Tab 2')).toBeInTheDocument()
    expect(getByText('Tab 3')).toBeInTheDocument()
  })

  it('should render first tab content by default', () => {
    setupTabs()

    expect(getByText('Content 1')).toBeInTheDocument()
  })

  it('should switch to second tab when clicked', async () => {
    const { user } = setupTabs()

    const tab2 = getByText('Tab 2')
    await user.click(tab2)

    expect(getByText('Content 2')).toBeInTheDocument()
  })

  it('should render tabs with line type by default', () => {
    const { container } = setupTabs()

    const tabs = container.querySelector('.ant-tabs')
    expect(tabs).toBeInTheDocument()
  })

  it('should render tabs with card type', () => {
    const { container } = setupTabs({ type: 'card' })

    const tabs = container.querySelector('.ant-tabs-card')
    expect(tabs).toBeInTheDocument()
  })

  it('should render tabs with top position by default', () => {
    const { container } = setupTabs()

    const tabs = container.querySelector('.ant-tabs-top')
    expect(tabs).toBeInTheDocument()
  })

  it('should render tabs with left position', () => {
    const { container } = setupTabs({ tabPosition: 'left' })

    const tabs = container.querySelector('.ant-tabs-left')
    expect(tabs).toBeInTheDocument()
  })

  it('should render tabs with active key', () => {
    setupTabs({ activeKey: '2' })

    expect(getByText('Content 2')).toBeInTheDocument()
  })

  it('should render tabs with default active key', () => {
    setupTabs({ defaultActiveKey: '2' })

    expect(getByText('Content 2')).toBeInTheDocument()
  })

  it('should render tabs with centered prop', () => {
    const { container } = setupTabs({ centered: true })

    const tabs = container.querySelector('.ant-tabs-centered')
    expect(tabs).toBeInTheDocument()
  })

  it('should render disabled tab', () => {
    const { container } = setupTabs()

    const disabledTab = container.querySelector('.ant-tabs-tab-disabled')
    expect(disabledTab).toBeInTheDocument()
  })

  it('should not switch to disabled tab when clicked', async () => {
    const { user } = setupTabs()

    const tab3 = getByText('Tab 3')
    await user.click(tab3)

    // Content 1 should still be visible (disabled tab can't be activated)
    expect(getByText('Content 1')).toBeInTheDocument()
  })
})
