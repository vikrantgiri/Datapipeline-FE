import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Button, Input, Table, Popconfirm, Pagination, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { Trash2, Edit } from 'lucide-react'
import client from '../../api/axiosInstance'

const { Search } = Input

export interface TaskStatusItem {
  key: string
  id: number
  taskDefinition: string
  status: string
  createdAt: string
  createdBy: string
  updatedAt: string
}

interface PaginationData {
  current: number
  pageSize: number
  total: number
  skip: number
  limit: number
}

const TaskStatus = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState<TaskStatusItem[]>([])
  const [loading, setLoading] = useState(false)

  // Filter states
  const [statusFilter, setStatusFilter] = useState('')
  const [createdAtFilter, setCreatedAtFilter] = useState('')

  // Pagination state
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    pageSize: 10,
    total: 0,
    skip: 0,
    limit: 10,
  })

  const fetchData = useCallback(
    async (page: number = 1, pageSize: number = 10) => {
      setLoading(true)
      try {
        const skip = (page - 1) * pageSize
        const limit = pageSize

        const res = await client.get(
          `/task-status?skip=${skip}&limit=${limit}`,
          {
            params: {
              status: statusFilter || undefined,
              created_at: createdAtFilter || undefined,
              search: searchText || undefined,
            },
          }
        )

        const responseData = res?.data?.data
        const rawData = responseData?.data || []
        const total = responseData?.total || 0

        if (Array.isArray(rawData)) {
          setData(rawData)

          // Update pagination state
          setPagination(prev => ({
            ...prev,
            current: page,
            pageSize,
            total,
            skip,
            limit,
          }))
        }
      } catch (error) {
        console.error('Failed to fetch task status', error)
        setData([])
        message.error('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    },
    [statusFilter, createdAtFilter, searchText]
  )

  useEffect(() => {
    fetchData(1, pagination.pageSize)
  }, [fetchData, pagination.pageSize])

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData(1, pagination.pageSize)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [fetchData, pagination.pageSize])

  const handleDelete = async (id: number) => {
    setLoading(true)
    try {
      await client.delete(`/task-status/${id}`)
      setData(prev => prev.filter(item => item.id !== id))
      message.success('Task status successfully deleted.')

      // Refresh current page data
      fetchData(pagination.current, pagination.pageSize)
    } catch (error) {
      console.error('Error while deleting task status', error)
      message.error('Failed to delete task status.')
    } finally {
      setLoading(false)
    }
  }

  const handleTableChange = (page: number, pageSize: number) => {
    fetchData(page, pageSize)
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
      case 'completed with errors':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const columns: ColumnsType<TaskStatusItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: string, record: any) => (
        <Link
          to='/TaskStatus/change'
          state={{ record }}
          className='text-blue-600 hover:text-blue-800 font-medium'
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'TASK DEFINITION',
      dataIndex: 'taskDefinition',
      key: 'taskDefinition',
      width: 200,
      render: (text: string, record: any) => (
        <Link
          to='/InputFileDefinition/change'
          state={{ record }}
          className='text-blue-600 hover:text-blue-800 font-medium'
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (text: string) => (
        <span className='text-sm text-gray-600'>
          {new Date(text).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      title: 'CREATED BY',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 120,
    },
    {
      title: 'UPDATED AT',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
      render: (text: string) => (
        <span className='text-sm text-gray-600'>
          {new Date(text).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      width: 120,
      render: (_: any, record: any) => (
        <div className='flex items-center space-x-2'>
          <Button
            type='primary'
            size='small'
            onClick={() =>
              navigate('/TaskStatus/change', { state: { record } })
            }
          >
            <Edit className='w-3 h-3 mr-1' />
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this task status?'
            description='This action cannot be undone.'
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
            okType='danger'
          >
            <Button icon={<Trash2 size={14} />} danger size='small' />
          </Popconfirm>
        </div>
      ),
    },
  ]

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Completed with errors', value: 'Completed with errors' },
    { label: 'Failed', value: 'Failed' },
  ]

  const dateOptions = [
    { label: 'Any date', value: '' },
    { label: 'Today', value: 'Today' },
    { label: 'Past 7 Days', value: 'Past 7 Day' },
    { label: 'This month', value: 'This month' },
    { label: 'This Year', value: 'This Year' },
  ]

  return (
    <div className='min-h-screen'>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Task Status</h1>
            <p className='text-gray-600 mt-1'>
              Monitor and manage task execution status
            </p>
          </div>
          <Link
            to='/TaskStatus/add'
            className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-4 sm:mt-0'
          >
            Add Task Status
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Search Bar */}
            <div className='relative'>
              <Search
                placeholder='Search task status...'
                allowClear
                enterButton={<SearchOutlined />}
                className='w-full'
                onSearch={handleSearch}
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
              />
            </div>

            {/* Table */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
              <Table
                columns={columns}
                dataSource={data}
                rowKey='id'
                loading={loading}
                scroll={{ x: 'max-content' }}
                pagination={false} // We'll handle pagination manually
                size='middle'
                className='custom-table'
              />

              {/* Custom Pagination */}
              <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200 '>
                <div className='text-sm text-gray-600'>
                  Showing {(pagination.current - 1) * pagination.pageSize + 1}{' '}
                  to{' '}
                  {Math.min(
                    pagination.current * pagination.pageSize,
                    pagination.total
                  )}{' '}
                  of {pagination.total} entries
                </div>
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  showSizeChanger
                  onChange={handleTableChange}
                  onShowSizeChange={handleTableChange}
                  pageSizeOptions={['10', '20', '50', '100']}
                  className='custom-pagination'
                />
              </div>
            </div>
          </div>

          {/* Filters Sidebar */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center mb-4'>
                <svg
                  className='w-5 h-5 text-gray-500 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z'
                  />
                </svg>
                <h3 className='text-lg font-medium text-gray-900'>Filters</h3>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    By Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    By Created At
                  </label>
                  <select
                    value={createdAtFilter}
                    onChange={e => setCreatedAtFilter(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                  >
                    {dateOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskStatus
