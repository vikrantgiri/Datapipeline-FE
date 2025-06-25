import React from 'react'
import { Form, Input, Button, Select, Divider, DatePicker } from 'antd'

const fieldList = [
  { label: 'SSN', type: 'text' },
  { label: 'First name', type: 'text' },
  { label: 'Last name', type: 'text' },
  { label: 'Dob', type: 'date' },
  { label: 'State', type: 'text' },
  { label: 'City', type: 'text' },
  { label: 'Zip', type: 'text' },
  { label: 'Address', type: 'text' },
  { label: 'Fico', type: 'number' },
  { label: 'Installment balance', type: 'number' },
  { label: 'Revolving balance', type: 'number' },
  { label: 'Revolving payments', type: 'number' },
  { label: 'Installment payments', type: 'number' },
  { label: 'Mortgage balance', type: 'number' },
  { label: 'Mortgage original amount', type: 'number' },
  { label: 'Mortgage open date', type: 'date' },
  { label: 'Heloc balance', type: 'number' },
  { label: 'Heloc limit', type: 'number' },
  { label: 'Heloc payment', type: 'number' },
  { label: 'Heloc open date', type: 'date' },
  { label: 'Home value', type: 'number' },
  { label: 'Phone data', type: 'text' },
  { label: 'Experian identifier', type: 'text' },
  { label: 'Transunion identifier', type: 'text' },
  { label: 'Placekey', type: 'text' },
]

const { Option } = Select

const TriggerLeadForm: React.FC = () => {
  const [form] = Form.useForm()

  const handleFinish = (values: any) => {
    console.log('Form submitted:', values)
  }

  return (
    <>
      <div className='max-h-[600px] overflow-y-auto p-4 bg-white rounded '>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleFinish}
          className='max-w-4xl space-y-4'
        >
          {fieldList.map(field => (
            <Form.Item
              key={field.label}
              label={field.label}
              name={field.label.replace(/\s+/g, '_').toLowerCase()}
            >
              {field.type === 'date' ? (
                <DatePicker className='w-full' />
              ) : (
                <Input type={field.type} />
              )}
            </Form.Item>
          ))}
          <Form.Item name='dataSource' label='Data source'>
            <Select placeholder='unspecified'>
              <Option value='TransUnion'>TransUnion</Option>
              <Option value='Experian'>Experian</Option>
              <Option value='Experian'>Unspecified</Option>
            </Select>
          </Form.Item>

          <Form.Item label='Lead type' name='leadType'>
            <Select placeholder='unspecified'>
              <Option value='hecm'>HECM to HECM</Option>
              <Option value='firstTimeReverse'>First Time Reverse</Option>
              <Option value='unspecified'>Unspecified</Option>
            </Select>
          </Form.Item>

          <Divider />
        </Form>
      </div>
      <div className='flex gap-4'>
        <Button type='primary' htmlType='submit'>
          SAVE
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
        <Button>Save and Add Another</Button>
        <Button>Save and Continue Editing</Button>
      </div>
    </>
  )
}

export default TriggerLeadForm
