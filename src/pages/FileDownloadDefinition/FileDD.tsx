import { useEffect, useState, useCallback, useRef } from 'react'
import { Button, Input, Table, Popconfirm, message, Pagination } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Trash2, Edit, Download } from 'lucide-react'
import client from '../../api/axiosInstance'
import { getCredentialsFilters } from '../../api/filter-api'
import FilterDropdown from '../../components/Add-Form-Component/Filter-dropdown'
import { toast } from 'react-toastify'
import { PROTECTED_ROUTES } from '../../constants/routes'
const { Search } = Input

export interface FileDownloadDefinitionItem {
  id: number
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
  const [filterPostDC, setFilterPostDC] = useState('')
  const [filterPostCallShaper, setFilterPostCallShaper] = useState('')
  const [filterInsertPostgres, setFilterInsertPostgres] = useState('')
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
  
      const isInsideFilter =
        filterRef.current?.contains(target) ||
        document.querySelector('.ant-select-dropdown')?.contains(target) ||
        target.closest('.ant-select') || // Ant Design select trigger
        target.closest('.ant-picker-dropdown') || // In case of date picker
        target.closest('.ant-dropdown') // General dropdowns
  
      if (!isInsideFilter) {
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
      const res = await client.get(`/file-download-def/download-trigger/${id}`)
      if (res.status === 200) {
        toast.success('File download trigger running')
      }
    } catch (error) {
      console.error('Error while triggering file download', error)
      toast.error('Failed to run trigger')
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
          to={PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION_CHANGE}
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
              navigate(`${PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION_CHANGE}`, {
                state: { record },
              })
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
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]
  const postCallShaperOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]

  const InsertPGOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]

  return (
    <div className=' flex flex-col gap-6'>
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
          to={PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION_ADD}
          className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-4 sm:mt-0'
        >
          <PlusOutlined className='mr-2' />
          Add Definition
        </Link>
      </div>

      {/* Search Bar */}
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
              title='By Credentials'
              options={[...credentialsFilters]}
              onChange={value => setSelectedCredential(value)}
              value={selectedCredential}
              type='id-value'
            />

            <FilterDropdown
              title='By Post DC'
              options={[...postDCOptions]}
              onChange={value => setFilterPostDC(value)}
              value={filterPostDC}
            />
            <FilterDropdown
              title='By Post Call Shaper'
              options={[...postCallShaperOptions]}
              onChange={value => setFilterPostCallShaper(value)}
              value={filterPostCallShaper}
            />
            <FilterDropdown
              title='By Insert Postgres'
              options={[...InsertPGOptions]}
              onChange={value => setFilterInsertPostgres(value)}
              value={filterInsertPostgres}
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

export default FileDownloadDefinition
