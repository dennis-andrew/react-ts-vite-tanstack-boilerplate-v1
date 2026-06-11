import React from 'react'
import Switch, { SwitchProps } from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen, waitFor } from '@testing-library/react'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { vi } from 'vitest'
import * as Yup from 'yup'
import Button from 'src/shared/components/Button'
const { getByRole, getByText } = screen

// Constants
const FIELD_NAME = 'active'

// Mock Data
const mockInitialValues = { active: false }
const mockOnSubmit = vi.fn()
const mockOnChange = vi.fn()

// Mock Form Props
const mockFormProps = {
  defaultValues: mockInitialValues,
  onSubmit: mockOnSubmit,
}

// Setup function for standalone Switch
const setupStandaloneSwitch = (props?: SwitchProps) => {
  const renderResult = customRender(
    <Switch onChange={mockOnChange} {...props} />,
    { withRouter: false, withContext: false },
  )

  return {
    ...renderResult,
    switchField: getByRole(DOM_ELEMENT_ROLE.SWITCH),
  }
}

// Setup function for Switch with Form
const setupSwitchWithForm = (props?: Omit<SwitchProps, 'name'>) => {
  const renderResult = customRender(
    <Switch.Formik name={FIELD_NAME} {...props} />,
    {
      withForm: true,
      formProps: mockFormProps,
      withRouter: false,
      withContext: false,
    },
  )

  return {
    ...renderResult,
    switchField: getByRole(DOM_ELEMENT_ROLE.SWITCH),
  }
}

describe('<Switch />', () => {
  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('Should render standalone switch', () => {
    const { switchField } = setupStandaloneSwitch()

    expect(switchField).toBeInTheDocument()
  })

  it('Should call onChange when standalone switch is clicked', async () => {
    const mockChangeHandler = vi.fn()
    const { user, switchField } = setupStandaloneSwitch({
      onChange: mockChangeHandler,
    })

    await user.click(switchField)

    expect(mockChangeHandler).toHaveBeenCalledTimes(1)
  })
})

describe('<Switch.Formik />', () => {
  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('Should onChange when clicked', async () => {
    const mockChangeHandler = vi.fn()
    const { user, switchField } = setupSwitchWithForm({
      onChange: mockChangeHandler,
    })

    await user.click(switchField)

    expect(mockChangeHandler).toHaveBeenCalledTimes(1)
  })

  it('Should be toggled Off if checked is false', () => {
    const { switchField } = setupSwitchWithForm({ checked: false })

    expect(switchField).not.toBeChecked()
  })

  it('Should be toggled On if checked is true', () => {
    const { switchField } = setupSwitchWithForm({ checked: true })

    expect(switchField).toBeChecked()
  })

  it('Should be toggled Off when field value is false', () => {
    const mockFormPropsWithFalseValue = {
      defaultValues: { active: false },
      onSubmit: mockOnSubmit,
    }

    customRender(<Switch.Formik name={FIELD_NAME} />, {
      withForm: true,
      formProps: mockFormPropsWithFalseValue,
      withRouter: false,
      withContext: false,
    })

    const switchField = getByRole(DOM_ELEMENT_ROLE.SWITCH)

    expect(switchField).not.toBeChecked()
  })

  it('Should be toggled On when field value is true', () => {
    const mockFormPropsWithTrueValue = {
      defaultValues: { active: true },
      onSubmit: mockOnSubmit,
    }

    customRender(<Switch.Formik name={FIELD_NAME} />, {
      withForm: true,
      formProps: mockFormPropsWithTrueValue,
      withRouter: false,
      withContext: false,
    })

    const switchField = getByRole(DOM_ELEMENT_ROLE.SWITCH)

    expect(switchField).toBeChecked()
  })

  it('Should show error when validation fails', async () => {
    const VALIDATION_MESSAGE = 'Active is a required field'
    const mockValidationSchema = Yup.object().shape({
      active: Yup.boolean().oneOf([true], 'Active is a required field'),
    })

    const mockFormPropsWithValidation = {
      defaultValues: mockInitialValues,
      validationSchema: mockValidationSchema,
      onSubmit: mockOnSubmit,
    }

    const { user } = customRender(
      <>
        <Switch.Formik name={FIELD_NAME} />
        <Button htmlType="submit">Submit</Button>
      </>,
      {
        withForm: true,
        formProps: mockFormPropsWithValidation,
        withRouter: false,
        withContext: false,
      },
    )

    const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, { name: 'Submit' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(getByText(new RegExp(VALIDATION_MESSAGE, 'i'))).toBeInTheDocument()
    })
  })

  it('Should not show error when there is no validation error', () => {
    const mockFormPropsNoError = {
      defaultValues: { active: true },
      onSubmit: mockOnSubmit,
    }

    const { container } = customRender(<Switch.Formik name={FIELD_NAME} />, {
      withForm: true,
      formProps: mockFormPropsNoError,
      withRouter: false,
      withContext: false,
    })

    const errorElement = container.querySelector('.error-message')
    expect(errorElement).not.toBeInTheDocument()
  })
})
