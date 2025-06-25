import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import CustomTable from '../../components/Table'
import { PrepMailsLogData, type PrepMailsLog } from './PrepMailsData'
import { Trash2 } from 'lucide-react'
import { Button, Popconfirm } from 'antd'

const TaskLogPrepMailsDefinition = () => {
  const [data, setData] = useState<PrepMailsLog[]>(PrepMailsLogData)

  const handleDelete = (key: string) => {
    setData(prev => prev.filter(item => item.key !== key))
  }
  const columns: ColumnsType<PrepMailsLog> = [
    {
      title: 'CSV File Name',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (text: string) => (
        <div className='whitespace-pre-line'>{text}</div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span
          className={`font-semibold ${
            status.toLowerCase() === 'failed'
              ? 'text-red-600'
              : 'text-green-600'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Updated at',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Task Logs',
      dataIndex: 'taskLogs',
      key: 'taskLogs',
      render: (text: string) => (
        <div className='whitespace-pre-line'>{text}</div>
      ),
    },
    {
      title: '',
      key: 'delete',
      render: (_, record) => (
        <Popconfirm
          title='Are you sure to delete this Log?'
          onConfirm={() => handleDelete(record.key)}
          okText='Yes'
          cancelText='No'
        >
          <Button icon={<Trash2 size={16} className='text-red-600' />} danger />
        </Popconfirm>
      ),
    },
  ]
  return <CustomTable title='Task Statuses' data={data} columns={columns} />
}

export default TaskLogPrepMailsDefinition
