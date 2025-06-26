import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select } from 'antd'

import client from '../../api/axiosInstance'

const { Option } = Select

interface FileDownloadFormProps {
  form: any
  onFinish: (values: any) => void
  initialValues?: any
}

const FileDownloadForm: React.FC<FileDownloadFormProps> = ({
  form,
  onFinish,
}) => {
  const [credentialsOptions, setCredentialsOptions] = useState<any[]>([])
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const res = await client.get('/filter/get-credentials')

        if (res?.data?.error == null) {
          setCredentialsOptions(res.data.data)
        }
      } catch (error) {
        console.error('Error fetching credentials.', error)
      }
    }
    fetchCredentials()
  }, [])

  return (
    <>
      <div className='max-h-[600px] overflow-y-auto p-4  rounded'>
        <Form
          form={form}
          layout='vertical'
          onFinish={values => onFinish(values)}
        >
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='credentials_id'
            label='Credentials'
            rules={[{ required: true, message: 'Please select credentials' }]}
          >
            <Select placeholder='Select Credentials'>
              {credentialsOptions.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='remote_path'
            label='Remote Path'
            rules={[{ required: true, message: 'Please enter a remote path' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name='post_to_dc' label='Post to DC'>
            <Select>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          <Form.Item name='dc_lead_token' label='DC Lead Token'>
            <Input />
          </Form.Item>

          <Form.Item name='dc_lead_key' label='DC Lead Key'>
            <Input />
          </Form.Item>

          <Form.Item name='post_to_call_shaper' label='Post to Call Shaper'>
            <Select>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          <Form.Item name='insert_to_postgres' label='Insert to Postgres'>
            <Select>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          <Form.Item name='append_placekey' label='Append PlaceKey'>
            <Select>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          <Form.Item name='append_phone_no' label='Append Phone Number'>
            <Select>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          <Form.Item name='append_email' label='Append Email'>
            <Select>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          <Form.Item name='append_home_value' label='Append Home Value'>
            <Select>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>

      <div className='flex gap-4 pt-4'>
        <Button type='primary' htmlType='submit' onClick={() => form.submit()}>
          Save
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </div>
    </>
  )
}

export default FileDownloadForm
