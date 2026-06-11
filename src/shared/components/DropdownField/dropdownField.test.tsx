import React from 'react'
import { customRender } from 'src/shared/utils/tests.utils'
import Dropdown from '.'
import { getQueriesForElement, screen, waitFor } from '@testing-library/react'
import { Gender } from 'src/enums/genders.enum'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { DOM_ELEMENT_ATTRIBUTE } from 'src/enums/domElementAttribute'
import { vi } from 'vitest'
import * as Yup from 'yup'
import Button from 'src/shared/components/Button'
const { getByText, getByRole, getByTitle, queryByText } = screen

// Constants
const FIELD_NAME = 'gender'
const TITLE_TEXT = 'Gender'

// Mock Data
const mockGenderOptions = [
  { label: 'Male', value: Gender.MALE },
  { label: 'Female', value: Gender.FEMALE },
]

const mockInitialValues = { gender: '' }
const mockOnSubmit = vi.fn()

// Mock Form Props
const mockFormProps = {
  defaultValues: mockInitialValues,
  onSubmit: mockOnSubmit,
}

// Setup function for standalone Dropdown tests
const setupStandaloneDropdown = (props = {}) => {
  const renderResult = customRender(
    <Dropdown name={FIELD_NAME} options={mockGenderOptions} {...props} />,
    { withRouter: false, withContext: false },
  )

  return {
    ...renderResult,
    dropdown: getByRole(DOM_ELEMENT_ROLE.COMBOBOX) as HTMLInputElement,
  }
}

describe('<Dropdown />', () => {
  it('Should Render Title if passed as prop', () => {
    customRender(<Dropdown name={FIELD_NAME} title={TITLE_TEXT} />, {
      withRouter: false,
      withContext: false,
    })

    expect(getByText(TITLE_TEXT)).toBeInTheDocument()
  })

  it('Should not Render Title if not passed', () => {
    const { container } = customRender(<Dropdown name={FIELD_NAME} />, {
      withRouter: false,
      withContext: false,
    })

    expect(
      container.getElementsByClassName('dropdown-field__title').length,
    ).toBeFalsy()
  })

  it('Should Render Selected Option', async () => {
    const { user, dropdown } = setupStandaloneDropdown()

    // Open Dropdown Menu
    await user.click(dropdown)

    // Get Male Option
    const maleOption = getByTitle('Male') as HTMLOptionElement
    const options = getByRole(DOM_ELEMENT_ROLE.LISTBOX)

    // Click Male Option
    await user.click(maleOption)

    expect(
      Array.from(options.children).filter(
        (elem) =>
          elem.getAttribute(DOM_ELEMENT_ATTRIBUTE.ARIA_SELECTED) === 'true',
      ).length,
    ).toBe(1)
  })

  it('Should Render no value if no option is selected', async () => {
    const { user, dropdown } = setupStandaloneDropdown()

    // Open Dropdown Menu
    await user.click(dropdown)

    const options = getByRole(DOM_ELEMENT_ROLE.LISTBOX)

    // Move from dropdown without selecting any option
    await user.tab()

    expect(
      Array.from(options.children).filter(
        (elem) =>
          elem.getAttribute(DOM_ELEMENT_ATTRIBUTE.ARIA_SELECTED) === 'true',
      ).length,
    ).toBe(0)
  })
})

// Setup function for Dropdown with Form
const setupDropdownWithForm = () => {
  const renderResult = customRender(
    <Dropdown.Formik name={FIELD_NAME} options={mockGenderOptions} />,
    {
      withForm: true,
      formProps: mockFormProps,
      withRouter: false,
      withContext: false,
    },
  )

  return {
    ...renderResult,
    dropdown: getByRole(DOM_ELEMENT_ROLE.COMBOBOX) as HTMLInputElement,
  }
}

describe('<Dropdown.Formik />', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('Should Render Selected Option with Form onChange', async () => {
    const { user, dropdown, baseElement } = setupDropdownWithForm()

    // Open Dropdown Menu
    await user.click(dropdown)

    // Get Female Option
    const femaleOption = getByTitle('Female') as HTMLOptionElement

    // Click Female Option
    await user.click(femaleOption)

    const selectedOption =
      getQueriesForElement(baseElement).getByLabelText('Female')

    expect(
      selectedOption.getAttribute(DOM_ELEMENT_ATTRIBUTE.ARIA_SELECTED),
    ).toBe('true')
  })

  it('Should Render no value If no option selected with Form onChange', async () => {
    const { user, dropdown } = setupDropdownWithForm()

    // Open Dropdown Menu
    await user.click(dropdown)

    // Move from Dropdown without selecting any option
    await user.tab()

    const options = getByRole(DOM_ELEMENT_ROLE.LISTBOX)

    expect(
      Array.from(options.children).filter(
        (elem) =>
          elem.getAttribute(DOM_ELEMENT_ATTRIBUTE.ARIA_SELECTED) === 'true',
      ).length,
    ).toBe(0)
  })

  it('Should show error when validation fails', async () => {
    const VALIDATION_MESSAGE = 'Gender is a required field'
    const mockValidationSchema = Yup.object().shape({
      gender: Yup.string().required().label('Gender'),
    })

    const mockFormPropsWithValidation = {
      defaultValues: mockInitialValues,
      validationSchema: mockValidationSchema,
      onSubmit: mockOnSubmit,
    }

    const { user } = customRender(
      <>
        <Dropdown.Formik name={FIELD_NAME} options={mockGenderOptions} />
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

  it('Should not show error when validation passes', async () => {
    const VALIDATION_MESSAGE = 'Gender is a required field'
    const mockValidationSchema = Yup.object().shape({
      gender: Yup.string().required().label('Gender'),
    })

    const mockFormPropsWithValidation = {
      defaultValues: mockInitialValues,
      validationSchema: mockValidationSchema,
      onSubmit: mockOnSubmit,
    }

    const { user } = customRender(
      <>
        <Dropdown.Formik name={FIELD_NAME} options={mockGenderOptions} />
        <Button htmlType="submit">Submit</Button>
      </>,
      {
        withForm: true,
        formProps: mockFormPropsWithValidation,
        withRouter: false,
        withContext: false,
      },
    )

    const dropdown = getByRole(DOM_ELEMENT_ROLE.COMBOBOX) as HTMLInputElement
    await user.click(dropdown)

    const maleOption = getByTitle('Male') as HTMLOptionElement
    await user.click(maleOption)

    const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, { name: 'Submit' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })

    expect(
      queryByText(new RegExp(VALIDATION_MESSAGE, 'i')),
    ).not.toBeInTheDocument()
  })
})
