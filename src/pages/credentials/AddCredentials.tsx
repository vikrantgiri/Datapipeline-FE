import React, { useState } from 'react'
import { Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import client from '../../api/axiosInstance'
import CredentialsForm from '../../components/Add-Form-Component/CredentialsForm'

const AddCredentials: React.FC = () => {
  const [form] = Form.useForm()
  const [credentials, setCredentials] = useState<any[]>([])
  const navigate = useNavigate()

  const handleFinish = async (values: any) => {
    console.log('Payload :', values)
    try {
      const res = await client.post('/credentials', values)
      const newCredential = res.data
      newCredential.key = credentials.length + 1
      newCredential.createdAt = new Date().toLocaleString()
      newCredential.updatedAt = new Date().toLocaleString()

      setCredentials([newCredential, ...credentials])
      form.resetFields()
      message.success('Credential successfully added.')
      navigate('/credentials')
    } catch (error) {
      console.error(error)
      message.error('Failed to add credential.')
    }
  }

  return (
    <div className='text-gray-900 min-h-screen'>
      <div className='flex items-center gap-2 mb-6'>
        <ArrowLeftOutlined
          className='text-xl cursor-pointer text-blue-600 hover:text-blue-800'
          onClick={() => navigate('/credentials')}
        />
        <h1 className='text-2xl font-semibold'>Add Credential</h1>
      </div>

      <div className='pr-4'>
        <CredentialsForm form={form} onFinish={handleFinish} />
      </div>

      {credentials.length > 0 && (
        <div className='mt-12'>
          <h2 className='text-xl mb-4'>Saved Credentials</h2>
        </div>
      )}
    </div>
  )
}

export default AddCredentials
