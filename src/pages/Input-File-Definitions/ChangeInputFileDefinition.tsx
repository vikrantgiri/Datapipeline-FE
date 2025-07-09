import React, { useEffect, useCallback, useState } from 'react'
import { Form, message } from 'antd'
import InputFileForm from '../../components/Add-Form-Component/InputFileDForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import client from '../../api/axiosInstance'
import { PROTECTED_ROUTES } from '../../constants/routes'
import { LoadingSpinner } from '../../components/ui'

const ChangeInputFileDefinition: React.FC = () => {
  const [form] = Form.useForm()
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const { record } = location.state || {}

  const getElementById = useCallback(
    async (id: any) => {
      setLoading(true)
      try {
        const res = await client.get(`/input-file-def/${id}`)
        const item = res.data.data
        form.setFieldsValue({
          ...item,
          credentials: item.credentials?.name,
        })
        message.success('Record fetched.')
      } catch (error) {
        console.error('Failed to fetch.', error)
        message.error('Failed to fetch.')
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
      const res = await client.put(`/input-file-def/${record.id}`, values)
      message.success('Input File Definition updated successfully.')
      if (res.status == 200) {
        navigate(PROTECTED_ROUTES.INPUT_FILE_DEFINITIONS)
      }
    } catch (error) {
      console.error('Failed to update.', error)
      message.error('Failed to update Input File Definition.')
    }
  }

  return (
    <div className='text-black '>
      {loading && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
          <LoadingSpinner fullScreen />
        </div>
      )}
      <div className='flex items-center gap-2 mb-6'>
        <ArrowLeftOutlined
          className='text-xl cursor-pointer text-blue-600 hover:text-blue-800'
          onClick={() => navigate(PROTECTED_ROUTES.INPUT_FILE_DEFINITIONS)}
        />
        <h1 className='text-2xl font-semibold '>
          Change Input File Definition
        </h1>
      </div>
      <InputFileForm form={form} onFinish={handleFinish} />
    </div>
  )
}

export default ChangeInputFileDefinition
