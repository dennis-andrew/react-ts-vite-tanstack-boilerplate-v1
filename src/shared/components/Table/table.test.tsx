import Table from '.'
import { customRender } from 'src/shared/utils/tests.utils'
import { screen, waitFor } from '@testing-library/react'

// Mock Data
interface DataType {
  key: string
  name: string
  age: number
}

const mockColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
]

const mockData: DataType[] = [
  { key: '1', name: 'John', age: 30 },
  { key: '2', name: 'Jane', age: 25 },
  { key: '3', name: 'Bob', age: 35 },
]

// Setup Function
const setupTable = (props = {}) => {
  const renderResult = customRender(
    <Table columns={mockColumns} dataSource={mockData} {...props} />,
    {
      initialEntries: ['/?page=1&pageSize=10'],
      withContext: false,
    },
  )

  return renderResult
}

describe('<Table />', () => {
  it('should render table with data', () => {
    setupTable()

    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('should render table with columns', () => {
    setupTable()

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
  })

  it('should render table with pagination by default', () => {
    const { container } = setupTable()

    const pagination = container.querySelector('.ant-pagination')
    expect(pagination).toBeInTheDocument()
  })

  it('should not render pagination when pagination is false', () => {
    const { container } = setupTable({ pagination: false })

    const pagination = container.querySelector('.ant-pagination')
    expect(pagination).not.toBeInTheDocument()
  })

  it('should render table rows', () => {
    const { container } = setupTable()

    const rows = container.querySelectorAll('.ant-table-row')
    expect(rows.length).toBe(mockData.length)
  })

  it('should handle pagination change', async () => {
    const { user, container, router } = setupTable({
      pagination: { total: 50, pageSize: 10 },
    })

    const nextPageButton = container.querySelector(
      '.ant-pagination-item-2',
    ) as HTMLElement

    if (nextPageButton) {
      await user.click(nextPageButton)
    }

    await waitFor(() => {
      expect(router?.state.location.search).toEqual(
        expect.objectContaining({
          page: 2,
          pageSize: 10,
        }),
      )
    })
  })

  it('should render with custom pagination props', () => {
    const { container } = setupTable({
      pagination: {
        total: 100,
        pageSize: 20,
        showSizeChanger: false,
      },
    })

    const pagination = container.querySelector('.ant-pagination')
    expect(pagination).toBeInTheDocument()
  })

  it('should use default page value when page param is missing', () => {
    customRender(<Table columns={mockColumns} dataSource={mockData} />, {
      initialEntries: ['/'],
      withContext: false,
    })

    expect(screen.getByText('John')).toBeInTheDocument()
  })

  it('should use default pageSize value when pageSize param is missing', () => {
    customRender(<Table columns={mockColumns} dataSource={mockData} />, {
      initialEntries: ['/?page=1'],
      withContext: false,
    })

    expect(screen.getByText('John')).toBeInTheDocument()
  })
})
