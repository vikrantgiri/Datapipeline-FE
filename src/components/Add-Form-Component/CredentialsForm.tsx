import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Button, InputNumber } from 'antd'
import client from '../../api/axiosInstance'

const { Option } = Select

interface CredentialsFormProps {
  form: any
  onFinish: (values: any) => void
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  form,
  onFinish,
}) => {
  const [thirdPartyOptions, setThirdPartyOptions] = useState<string[]>([])

  useEffect(() => {
    const fetchThirdParties = async () => {
      try {
        const res = await client.get('/filter/get-third-party-filters')

        if (res?.data?.error == null) {
          const parsed = res.data.data.map(
            (item: any) => Object.values(item)[0]
          )
          setThirdPartyOptions(parsed)
          console.log('Third Party options fetched!', parsed)
        }
      } catch (error) {
        console.error('Error fetching third-party options.', error)
      }
    }
    fetchThirdParties()

    // const fetchCreatedBy = async () => {
    //   try {

    //     const res = await client.get("/user/get-user-filters");

    //     if (res?.data?.error == null) {
    //       setCreatedByOptions(res.data.data);
    //       console.log("Created By options fetched!", res.data.data);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching created by options.", error);
    //   }
    // };
    // fetchCreatedBy();
  }, [])

  return (
    <>
      <div className='max-h-[600px] overflow-y-auto p-4  rounded'>
        <Form
          form={form}
          layout='vertical'
          onFinish={values => onFinish(values)}
          className='space-y-4'
        >
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

          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name='host' label='Host'>
            <Input />
          </Form.Item>

          <Form.Item name='database' label='Database'>
            <Input />
          </Form.Item>

          <Form.Item
            name='username'
            label='Username'
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[{ required: true, message: 'Please enter a password' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name='port' label='Port'>
            <InputNumber min={0} max={65535} style={{ width: 'fit-content' }} />
          </Form.Item>

          {/* <Form.Item
            name="created_by_id"
            label="Created by"
            rules={[
              { required: true, message: "Please select who created it" },
            ]}
          >
            <Select placeholder="--------">
              {createdByOptions.map((item) => (
                <Option key={item.id} value={item.id}>
                    {item.username}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
        </Form>
      </div>

      <div className='flex gap-4 pt-4'>
        <Button type='primary' onClick={() => form.submit()}>
          SAVE
        </Button>

        <Button onClick={() => form.resetFields()}>Reset</Button>
      </div>
    </>
  )
}

export default CredentialsForm
//
