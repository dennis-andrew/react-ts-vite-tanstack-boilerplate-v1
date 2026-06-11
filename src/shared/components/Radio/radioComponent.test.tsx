import React, { ComponentProps } from 'react'
import { customRender } from 'src/shared/utils/tests.utils'
import RadioButton from '.'
import { screen } from '@testing-library/react'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { vi } from 'vitest'
const { getByRole, getByText, getAllByRole } = screen

// Constants
const FIELD_NAME = 'framework'
const LABEL_TEXT = 'Category'

// Mock Data
const mockRadioOptions = [
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]

const mockInitialValues = { framework: '' }
const mockOnSubmit = vi.fn()

// Mock Form Props
const mockFormProps = {
  defaultValues: mockInitialValues,
  onSubmit: mockOnSubmit,
}

// Setup function for standalone RadioButton
const setupStandaloneRadio = (props = {}) => {
  const renderResult = customRender(
    <RadioButton name={FIELD_NAME} options={mockRadioOptions} {...props} />,
    { withRouter: false, withContext: false },
  )

  return {
    ...renderResult,
  }
}

// Setup function for RadioButton with Form
const setupRadioWithForm = (
  props?: Partial<ComponentProps<typeof RadioButton.Formik>>,
) => {
  const renderResult = customRender(
    <RadioButton.Formik
      name={FIELD_NAME}
      options={mockRadioOptions}
      {...props}
    />,
    {
      withForm: true,
      formProps: mockFormProps,
      withRouter: false,
      withContext: false,
    },
  )

  return {
    ...renderResult,
  }
}

describe('<RadioButton />', () => {
  it('Should not have label if not passed', () => {
    const { container } = setupStandaloneRadio()

    expect(
      container.querySelector('.radio-component__label'),
    ).not.toBeInTheDocument()
  })

  it('Should Render label if passed', () => {
    setupStandaloneRadio({ label: LABEL_TEXT })

    expect(getByText(LABEL_TEXT)).toBeInTheDocument()
  })

  it('Should Render only one Selected Option', async () => {
    const { user } = setupStandaloneRadio()

    const reactOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /react/i,
    })

    await user.click(reactOption)

    expect(
      getAllByRole(DOM_ELEMENT_ROLE.RADIO, {
        checked: true,
      }).length,
    ).toBe(1)
  })

  it('Should Render last Selected Option', async () => {
    const { user } = setupStandaloneRadio()

    const reactOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /react/i,
    })

    const angularOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /angular/i,
    })

    await user.click(reactOption)
    await user.click(angularOption)

    expect(angularOption).toBeChecked()
    expect(reactOption).not.toBeChecked()
  })

  it('Should Render the Selected Option', async () => {
    const { user } = setupStandaloneRadio()

    const reactOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /react/i,
    })

    await user.click(reactOption)

    expect(reactOption).toBeChecked()
  })
})

describe('<RadioButton.Formik />', () => {
  it('Should Render only last Selected Option', async () => {
    const { user } = setupRadioWithForm()

    const reactOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /react/i,
    })

    await user.click(reactOption)

    expect(
      getAllByRole(DOM_ELEMENT_ROLE.RADIO, {
        checked: true,
      }).length,
    ).toBe(1)
  })

  it('Should Render only one Selected Option', async () => {
    const { user } = setupRadioWithForm()

    const reactOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /react/i,
    })

    const angularOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /angular/i,
    })

    await user.click(angularOption)
    await user.click(reactOption)

    expect(
      getAllByRole(DOM_ELEMENT_ROLE.RADIO, {
        checked: true,
      }).length,
    ).toBe(1)
  })

  it('Should Render last Selected Option', async () => {
    const { user } = setupRadioWithForm()

    const reactOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /react/i,
    })

    const angularOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /angular/i,
    })

    await user.click(reactOption)
    await user.click(angularOption)

    expect(angularOption).toBeChecked()
    expect(reactOption).not.toBeChecked()
  })

  it('Should Render the Selected Option', async () => {
    const { user } = setupRadioWithForm()

    const reactOption = getByRole(DOM_ELEMENT_ROLE.RADIO, {
      name: /react/i,
    })

    await user.click(reactOption)

    expect(reactOption).toBeChecked()
  })

  it('Should render with label when passed', () => {
    setupRadioWithForm({ label: LABEL_TEXT })

    expect(getByText(LABEL_TEXT)).toBeInTheDocument()
  })
})
