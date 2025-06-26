import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Table, Pagination, message, Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Play, Download } from 'lucide-react'
import type { ColumnsType } from 'antd/es/table'
import client from '../../api/axiosInstance'

const { Search } = Input

export interface PrepMail {
  key: string
  id: number
  username?: string
  created_at: string
  created_by: string
  runTrigger: string
  downloadResult: string
}

interface PaginationData {
  current: number
  pageSize: number
  total: number
  skip: number
  limit: number
}

const PrepMails = () => {
  const [data, setData] = useState<PrepMail[]>([])
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

        const res = await client.get(`/prep-mail?skip=${skip}&limit=${limit}`, {
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
        console.error('Failed to fetch prep mails', error)
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

  const handleTableChange = (page: number, pageSize: number) => {
    fetchData(page, pageSize)
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleRunTrigger = async () => {
    try {
      const res = await client.get('/prep-mail/run-trigger')
      if (res.status === 200) {
        message.success('Trigger run successfully')
      } else {
        message.error('Failed to run trigger')
      }
    } catch (error) {
      console.error('Failed to run trigger', error)
    }
  }

  const handleDownloadCsv = async () => {
    try {
      const res = await client.get('/prep-mail/download-csv', {
        responseType: 'blob',
      })
      if (res.status === 200) {
        const blob = new Blob([res.data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'prep-mail.csv'
        a.click()
        window.URL.revokeObjectURL(url)
        message.success('CSV downloaded successfully')
      } else {
        message.error('Failed to download csv')
      }
    } catch (error) {
      console.error('Failed to download csv', error)
    }
  }

  const columns: ColumnsType<PrepMail> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: string, record: PrepMail) => (
        <Link
          to='/PrepMails/change'
          state={{ record }}
          className='text-blue-600 hover:text-blue-800 font-medium'
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'CREATED BY',
      dataIndex: 'username',
      key: 'username',
      width: 150,
      render: (username: string) => (
        <span className='text-sm text-gray-700'>{username || 'System'}</span>
      ),
    },
    {
      title: 'CREATED AT',
      dataIndex: 'created_at',
      key: 'created_at',
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
      width: 200,
      render: () => (
        <div className='flex items-center space-x-2'>
          <Button
            onClick={handleRunTrigger}
            className='inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors duration-200'
          >
            <Play className='w-3 h-3 mr-1' />
            Run Trigger
          </Button>
          <Button
            onClick={handleDownloadCsv}
            className='inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200'
          >
            <Download className='w-3 h-3 mr-1' />
            Download CSV
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className='space-y-6 min-h-screen'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Prep Mails</h1>
        <p className='text-gray-600 mt-1'>
          Manage and execute email preparation tasks
        </p>
      </div>

      <div className='space-y-6'>
        {/* Search Bar */}
        <div className='relative'>
          <Search
            placeholder='Search prep mails...'
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

export default PrepMails
