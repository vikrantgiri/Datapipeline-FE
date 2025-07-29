import { useEffect, useState, useCallback, useRef } from 'react'
import { Button, Input, Table, message, Popconfirm, Pagination } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Trash2, Edit } from 'lucide-react'
import client from '../../api/axiosInstance'
import FilterDropdown from '../../components/Add-Form-Component/Filter-dropdown'
import { getThirdPartyFilters } from '../../api/filter-api'
import { PROTECTED_ROUTES } from '../../constants/routes'

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
  const [showFilters, setShowFilters] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
  

      if (
        filterRef.current &&
        !filterRef.current.contains(target) &&
        !document.querySelector('.ant-select-dropdown')?.contains(target)
      ) {
        setShowFilters(false)
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  



  const handleDelete = async (id: number) => {
    setLoading(true)
    try {
      await client.delete(`/credentials/${id}`)
      setData(prev => prev.filter(item => item.id !== id))
      message.success('Credential successfully deleted.')
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
          to={PROTECTED_ROUTES.CREDENTIALS_CHANGE}
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
              navigate(PROTECTED_ROUTES.CREDENTIALS_CHANGE, {
                state: { record },
              })
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

      {/* Search Bar */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <Search
            placeholder="Search credentials..."
            allowClear
            enterButton={<SearchOutlined />}
            className="w-full"
            onSearch={handleSearch}
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
          />
          <Button
            type='primary'
            style={{
              width: 100,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              textDecorationStyle:"solid",
            }}
            onClick={() => setShowFilters(prev => !prev)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M6 10.117V15l4-2v-2.883l4.447-5.34A1 1 0 0 0 13.763 5H2.237a1 1 0 0 0-.684 1.777L6 10.117z' />
            </svg>
           Filters
          </Button>
        </div>

        {/* Filter Overlay */}
        {showFilters && (
          <div  ref={filterRef} className="absolute right-0 top-12 z-10 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <FilterDropdown
              title='By Third Party'
              options={[...(thirdParyFilters || [])]}
              onChange={value => setSelectedFilter(value)}
              value={selectedFilter}
            />
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className='relative w-full'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full'>
          <Table
            columns={columns}
            dataSource={data}
            rowKey='id'
            loading={loading}
            scroll={{ x: 'max-content' }}
            pagination={false}
            size='middle'
            className='custom-table w-full'
          />
          <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200'>
            <div className='text-sm text-gray-600'>
              Showing {(pagination.current - 1) * pagination.pageSize + 1} to{' '}
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
    </div>
  )
}

export default Credentials
