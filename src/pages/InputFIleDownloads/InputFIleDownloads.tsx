import { useEffect, useState } from 'react'
import { Button, List, Typography, message, Spin, Alert } from 'antd'
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons'
import client from '../../api/axiosInstance'
import { toast } from 'react-toastify'

const { Title, Text } = Typography

// State to track individual button loading
type DownloadLoadingState = {
  [key: string]: boolean
}

const InputFileDownloads = () => {
  const [fileList, setFileList] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState<DownloadLoadingState>({})

  useEffect(() => {
    const fetchFileList = async () => {
      setLoading(true)
      try {
        // 1. Fetch the list of files
        const res = await client.get('/prescreen/list')

        // Assuming the response data is an array of strings
        if (Array.isArray(res.data.data.files)) {
          setFileList(res.data.data.files)
        } else {
          // Handle cases where API returns something unexpected
          console.error('Expected an array of files, but got:', res.data)
          setFileList([])
          setError('File list format is incorrect.')
        }
      } catch (err) {
        console.error('Failed to fetch file list.', err)
        setError('Could not load the list of files. Please try again.')
        message.error('Failed to fetch file list.')
      } finally {
        setLoading(false)
      }
    }

    fetchFileList()
  }, [])

  const handleDownload = async (fileName: string, type: 'full' | '500') => {
    const downloadKey = `${fileName}-${type}`
    setDownloading(prev => ({ ...prev, [downloadKey]: true }))

    try {
      const res = await client.get('/prescreen/download/input-file', {
        params: {
          file_name: fileName,
          type: type,
        },
        // Crucial: Tell Axios to expect a binary file (blob)
        responseType: type==='full' ? 'json' : 'blob',
      })


      if (type === 'full') {
        const presignedUrl = res?.data?.data?.download_url;
      
        console.log("Presigned URL:", presignedUrl);
      
        window.location.href = presignedUrl;
      
        return;
      }
      

      // Create a URL for the blob
      const blob = new Blob([res.data])
      const url = window.URL.createObjectURL(blob)

      // Create a temporary link element to trigger the download
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url

      // Set the appropriate filename with extension
      const downloadFileName =
        type === '500' ? `${fileName}_top500.csv` : `${fileName}_full.zip`

      a.download = downloadFileName

      // Trigger the download
      document.body.appendChild(a)
      a.click()

      // Clean up
      window.URL.revokeObjectURL(url)
      a.remove()

      message.success(`Download started for ${downloadFileName}`)
    } catch (err) {
      console.error('Failed to download file.', err)
      message.error(`Failed to download ${fileName}.`)
      toast.error('File download failed.')
    } finally {
      setDownloading(prev => ({ ...prev, [downloadKey]: false }))
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <Spin
          size='large'
          className='flex justify-center items-center h-full'
        />
      )
    }

    if (error) {
      return <Alert message='Error' description={error} type='error' showIcon />
    }

    if (fileList.length === 0) {
      return (
        <Alert
          message='No files available for download.'
          type='info'
          showIcon
        />
      )
    }

    return (
      <List
        className='w-full'
        bordered
        dataSource={fileList}
        renderItem={fileName => (
          <List.Item
            actions={[
              <Button
                key='download-500'
                icon={<FileTextOutlined />}
                loading={downloading[`${fileName}-500`]}
                onClick={() => handleDownload(fileName, '500')}
              >
                Download Top 500 (.csv)
              </Button>,
              <Button
                key='download-full'
                type='primary'
                icon={<DownloadOutlined />}
                loading={downloading[`${fileName}-full`]}
                onClick={() => handleDownload(fileName, 'full')}
              >
                Download Full (.zip)
              </Button>,
            ]}
          >
            <Text strong>{fileName}</Text>
          </List.Item>
        )}
      />
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <Title level={2} className='text-3xl font-bold text-gray-900'>
            Input File Downloads
          </Title>
          <p className='text-gray-600 mt-1'>
            Download full files or the top 500 rows.
          </p>
        </div>
      </div>

      {/* File List */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center'>
        {renderContent()}
      </div>
    </div>
  )
}

export default InputFileDownloads
