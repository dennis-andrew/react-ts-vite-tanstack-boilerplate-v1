// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll, vi } from 'vitest'
import React from 'react'
// Uncomment when MSW is set up:
// import { server } from './mocks/server'

const { getComputedStyle } = window

// ============================================
// Module Mocks (Must be at top level)
// ============================================
vi.mock('lottie-react', () => ({
  useLottie: () => ({
    View: React.createElement('div', { 'data-testid': 'lottie' }),
  }),
}))

// ============================================
// Before All Tests - Global Setup
// ============================================
beforeAll(() => {
  // MSW Server Setup (Uncomment when ready)
  // server.listen({ onUnhandledRequest: 'bypass' })

  // Scroll Behavior Mock
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  window.scrollTo = vi.fn()

  // File Upload API Mocks
  window.URL.createObjectURL = vi.fn()
  window.URL.revokeObjectURL = vi.fn()

  // IntersectionObserver Mock (Required for Ant Design components)
  const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
  }))

  // ResizeObserver Mock (Required for Ant Design components)
  const ResizeObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }))

  // Bounding Rect Mock
  window.Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    width: 500,
    height: 500,
    top: 0,
    left: 0,
    bottom: 500,
    right: 500,
    x: 0,
    y: 0,
    toJSON: () => {},
  })

  // Global Observer Registration
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  vi.stubGlobal('ResizeObserver', ResizeObserverMock)

  // matchMedia Mock (Required for responsive components)
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  // Preserve getComputedStyle
  window.getComputedStyle = (elt) => getComputedStyle(elt)
})

// ============================================
// After Each Test - Cleanup
// ============================================
afterEach(() => {
  // DOM Cleanup (Critical for preventing memory leaks)
  cleanup()

  // Storage Cleanup
  localStorage.clear()
  sessionStorage.clear()

  // Mock Cleanup
  vi.clearAllMocks()

  // MSW Handler Reset (Uncomment when ready)
  // server.resetHandlers()
})

// ============================================
// After All Tests - Teardown
// ============================================
afterAll(async () => {
  // MSW Server Cleanup (Uncomment when ready)
  // server.close()
  // Note: Don't use vi.resetAllMocks() here as it breaks
  // beforeAll mocks for subsequent test files

  // Clear all timers to prevent hanging
  vi.clearAllTimers()
  vi.useRealTimers()

  // Force cleanup of any remaining async operations
  await new Promise((resolve) => setTimeout(resolve, 0))
})
