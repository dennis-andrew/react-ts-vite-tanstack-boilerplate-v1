import React from 'react'
import DeleteModal from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Modal } from 'antd'
// Mock Ant Design Modal
vi.mock('antd', async () => {
  const actual = await vi.importActual<typeof import('antd')>('antd')
  return {
    ...actual,
    Modal: {
      ...(actual.Modal as object),
      confirm: vi.fn(),
    },
  }
})

// Constants
const RESOURCE_NAME = 'user'
const BUTTON_TEXT = 'Delete'
const CUSTOM_DESCRIPTION = 'This action cannot be undone'

// Mock Functions
const mockOnOk = vi.fn()
const mockOnCancel = vi.fn()

// Setup Functions
const setupDeleteModal = (props = {}) => {
  const defaultProps = {
    resource: RESOURCE_NAME,
    onOk: mockOnOk,
    onCancel: mockOnCancel,
    ...props,
  }

  const renderResult = customRender(
    <DeleteModal {...defaultProps}>
      <button>{BUTTON_TEXT}</button>
    </DeleteModal>,
    { withRouter: false, withContext: false },
  )

  return renderResult
}

describe('<DeleteModal />', () => {
  beforeEach(() => {
    mockOnOk.mockClear()
    mockOnCancel.mockClear()
    vi.mocked(Modal.confirm).mockClear()
  })

  it('should render children', () => {
    setupDeleteModal()

    expect(screen.getByText(BUTTON_TEXT)).toBeInTheDocument()
  })

  it('should call Modal.confirm when clicked', async () => {
    const { user } = setupDeleteModal()

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    expect(Modal.confirm).toHaveBeenCalled()
  })

  it('should call Modal.confirm with correct title', async () => {
    const { user } = setupDeleteModal()

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    expect(Modal.confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        title: `Are you sure delete this ${RESOURCE_NAME}?`,
      }),
    )
  })

  it('should call Modal.confirm with onOk callback', async () => {
    const { user } = setupDeleteModal()

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    expect(Modal.confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        onOk: mockOnOk,
      }),
    )
  })

  it('should call Modal.confirm with onCancel callback', async () => {
    const { user } = setupDeleteModal()

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    expect(Modal.confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        onCancel: mockOnCancel,
      }),
    )
  })

  it('should call Modal.confirm with custom description', async () => {
    const { user } = setupDeleteModal({ description: CUSTOM_DESCRIPTION })

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    expect(Modal.confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        content: CUSTOM_DESCRIPTION,
      }),
    )
  })

  it('should call Modal.confirm with correct okText', async () => {
    const { user } = setupDeleteModal()

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    expect(Modal.confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        okText: 'Yes',
      }),
    )
  })

  it('should call Modal.confirm with correct okType', async () => {
    const { user } = setupDeleteModal()

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    expect(Modal.confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        okType: 'danger',
      }),
    )
  })

  it('should call Modal.confirm with correct cancelText', async () => {
    const { user } = setupDeleteModal()

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    expect(Modal.confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        cancelText: 'No',
      }),
    )
  })

  it('should call Modal.confirm with ExclamationCircleFilled icon', async () => {
    const { user } = setupDeleteModal()

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    const confirmCall = vi.mocked(Modal.confirm).mock.calls[0][0]
    expect(confirmCall.icon).toBeDefined()
  })
})
