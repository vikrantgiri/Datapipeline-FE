import { useState, useEffect, useCallback } from 'react'
import { Table, Pagination, message, Button } from 'antd'
import { Play, Download } from 'lucide-react'
import type { ColumnsType } from 'antd/es/table'
import client from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import LoadingOverlay from '../../components/loading-overlay'
import { PROTECTED_ROUTES } from '../../constants/routes'
import { useNavigate } from 'react-router-dom'

interface LogEntry {
  trigger_name: string
  status: string
  started_at: string
  ended_at: string | null
  id: string
  summary: string | null
}

interface PaginationData {
  current: number
  pageSize: number
  total: number
  skip: number
  limit: number
}

const PrepMails = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [logsLoading, setLogsLoading] = useState(false)
  const [triggerLoading, setTriggerLoading] = useState(false)
  const navigate = useNavigate()

  // Pagination state for activity logs
  const [logsPagination, setLogsPagination] = useState<PaginationData>({
    current: 1,
    pageSize: 10,
    total: 0,
    skip: 0,
    limit: 10,
  })

  const fetchLogs = useCallback(async (page = 1, pageSize = 10) => {
    setLogsLoading(true)
    try {
      const skip = (page - 1) * pageSize
      const limit = pageSize

      const response = await client.post(`/logs?skip=${skip}&limit=${limit}`, {
        entity_type: 'prep-mail', // Using the prep-mail entity
      })

      const raw = response?.data?.data?.data || []
      const total = response?.data?.data?.total

      if (Array.isArray(raw)) {
        setLogs(raw)
        setLogsPagination(prev => ({
          ...prev,
          current: page,
          pageSize,
          total,
          skip,
          limit,
        }))
      }
    } catch (err) {
      console.error('Error fetching logs:', err)
      message.error('Failed to fetch activity logs')
    } finally {
      setLogsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLogs(1, logsPagination.pageSize)
  }, [fetchLogs, logsPagination.pageSize])

  const handleLogsTableChange = (page: number, pageSize: number) => {
    fetchLogs(page, pageSize)
  }

  const handleRunTrigger = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setTriggerLoading(true)
    try {
      toast.success('Trigger running')
      const res = await client.get('/prep-mail/run-trigger')
      if (res.status === 200) {
        toast.success('Trigger run successfully')
        // Refresh logs
        fetchLogs(1, logsPagination.pageSize)
      }
    } catch (error) {
      console.error('Failed to run trigger', error)
      toast.error('Failed to run trigger')
    } finally {
      setTriggerLoading(false)
    }
  }

  const handleDownloadCsv = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
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
        toast.success('CSV downloaded successfully')
      }
    } catch (error: any) {
      console.error('Failed to download csv', error)
      toast.error(error?.response?.data?.message || 'Failed to download csv')
    }
  }

  const handleOpenLog = (id: string) => {
    navigate(PROTECTED_ROUTES.PREP_MAIL_ACTIVITY_LOG_BY_ID.replace(':id', id), {
      state: { record: { run_id: id } },
    })
  }

  const activityLogColumns: ColumnsType<LogEntry> = [
    {
      title: 'S.No.',
      key: 'serial',
      render: (_: any, __: any, index: number) =>
        (logsPagination.current - 1) * logsPagination.pageSize + index + 1,
    },
    {
      title: 'Trigger Name',
      dataIndex: 'trigger_name',
      key: 'trigger_name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'SUCCESS'
            ? 'green'
            : status === 'FAILED'
              ? 'red'
              : 'orange'
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              color === 'green'
                ? 'bg-green-100 text-green-800'
                : color === 'red'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-orange-100 text-orange-800'
            }`}
          >
            {status}
          </span>
        )
      },
    },
    {
      title: 'Started At',
      dataIndex: 'started_at',
      key: 'started_at',
      render: (started_at: string) =>
        new Date(started_at).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
    },
    {
      title: 'Ended At',
      dataIndex: 'ended_at',
      key: 'ended_at',
      render: (ended_at: string | null) =>
        ended_at
          ? new Date(ended_at).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : 'In Progress',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Button
          type='primary'
          size='small'
          onClick={() => handleOpenLog(record.id)}
        >
          Open
        </Button>
      ),
    },
  ]

  if (triggerLoading) {
    return <LoadingOverlay />
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Prep Mail Activity Logs
          </h1>
          <p className='text-gray-600 mt-1'>
            Monitor and manage email preparation trigger activities
          </p>
        </div>
        <div className='space-x-2'>
          <Button
            onClick={handleRunTrigger}
            loading={triggerLoading}
            className='!bg-blue-600 !hover:bg-blue-700 !text-white !border-blue-600 !hover:!border-blue-700'
          >
            <Play className='w-4 h-4 mr-2' />
            Run Trigger
          </Button>
          <Button
            onClick={handleDownloadCsv}
            className='!bg-blue-600 !hover:bg-blue-700 !text-white !border-blue-600 !hover:!border-blue-700'
          >
            <Download className='w-4 h-4 mr-2' />
            Download CSV
          </Button>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <Table
          columns={activityLogColumns}
          dataSource={logs}
          rowKey='id'
          loading={logsLoading}
          scroll={{ x: 'max-content' }}
          pagination={false}
          size='middle'
          className='custom-table'
        />

        {/* Custom Pagination for Activity Logs */}
        <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200'>
          <div className='text-sm text-gray-600'>
            Showing {(logsPagination.current - 1) * logsPagination.pageSize + 1}{' '}
            to{' '}
            {Math.min(
              logsPagination.current * logsPagination.pageSize,
              logsPagination.total
            )}{' '}
            of {logsPagination.total} entries
          </div>
          <Pagination
            current={logsPagination.current}
            pageSize={logsPagination.pageSize}
            total={logsPagination.total}
            showSizeChanger
            onChange={handleLogsTableChange}
            onShowSizeChange={handleLogsTableChange}
            pageSizeOptions={['10', '20', '50', '100']}
            className='custom-pagination'
          />
        </div>
      </div>
    </div>
  )
}

export default PrepMails
