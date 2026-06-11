import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import Form from '.'
import InputField from 'src/shared/components/InputField'
import Button from 'src/shared/components/Button'
import { customRender } from 'src/shared/utils/tests.utils'
import * as Yup from 'yup'
import { INPUT_TYPE } from 'src/enums/inputType'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { ValidationMode } from 'src/enums/validationMode'
import { vi } from 'vitest'
import { UseFormReturn } from 'react-hook-form'
const { getByRole, getByText, queryByText } = screen

// Constants
const FIELD_NAMES = {
  EMAIL: 'email',
  PASSWORD: 'password',
  USERNAME: 'username',
}

const BUTTON_TEXT = {
  SUBMIT: 'Submit',
  RESET: 'Reset',
}

const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email is a required field',
  EMAIL_INVALID: 'Email must be a valid email',
  PASSWORD_REQUIRED: 'Password is a required field',
  PASSWORD_MIN: 'Password must be at least 6 characters',
}

const PLACEHOLDER_TEXT = {
  EMAIL: 'Enter Email',
  PASSWORD: 'Enter Password',
  USERNAME: 'Enter Username',
}

const DEFAULT_VALUES = {
  email: '',
  password: '',
  username: '',
}

const VALID_VALUES = {
  email: 'test@example.com',
  password: 'password123',
  username: 'testuser',
}

interface FormData {
  email: string
  password: string
  username?: string
}

// Mock Functions
const mockOnSubmit = vi.fn()
const mockOnError = vi.fn()

// Validation Schema
const mockValidationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(6).required().label('Password'),
})

// Setup Functions
const setupBasicForm = (formProps = {}) => {
  const renderResult = customRender(
    <Form
      defaultValues={DEFAULT_VALUES}
      validationSchema={mockValidationSchema}
      onSubmit={mockOnSubmit}
      {...formProps}
    >
      {() => (
        <>
          <InputField
            name={FIELD_NAMES.EMAIL}
            type={INPUT_TYPE.EMAIL}
            placeholder={PLACEHOLDER_TEXT.EMAIL}
          />
          <InputField
            name={FIELD_NAMES.PASSWORD}
            type={INPUT_TYPE.PASSWORD}
            placeholder={PLACEHOLDER_TEXT.PASSWORD}
          />
          <Button htmlType="submit">{BUTTON_TEXT.SUBMIT}</Button>
        </>
      )}
    </Form>,
    { withRouter: true, withContext: true },
  )

  const emailInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT.EMAIL)
  const passwordInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT.PASSWORD)
  const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, {
    name: BUTTON_TEXT.SUBMIT,
  })

  return {
    ...renderResult,
    emailInput,
    passwordInput,
    submitButton,
  }
}

const setupFormWithMethods = () => {
  let capturedMethods: UseFormReturn<FormData> | null = null

  const renderResult = customRender(
    <Form
      defaultValues={DEFAULT_VALUES}
      validationSchema={mockValidationSchema}
      onSubmit={mockOnSubmit}
    >
      {(methods) => {
        capturedMethods = methods
        return (
          <>
            <InputField
              name={FIELD_NAMES.EMAIL}
              type={INPUT_TYPE.EMAIL}
              placeholder={PLACEHOLDER_TEXT.EMAIL}
            />
            <Button htmlType="submit">{BUTTON_TEXT.SUBMIT}</Button>
            <Button htmlType="button" clickHandler={() => methods.reset()}>
              {BUTTON_TEXT.RESET}
            </Button>
          </>
        )
      }}
    </Form>,
    { withRouter: true, withContext: true },
  )

  return {
    ...renderResult,
    methods: capturedMethods!,
  }
}

