import React from 'react'
import { Select } from 'antd'
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DownOutlined,
} from '@ant-design/icons'

const { Option } = Select

interface FileDDFilterProps {
  title?: string
  showCounts?: boolean
  setShowCounts: (value: boolean) => void

  selectLabel1?: string
  selectLabel2?: string
  selectLabel3?: string
  selectLabel4?: string

  selectedValue1?: string
  selectedValue2?: string
  selectedValue3?: string
  selectedValue4?: string

  onSelectChange1?: (value: string) => void
  onSelectChange2?: (value: string) => void
  onSelectChange3?: (value: string) => void
  onSelectChange4?: (value: string) => void

  selectOptions1: string[]
  selectOptions2?: string[]
  selectOptions3?: string[]
  selectOptions4?: string[]
}

const FileDDFilter: React.FC<FileDDFilterProps> = ({
  title = 'Filters',
  showCounts = false,
  setShowCounts,
  selectLabel1,
  selectLabel2,
  selectLabel3,
  selectLabel4,
  selectedValue1,
  selectedValue2,
  selectedValue3,
  selectedValue4,
  onSelectChange1,
  onSelectChange2,
  onSelectChange3,
  onSelectChange4,
  selectOptions1 = [],
  selectOptions2 = [],
  selectOptions3 = [],
  selectOptions4 = [],
}) => {
  const RenderSelect = (
    label?: string,
    selected?: string,
    onChange?: (value: string) => void,
    options: string[] = []
  ) =>
    label &&
    options?.length > 0 && (
      <div>
        <label className='block text-sm font-medium mb-1'>{label}</label>
        <Select
          value={selected}
          onChange={onChange}
          suffixIcon={<DownOutlined />}
          className='w-full'
        >
          {options.map(opt => (
            <Option key={opt} value={opt}>
              {opt}
            </Option>
          ))}
        </Select>
      </div>
    )

  return (
    <div className='col-span-3'>
      <div className='bg-white p-4 shadow rounded border space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-md font-medium'>{title}</h3>
          <button
            onClick={() => setShowCounts(!showCounts)}
            className='text-gray-600 hover:text-gray-800'
            title={showCounts ? 'Hide Count' : 'Show Count'}
          >
            {showCounts ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        </div>

        {RenderSelect(
          selectLabel1,
          selectedValue1,
          onSelectChange1,
          selectOptions1
        )}
        {RenderSelect(
          selectLabel2,
          selectedValue2,
          onSelectChange2,
          selectOptions2
        )}
        {RenderSelect(
          selectLabel3,
          selectedValue3,
          onSelectChange3,
          selectOptions3
        )}
        {RenderSelect(
          selectLabel4,
          selectedValue4,
          onSelectChange4,
          selectOptions4
        )}
      </div>
    </div>
  )
}

export default FileDDFilter
