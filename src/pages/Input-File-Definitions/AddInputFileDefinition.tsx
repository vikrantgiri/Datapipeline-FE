import React, { useState } from 'react'
import { Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import InputFileForm from '../../components/Add-Form-Component/InputFileDForm'
import client from '../../api/axiosInstance'
import { PROTECTED_ROUTES } from '../../constants/routes'

const AddInputFileDefinition: React.FC = () => {
  const [form] = Form.useForm()
  const [inputFiles, setInputFiles] = useState<any[]>([])
  const navigate = useNavigate()

  const handleFinish = async (values: any) => {
    console.log('Payload :', values)

    try {
      const res = await client.post('/input-file-def', values)

      const newinputFiles = res.data

      newinputFiles.key = inputFiles.length + 1
      newinputFiles.createdAt = new Date().toLocaleString()
      newinputFiles.updatedAt = new Date().toLocaleString()

      setInputFiles([newinputFiles, ...inputFiles])

      form.resetFields()

      message.success('File Download Definition  successfully added.')

      navigate(`${PROTECTED_ROUTES.INPUT_FILE_DEFINITIONS}`)
    } catch (error) {
      console.error(error)
      message.error('Failed to add file download definition.')
    }
  }

  return (
    <div className='text-gray-900 min-h-screen'>
      <div className='flex items-center gap-2 mb-6'>
        <ArrowLeftOutlined
          className='text-xl cursor-pointer text-blue-600 hover:text-blue-800'
          onClick={() => navigate(PROTECTED_ROUTES.INPUT_FILE_DEFINITIONS)}
        />
        <h1 className='text-2xl font-semibold '>Add Input File Definition</h1>
      </div>
      <InputFileForm form={form} onFinish={handleFinish} />
    </div>
  )
}

export default AddInputFileDefinition
