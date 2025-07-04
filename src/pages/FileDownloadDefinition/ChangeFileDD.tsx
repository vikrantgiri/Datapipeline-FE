import React, { useEffect, useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FileDownloadForm from '../../components/Add-Form-Component/FileDDForm'
import { Form, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import client from '../../api/axiosInstance'
import { PROTECTED_ROUTES } from '../../constants/routes'
import { LoadingSpinner } from '../../components/ui'

const ChangeFileDD: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { record } = location.state || {}
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  // useEffect(() => {
  //   if (record) {
  //     form.setFieldsValue({
  //       ...record,
  //       credentials: record.credentials?.name,
  //       user: record.user?.username,
  //     })
  //   }
  // }, [record])

  const getElementById = useCallback(
    async (id: any) => {
      setLoading(true)
      try {
        const res = await client.get(`/file-download-def/${id}`)
        const item = res.data.data
        console.log(item)
        form.setFieldsValue({
          ...item,
          credentials: item?.credentials?.id,
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
  }, [record?.key, getElementById, record?.id])

  const handleFinish = async (values: any) => {
    try {
      await client.put(`/file-download-def/${record.id}`, values)
      message.success('File Download Definition updated successfully.')
      navigate(PROTECTED_ROUTES.FILE_DOWNLOAD_DEFINITION)
    } catch (error) {
      console.error('Failed to update.', error)
      message.error('Failed to update File Download Definition.')
    }
  }

  return (
    <div className='text-black min-h-screen'>
      {loading && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
          <LoadingSpinner fullScreen />
        </div>
      )}
      <div className='flex items-center gap-2 mb-6'>
        <ArrowLeftOutlined
          className='text-xl cursor-pointer text-blue-600 hover:text-blue-800'
          onClick={() => navigate('/file-download-definitions')}
        />
        <h1 className='text-2xl text-black font-semibold '>
          Change File Download Definition
        </h1>
      </div>
      <div className='pr-4'></div>

      <FileDownloadForm
        form={form}
        onFinish={handleFinish}
        // initialValues={record}
      />
    </div>
  )
}

export default ChangeFileDD
