import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, Divider } from 'antd'
import DownloadButton from '../Downloadbutton/Downloadbutton'

import client from '../../api/axiosInstance'

const { Option } = Select
const { TextArea } = Input

interface InputFileFormProps {
  form: any
  onFinish: (values: any) => void
  // initialValues?: any;
}

const InputFileForm: React.FC<InputFileFormProps> = ({
  form,
  onFinish,
  // initialValues,
}) => {
  const [thirdPartyOptions, setThirdPartyOptions] = useState<string[]>([])
  const [campaignTypeOptions, setCampaignTypeOptions] = useState<string[]>([])
  const [taskTypeOptions, setTaskTypeOptions] = useState<string[]>([])
  const [credentialsOptions, setCredentialsOptions] = useState<any[]>([])

  useEffect(() => {
    // if (initialValues) {
    //   form.setFieldsValue(initialValues);
    // }

    const fetchTaskType = async () => {
      try {
        const res = await client.get('/filter/get-data-source')

        if (res?.data?.error == null) {
          const parsed = res.data.data.map(
            (item: any) => Object.values(item)[0]
          )
          setTaskTypeOptions(parsed)
        }
      } catch (error) {
        console.error('Error fetching task type options.', error)
      }
    }
    fetchTaskType()

    const fetchCampaignType = async () => {
      try {
        const res = await client.get('/filter/get-campaign-types')

        if (res?.data?.error == null) {
          const parsed = res.data.data.map(
            (item: any) => Object.values(item)[0]
          )
          setCampaignTypeOptions(parsed)
        }
      } catch (error) {
        console.error('Error fetching campaign type options.', error)
      }
    }
    fetchCampaignType()

    const fetchThirdParties = async () => {
      try {
        const res = await client.get('/filter/get-third-party-filters')

        if (res?.data?.error == null) {
          const parsed = res.data.data.map(
            (item: any) => Object.values(item)[0]
          )
          setThirdPartyOptions(parsed)
        }
      } catch (error) {
        console.error('Error fetching third-party options.', error)
      }
    }
    fetchThirdParties()

    const fetchCredentials = async () => {
      try {
        const res = await client.get('/filter/get-credentials')

        if (res?.data?.error == null) {
          setCredentialsOptions(res.data.data)
        }
      } catch (error) {
        console.error('Error fetching .', error)
      }
    }
    fetchCredentials()
  }, [])
  // [initialValues, form]);

  return (
    <>
      <div className='max-h-[600px] overflow-y-auto p-4 bg-white rounded '>
        <Form
          form={form}
          layout='vertical'
          onFinish={values => onFinish(values)}
          className='text-black p-6 rounded space-y-6'
        >
          <Form.Item
            label='Task Type'
            name='task_type'
            rules={[{ required: true }]}
          >
            <Select placeholder='unspecified'>
              {taskTypeOptions.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Campaign Type'
            name='campaign_type'
            rules={[{ required: true }]}
          >
            <Select placeholder='--------'>
              {campaignTypeOptions.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='third_party'
            label='Third Party'
            rules={[{ required: true, message: 'Please select a third party' }]}
          >
            <Select placeholder='--------'>
              {thirdPartyOptions.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label='Credentials' name='credentials_id'>
            <Select placeholder='--------'>
              {credentialsOptions.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label='Max column size (bytes)' name='max_column_size'>
            <Input type='number' placeholder='e.g. 44' />
          </Form.Item>

          <Form.Item label='Remote path' name='remote_path'>
            <Input placeholder='' />
          </Form.Item>

          <Form.Item label='Custom filename' name='custom_filename'>
            <Input placeholder='' />
          </Form.Item>

          <Form.Item label='SQL script' name='sql_script'>
            <TextArea placeholder='' rows={4} />
          </Form.Item>

          <Form.Item label='Use tabu' name='use_tabu'>
            <Select placeholder='No'>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          <Form.Item label='Bucketize' name='bucketize'>
            <Select placeholder='No'>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          <Divider />
        </Form>
      </div>
      <div className='flex gap-4 pt-4'>
        <Button type='primary' onClick={() => form.submit()}>
          SAVE
        </Button>
        {/* <Button>Save and add another</Button>
        <Button>Save and continue editing</Button> */}
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </div>
    </>
  )
}

export default InputFileForm
