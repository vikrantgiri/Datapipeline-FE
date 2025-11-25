import { useEffect, useState, useCallback, useRef } from 'react'
import { Button, Input, Table, message, Popconfirm, Pagination } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Trash2 } from 'lucide-react'
import client from '../../api/axiosInstance'
import FilterDropdown from '../../components/Add-Form-Component/Filter-dropdown'
import { getTaskTypeFilters, getThirdPartyFilters } from '../../api/filter-api'
import { PROTECTED_ROUTES } from '../../constants/routes'
import { toast } from 'react-toastify'

const { Search } = Input

export interface inputfileData {
  key?: string
  id: number
  task_type: string
  third_party: string
  use_tabu: boolean
  created_by?: {
    id?: number
    username?: string
  }
  updated_at: string
  remote_path: string
  custom_filename: string | null
  sql_script?: string
  max_column_size: number
}

interface PaginationData {
  current: number
  pageSize: number
  total: number
  skip: number
  limit: number
}

const InputFileDefinition = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState<inputfileData[]>([])
  const [loading, setLoading] = useState(false)

  const [taskTypeFilters, setTaskTypeFilters] = useState<any[]>([])
  const [thirdPartyFilters, setThirdPartyFilters] = useState<any[]>([])

  const [selectedTaskType, setSelectedTaskType] = useState('')
  const [selectedThirdParty, setSelectedThirdParty] = useState('')
  const [selectedUseTabu, setSelectedUseTabu] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

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
          `/input-file-def/filtered?skip=${skip}&limit=${limit}`,
          {
            task_type: String(selectedTaskType),
            third_party: String(selectedThirdParty),
            use_tabu: String(selectedUseTabu),
            search: searchText || undefined,
          }
        )

        const responseData = res?.data?.data
        const rawData = responseData?.data || []
        const total = responseData?.total || 0

        if (Array.isArray(rawData)) {
          const parsed = rawData.map(item => ({
            ...item,
            key: item.id.toString(),
            created_by: {
              username: item?.user?.username,
              id: item?.user?.id,
            },
          }))
          setData(parsed)

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
        console.error('Failed to fetch input file definition.', error)
        setData([])
        message.error('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    },
    [selectedTaskType, selectedThirdParty, selectedUseTabu, searchText]
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
    const fetchFilters = async () => {
      try {
        const [taskRes, thirdRes] = await Promise.all([
          getTaskTypeFilters(),
          getThirdPartyFilters(),
        ])

        setTaskTypeFilters(taskRes?.data || [])
        setThirdPartyFilters(thirdRes?.data || [])
      } catch (error) {
        console.error('Failed to fetch filters', error)
      }
    }

    fetchFilters()
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
      await client.delete(`/input-file-def/${id}`)
      setData(prev => prev.filter(item => item.id !== id))
      message.success('Input file definition successfully deleted.')

      // Refresh current page data
      fetchData(pagination.current, pagination.pageSize)
    } catch (error) {
      console.error('Error while deleting.', error)
      message.error('Failed to delete input file definition.')
    } finally {
      setLoading(false)
    }
  }

  const handleRunTrigger = async (id: number) => {
    try {
      const res = await client.get(`/input-file-def/run-trigger/${id}`)
      if (res.status === 200) {
        message.success('Trigger run successfully.')
        toast.success('Input file trigger running')
      }
    } catch (error) {
      console.error('Error while running trigger.', error)
      message.error('Failed to run trigger.')
      toast.error('Failed to run trigger')
    }
  }

  const handleTableChange = (page: number, pageSize: number) => {
    fetchData(page, pageSize)
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const columns: ColumnsType<inputfileData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text, record) => (
        <Link
          to={`${PROTECTED_ROUTES.INPUT_FILE_DEFINITION_CHANGE}`}
          state={{ record }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'TASK TYPE',
      dataIndex: 'task_type',
      key: 'task_type',
      width: 150,
    },
    {
      title: 'THIRD PARTY',
      dataIndex: 'third_party',
      key: 'third_party',
      width: 150,
    },
    {
      title: 'USE TABU',
      dataIndex: 'use_tabu',
      key: 'use_tabu',
      width: 100,
      render: (val: boolean) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            val ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {val ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      title: 'CREATED BY',
      dataIndex: 'created_by',
      key: 'created_by',
      width: 120,
      render: created_by => created_by?.username || '-',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <div className='flex items-center space-x-2'>
          <Button
            type='primary'
            size='small'
            onClick={() => handleRunTrigger(record.id)}
            className='bg-green-600 hover:bg-green-700 border-green-600'
          >
            Run
          </Button>
          <Button
            type='primary'
            size='small'
            onClick={() =>
              navigate(`${PROTECTED_ROUTES.INPUT_FILE_DEFINITION_CHANGE}`, {
                state: { record },
              })
            }
          >
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this input file definition?'
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

  const useTabuOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]

  return (
    <>
      <div className='flex flex-col gap-6'>
        {/* Header */}

        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Input File Definitions
            </h1>
            <p className='text-gray-600 mt-1'>
              Manage and configure your input file definitions
            </p>
          </div>
          <Link
            to={PROTECTED_ROUTES.INPUT_FILE_DEFINITION_ADD}
            className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-4 sm:mt-0'
          >
            <PlusOutlined className='mr-2' />
            Add Definition
          </Link>
        </div>

        {/* Search Bar and Filter Toggle */}
        <div className='relative'>
          <div className='flex items-center gap-2'>
            <Search
              placeholder='Search credentials...'
              allowClear
              enterButton={<SearchOutlined />}
              className='w-full'
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
                textDecorationStyle: 'solid',
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

          {/* Filters Sidebar */}
          {/* Filter Overlay */}
          {showFilters && (
            <div
              ref={filterRef}
              className='absolute right-0 top-12 z-10 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-2'
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  ✕
                </button>
              </div>
              <FilterDropdown
                title='By Task Type'
                options={[...taskTypeFilters]}
                onChange={value => setSelectedTaskType(value)}
                value={selectedTaskType}
              />
              <FilterDropdown
                title='By Third Party'
                options={[...thirdPartyFilters]}
                onChange={value => setSelectedThirdParty(value)}
                value={selectedThirdParty}
              />
              <FilterDropdown
                title='By Use Tabu'
                options={useTabuOptions}
                onChange={value => setSelectedUseTabu(value)}
                value={selectedUseTabu}
              />
            </div>
          )}
        </div>

        {/* Table */}
        <div className='relative w-full'>
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
                Showing {(pagination.current - 1) * pagination.pageSize + 1}
                to{' '}
                {Math.min(
                  pagination.current * pagination.pageSize,
                  pagination.total
                )}
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
    </>
  )
}

export default InputFileDefinition
