import React, { useEffect, useState } from 'react'
import { Select, message, Spin, Button, Badge } from 'antd'
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DownOutlined,
  FilterOutlined,
  ClearOutlined,
} from '@ant-design/icons'
import { getThirdPartyFilters } from '../../api/filter-api'

const { Option } = Select

interface CredentialsFilterProps {
  title: string
  showCounts: boolean
  setShowCounts: (value: boolean) => void
  selectLabel: string
  selectedValue: string
  onSelectChange: (value: string) => void
  onClearFilters?: () => void
}

const CredentialsFilter: React.FC<CredentialsFilterProps> = ({
  title,
  showCounts,
  setShowCounts,
  selectLabel,
  selectedValue,
  onSelectChange,
  onClearFilters,
}) => {
  const [options, setOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await getThirdPartyFilters()

        const rawData = res?.data as { [key: string]: string }[]

        if (Array.isArray(rawData)) {
          const formattedOptions = rawData.map(item => Object.values(item)[0])
          setOptions(formattedOptions)
        } else {
          message.warning('Unexpected data format from API.')
        }
      } catch (error) {
        console.error('Error fetching third-party filters:', error)
        message.error('Failed to fetch third-party filters.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const hasActiveFilters = selectedValue

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4'>
      <div className='flex flex-col gap-4'>
        {/* Header Section */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2'>
              <FilterOutlined className='text-gray-500 text-lg' />
              <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
            </div>
            {hasActiveFilters && (
              <Badge
                count={1}
                className='bg-blue-100 text-blue-800'
                style={{
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
              />
            )}
          </div>

          <div className='flex items-center gap-2'>
            <Button
              type='text'
              size='small'
              onClick={() => setShowCounts(!showCounts)}
              icon={showCounts ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              className='text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              title={showCounts ? 'Hide Count' : 'Show Count'}
            >
              {showCounts ? 'Hide Counts' : 'Show Counts'}
            </Button>

            {hasActiveFilters && (
              <Button
                type='text'
                size='small'
                onClick={onClearFilters}
                icon={<ClearOutlined />}
                className='text-gray-600 hover:text-red-600 hover:bg-red-50'
                title='Clear all filters'
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Filter Controls Section */}
        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center'>
          <div className='flex items-center gap-3 min-w-0 flex-1'>
            <label className='text-sm font-medium text-gray-700 whitespace-nowrap min-w-fit'>
              {selectLabel}:
            </label>

            <div className='flex-1 min-w-[200px] max-w-[300px]'>
              {loading ? (
                <div className='flex items-center justify-center h-8'>
                  <Spin size='small' />
                </div>
              ) : (
                <Select
                  value={selectedValue || undefined}
                  onChange={value => onSelectChange(value)}
                  suffixIcon={<DownOutlined />}
                  className='w-full'
                  placeholder='Select Third Party'
                  allowClear
                  size='middle'
                >
                  {options.map(opt => (
                    <Option key={opt} value={opt}>
                      {opt}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
          </div>

          {/* Active Filter Display */}
          {hasActiveFilters && (
            <div className='flex flex-wrap gap-2'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200'>
                <span className='font-medium'>Third Party:</span>
                <span className='text-blue-800'>{selectedValue}</span>
                <button
                  onClick={() => onSelectChange('')}
                  className='ml-1 text-blue-500 hover:text-blue-700 font-semibold text-base leading-none'
                  title='Remove filter'
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Summary */}
        {hasActiveFilters && (
          <div className='pt-2 border-t border-gray-100'>
            <div className='flex items-center justify-between text-sm text-gray-600'>
              <span>
                <strong>1</strong> filter applied
              </span>
              <span className='text-xs'>
                Results will be filtered based on your selection
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CredentialsFilter
