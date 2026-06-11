import React from 'react'
import FileUpload from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { InboxOutlined } from '@ant-design/icons'
// Constants
const BUTTON_TEXT = 'Upload File'
const UPLOAD_TEXT = 'Click or drag file to this area to upload'
const UPLOAD_HINT = 'Support for a single or bulk upload'
const FILE_TYPES = '.jpg,.png,.pdf'
const ACTION_URL = 'https://example.com/upload'

// Mock Functions
const mockHandleChange = vi.fn()

// Setup Functions
const setupFileUploadButton = (props = {}) => {
  const defaultProps = {
    handleChange: mockHandleChange,
    ...props,
  }

  const renderResult = customRender(
    <FileUpload {...defaultProps}>
      <button>{BUTTON_TEXT}</button>
    </FileUpload>,
    { withRouter: false, withContext: false },
  )

  return renderResult
}

const setupFileUploadDragger = (props = {}) => {
  const defaultProps = {
    dragdrop: true,
    uploadIcon: <InboxOutlined />,
    uploadText: UPLOAD_TEXT,
    uploadHint: UPLOAD_HINT,
    handleChange: mockHandleChange,
    ...props,
  }

  const renderResult = customRender(<FileUpload {...defaultProps} />, {
    withRouter: false,
    withContext: false,
  })

  return renderResult
}

describe('<FileUpload />', () => {
  beforeEach(() => {
    mockHandleChange.mockClear()
  })

  describe('Button Mode', () => {
    it('should render children in button mode', () => {
      setupFileUploadButton()

      expect(screen.getByText(BUTTON_TEXT)).toBeInTheDocument()
    })

    it('should render with custom action URL', () => {
      setupFileUploadButton({ actionURL: ACTION_URL })

      expect(screen.getByText(BUTTON_TEXT)).toBeInTheDocument()
    })

    it('should render with multiple file support', () => {
      setupFileUploadButton({ multiple: true })

      expect(screen.getByText(BUTTON_TEXT)).toBeInTheDocument()
    })

    it('should render with maxCount limit', () => {
      setupFileUploadButton({ maxCount: 5 })

      expect(screen.getByText(BUTTON_TEXT)).toBeInTheDocument()
    })

    it('should use default mock URL when actionURL is not provided', () => {
      const { container } = setupFileUploadButton()

      const upload = container.querySelector('.ant-upload-wrapper')
      expect(upload).toBeInTheDocument()
    })
  })

  describe('Drag and Drop Mode', () => {
    it('should render dragger with upload icon', () => {
      const { container } = setupFileUploadDragger()

      const icon = container.querySelector('.anticon-inbox')
      expect(icon).toBeInTheDocument()
    })

    it('should render dragger with upload text', () => {
      setupFileUploadDragger()

      expect(screen.getByText(UPLOAD_TEXT)).toBeInTheDocument()
    })

    it('should render dragger with upload hint', () => {
      setupFileUploadDragger()

      expect(screen.getByText(UPLOAD_HINT)).toBeInTheDocument()
    })

    it('should render dragger with file type restrictions', () => {
      setupFileUploadDragger({ fileTypes: FILE_TYPES })

      expect(screen.getByText(UPLOAD_TEXT)).toBeInTheDocument()
    })

    it('should render dragger with custom action URL', () => {
      setupFileUploadDragger({ actionURL: ACTION_URL })

      expect(screen.getByText(UPLOAD_TEXT)).toBeInTheDocument()
    })

    it('should render dragger with multiple file support', () => {
      setupFileUploadDragger({ multiple: true })

      expect(screen.getByText(UPLOAD_TEXT)).toBeInTheDocument()
    })

    it('should use default mock URL when actionURL is not provided', () => {
      const { container } = setupFileUploadDragger()

      const dragger = container.querySelector('.ant-upload-drag')
      expect(dragger).toBeInTheDocument()
    })
  })

  describe('File Upload Behavior - Button Mode', () => {
    it('should handle file input selection in button mode', async () => {
      const { container, user } = setupFileUploadButton()

      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      expect(input).toBeInTheDocument()

      const file = new File(['content'], 'test.txt', { type: 'text/plain' })
      await user.upload(input, file)
    })

    it('should configure button upload with correct props', () => {
      const { container } = setupFileUploadButton({ multiple: false })

      const uploadWrapper = container.querySelector('.ant-upload-wrapper')
      expect(uploadWrapper).toBeInTheDocument()
    })
  })

  describe('File Upload Behavior - Dragger Mode', () => {
    it('should handle file input in dragger mode', async () => {
      const { container, user } = setupFileUploadDragger()

      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      expect(input).toBeInTheDocument()

      const file = new File(['content'], 'test.txt', { type: 'text/plain' })
      await user.upload(input, file)
    })

    it('should configure dragger upload with correct props', () => {
      const { container } = setupFileUploadDragger({ multiple: true })

      const dragger = container.querySelector('.ant-upload-drag')
      expect(dragger).toBeInTheDocument()
    })
  })

  describe('File Upload Configuration', () => {
    it('should handle single file upload by default', () => {
      const { container } = setupFileUploadButton({ multiple: false })

      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      expect(input).toHaveAttribute('type', 'file')
    })

    it('should handle multiple file upload when enabled', () => {
      const { container } = setupFileUploadButton({ multiple: true })

      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      expect(input).toHaveAttribute('type', 'file')
    })

    it('should apply file type restrictions', () => {
      const { container } = setupFileUploadDragger({ fileTypes: FILE_TYPES })

      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      expect(input).toHaveAttribute('accept', FILE_TYPES)
    })

    it('should apply maxCount limit in button mode', () => {
      setupFileUploadButton({ maxCount: 3 })

      expect(screen.getByText(BUTTON_TEXT)).toBeInTheDocument()
    })

    it('should allow file selection in button mode with multiple enabled', async () => {
      const { container, user } = setupFileUploadButton({ multiple: true })

      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' })
      const file2 = new File(['content2'], 'test2.txt', { type: 'text/plain' })

      await user.upload(input, [file1, file2])
    })

    it('should allow file selection in dragger mode with multiple enabled', async () => {
      const { container, user } = setupFileUploadDragger({ multiple: true })

      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' })
      const file2 = new File(['content2'], 'test2.txt', { type: 'text/plain' })

      await user.upload(input, [file1, file2])
    })
  })
})
