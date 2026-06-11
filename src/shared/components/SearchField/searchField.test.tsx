import SearchField from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen } from '@testing-library/react'
import { SharedComponentsConstants } from 'src/constants/sharedComponents'
import { vi } from 'vitest'
const { getByPlaceholderText } = screen

// Mock Functions
const mockOnSearch = vi.fn()
const mockSetSearchValue = vi.fn()

// Setup Function
const setupSearchField = (searchValue = '') => {
  const renderResult = customRender(
    <SearchField
      onSearch={mockOnSearch}
      searchValue={searchValue}
      setSearchValue={mockSetSearchValue}
    />,
    { withRouter: false, withContext: false },
  )

  const searchInput = getByPlaceholderText(
    SharedComponentsConstants.SEARCH_PLACEHOLDER,
  )

  return {
    ...renderResult,
    searchInput,
  }
}

describe('<SearchField />', () => {
  beforeEach(() => {
    mockOnSearch.mockClear()
    mockSetSearchValue.mockClear()
  })

  it('should render search field with placeholder', () => {
    const { searchInput } = setupSearchField()

    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute(
      'placeholder',
      SharedComponentsConstants.SEARCH_PLACEHOLDER,
    )
  })

  it('should display search value', () => {
    const searchValue = 'test search'
    const { searchInput } = setupSearchField(searchValue)

    expect(searchInput).toHaveValue(searchValue)
  })

  it('should call setSearchValue on input change', async () => {
    const { user, searchInput } = setupSearchField()
    const testInput = 'new search'

    await user.type(searchInput, testInput)

    expect(mockSetSearchValue).toHaveBeenCalled()
  })

  it('should call onSearch when Enter key is pressed', async () => {
    const searchValue = 'test search'
    const { user, searchInput } = setupSearchField(searchValue)

    await user.type(searchInput, '{Enter}')

    expect(mockOnSearch).toHaveBeenCalledWith(searchValue)
  })

  it('should call onSearch when search button is clicked', async () => {
    const searchValue = 'test search'
    const { user, container } = setupSearchField(searchValue)

    const searchButton = container.querySelector('.ant-input-search-button')
    await user.click(searchButton!)

    expect(mockOnSearch).toHaveBeenCalledWith(searchValue)
  })

  it('should have allowClear enabled', () => {
    const { container } = setupSearchField('test')

    const clearIcon = container.querySelector('.ant-input-clear-icon')
    expect(clearIcon).toBeInTheDocument()
  })
})
