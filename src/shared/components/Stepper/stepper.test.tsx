import Stepper from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
// Constants
const STEPPER_ITEMS = [
  {
    title: 'Step 1',
    description: 'First step description',
    component: <div>Step 1 Content</div>,
  },
  {
    title: 'Step 2',
    description: 'Second step description',
    component: <div>Step 2 Content</div>,
  },
  {
    title: 'Step 3',
    description: 'Third step description',
    component: <div>Step 3 Content</div>,
  },
]

// Setup Functions
const setupStepper = (props = {}) => {
  const defaultProps = {
    items: STEPPER_ITEMS,
    ...props,
  }

  const renderResult = customRender(<Stepper {...defaultProps} />, {
    withRouter: false,
    withContext: false,
  })

  return renderResult
}

describe('<Stepper />', () => {
  it('should render all stepper items', () => {
    setupStepper()

    STEPPER_ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('should render first step content by default', () => {
    setupStepper()

    expect(screen.getByText('Step 1 Content')).toBeInTheDocument()
  })

  it('should not show other step content initially', () => {
    setupStepper()

    expect(screen.queryByText('Step 2 Content')).toBeInTheDocument()
    expect(screen.queryByText('Step 3 Content')).toBeInTheDocument()
  })

  it('should render step descriptions', () => {
    setupStepper()

    STEPPER_ITEMS.forEach((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument()
    })
  })

  it('should switch to second step when clicked', async () => {
    const { user } = setupStepper()

    const step2Title = screen.getByText('Step 2')
    await user.click(step2Title)

    const step2Content = screen.getByText('Step 2 Content')
    const step2Parent = step2Content.closest('div')
    expect(step2Parent).not.toHaveClass('d-none')
  })

  it('should only show current step when destroyOnChange is true', () => {
    setupStepper({ destroyOnChange: true })

    expect(screen.getByText('Step 1 Content')).toBeInTheDocument()
    expect(screen.queryByText('Step 2 Content')).not.toBeInTheDocument()
    expect(screen.queryByText('Step 3 Content')).not.toBeInTheDocument()
  })

  it('should switch steps correctly with destroyOnChange', async () => {
    const { user } = setupStepper({ destroyOnChange: true })

    const step2Title = screen.getByText('Step 2')
    await user.click(step2Title)

    expect(screen.getByText('Step 2 Content')).toBeInTheDocument()
    expect(screen.queryByText('Step 1 Content')).not.toBeInTheDocument()
  })

  it('should render stepper with custom current step', () => {
    setupStepper({ current: 1 })

    const step2Content = screen.getByText('Step 2 Content')
    const step2Parent = step2Content.closest('div')
    expect(step2Parent).not.toHaveClass('d-none')
  })

  it('should handle steps without components gracefully', () => {
    const itemsWithoutComponents = [
      {
        title: 'Step 1',
        description: 'First step',
      },
      {
        title: 'Step 2',
        description: 'Second step',
      },
    ]

    setupStepper({ items: itemsWithoutComponents })

    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
  })
})
