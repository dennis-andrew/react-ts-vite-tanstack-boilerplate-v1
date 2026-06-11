import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Notification from '.'
import { notification, message } from 'antd'
// Mock antd notification and message
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd')
  return {
    ...actual,
    notification: {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
      open: vi.fn(),
    },
    message: {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
      open: vi.fn(),
    },
  }
})

describe('Notification', () => {
  const mockNotificationData = {
    message: 'Test Message',
    description: 'Test Description',
    type: 'success',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('should call desktop notification when window width > 768', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    Notification(mockNotificationData)

    expect(notification.success).toHaveBeenCalledWith({
      message: mockNotificationData.message,
      description: mockNotificationData.description,
    })
  })

  it('should call mobile notification when window width <= 768', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })

    Notification(mockNotificationData)

    expect(message.success).toHaveBeenCalledWith({
      content: mockNotificationData.message,
    })
  })

  it('should handle error type notification', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const errorNotification = { ...mockNotificationData, type: 'error' }
    Notification(errorNotification)

    expect(notification.error).toHaveBeenCalledWith({
      message: errorNotification.message,
      description: errorNotification.description,
    })
  })

  it('should handle warning type notification', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const warningNotification = { ...mockNotificationData, type: 'warning' }
    Notification(warningNotification)

    expect(notification.warning).toHaveBeenCalledWith({
      message: warningNotification.message,
      description: warningNotification.description,
    })
  })

  it('should handle info type notification', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const infoNotification = { ...mockNotificationData, type: 'info' }
    Notification(infoNotification)

    expect(notification.info).toHaveBeenCalledWith({
      message: infoNotification.message,
      description: infoNotification.description,
    })
  })

  it('should handle open type notification', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const openNotification = { ...mockNotificationData, type: 'open' }
    Notification(openNotification)

    expect(notification.open).toHaveBeenCalledWith({
      message: openNotification.message,
      description: openNotification.description,
    })
  })
})
