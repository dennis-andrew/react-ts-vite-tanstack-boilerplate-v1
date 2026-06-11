import React from 'react'
import Modal from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { DOM_ELEMENT_ROLE } from 'src/enums/domElementRole.enum'
import { vi } from 'vitest'
import Button from 'src/shared/components/Button'
const { getByText, getByRole, queryByText } = screen

// Constants
const MODAL_TITLE = 'Test Modal'
const MODAL_CONTENT = 'This is modal content'
const CUSTOM_WIDTH = 800

// Mock Functions
const mockCloseModal = vi.fn()
const mockHandleOk = vi.fn()

// Setup Functions
const setupModal = (props = {}) => {
  const defaultProps = {
    visible: true,
    closeModal: mockCloseModal,
    ...props,
  }

  const renderResult = customRender(
    <Modal {...defaultProps}>
      <div>{MODAL_CONTENT}</div>
    </Modal>,
    { withRouter: false, withContext: false },
  )

  return renderResult
}

describe('<Modal />', () => {
  beforeEach(() => {
    mockCloseModal.mockClear()
    mockHandleOk.mockClear()
  })

  it('should render modal when visible is true', () => {
    setupModal({ visible: true })

    expect(getByText(MODAL_CONTENT)).toBeInTheDocument()
  })

  it('should not render modal when visible is false', () => {
    setupModal({ visible: false })

    expect(queryByText(MODAL_CONTENT)).not.toBeInTheDocument()
  })

  it('should render modal with title', () => {
    setupModal({ title: MODAL_TITLE })

    expect(getByText(MODAL_TITLE)).toBeInTheDocument()
  })

  it('should render modal without title when not provided', () => {
    setupModal()

    expect(queryByText(MODAL_TITLE)).not.toBeInTheDocument()
  })

  it('should render modal with custom width', () => {
    setupModal({ width: CUSTOM_WIDTH })

    expect(getByText(MODAL_CONTENT)).toBeInTheDocument()
  })

  it('should call closeModal when cancel button is clicked', async () => {
    const { user } = setupModal()

    const cancelButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, {
      name: /cancel/i,
    })
    await user.click(cancelButton)

    expect(mockCloseModal).toHaveBeenCalledTimes(1)
  })

  it('should call closeModal when OK button is clicked and handleOk is not provided', async () => {
    const { user } = setupModal()

    const okButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, { name: /ok/i })
    await user.click(okButton)

    expect(mockCloseModal).toHaveBeenCalledTimes(1)
  })

  it('should call handleOk when OK button is clicked and handleOk is provided', async () => {
    const { user } = setupModal({ handleOk: mockHandleOk })

    const okButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, { name: /ok/i })
    await user.click(okButton)

    expect(mockHandleOk).toHaveBeenCalledTimes(1)
    expect(mockCloseModal).not.toHaveBeenCalled()
  })

  it('should render modal with custom footer', () => {
    const customFooter = [<Button key="custom">Custom Button</Button>]

    setupModal({ footer: customFooter })

    expect(getByText('Custom Button')).toBeInTheDocument()
  })

  it('should show loading indicator when confirmLoading is true', () => {
    setupModal({ confirmLoading: true })

    const okButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, { name: /ok/i })
    expect(okButton).toHaveClass('ant-btn-loading')
  })

  it('should render modal children', () => {
    setupModal()

    expect(getByText(MODAL_CONTENT)).toBeInTheDocument()
  })
})
