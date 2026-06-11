import React from 'react'
import CustomAvatar from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
// Constants
const SINGLE_NAME = 'John'
const FULL_NAME = 'John Doe'
const MULTI_WORD_NAME = 'John Michael Doe'

// Setup Functions
const setupAvatar = (
  props: { name: string | undefined; size?: 'small' | 'large' } = {
    name: undefined,
  },
) => {
  const renderResult = customRender(<CustomAvatar {...props} />, {
    withRouter: false,
    withContext: false,
  })

  return renderResult
}

describe('<CustomAvatar />', () => {
  it('should render avatar with user icon when name is undefined', () => {
    const { container } = setupAvatar({ name: undefined })

    const userIcon = container.querySelector('.anticon-user')
    expect(userIcon).toBeInTheDocument()
  })

  it('should render avatar with initials for single name', () => {
    setupAvatar({ name: SINGLE_NAME })

    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('should render avatar with initials for full name', () => {
    setupAvatar({ name: FULL_NAME })

    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('should render avatar with first and last initials for multi-word name', () => {
    setupAvatar({ name: MULTI_WORD_NAME })

    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('should render avatar with small size', () => {
    const { container } = setupAvatar({ name: FULL_NAME, size: 'small' })

    const avatar = container.querySelector('.ant-avatar-sm')
    expect(avatar).toBeInTheDocument()
  })

  it('should render avatar with large size', () => {
    const { container } = setupAvatar({ name: FULL_NAME, size: 'large' })

    const avatar = container.querySelector('.ant-avatar-lg')
    expect(avatar).toBeInTheDocument()
  })

  it('should render avatar with default size when size is not provided', () => {
    const { container } = setupAvatar({ name: FULL_NAME })

    const avatar = container.querySelector('.ant-avatar')
    expect(avatar).toBeInTheDocument()
  })

  it('should apply color class based on name', () => {
    const { container } = setupAvatar({ name: FULL_NAME })

    const avatar = container.querySelector('.ant-avatar')
    const className = avatar?.className || ''
    expect(className).toMatch(/avatar-bg-color--\d+/)
  })

  it('should apply default color class when name is undefined', () => {
    const { container } = setupAvatar({ name: undefined })

    const avatar = container.querySelector('.ant-avatar')
    expect(avatar).toHaveClass('avatar-bg-color--1')
  })
})
