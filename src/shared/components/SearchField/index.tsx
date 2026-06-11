import React, { ChangeEvent, FC } from 'react'
import { Input } from 'antd'
import { SharedComponentsConstants } from 'src/constants/sharedComponents'
import styles from './searchComponent.module.scss'
interface SearchComponentProps {
  onSearch: Function
  searchValue: string
  setSearchValue: Function
}
const { Search } = Input

const SearchField: FC<SearchComponentProps> = (props) => {
  const { onSearch, searchValue, setSearchValue } = props

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value)

  const handleSearch = (searchText: string) => onSearch(searchText)

  return (
    <div className={styles['search-component']}>
      <Search
        placeholder={SharedComponentsConstants.SEARCH_PLACEHOLDER}
        value={searchValue}
        allowClear
        onChange={onChange}
        onSearch={handleSearch}
      />
    </div>
  )
}

export default SearchField
