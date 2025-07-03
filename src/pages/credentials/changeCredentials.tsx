import React, { useEffect, useCallback } from 'react'
import { Form, message } from 'antd'
import CredentialsForm from '../../components/Add-Form-Component/CredentialsForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import client from '../../api/axiosInstance'

const ChangeCredentials: React.FC = () => {
  const [form] = Form.useForm()
  const location = useLocation()
  const navigate = useNavigate()
  const { record } = location.state || {}

  const getElementById = useCallback(
    async (id: number) => {
      try {
        const res = await client.get(`/credentials/${id}`)
        const item = res.data.data
        form.setFieldsValue(item)
        message.success('Record fetched.')
      } catch (error) {
        console.error('Failed to fetch.', error)
        message.error('Failed to fetch.')
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
      await client.put(`/credentials/${record.id}`, values)
      message.success('Credential updated successfully.')
      navigate('/credentials')
    } catch (error) {
      console.error('Failed to update.', error)
      message.error('Failed to update credential.')
    }
  }
  
  return (
    <div className='text-black min-h-screen'>
      <div className='flex items-center gap-2 mb-6'>
        <ArrowLeftOutlined
          className='text-xl cursor-pointer text-blue-600 hover:text-blue-800'
          onClick={() => navigate('/credentials')}
        />
        <h1 className='text-2xl font-semibold '>Change Credential</h1>
      </div>
      <div className='pr-4'>
        <CredentialsForm form={form} onFinish={handleFinish} />
      </div>
    </div>
  )
}

export default ChangeCredentials
