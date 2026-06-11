import React from 'react'
import Skeleton from '.'
import { customRender } from 'src/shared/utils/tests.utils'
describe('<Skeleton />', () => {
  it('should render skeleton', () => {
    const { container } = customRender(<Skeleton />, {
      withRouter: false,
      withContext: false,
    })

    const skeleton = container.querySelector('.ant-skeleton')
    expect(skeleton).toBeInTheDocument()
  })

  it('should render skeleton with active prop', () => {
    const { container } = customRender(<Skeleton active />, {
      withRouter: false,
      withContext: false,
    })

    const activeSkeleton = container.querySelector('.ant-skeleton-active')
    expect(activeSkeleton).toBeInTheDocument()
  })

  it('should render skeleton with round prop', () => {
    const { container } = customRender(<Skeleton round />, {
      withRouter: false,
      withContext: false,
    })

    const roundSkeleton = container.querySelector('.ant-skeleton-round')
    expect(roundSkeleton).toBeInTheDocument()
  })

  it('should render skeleton with avatar', () => {
    const { container } = customRender(<Skeleton avatar />, {
      withRouter: false,
      withContext: false,
    })

    const avatar = container.querySelector('.ant-skeleton-avatar')
    expect(avatar).toBeInTheDocument()
  })

  it('should render skeleton with paragraph', () => {
    const { container } = customRender(<Skeleton paragraph={{ rows: 3 }} />, {
      withRouter: false,
      withContext: false,
    })

    const paragraph = container.querySelector('.ant-skeleton-paragraph')
    expect(paragraph).toBeInTheDocument()
  })

  it('should render skeleton with title', () => {
    const { container } = customRender(<Skeleton title />, {
      withRouter: false,
      withContext: false,
    })

    const title = container.querySelector('.ant-skeleton-title')
    expect(title).toBeInTheDocument()
  })
})
