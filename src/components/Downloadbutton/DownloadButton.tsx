import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Type of file list API response
interface FileListResponse {
  data: {
    files: string[]
  }
}

const DownloadButton: React.FC = () => {
  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    axios
      .get<FileListResponse>('http://127.0.0.1:8000/api/v1/prescreen/list')
      .then(response => {
        console.log(response.data)
        setFiles(response.data.data.files)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const handleDownload = async (file: string, type: string) => {
    try {
      const response = await axios.get(
        `${process.env.VITE_BASE_URL}/download-input-file?file_name=${encodeURIComponent(
          file
        )}&type=${type}`,
        { responseType: 'blob' }
      )

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]))

      const contentDisposition = response.headers['content-disposition']
      let fileName = 'download.zip'

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/)
        if (match) fileName = match[1]
      }

      const link = document.createElement('a')
      link.href = blobUrl
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='space-y-4'>
      {files.map((file: string) => (
        <div key={file}>
          <div className='w-full h-10 bg-gray-200 rounded-md p-6 flex items-center justify-center gap-10'>
            {file}

            <button
              onClick={() => handleDownload(file, 'full')}
              className='bg-blue-500 text-white px-3 py-1 rounded-md'
            >
              Download Full
            </button>

            <button
              onClick={() => handleDownload(file, '500')}
              className='bg-green-500 text-white px-3 py-1 rounded-md'
            >
              Download 500
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DownloadButton
