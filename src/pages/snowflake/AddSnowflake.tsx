// import React, { useState } from 'react'
import { Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import client from '../../api/axiosInstance'
import { PROTECTED_ROUTES } from '../../constants/routes'
import SnowflakeForm from '../../components/Add-Form-Component/SnowfaleForm'

const AddSnowflake: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleFinish = async (values: any) => {
    try {
      console.log('Submitting payload:', values)
      // Format the time field if it's present
      const payload = {
        ...values,
        time: values.time?.toISOString(),
      }

      await client.post('/snowflake-scripts', payload)

      message.success('Snowflake record added successfully.')
      navigate(PROTECTED_ROUTES.SNOWFLAKE)
    } catch (error) {
      console.error('Failed to add Snowflake record:', error)
      message.error('Failed to add Snowflake record.')
    }
  }

  return (
    <div className='text-black'>
      <div className='flex items-center gap-2 mb-6'>
        <ArrowLeftOutlined
          className='text-xl cursor-pointer text-blue-600 hover:text-blue-800'
          onClick={() => navigate(PROTECTED_ROUTES.SNOWFLAKE)}
        />
        <h1 className='text-2xl font-semibold'>Add Snowflake Record</h1>
      </div>

      <div className='pr-4'>
        <SnowflakeForm form={form} onFinish={handleFinish} />
      </div>
    </div>
  )
}

export default AddSnowflake
