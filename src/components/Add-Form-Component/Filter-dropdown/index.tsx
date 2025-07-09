import React from 'react'
import { Select, Typography } from 'antd'

const { Option } = Select

interface FilterDropdownProps {
  title: string
  options?: { [key: string]: string }[] | { id: number; name: string }[] // Fix type
  value?: string
  onChange: (value: string) => void
  type?: 'key-value' | 'id-value'
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  title,
  options,
  value,
  onChange,
  type = 'key-value',
}) => {
  return (
    <div className='block text-sm font-semibold mb-1'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography.Text strong>{title}</Typography.Text>
        <Select
          value={value}
          onChange={onChange}
          // style={{ width: 200 }}
          size='middle'
        >
          <Option value=''>All</Option>
          {type == 'key-value' ? (
            <>
              {options?.map((item, index) => {
                const [key, value] = Object.entries(item)[0] // get the first key-value pair from each object
                console.log(key)
                return (
                  <Option key={index} value={value}>
                    {value}
                  </Option>
                )
              })}
            </>
          ) : (
            <>
              {options?.map((item, index) => {
                return (
                  <Option key={index} value={String(item.id)}>
                    {item.name}
                  </Option>
                )
              })}
            </>
          )}
        </Select>
      </div>
    </div>
  )
}

export default FilterDropdown
