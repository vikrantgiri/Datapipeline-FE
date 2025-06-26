import React, { useState } from 'react'
import { Form } from 'antd'

import FilesForm from '../../components/Add-Form-Component/FilesForm'

const AddFiles: React.FC = () => {
  const [form] = Form.useForm()
  const [file, setFile] = useState<any[]>([])

  const handleFinish = (values: any) => {
    console.log('Payload :', values)

    // const file = values?.file?.file;
    // console.log("Uploaded file:", file);

    const newFile = {
      key: file.length + 1,
      ...values,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    }
    setFile([newFile, ...file])

    form.resetFields()
  }

  const userOptions = ['admin', 'mikelyons', 'super', 'system', 'tylerplack']

  return (
    <div className='text-white min-h-screen'>
      <h1 className='text-2xl text-black font-semibold mb-6'>Add File</h1>

      <FilesForm
        form={form}
        onSubmit={handleFinish}
        userOptions={userOptions}
      />
    </div>
  )
}

export default AddFiles
