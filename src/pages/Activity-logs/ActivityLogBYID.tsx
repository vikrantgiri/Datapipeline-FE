import React, { useEffect, useState, useCallback } from 'react'
import { Table, Tag, Typography, Button, Spin, Alert } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import client from '../../api/axiosInstance'
import type { ColumnsType } from 'antd/es/table'

const { Title } = Typography

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

  const location = useLocation()
  const navigate = useNavigate()
  const { record } = location.state || {}

  const fetchLogsByRunId = useCallback(async (runId: string) => {
    try {
      const res = await client.get(`/logs/${runId}`)
      const data: LogEntry[] = res.data.data || []
      console.log('Logs by ID:', data)
      setLogs(data)
    } catch (err) {
      console.error('Failed to fetch logs by run ID:', err)
      setError('Failed to fetch log entries.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (record?.run_id) {
      fetchLogsByRunId(record.run_id)
    } else {
      setError('No run ID provided')
      setLoading(false)
    }
  }, [record?.run_id, fetchLogsByRunId])

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
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4 px-4'>
        <Title level={3}>Log Details</Title>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className='bg-white rounded-lg shadow  mx-4'>
        {/* <Table
          dataSource={logs}
          columns={columns}
          rowKey='id'
          pagination={false}
          scroll={{ x: '100%', y: 500 }}
          size='middle'
        /> */}
        <Table
          dataSource={logs}
          columns={columns}
          rowKey='id'
          pagination={false}
          scroll={{ x: '100%', y: 500 }}
          size='middle'
          components={{
            body: {
              cell: props => (
                <td
                  {...props}
                  style={{
                    ...props.style,
                    borderBottom: 'none',
                  }}
                />
              ),
            },
            header: {
              cell: props => (
                <th
                  {...props}
                  style={{
                    ...props.style,
                    borderBottom: 'none',
                  }}
                />
              ),
            },
          }}
        />
      </div>
    </div>
  )
}

export default ActivityLogByID
