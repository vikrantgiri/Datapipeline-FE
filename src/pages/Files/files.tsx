import { useState, useEffect, useCallback } from 'react'
import { Button, Table, Popconfirm, Pagination, message, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Trash2, Download } from 'lucide-react'
import client from '../../api/axiosInstance'

const { Search } = Input

export interface FileData {
  id: number
  file: string
  type: string
  status: string
  uploaded_at: string
  user: {
    id: number
    username: string
  }
  download?: string
}

interface PaginationData {
  current: number
  pageSize: number
  total: number
  skip: number
  limit: number
}

const Files = () => {
  const [data, setData] = useState<FileData[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

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

        const res = await client.post(`/file?skip=${skip}&limit=${limit}`, {
          params: {
            search: searchText || undefined,
          },
        })

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
        console.error('Failed to fetch files', error)
        setData([])
        message.error('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    },
    [searchText]
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
      await client.delete(`/file/${id}`)
      setData(prev => prev.filter(item => item.id !== id))
      message.success('File successfully deleted.')

      // Refresh current page data
      fetchData(pagination.current, pagination.pageSize)
    } catch (error) {
      console.error('Error while deleting file', error)
      message.error('Failed to delete file.')
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
      case 'processed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const columns: ColumnsType<FileData> = [
    {
      title: 'FILE',
      dataIndex: 'file',
      key: 'file',
      width: 200,
      render: (text: string, record: FileData) => (
        <Link
          to='/Files/change'
          state={{ record }}
          className='text-blue-600 hover:text-blue-800 font-medium'
        >
          {text.split('\\').pop()}
        </Link>
      ),
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      width: 120,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'UPLOADED AT',
      dataIndex: 'uploaded_at',
      key: 'uploaded_at',
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
      title: 'UPLOADED BY',
      dataIndex: 'user',
      key: 'user',
      width: 120,
      render: user => (
        <span className='text-sm text-gray-700'>{user?.username}</span>
      ),
    },
    {
      title: 'DOWNLOAD',
      dataIndex: 'download',
      key: 'download',
      width: 120,
      render: (text: string) => (
        <Button
          type='link'
          icon={<Download className='w-4 h-4' />}
          className='text-blue-600 hover:text-blue-800 p-0 h-auto'
        >
          {text || 'Download'}
        </Button>
      ),
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title='Are you sure to delete this file?'
          description='This action cannot be undone.'
          onConfirm={() => handleDelete(record.id)}
          okText='Yes'
          cancelText='No'
          okType='danger'
        >
          <Button icon={<Trash2 size={14} />} danger size='small' />
        </Popconfirm>
      ),
    },
  ]

  return (
    <div className='flex flex-col gap-6 min-h-screen'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Files</h1>
        <p className='text-gray-600 mt-1'>Manage and view uploaded files</p>
      </div>

      <div className='lg:col-span-3 space-y-6'>
        {/* Search Bar */}
        <div className='relative'>
          <Search
            placeholder='Search files...'
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

export default Files
