import React from 'react'
import Checkbox from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { vi } from 'vitest'
// Constants
const CHECKBOX_LABEL = 'Accept Terms'
const CHECKBOX_OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

// Mock Functions
const mockOnChange = vi.fn()

// Setup Functions
const setupSingleCheckbox = (props = {}) => {
  const renderResult = customRender(
    <Checkbox onChange={mockOnChange} {...props}>
      {CHECKBOX_LABEL}
    </Checkbox>,
    { withRouter: false, withContext: false },
  )

  return {
    ...renderResult,
    checkbox: screen.getByRole(DOM_ELEMENT_ROLE.CHECKBOX),
  }
}

const setupCheckboxGroup = (props = {}) => {
  const renderResult = customRender(
    <Checkbox
      group
      options={CHECKBOX_OPTIONS}
      onChange={mockOnChange}
      {...props}
    />,
    { withRouter: false, withContext: false },
  )

  return {
    ...renderResult,
    checkboxes: screen.getAllByRole(DOM_ELEMENT_ROLE.CHECKBOX),
  }
}

describe('<Checkbox />', () => {
  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('should render single checkbox with label', () => {
    setupSingleCheckbox()

    expect(screen.getByText(CHECKBOX_LABEL)).toBeInTheDocument()
  })

  it('should call onChange when single checkbox is clicked', async () => {
    const { user, checkbox } = setupSingleCheckbox()

    await user.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should render single checkbox as checked', () => {
    const { checkbox } = setupSingleCheckbox({ checked: true })

    expect(checkbox).toBeChecked()
  })

  it('should render single checkbox as unchecked', () => {
    const { checkbox } = setupSingleCheckbox({ checked: false })

    expect(checkbox).not.toBeChecked()
  })

  it('should render single checkbox with defaultChecked', () => {
    const { checkbox } = setupSingleCheckbox({ defaultChecked: true })

    expect(checkbox).toBeChecked()
  })

  it('should render single checkbox as disabled', () => {
    const { checkbox } = setupSingleCheckbox({ disabled: true })

    expect(checkbox).toBeDisabled()
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('should render single checkbox as indeterminate', () => {
    const { container } = setupSingleCheckbox({ indeterminate: true })

    const indeterminateCheckbox = container.querySelector(
      '.ant-checkbox-indeterminate',
    )
    expect(indeterminateCheckbox).toBeInTheDocument()
  })

  it('should render checkbox group with multiple options', () => {
    const { checkboxes } = setupCheckboxGroup()

    expect(checkboxes.length).toBe(CHECKBOX_OPTIONS.length)
  })

  it('should call onChange when checkbox group option is clicked', async () => {
    const { user, checkboxes } = setupCheckboxGroup()

    await user.click(checkboxes[0])

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(['1'])
  })

  it('should handle multiple selections in checkbox group', async () => {
    const { user, checkboxes } = setupCheckboxGroup()

    await user.click(checkboxes[0])
    await user.click(checkboxes[1])

    expect(mockOnChange).toHaveBeenCalledTimes(2)
  })

  it('should render all labels in checkbox group', () => {
    setupCheckboxGroup()

    CHECKBOX_OPTIONS.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })
})
