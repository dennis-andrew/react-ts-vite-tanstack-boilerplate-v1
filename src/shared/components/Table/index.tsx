import React from 'react'
import { useRouter, useRouterState } from '@tanstack/react-router'
import { Table as AntTable, type PaginationProps, type TableProps } from 'antd'
import { parseNumber } from 'src/shared/utils/parser'
import styles from './table.module.scss'
const Table = <T extends object>({ pagination, ...props }: TableProps<T>) => {
  const router = useRouter()
  const searchParams = useRouterState({
    select: (state) => state.location.search,
  }) as Record<string, unknown>

  const current = parseNumber(searchParams.page || 1)

  const pageSize = parseNumber(searchParams.pageSize || 1)

  const handlePageChange: PaginationProps['onChange'] = (page, pageSize) =>
    router.navigate({
      to: '.',
      search: (previousSearchParams) => ({
        ...previousSearchParams,
        page,
        pageSize,
      }),
    })

  return (
    <div className={styles.table}>
      <AntTable
        pagination={
          pagination !== false && {
            current,
            onChange: handlePageChange,
            pageSize,
            showSizeChanger: false,
            ...pagination,
          }
        }
        {...props}
      />
    </div>
  )
}

export default Table
