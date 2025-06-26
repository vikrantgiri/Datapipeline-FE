import { useEffect, useState, useCallback } from 'react'
import { Button, Input, Table, message, Popconfirm, Pagination } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Trash2, Edit } from 'lucide-react'
import client from '../../api/axiosInstance'
import FilterDropdown from '../../components/Add-Form-Component/Filter-dropdown'
import { getThirdPartyFilters } from '../../api/filter-api'

const { Search } = Input

export interface Credential {
  id: number
  name: string
  third_party: string
  host: string
  database: string
  username: string
  created_at: string
  updated_at: string
  created_by_id: number
}

interface PaginationData {
  current: number
  pageSize: number
  total: number
  skip: number
  limit: number
}

const Credentials = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Credential[]>([])
  const [searchText, setSearchText] = useState('')
  const [thirdParyFilters, setThirdPartyFilters] = useState()
  const [selectedFilter, setSelectedFilter] = useState('')

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

        const res = await client.post(
          `/credentials/filtered?skip=${skip}&limit=${limit}`,
          {
            third_party: String(selectedFilter),
            search: searchText || undefined,
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
        console.error('Failed to fetch credentials.', error)
        setData([])
        message.error('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    },
    [selectedFilter, searchText]
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

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const res = await getThirdPartyFilters()
        setThirdPartyFilters(res?.data || [])
      } catch (error) {
        console.error('Failed to fetch filters', error)
      }
    }
    fetchFilter()
  }, [])

  const handleDelete = async (id: number) => {
    setLoading(true)
    try {
      await client.delete(`/credentials/${id}`)
      setData(prev => prev.filter(item => item.id !== id))
      message.success('Credential successfully deleted.')

      // Refresh current page data
      fetchData(pagination.current, pagination.pageSize)
    } catch (error) {
      console.error('Error while delete.', error)
      message.error('Failed to delete credential.')
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

  const columns: ColumnsType<Credential> = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text, record) => (
        <Link
          to='/credentials/change'
          state={{ record }}
          className='text-blue-600 hover:text-blue-800 font-medium'
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'THIRD PARTY',
      dataIndex: 'third_party',
      key: 'third_party',
      width: 120,
    },
    {
      title: 'HOST',
      dataIndex: 'host',
      key: 'host',
      width: 150,
    },
    {
      title: 'DATABASE',
      dataIndex: 'database',
      key: 'database',
      width: 120,
    },
    {
      title: 'USERNAME',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: 'CREATED AT',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (text: string) => (
        <span className='text-sm text-gray-600'>
          {new Date(text).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      ),
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <div className='flex items-center space-x-2'>
          <Button
            type='primary'
            size='small'
            onClick={() =>
              navigate('/credentials/change', { state: { record } })
            }
          >
            <Edit className='w-3 h-3 mr-1' />
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this credential?'
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

  return (
    <div className='min-h-screen'>
      <div className='flex flex-col gap-6'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Credentials</h1>
            <p className='text-gray-600 mt-1'>
              Manage your database and service credentials
            </p>
          </div>
          <Link
            to='/credentials/add'
            className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-4 sm:mt-0'
          >
            <PlusOutlined className='mr-2' />
            Add Credential
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Search Bar */}
            <div className='relative'>
              <Search
                placeholder='Search credentials...'
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
              <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50'>
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
                <FilterDropdown
                  title='By Third Party'
                  options={[...(thirdParyFilters || [])]}
                  onChange={value => setSelectedFilter(value)}
                  value={selectedFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credentials
