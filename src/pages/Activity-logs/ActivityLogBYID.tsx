import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Table, Tag, Button, Spin, Alert } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import client from '../../api/axiosInstance'
import type { ColumnsType } from 'antd/es/table'
import {
  createWebSocket,
  addMessageListener,
  removeMessageListener,
  closeWebSocket,
} from '../../api/webSocketInstance'

interface LogEntry {
  id: number
  run_id: string
  log_message: string
  log_level: 'INFO' | 'WARNING' | 'ERROR'
  created_at: string
}

const ActivityLogByID: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  // Use useRef to maintain counter across renders
  const messageCounterRef = useRef(0)
  // Ref for the scrollable table container
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const location = useLocation()
  const navigate = useNavigate()
  const { record } = location.state || {}

  const fetchLogs = useCallback(async (runId: string) => {
    const res = await client.get(`/logs/${runId}`)
    return res.data.data || []
  }, [])

  const fetchRunStatus = useCallback(async (runId: string) => {
    const res = await client.get(`/logs/run-status/${runId}`)
    return res.data?.data
  }, [])

  useEffect(() => {
    if (!record?.run_id) {
      setError('No run ID provided')
      setLoading(false)
      return
    }

    const runId = record.run_id

    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const currentStatus = await fetchRunStatus(runId)
        setStatus(currentStatus)

        if (currentStatus === 'RUNNING') {
          createWebSocket(runId)

          const handleMessage = (data: string) => {
            try {
              const parsed = JSON.parse(data)

              // Check if it's a valid log entry object
              if (
                parsed &&
                typeof parsed === 'object' &&
                parsed.run_id &&
                parsed.log_message &&
                parsed.created_at
              ) {
                setLogs(prev => [...prev, parsed])
                return
              } else {
                console.warn(
                  '⚠️ Skipped JSON message - not a valid LogEntry object:',
                  parsed
                )
                return
              }
            } catch {
              // Not JSON, treat as plain text log message
              console.info('📝 Processing plain text log message:', data)

              // Determine log level based on message content
              const determineLogLevel = (
                message: string
              ): 'INFO' | 'WARNING' | 'ERROR' => {
                const lowerMessage = message.toLowerCase()

                if (
                  lowerMessage.includes('error') ||
                  lowerMessage.includes('failed') ||
                  lowerMessage.includes('exception')
                ) {
                  return 'ERROR'
                }
                if (
                  lowerMessage.includes('warning') ||
                  lowerMessage.includes('warn') ||
                  lowerMessage.includes('deprecated')
                ) {
                  return 'WARNING'
                }
                return 'INFO'
              }

              // Generate truly unique ID using counter
              messageCounterRef.current += 1
              const uniqueId = Date.now() * 1000 + messageCounterRef.current

              // Create a log entry from the plain text message
              const logEntry: LogEntry = {
                id: uniqueId,
                run_id: record.run_id,
                log_message: data,
                log_level: determineLogLevel(data),
                created_at: new Date().toISOString(),
              }

              setLogs(prev => [...prev, logEntry])
            }
          }

          addMessageListener(handleMessage)

          return () => {
            removeMessageListener(handleMessage)
            closeWebSocket()
          }
        } else {
          const logData = await fetchLogs(runId)
          setLogs(logData)
        }
      } catch (err) {
        console.error('Error loading logs:', err)
        setError('Failed to load logs or connect to WebSocket')
      } finally {
        setLoading(false)
      }
    }

    const cleanup = loadData()
    return () => {
      cleanup?.then?.(cb => cb?.())
    }
  }, [record?.run_id, fetchLogs, fetchRunStatus])

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop =
        tableContainerRef.current.scrollHeight
    }
  }, [logs])

  const columns: ColumnsType<LogEntry> = [
    {
      title: 'Timestamp',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
      render: (value: string) =>
        new Date(value).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
    },
    {
      title: 'Level',
      dataIndex: 'log_level',
      key: 'log_level',
      width: 120,
      render: (level: string) => {
        const color =
          level === 'INFO' ? 'blue' : level === 'WARNING' ? 'orange' : 'red'
        return <Tag color={color}>{level}</Tag>
      },
    },
    {
      title: 'Message',
      dataIndex: 'log_message',
      key: 'log_message',
      width: 800,
    },
  ]

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <Spin tip='Loading logs...' size='large' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-full p-4'>
        <Alert message='Error' description={error} type='error' showIcon />
        <Button
          type='primary'
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className='mt-4'
        >
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between px-4'>
        <h1 className='text-3xl font-bold text-gray-900'>Log Details</h1>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      {status === 'RUNNING' && (
        <div className='px-4'>
          <Tag color='processing'>Live Log Stream Active</Tag>
        </div>
      )}

      <div
        ref={tableContainerRef}
        style={{ maxHeight: 600, overflowY: 'auto' }}
        className='bg-white rounded-lg shadow mx-4'
      >
        <Table
          dataSource={logs}
          columns={columns}
          rowKey='id'
          pagination={false}
          scroll={{ x: '100%' }}
          size='middle'
        />
      </div>
    </div>
  )
}

export default ActivityLogByID