describe('<Form />', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear()
    mockOnError.mockClear()
  })

  describe('Rendering and Initialization', () => {
    it('should render form with default values', () => {
      const { emailInput, passwordInput } = setupBasicForm()

      expect(emailInput).toHaveValue('')
      expect(passwordInput).toHaveValue('')
    })

    it('should render form with provided default values', () => {
      const customDefaults = {
        email: 'default@example.com',
        password: 'default123',
      }

      const { emailInput, passwordInput } = setupBasicForm({
        defaultValues: customDefaults,
      })

      expect(emailInput).toHaveValue(customDefaults.email)
      expect(passwordInput).toHaveValue(customDefaults.password)
    })

    it('should pass form methods to children function', () => {
      const { methods } = setupFormWithMethods()

      expect(methods).toBeDefined()
      expect(methods.handleSubmit).toBeDefined()
      expect(methods.reset).toBeDefined()
      expect(methods.setValue).toBeDefined()
      expect(methods.getValues).toBeDefined()
      expect(methods.formState).toBeDefined()
    })
  })

  describe('Field Alterations', () => {
    it('should update field value on user input', async () => {
      const { user, emailInput } = setupBasicForm()

      await user.type(emailInput, VALID_VALUES.email)

      expect(emailInput).toHaveValue(VALID_VALUES.email)
    })

    it('should update multiple fields independently', async () => {
      const { user, emailInput, passwordInput } = setupBasicForm()

      await user.type(emailInput, VALID_VALUES.email)
      await user.type(passwordInput, VALID_VALUES.password)

      expect(emailInput).toHaveValue(VALID_VALUES.email)
      expect(passwordInput).toHaveValue(VALID_VALUES.password)
    })

    it('should clear field value when user clears input', async () => {
      const { user, emailInput } = setupBasicForm()

      await user.type(emailInput, VALID_VALUES.email)
      await user.clear(emailInput)

      expect(emailInput).toHaveValue('')
    })
  })

  describe('Form Submission', () => {
    it('should call onSubmit with form values when validation passes', async () => {
      const { user, emailInput, passwordInput, submitButton } = setupBasicForm()

      await user.type(emailInput, VALID_VALUES.email)
      await user.type(passwordInput, VALID_VALUES.password)
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            email: VALID_VALUES.email,
            password: VALID_VALUES.password,
          }),
          expect.anything(),
        )
      })
    })

    it('should not call onSubmit when validation fails', async () => {
      const { user, emailInput, submitButton } = setupBasicForm()

      await user.type(emailInput, 'invalid-email')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled()
      })
    })

    it('should submit form with only filled fields', async () => {
      const partialSchema = Yup.object().shape({
        email: Yup.string().email().required(),
      })

      const { user, emailInput, submitButton } = setupBasicForm({
        validationSchema: partialSchema,
      })

      await user.type(emailInput, VALID_VALUES.email)
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            email: VALID_VALUES.email,
          }),
          expect.anything(),
        )
      })
    })
  })

  describe('Validation - onBlur mode (default)', () => {
    it('should not show validation errors on initial render', () => {
      setupBasicForm()

      expect(queryByText(VALIDATION_MESSAGES.EMAIL_REQUIRED)).toBeNull()
      expect(queryByText(VALIDATION_MESSAGES.PASSWORD_REQUIRED)).toBeNull()
    })

    it('should show validation error when field is touched and empty', async () => {
      const { user, emailInput } = setupBasicForm()

      await user.click(emailInput)
      await user.tab()

      await waitFor(() => {
        expect(
          getByText(new RegExp(VALIDATION_MESSAGES.EMAIL_REQUIRED, 'i')),
        ).toBeInTheDocument()
      })
    })

    it('should show validation error when field value is invalid', async () => {
      const { user, emailInput } = setupBasicForm()

      await user.type(emailInput, 'invalid-email')
      await user.tab()

      await waitFor(() => {
        expect(
          getByText(new RegExp(VALIDATION_MESSAGES.EMAIL_INVALID, 'i')),
        ).toBeInTheDocument()
      })
    })

    it('should clear validation error when field becomes valid', async () => {
      const { user, emailInput } = setupBasicForm()

      await user.type(emailInput, 'invalid')
      await user.tab()

      await waitFor(() => {
        expect(
          getByText(new RegExp(VALIDATION_MESSAGES.EMAIL_INVALID, 'i')),
        ).toBeInTheDocument()
      })

      await user.clear(emailInput)
      await user.type(emailInput, VALID_VALUES.email)
      await user.tab()

      await waitFor(() => {
        expect(
          queryByText(new RegExp(VALIDATION_MESSAGES.EMAIL_INVALID, 'i')),
        ).toBeNull()
      })
    })

    it('should validate min length constraint', async () => {
      const { user, passwordInput } = setupBasicForm()

      await user.type(passwordInput, '123')
      await user.tab()

      await waitFor(() => {
        expect(
          getByText(new RegExp(VALIDATION_MESSAGES.PASSWORD_MIN, 'i')),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Validation - onChange mode', () => {
    it('should show validation errors on change when mode is onChange', async () => {
      const { user, emailInput } = setupBasicForm({
        mode: ValidationMode.onChange,
      })

      await user.type(emailInput, 'a')

      await waitFor(() => {
        expect(
          getByText(new RegExp(VALIDATION_MESSAGES.EMAIL_INVALID, 'i')),
        ).toBeInTheDocument()
      })
    })

    it('should update validation errors immediately on field change', async () => {
      const { user, passwordInput } = setupBasicForm({
        mode: ValidationMode.onChange,
      })

      await user.type(passwordInput, '12')

      await waitFor(() => {
        expect(
          getByText(new RegExp(VALIDATION_MESSAGES.PASSWORD_MIN, 'i')),
        ).toBeInTheDocument()
      })

      await user.type(passwordInput, '3456')

      await waitFor(() => {
        expect(
          queryByText(new RegExp(VALIDATION_MESSAGES.PASSWORD_MIN, 'i')),
        ).toBeNull()
      })
    })
  })

  describe('Error Handling', () => {
    it('should call onError handler when validation fails on submit', async () => {
      const { user, submitButton } = setupBasicForm({
        onError: mockOnError,
      })

      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledTimes(1)
        expect(mockOnError).toHaveBeenCalledWith(
          expect.objectContaining({
            email: expect.any(Object),
            password: expect.any(Object),
          }),
          expect.anything(),
        )
      })
    })

    it('should not call onError when validation passes', async () => {
      const { user, emailInput, passwordInput, submitButton } = setupBasicForm({
        onError: mockOnError,
      })

      await user.type(emailInput, VALID_VALUES.email)
      await user.type(passwordInput, VALID_VALUES.password)
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled()
        expect(mockOnError).not.toHaveBeenCalled()
      })
    })

    it('should show multiple validation errors for multiple fields', async () => {
      const { user, submitButton } = setupBasicForm()

      await user.click(submitButton)

      await waitFor(() => {
        expect(
          getByText(new RegExp(VALIDATION_MESSAGES.EMAIL_REQUIRED, 'i')),
        ).toBeInTheDocument()
        // Password field shows min length error when empty due to Yup validation order
        expect(
          getByText(new RegExp(VALIDATION_MESSAGES.PASSWORD_MIN, 'i')),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Form Methods', () => {
    it('should reset form to default values when reset is called', async () => {
      const { user } = setupFormWithMethods()
      const emailInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT.EMAIL)
      const resetButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, {
        name: BUTTON_TEXT.RESET,
      })

      await user.type(emailInput, VALID_VALUES.email)
      expect(emailInput).toHaveValue(VALID_VALUES.email)

      await user.click(resetButton)

      await waitFor(() => {
        expect(emailInput).toHaveValue('')
      })
    })

    it('should provide getValues method that returns current form values', async () => {
      const { user, methods } = setupFormWithMethods()
      const emailInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT.EMAIL)

      await user.type(emailInput, VALID_VALUES.email)

      const values = methods.getValues()
      expect(values.email).toBe(VALID_VALUES.email)
    })

    it('should provide setValue method to programmatically set field values', async () => {
      const { methods } = setupFormWithMethods()
      const emailInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT.EMAIL)

      methods.setValue(FIELD_NAMES.EMAIL as keyof FormData, VALID_VALUES.email)

      await waitFor(() => {
        expect(emailInput).toHaveValue(VALID_VALUES.email)
      })
    })
  })

  describe('Custom Resolver', () => {
    it('should use custom resolver when provided', async () => {
      const customResolver = vi.fn((data: FormData) => {
        const errors: Record<string, { type: string; message: string }> = {}
        if (!data.email.includes('@custom.com')) {
          errors.email = {
            type: 'custom',
            message: 'Email must be from custom.com domain',
          }
        }
        return {
          values: data,
          errors: Object.keys(errors).length > 0 ? errors : {},
        }
      })

      const { user, emailInput, submitButton } = setupBasicForm({
        resolver: customResolver,
        validationSchema: undefined,
      })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(customResolver).toHaveBeenCalled()
        expect(
          getByText(/Email must be from custom.com domain/i),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Controlled Form with values prop', () => {
    it('should use controlled values when values prop is provided', () => {
      const controlledValues = {
        email: 'controlled@example.com',
        password: 'controlled123',
      }

      const { emailInput, passwordInput } = setupBasicForm({
        values: controlledValues,
      })

      expect(emailInput).toHaveValue(controlledValues.email)
      expect(passwordInput).toHaveValue(controlledValues.password)
    })
  })

  describe('Form without onSubmit', () => {
    it('should render form without errors when onSubmit is not provided', () => {
      customRender(
        <Form defaultValues={DEFAULT_VALUES}>
          {() => (
            <>
              <InputField
                name={FIELD_NAMES.EMAIL}
                type={INPUT_TYPE.EMAIL}
                placeholder={PLACEHOLDER_TEXT.EMAIL}
              />
            </>
          )}
        </Form>,
        { withRouter: true, withContext: true },
      )

      const emailInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT.EMAIL)

      expect(emailInput).toBeInTheDocument()
    })
  })
})
