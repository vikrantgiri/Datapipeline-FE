import React, { useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd'
import client from '../../api/axiosInstance'
const { Option } = Select

interface SnowflakeFormProps {
  form: any
  onFinish: (values: any) => void
  initialValues?: any
}

const SnowflakeForm: React.FC<SnowflakeFormProps> = ({ form, onFinish }) => {
  const [scheduled, setScheduled] = React.useState<string[]>([])

  useEffect(() => {
    const fetchScheduledOptions = async () => {
      try {
        const res = await client.get('/filter/get-schedule-types')

        if (res?.data?.error == null) {
          const parsed = res.data.data.map(
            (item: any) => Object.values(item)[0]
          )
          setScheduled(parsed)
        }
      } catch (error) {
        console.error('Error fetching scheduled options.', error)
      }
    }
    fetchScheduledOptions()
  }, [])
  return (
    <>
      <div className='max-h-[600px] overflow-y-auto p-4 rounded'>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            name='email_recipients'
            label='Recipient Emails'
            rules={[
              {
                required: true,
                message: 'Please enter at least one recipient email',
              },
              {
                validator: (_, value) => {
                  if (
                    Array.isArray(value) &&
                    value.every(email =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    )
                  ) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Please enter valid email addresses')
                  )
                },
              },
            ]}
          >
            <Select
              mode='tags'
              tokenSeparators={[',']}
              placeholder='Enter one or more emails'
            />
          </Form.Item>

          <Form.Item
            name='sql_script'
            label='Script'
            rules={[{ required: true, message: 'Please enter script' }]}
          >
            <Input.TextArea rows={5} placeholder='Enter your script here...' />
          </Form.Item>

          <Form.Item
            name='scheduled'
            label='Schedule'
            rules={[{ required: true, message: 'Please select a schedule' }]}
          >
            <Select placeholder='Select schedule'>
              {/* <Option value='Daily'>Daily</Option>
              <Option value='Weekly'>Weekly</Option>
              <Option value='Monthly'>Monthly</Option> */}
              {scheduled.map((option: string, index: number) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
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

export default SnowflakeForm
