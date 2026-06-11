import { ComponentProps } from 'react'
import OTPField, { OTPFieldProps } from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen, waitFor } from '@testing-library/react'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { vi } from 'vitest'
import * as Yup from 'yup'
import Button from 'src/shared/components/Button'

const { getAllByRole, getByText, getByRole } = screen

// Constants
const FIELD_NAME = 'otp'
const DEFAULT_NUM_INPUTS = 6
const TEST_NUM_INPUTS = 3

// Mock Data
const mockInitialValues = { otp: '' }
const mockOnSubmit = vi.fn()
const mockOnChange = vi.fn()

// Mock Form Props
const mockFormProps = {
  defaultValues: mockInitialValues,
  onSubmit: mockOnSubmit,
}

// Helper function to generate OTP string
const generateOTP = (length: number) =>
  Array.from({ length }, (_, i) => i + 1).join('')

// Setup function for standalone OTPField
const setupStandaloneOTP = (props = {}) => {
  const renderResult = customRender(
    <OTPField onChange={mockOnChange} {...props} />,
    { withRouter: false, withContext: false },
  )

  return {
    ...renderResult,
    inputFields: getAllByRole(DOM_ELEMENT_ROLE.TEXT_BOX),
  }
}

// Setup function for OTPField with Form
const setupOTPWithForm = (
  props?: Omit<ComponentProps<typeof OTPField.Formik>, 'name'>,
) => {
  const renderResult = customRender(
    <OTPField.Formik name={FIELD_NAME} {...props} />,
    {
      withForm: true,
      formProps: mockFormProps,
      withRouter: false,
      withContext: false,
    },
  )

  return {
    ...renderResult,
    inputFields: getAllByRole(DOM_ELEMENT_ROLE.TEXT_BOX),
  }
}

describe('<OtpField />', () => {
  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('Should render 6 number fields by default', () => {
    const { inputFields } = setupStandaloneOTP()

    expect(inputFields.length).toBe(DEFAULT_NUM_INPUTS)
  })

  it('Should render n number fields if n is passed as numsInput prop', () => {
    const { inputFields } = setupStandaloneOTP({ numInputs: TEST_NUM_INPUTS })

    expect(inputFields.length).toBe(TEST_NUM_INPUTS)
  })

  it('Should Call onChange n times based on n typed Characters', async () => {
    const mockedChangeHandler = vi.fn()
    const otp = generateOTP(TEST_NUM_INPUTS)

    const { user, inputFields } = setupStandaloneOTP({
      numInputs: TEST_NUM_INPUTS,
      onChange: mockedChangeHandler,
    })

    for (let i = 0; i < TEST_NUM_INPUTS; i++)
      await user.type(inputFields[i], otp.charAt(i))

    expect(mockedChangeHandler).toHaveBeenCalledTimes(TEST_NUM_INPUTS)
  })

  it('Should Call onChange with Typed Value', async () => {
    const mockedChangeHandler = vi.fn()
    const otp = generateOTP(TEST_NUM_INPUTS)

    const { user, inputFields } = setupStandaloneOTP({
      numInputs: TEST_NUM_INPUTS,
      onChange: mockedChangeHandler,
    })

    for (let i = 0; i < TEST_NUM_INPUTS; i++)
      await user.type(inputFields[i], otp.charAt(i))

    for (let i = 0; i < TEST_NUM_INPUTS; i++)
      expect(mockedChangeHandler).toHaveBeenNthCalledWith(i + 1, otp.charAt(i))
  })
})

describe('<OtpField.Formik />', () => {
  it('Should Render Typed Value', async () => {
    const otp = generateOTP(TEST_NUM_INPUTS)
    const { user, inputFields } = setupOTPWithForm()

    for (let i = 0; i < TEST_NUM_INPUTS; i++)
      await user.type(inputFields[i], otp.charAt(i))

    for (let i = 0; i < TEST_NUM_INPUTS; i++)
      expect(inputFields[i]).toHaveValue(otp.charAt(i))
  })

  it('Should show error when validation fails', async () => {
    const VALIDATION_MESSAGE = 'OTP is a required field'
    const mockValidationSchema = Yup.object().shape({
      otp: Yup.string().required().label('OTP'),
    })

    const mockFormPropsWithValidation = {
      defaultValues: mockInitialValues,
      validationSchema: mockValidationSchema,
      onSubmit: mockOnSubmit,
    }

    const { user } = customRender(
      <>
        <OTPField.Formik name={FIELD_NAME} numInputs={TEST_NUM_INPUTS} />
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

  it('Should render with custom renderInput prop', () => {
    const customRenderInput: OTPFieldProps['renderInput'] = (
      inputProps,
      index,
    ) => {
      return <input {...inputProps} data-index={index} />
    }

    const { getAllByTestId } = customRender(
      <OTPField
        onChange={mockOnChange}
        numInputs={TEST_NUM_INPUTS}
        renderInput={customRenderInput}
      />,
      { withRouter: false, withContext: false },
    )

    const customInputs = getAllByTestId('custom-input')

    expect(customInputs.length).toBe(TEST_NUM_INPUTS)
  })

  it('Should handle empty field value', () => {
    const { inputFields } = setupOTPWithForm({ numInputs: TEST_NUM_INPUTS })

    for (let i = 0; i < TEST_NUM_INPUTS; i++) {
      expect(inputFields[i]).toHaveValue('')
    }
  })
})
