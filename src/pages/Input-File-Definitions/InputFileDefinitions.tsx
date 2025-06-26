import { useEffect, useState, useCallback } from 'react'
import { Button, Input, Table, message, Popconfirm, Pagination } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Trash2 } from 'lucide-react'

import client from '../../api/axiosInstance'
import FilterDropdown from '../../components/Add-Form-Component/Filter-dropdown'
import { getTaskTypeFilters, getThirdPartyFilters } from '../../api/filter-api'

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
      await client.get(`/input-file-def/run-trigger/${id}`)
      message.success('Trigger run successfully.')
    } catch (error) {
      console.error('Error while running trigger.', error)
      message.error('Failed to run trigger.')
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
        <Link to='/InputFileDefinition/change' state={{ record }}>
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
              navigate('/InputFileDefinition/change', { state: { record } })
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
    { label: 'All', value: '' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
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
            to='/InputFileDefinition/add'
            className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-4 sm:mt-0'
          >
            <PlusOutlined className='mr-2' />
            Add Definition
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Search Bar */}
            <div className='relative'>
              <Search
                placeholder='Search by third-party...'
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputFileDefinition
