import React, { ComponentProps } from 'react'
import DatePicker from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen, waitFor } from '@testing-library/react'
import * as Yup from 'yup'
import Button from 'src/shared/components/Button'
import dayjs from 'dayjs'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { SharedComponentsConstants } from 'src/constants/sharedComponents'
import { vi } from 'vitest'
const { getByText, getByRole, queryByText } = screen

// Constants
const FIELD_NAME = 'startDate'
const TITLE_TEXT = 'Start Date'
const SUBMIT_BUTTON_TEXT = 'Add'
const TEST_DATE = '2023-02-02'

const VALIDATION_MESSAGES = {
  REQUIRED: 'Start Date is a required Field',
}

// Mock Data
const mockInitialValues = { startDate: null }
const mockValidationSchema = Yup.object().shape({
  startDate: Yup.string().nullable().required().label('Start Date'),
})
const mockOnSubmit = vi.fn()

// Mock Form Props
const mockFormProps = {
  defaultValues: mockInitialValues,
  validationSchema: mockValidationSchema,
  onSubmit: mockOnSubmit,
}

// Setup function for standalone DatePicker tests
const setupStandaloneDatePicker = (props = {}) => {
  const renderResult = customRender(
    <DatePicker name={FIELD_NAME} {...props} />,
    { withRouter: false, withContext: false },
  )

  return {
    ...renderResult,
    dateField: getByRole(DOM_ELEMENT_ROLE.TEXT_BOX),
  }
}

// Setup function for DatePicker with Form
const setupDatePickerWithForm = (
  props?: ComponentProps<typeof DatePicker.Formik>,
) => {
  const renderResult = customRender(
    <>
      <DatePicker.Formik name={FIELD_NAME} {...props} />
      <Button htmlType="submit">{SUBMIT_BUTTON_TEXT}</Button>
    </>,
    {
      withForm: true,
      formProps: mockFormProps,
      withRouter: false,
      withContext: false,
    },
  )

  return {
    ...renderResult,
    dateField: getByRole(DOM_ELEMENT_ROLE.TEXT_BOX),
    submitButton: getByRole(DOM_ELEMENT_ROLE.BUTTON, {
      name: SUBMIT_BUTTON_TEXT,
    }),
  }
}

describe('<DatePicker />', () => {
  it('Should Render Title if passed as prop', () => {
    customRender(<DatePicker name={FIELD_NAME} title={TITLE_TEXT} />, {
      withRouter: false,
      withContext: false,
    })

    expect(getByText(TITLE_TEXT)).toBeInTheDocument()
  })

  it('Should not Render Title if not passed', () => {
    const { container } = customRender(<DatePicker name={FIELD_NAME} />, {
      withRouter: false,
      withContext: false,
    })

    expect(
      container.getElementsByClassName('dropdown-field__title').length,
    ).toBeFalsy()
  })

  it('Should Render Selected Date', async () => {
    const { user, dateField } = setupStandaloneDatePicker()

    await user.type(dateField, TEST_DATE)

    expect(dateField).toHaveValue(TEST_DATE)
  })

  it('Should Render Today When Today Button is Clicked', async () => {
    const { user, dateField } = setupStandaloneDatePicker()
    const selectedDate = dayjs().format(SharedComponentsConstants.DATE_FORMAT)

    await user.click(dateField)
    const today = getByText(/today/i)

    await user.click(today)

    expect(dateField).toHaveValue(selectedDate)
  })
})

describe('<DatePicker.Formik />', () => {
  it('Should Show Error when validation Fails', async () => {
    const { user, submitButton } = setupDatePickerWithForm()

    await user.click(submitButton)

    await waitFor(() => {
      expect(
        getByText(new RegExp(VALIDATION_MESSAGES.REQUIRED, 'i')),
      ).toBeInTheDocument()
    })
  })

  it.each([[VALIDATION_MESSAGES.REQUIRED]])(
    'Should not show any errors when Form Loads',
    (errorMessage) => {
      setupDatePickerWithForm()
      expect(queryByText(errorMessage)).toBeNull()
    },
  )

  it.each([[VALIDATION_MESSAGES.REQUIRED]])(
    'Should not Show Error when validation pass',
    async (errorMessage) => {
      const { user, dateField, submitButton } = setupDatePickerWithForm()

      await user.click(dateField)
      const today = getByText(/today/i)

      await user.click(today!)
      await user.click(submitButton)

      expect(queryByText(errorMessage)).not.toBeInTheDocument()
    },
  )

  it('Should render DatePicker with existing date value', async () => {
    const mockFormPropsWithValue = {
      defaultValues: { startDate: TEST_DATE },
      validationSchema: mockValidationSchema,
      onSubmit: mockOnSubmit,
    }

    customRender(
      <>
        <DatePicker.Formik name={FIELD_NAME} />
        <Button htmlType="submit">{SUBMIT_BUTTON_TEXT}</Button>
      </>,
      {
        withForm: true,
        formProps: mockFormPropsWithValue,
        withRouter: false,
        withContext: false,
      },
    )

    const dateField = getByRole(DOM_ELEMENT_ROLE.TEXT_BOX)

    expect(dateField).toHaveValue(TEST_DATE)
  })
})
