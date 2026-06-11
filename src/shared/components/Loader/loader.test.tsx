import React from 'react'
import Loader from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { LoaderSizes } from 'src/enums/LoaderSizes'
describe('<Loader />', () => {
  it('should render loader with default icon', () => {
    const { container } = customRender(<Loader />, {
      withRouter: false,
      withContext: false,
    })

    const spin = container.querySelector('.ant-spin')
    expect(spin).toBeInTheDocument()
  })

  it('should render loader with custom icon', () => {
    const customIcon = <span data-testid="custom-icon">Loading...</span>
    customRender(<Loader icon={customIcon} />, {
      withRouter: false,
      withContext: false,
    })

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('should render loader with small size', () => {
    const { container } = customRender(<Loader size={LoaderSizes.SMALL} />, {
      withRouter: false,
      withContext: false,
    })

    const spin = container.querySelector('.ant-spin-sm')
    expect(spin).toBeInTheDocument()
  })

  it('should render loader with large size', () => {
    const { container } = customRender(<Loader size={LoaderSizes.LARGE} />, {
      withRouter: false,
      withContext: false,
    })

    const spin = container.querySelector('.ant-spin-lg')
    expect(spin).toBeInTheDocument()
  })

  it('should render loader with default size when no size provided', () => {
    const { container } = customRender(<Loader />, {
      withRouter: false,
      withContext: false,
    })

    const spin = container.querySelector('.ant-spin')
    expect(spin).toBeInTheDocument()
  })

  it('should render loader with tip text', () => {
    const tipText = 'Loading data...'
    const { container } = customRender(<Loader tip={tipText} />, {
      withRouter: false,
      withContext: false,
    })

    const tipElement = container.querySelector('.ant-spin-text')
    expect(tipElement).toHaveTextContent(tipText)
  })
})
