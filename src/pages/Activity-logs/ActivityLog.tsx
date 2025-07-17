import React, { useEffect, useState, useCallback } from 'react'
import { Button, Table, Pagination, Spin, Alert, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PROTECTED_ROUTES } from '../../constants/routes'
import { useLocation, useNavigate } from 'react-router-dom'
import client from '../../api/axiosInstance'
import { TRIGGER_ENTITIES } from '../../constants/app'

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

const ActivityLog: React.FC = () => {
  const location = useLocation()
  const path = location.pathname.split('/').pop()
  const entityHeading = path
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    pageSize: 10,
    total: 0,
    skip: 0,
    limit: 10,
  })

  const fetchLogs = useCallback(
    async (page = 1, pageSize = 10) => {
      setLoading(true)
      try {
        const skip = (page - 1) * pageSize
        const limit = pageSize

        const response = await client.post(
          `/logs?skip=${skip}&limit=${limit}`,
          {
            entity_type: path,
          }
        )

        const raw = response?.data?.data?.data || []
        const total = response?.data?.data?.total

        if (Array.isArray(raw)) {
          setLogs(raw)
          setPagination(prev => ({
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
        setError('Failed to fetch logs')
      } finally {
        setLoading(false)
      }
    },
    [path]
  )

  useEffect(() => {
    fetchLogs(1, pagination.pageSize)
  }, [fetchLogs, pagination.pageSize])

  const handleTableChange = (page: number, pageSize: number) => {
    fetchLogs(page, pageSize)
  }

  const handleOpenLog = (id: string) => {
    if (path === TRIGGER_ENTITIES.FILE_DOWNLOAD_DEFINITION) {
      navigate(PROTECTED_ROUTES.FDD_ACTIVITY_LOG_BY_ID.replace(':id', id), {
        state: { record: { run_id: id } },
      })
    } else if (path === TRIGGER_ENTITIES.INPUT_FILE_DEFINITION) {
      navigate(
        PROTECTED_ROUTES.INPUT_FILE_DEFINITION_ACTIVITY_LOG_BY_ID.replace(
          ':id',
          id
        ),
        {
          state: { record: { run_id: id } },
        }
      )
    } else if (path === TRIGGER_ENTITIES.PREP_MAIL) {
      navigate(
        PROTECTED_ROUTES.PREP_MAIL_ACTIVITY_LOG_BY_ID.replace(':id', id),
        {
          state: { record: { run_id: id } },
        }
      )
    } else if (path === TRIGGER_ENTITIES.SNOWFLAKE) {
      navigate(
        PROTECTED_ROUTES.ACTIVITY_LOG_BY_SNOWFLAKE_SCRIPT_BY_ID.replace(
          ':id',
          id
        ),
        {
          state: { record: { run_id: id } },
        }
      )
    }
  }

  const columns: ColumnsType<LogEntry> = [
    {
      title: 'S.No.',
      key: 'serial',
      render: (_: any, __: any, index: number) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
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
        return <Tag color={color}>{status}</Tag>
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

    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (id: string) => <code style={{ fontSize: 12 }}>{id}</code>,
    // },
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

  return (
    <div className='space-y-6 p-4'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>
          Activity Logs By {entityHeading}
        </h1>
        <p className='text-gray-600 mt-1'>List of recent trigger runs</p>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        {error && <Alert message={error} type='error' showIcon />}
        {loading ? (
          <div className='flex justify-center py-10'>
            <Spin size='large' />
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={logs}
              rowKey='id'
              pagination={false}
              scroll={{ x: 'max-content' }}
              size='middle'
              className='custom-table'
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
          </>
        )}
      </div>
    </div>
  )
}

export default ActivityLog
