import { useEffect, useState, useCallback } from 'react'
import { Table, Pagination, Tooltip, Popconfirm, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Edit } from 'lucide-react'
import { PROTECTED_ROUTES } from '../../constants/routes'
import client from '../../api/axiosInstance'
import { toast } from 'react-toastify'

export interface SnowflakeData {
  id: number
  email_recipients: string
  sql_script: string
  scheduled: string
}

interface PaginationData {
  current: number
  pageSize: number
  total: number
  skip: number
  limit: number
}

const SnowFlake = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<SnowflakeData[]>([])
  const [loading, setLoading] = useState(false)

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

        const response = await client.get('/snowflake-scripts', {
          params: { skip, limit },
        })

        const result = response?.data?.data || []
        const total = response?.data?.total || 0

        setData(result)
        setPagination(prev => ({
          ...prev,
          current: page,
          pageSize,
          total,
          skip,
          limit,
        }))
      } catch (error) {
        console.error('Failed to fetch snowflake data:', error)
        toast.error('Failed to load snowflake data.')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    fetchData(1, pagination.pageSize)
  }, [fetchData, pagination.pageSize])

  const handleTableChange = (page: number, pageSize: number) => {
    fetchData(page, pageSize)
  }

  const handleEdit = (record: SnowflakeData) => {
    navigate(PROTECTED_ROUTES.SNOWFLAKE_CHANGE, { state: { record } })
  }

  const handleDelete = async (id: number) => {
    try {
      await client.delete(`/snowflake-scripts/${id}`)
      toast.success('Deleted successfully.')
      fetchData(pagination.current, pagination.pageSize)
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Failed to delete entry.')
    }
  }

  const handleRunScript = async (id: number) => {
    try {
      const response = await client.get(
        `/snowflake-scripts/${id}/run-snowflake-script`
      )
      if (response.status === 200) {
        toast.success('Script is running.')
      } else {
        toast.error('Failed to run script.')
      }
    } catch (error) {
      console.error('Failed to run script:', error)
      toast.error('Failed to run script.')
    }
  }

  const columns: ColumnsType<SnowflakeData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Recipient Email',
      dataIndex: 'email_recipients',
      key: 'email_recipients',
      width: 200,
      render: (emails: string | string[]) => {
        const emailList = Array.isArray(emails) ? emails : [emails]
        return (
          <div>
            {emailList.map((email, index) => (
              <div key={index} className='break-words text-sm text-gray-800'>
                {email}
              </div>
            ))}
          </div>
        )
      },
    },

    {
      title: 'Script',
      dataIndex: 'sql_script',
      key: 'sql_script',
      width: 100,
      render: (script: string) => (
        <Tooltip title={script}>
          <div className='w-full max-w-[380px] overflow-hidden text-ellipsis whitespace-nowrap'>
            {script}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Schedule',
      dataIndex: 'scheduled',
      key: 'scheduled',
      width: 120,
      render: (value: string) => (
        <span className='text-gray-700 capitalize'>{value}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <div className='flex gap-2'>
          <Button
            type='primary'
            size='small'
            onClick={() => handleRunScript(record.id)}
          >
            Run Script
          </Button>
          <Button
            type='primary'
            size='small'
            onClick={() => handleEdit(record)}
          >
            <Edit className='w-3 h-3 mr-1' />
            Edit
          </Button>
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
        </div>
      ),
    },
  ]

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Snowflake Data</h1>
          <p className='text-gray-600 mt-1'>
            View snowflake recipient and script records
          </p>
        </div>
        <Link
          to={PROTECTED_ROUTES.SNOWFLAKE_ADD}
          className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-4 sm:mt-0'
        >
          <PlusOutlined className='mr-2' />
          Add Snowflake
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <Table
          columns={columns}
          dataSource={data}
          rowKey='id'
          loading={loading}
          scroll={{ x: 'max-content' }}
          pagination={false}
          size='middle'
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
  )
}

export default SnowFlake
