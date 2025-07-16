import React, { useCallback, useEffect, useState } from 'react'
import {
  Form,
  Card,
  Spin,
  Alert,
  Tag,
  Empty,
  Button,
  Avatar,
  Typography,
  Row,
  Col,
  Badge,
} from 'antd'
import {
  UserOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import client from '../../api/axiosInstance'
import { useLocation, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const TriggerLeadByID: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [leadData, setLeadData] = useState<Record<string, any>>({})

  const location = useLocation()
  const navigate = useNavigate()
  const { record } = location.state || {}

  // Helper function to format field labels
  const formatLabel = (key: string): string => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
  }

  // Helper function to format field values
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'Not provided'
    if (value === 999999997) return 'Unknown'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (typeof value === 'object') return JSON.stringify(value)
    return value.toString()
  }

  // Helper function to get display color based on value
  const getValueColor = (value: any): string => {
    if (value === null || value === undefined) return '#8c8c8c'
    if (value === 999999997) return '#faad14'
    return '#1890ff'
  }

  // Helper function to get appropriate icon for field
  const getFieldIcon = (key: string) => {
    const lowerKey = key.toLowerCase()
    if (lowerKey.includes('phone') || lowerKey.includes('mobile'))
      return <PhoneOutlined />
    if (lowerKey.includes('email') || lowerKey.includes('mail'))
      return <MailOutlined />
    if (lowerKey.includes('address') || lowerKey.includes('location'))
      return <HomeOutlined />
    if (lowerKey.includes('date') || lowerKey.includes('time'))
      return <CalendarOutlined />
    if (
      lowerKey.includes('price') ||
      lowerKey.includes('amount') ||
      lowerKey.includes('cost')
    )
      return <DollarOutlined />
    if (lowerKey.includes('company') || lowerKey.includes('organization'))
      return <TeamOutlined />
    return <InfoCircleOutlined />
  }

  // Helper function to categorize fields
  const categorizeFields = (data: Record<string, any>) => {
    const categories = {
      personal: [] as Array<[string, any]>,
      contact: [] as Array<[string, any]>,
      business: [] as Array<[string, any]>,
      other: [] as Array<[string, any]>,
    }

    Object.entries(data).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase()
      if (
        lowerKey.includes('name') ||
        lowerKey.includes('age') ||
        lowerKey.includes('gender')
      ) {
        categories.personal.push([key, value])
      } else if (
        lowerKey.includes('phone') ||
        lowerKey.includes('email') ||
        lowerKey.includes('address')
      ) {
        categories.contact.push([key, value])
      } else if (
        lowerKey.includes('company') ||
        lowerKey.includes('business') ||
        lowerKey.includes('job') ||
        lowerKey.includes('price') ||
        lowerKey.includes('amount')
      ) {
        categories.business.push([key, value])
      } else {
        categories.other.push([key, value])
      }
    })

    return categories
  }
  const getElementById = useCallback(
    async (id: number) => {
      try {
        setLoading(true)
        setError('')

        const res = await client.get(`/trigger-leads/${id}`)
        const item = res.data.data

        // Remove ID field from the data
        const { id: itemId, created_at, updated_at, ...filteredData } = item
        setLeadData(filteredData)
        form.setFieldsValue(filteredData)
        console.log(itemId, created_at, updated_at)
      } catch (err) {
        console.error('Failed to fetch lead data:', err)
        setError('Failed to fetch lead data. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    [form]
  )

  useEffect(() => {
    if (record?.id) {
      getElementById(record.id)
    } else {
      setError('No lead ID provided')
      setLoading(false)
    }
  }, [record?.id, getElementById])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <Card
          className='text-center p-8 shadow-lg'
          style={{ borderRadius: '16px' }}
        >
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
            tip='Loading lead details...'
            size='large'
          />
          <div className='mt-4'>
            <Text type='secondary'>
              Please wait while we fetch the lead information...
            </Text>
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <Card className='text-center p-8 ' style={{ borderRadius: '16px' }}>
          <Alert
            message='Oops! Something went wrong'
            description={error}
            type='error'
            showIcon
            className='mb-6'
          />
          <Button
            type='primary'
            onClick={() => navigate(-1)}
            icon={<ArrowLeftOutlined />}
            size='large'
          >
            Go Back
          </Button>
        </Card>
      </div>
    )
  }

  if (Object.keys(leadData).length === 0) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <Card className='text-center p-8 ' style={{ borderRadius: '16px' }}>
          <Empty
            description='No lead data available'
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
          <Button
            type='primary'
            onClick={() => navigate(-1)}
            icon={<ArrowLeftOutlined />}
            size='large'
            className='mt-4'
          >
            Go Back
          </Button>
        </Card>
      </div>
    )
  }

  const categories = categorizeFields(leadData)

  const renderFieldSection = (
    title: string,
    fields: Array<[string, any]>,
    icon: React.ReactNode
  ) => {
    if (fields.length === 0) return null

    return (
      <Card
        title={
          <div className='flex items-center gap-2'>
            {icon}
            <span className='font-semibold'>{title}</span>
            <Badge count={fields.length} showZero color='#52c41a' />
          </div>
        }
        className='mb-6 shadow-sm  transition-shadow duration-200'
        style={{ borderRadius: '12px' }}
      >
        <Row gutter={[16, 16]}>
          {fields.map(([key, value]) => {
            const formattedValue = formatValue(value)
            const valueColor = getValueColor(value)

            return (
              <Col xs={24} sm={12} key={key}>
                <div className='border rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors duration-200'>
                  <div className='flex items-center gap-2 mb-2'>
                    {getFieldIcon(key)}
                    <Text strong className='text-gray-700'>
                      {formatLabel(key)}
                    </Text>
                    {(value === null || value === undefined) && (
                      <Tag color='default' className='text-xs'>
                        Empty
                      </Tag>
                    )}
                    {/* {value === 999999997 && (
                      <Tag color="warning" className="text-xs">
                        Unknown
                      </Tag>
                    )} */}
                  </div>
                  <div
                    className='text-base font-medium p-2 bg-gray-50 rounded border-l-4 '
                    style={{ color: valueColor }}
                  >
                    {formattedValue}
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </Card>
    )
  }

  return (
    <div className=''>
      <div className=' bg-gradient-to-br '>
        <div className='mx-auto'>
          {/* Header */}
          <Card className='mb-6 border-0' style={{ borderRadius: '16px' }}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  className='bg-gradient-to-r from-blue-400 to-purple-500'
                />
                <div>
                  <Title level={2} className='m-0 text-gray-800'>
                    Lead Profile
                  </Title>
                  <Text type='secondary' className='text-base'>
                    Complete overview of lead information and details
                  </Text>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate(-1)}
                  size='large'
                  type='default'
                >
                  Back
                </Button>
              </div>
            </div>
          </Card>

          {/* Content Sections */}
          <div className='space-y-6 '>
            <div className='mt-5'>
              {renderFieldSection(
                'Personal Information',
                categories.personal,
                <UserOutlined className='text-blue-600' />
              )}
            </div>
            <div className='mt-5'>
              {renderFieldSection(
                'Contact Details',
                categories.contact,
                <PhoneOutlined className='text-green-600' />
              )}
            </div>
            <div className='mt-5'>
              {renderFieldSection(
                'Business Information',
                categories.business,
                <TeamOutlined className='text-purple-600' />
              )}
            </div>
            <div className='mt-5'>
              {renderFieldSection(
                'Additional Information',
                categories.other,
                <InfoCircleOutlined className='text-orange-600' />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TriggerLeadByID
