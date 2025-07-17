import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import client from '../../api/axiosInstance'
import { PROTECTED_ROUTES } from '../../constants/routes'
import { LoadingSpinner } from '../../components/ui'
import SnowflakeForm from '../../components/Add-Form-Component/SnowfaleForm'

const ChangeSnowflake: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const { record } = location.state || {}

  const [loading, setLoading] = useState(false)

  const getElementById = useCallback(
    async (id: number) => {
      setLoading(true)
      try {
        const res = await client.get(`/snowflake-scripts/${id}`)
        const item = res.data.data
        form.setFieldsValue({
          email_recipients: item.email_recipients,
          sql_script: item.sql_script,
          // time: item.time ? dayjs(item.time) : null,
          scheduled: item.scheduled,
        })
        message.success('Record loaded.')
      } catch (err) {
        console.error('Failed to fetch record', err)
        message.error('Failed to load Snowflake record.')
      } finally {
        setLoading(false)
      }
    },
    [form]
  )

  useEffect(() => {
    if (record?.id) {
      getElementById(record.id)
    }
  }, [record?.id, getElementById])

  const handleFinish = async (values: any) => {
    try {
      await client.put(`/snowflake-scripts/${record.id}`, {
        ...values,

        scheduled: values.scheduled,
      })
      message.success('Snowflake record updated successfully.')
      navigate(PROTECTED_ROUTES.SNOWFLAKE)
    } catch (err) {
      console.error('Update failed', err)
      message.error('Failed to update Snowflake record.')
    }
  }

  return (
    <div className='text-black'>
      {loading && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
          <LoadingSpinner fullScreen />
        </div>
      )}

      <div className='flex items-center gap-2 mb-6'>
        <ArrowLeftOutlined
          className='text-xl cursor-pointer text-blue-600 hover:text-blue-800'
          onClick={() => navigate(PROTECTED_ROUTES.SNOWFLAKE)}
        />
        <h1 className='text-2xl font-semibold'>Change Snowflake Record</h1>
      </div>

      <div className='pr-4'>
        <SnowflakeForm form={form} onFinish={handleFinish} />
      </div>
    </div>
  )
}

export default ChangeSnowflake
