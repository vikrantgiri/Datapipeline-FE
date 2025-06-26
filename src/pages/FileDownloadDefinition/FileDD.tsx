import { useEffect, useState, useCallback } from 'react'
import { Button, Input, Table, Popconfirm, message, Pagination } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Trash2, Edit, Download } from 'lucide-react'
import client from '../../api/axiosInstance'
import { getCredentialsFilters } from '../../api/filter-api'
const { Search } = Input

export interface FileDownloadDefinitionItem {
  id: number
  // key: string;
  name?: string
  credentials?: {
    id?: number
    name?: string
  }
  remote_path?: string
  created_at?: string
  created_by?: {
    id?: number
    username?: string
  }
  action?: string

  post_to_dc?: string
  post_to_call_shaper?: string
  insert_to_postgres?: string
  append_placekey?: string
  append_phone_no?: string
  append_email?: string
  append_home_value?: string
  dc_lead_token?: string
  dc_lead_key?: string
}

interface PaginationData {
  current: number
  pageSize: number
  total: number
  skip: number
  limit: number
}

const FileDownloadDefinition = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<FileDownloadDefinitionItem[]>([])
  const [loading, setLoading] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [credentialsFilters, setCredentialsFilters] = useState<
    { [key: string]: string }[]
  >([])
  const [selectedCredential, setSelectedCredential] = useState<string>('')
  // const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // const [filterCredentials, setFilterCredentials] = useState();

  const [filterPostDC, setFilterPostDC] = useState('')
  const [filterPostCallShaper, setFilterPostCallShaper] = useState('')
  const [filterInsertPostgres, setFilterInsertPostgres] = useState('')

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
          `/file-download-def/filtered?skip=${skip}&limit=${limit}`,
          {
            credentials_id: selectedCredential || undefined,
            post_to_dc: filterPostDC || undefined,
            post_to_call_shaper: filterPostCallShaper || undefined,
            insert_to_postgres: filterInsertPostgres || undefined,
            search: searchText || undefined,
          }
        )

        const responseData = res?.data?.data
        const rawData = responseData?.data || []
        const total = responseData?.total || 0

        if (Array.isArray(rawData)) {
          const processedData = rawData.map((item: any) => ({
            id: item.id,
            name: item.name,
            credentials: item.credentials,
            remote_path: item.remote_path,
            created_at: item.created_at,
            created_by: item.user,
            action: 'Download File',
            post_to_dc: item.post_to_dc ? 'Yes' : 'No',
            post_to_call_shaper: item.post_to_call_shaper ? 'Yes' : 'No',
            insert_to_postgres: item.insert_to_postgres ? 'Yes' : 'No',
            append_placekey: item.append_placekey ? 'Yes' : 'No',
            append_phone_no: item.append_phone_no ? 'Yes' : 'No',
            append_email: item.append_email ? 'Yes' : 'No',
            append_home_value: item.append_home_value ? 'Yes' : 'No',
            dc_lead_token: item.dc_lead_token ? 'Yes' : 'No',
            dc_lead_key: item.dc_lead_key ? 'Yes' : 'No',
          }))

          setData(processedData)

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
        console.error('Failed to fetch file download definition', error)
        setData([])
        message.error('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    },
    [
      selectedCredential,
      filterInsertPostgres,
      filterPostCallShaper,
      filterPostDC,
      searchText,
    ]
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
        const res = await getCredentialsFilters()
        setCredentialsFilters(res?.data || [])
      } catch (error) {
        console.error('Failed to fetch filters', error)
      }
    }
    fetchFilter()
  }, [])

  const handleDelete = async (id: number) => {
    setLoading(true)
    try {
      await client.delete(`/file-download-def/${id}`)
      setData(prev => prev.filter(item => item.id !== id))
      message.success('File download definition successfully deleted.')

      // Refresh current page data
      fetchData(pagination.current, pagination.pageSize)
    } catch (error) {
      console.error('Error while deleting file download definition', error)
      message.error('Failed to delete file download definition.')
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

  const handleDownloadTrigger = async (id: number) => {
    try {
      await client.get(`/file-download-def/download-trigger/${id}`)
    } catch (error) {
      console.error('Error while triggering file download', error)
    }
  }

  const columns: ColumnsType<FileDownloadDefinitionItem> = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text, record) => (
        <Link
          to='/FileDownloadDefinition/change'
          state={{ record }}
          className='text-blue-600 hover:text-blue-800 font-medium'
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'CREDENTIALS',
      dataIndex: 'credentials',
      key: 'credentials',
      width: 150,
      render: credentials => (
        <span className='text-sm text-gray-700'>{credentials?.name}</span>
      ),
    },
    {
      title: 'REMOTE PATH',
      dataIndex: 'remote_path',
      key: 'remote_path',
      width: 200,
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
      title: 'CREATED BY',
      dataIndex: 'created_by',
      key: 'created_by',
      width: 120,
      render: created_by => (
        <span className='text-sm text-gray-700'>{created_by?.username}</span>
      ),
    },
    {
      title: 'POST TO DC',
      dataIndex: 'post_to_dc',
      key: 'post_to_dc',
      width: 100,
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === 'Yes'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      title: 'POST TO CALL SHAPER',
      dataIndex: 'post_to_call_shaper',
      key: 'post_to_call_shaper',
      width: 140,
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === 'Yes'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      title: 'INSERT TO POSTGRES',
      dataIndex: 'insert_to_postgres',
      key: 'insert_to_postgres',
      width: 140,
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === 'Yes'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      ),
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
            onClick={() =>
              navigate('/FileDownloadDefinition/change', { state: { record } })
            }
          >
            <Edit className='w-3 h-3 mr-1' />
            Edit
          </Button>
          <Button
            type='default'
            size='small'
            icon={<Download className='w-3 h-3' />}
            onClick={() => handleDownloadTrigger(record.id!)}
          >
            Download
          </Button>
          <Popconfirm
            title='Are you sure to delete this file download definition?'
            description='This action cannot be undone.'
            onConfirm={() => handleDelete(record.id!)}
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

  const postDCOptions = [
    { label: 'All', value: '' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]
  const postCallShaperOptions = [
    { label: 'All', value: '' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]

  const InsertPGOptions = [
    { label: 'All', value: '' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]

  return (
    <div className='min-h-screen '>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              File Download Definitions
            </h1>
            <p className='text-gray-600 mt-1'>
              Manage file download configurations and settings
            </p>
          </div>
          <Link
            to='/FileDownloadDefinition/add'
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
                placeholder='Search file download definitions...'
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
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    By Credentials
                  </label>
                  <select
                    value={selectedCredential}
                    onChange={e => setSelectedCredential(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                  >
                    <option value=''>All</option>
                    {credentialsFilters.map((credential: any) => (
                      <option key={credential.value} value={credential.value}>
                        {credential.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    By Post DC
                  </label>
                  <select
                    value={filterPostDC}
                    onChange={e => setFilterPostDC(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                  >
                    {postDCOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    By Post Call Shaper
                  </label>
                  <select
                    value={filterPostCallShaper}
                    onChange={e => setFilterPostCallShaper(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                  >
                    {postCallShaperOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    By Insert Postgres
                  </label>
                  <select
                    value={filterInsertPostgres}
                    onChange={e => setFilterInsertPostgres(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                  >
                    {InsertPGOptions.map(option => (
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

export default FileDownloadDefinition
