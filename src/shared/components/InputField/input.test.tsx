import React from 'react'
import { screen } from '@testing-library/react'
import InputField from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import * as Yup from 'yup'
import { INPUT_TYPE } from 'src/enums/inputType'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { vi } from 'vitest'
const { getByRole, getByText, getByPlaceholderText, queryByText } = screen

// Constants
const FIELD_NAME = 'email'
const PLACEHOLDER_TEXT = 'Enter Email'

const VALIDATION_MESSAGES = {
  REQUIRED: 'Email is a required field',
  INVALID: 'Email must be a valid email',
}

// Mock Data
const mockDefaultValues = { email: '' }
const mockValidationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
})
const mockOnSubmit = vi.fn()

// Common setup function
const setup = () => {
  const renderResult = customRender(
    <InputField
      name={FIELD_NAME}
      type={INPUT_TYPE.EMAIL}
      placeholder={PLACEHOLDER_TEXT}
    />,
    {
      withForm: true,
      formProps: {
        defaultValues: mockDefaultValues,
        validationSchema: mockValidationSchema,
        onSubmit: mockOnSubmit,
      },
      withRouter: false,
      withContext: false,
    },
  )

  return {
    ...renderResult,
    input: getByRole(DOM_ELEMENT_ROLE.TEXT_BOX),
    placeholderInput: getByPlaceholderText(new RegExp(PLACEHOLDER_TEXT, 'i')),
  }
}

describe('<InputField />', () => {
  it.each([[VALIDATION_MESSAGES.INVALID], [VALIDATION_MESSAGES.REQUIRED]])(
    'Should not have any validation error when input loads',
    async (errorMessage) => {
      // Arrange
      setup()

      // Assert
      expect(queryByText(errorMessage)).toBeNull()
    },
  )

  it('Should have validation error when input is empty', async () => {
    // Arrange
    const { user, input } = setup()

    // Act - Simulate Blur Event
    await user.click(input)
    await user.click(document.body)

    // Assert
    expect(
      getByText(new RegExp(VALIDATION_MESSAGES.REQUIRED, 'i')),
    ).toBeInTheDocument()
  })

  it('Should have validation error when input value is invalid', async () => {
    // Arrange
    const { user, placeholderInput } = setup()

    // Act
    await user.type(placeholderInput, 'test')
    await user.click(document.body)

    // Assert
    expect(
      getByText(new RegExp(VALIDATION_MESSAGES.INVALID, 'i')),
    ).toBeInTheDocument()
  })

  it('Should not have validation error when input value is valid', async () => {
    // Arrange
    const { user, placeholderInput } = setup()

    // Act
    await user.type(placeholderInput, 'test@example.com')
    await user.click(document.body)

    // Assert
    expect(queryByText(new RegExp(VALIDATION_MESSAGES.INVALID, 'i'))).toBeNull()
    expect(
      queryByText(new RegExp(VALIDATION_MESSAGES.REQUIRED, 'i')),
    ).toBeNull()
  })
})
