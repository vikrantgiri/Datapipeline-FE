import React from 'react'
import { Select, Typography } from 'antd'

const { Option } = Select

interface FilterDropdownProps {
  title: string
  options?:
    | { [key: string]: string }[]
    | { id: number; name: string }[]
    | { label: string; value: string }[]
    | any[]
  value?: string
  onChange: (value: string) => void
  type?: 'key-value' | 'id-value' | 'label-value'
  onSelectStart?: () => void
  onSelectEnd?: () => void
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  title,
  options,
  value,
  onChange,
  type = 'key-value',
  onSelectStart,
  onSelectEnd,
}) => {
  const handleSelectChange = (selectedValue: string) => {
    console.log('FilterDropdown onChange:', { title, selectedValue, type })
    onChange(selectedValue)
  }

  const handleDropdownVisibleChange = (open: boolean) => {
    console.log('FilterDropdown dropdown visible change:', { title, open })
    if (open && onSelectStart) {
      onSelectStart()
    }
    if (!open && onSelectEnd) {
      onSelectEnd()
    }
  }

  // Debug logging to understand the data structure
  console.log('FilterDropdown render:', { title, options, type, value })

  const renderOptions = () => {
    if (!options || options.length === 0) {
      return <Option value=''>No options available</Option>
    }

    if (type === 'id-value') {
      return options.map((item, index) => {
        // Handle different possible data structures
        const id = item.id || item.value || item.key
        const name = item.name || item.label || item.text || String(id)

        return (
          <Option key={`${id}-${index}`} value={String(id)}>
            {name}
          </Option>
        )
      })
    } else if (type === 'label-value') {
      return options.map((item, index) => {
        const label = item.label || item.name || String(item.value)
        const value = item.value || item.id || String(item)

        return (
          <Option key={`${value}-${index}`} value={String(value)}>
            {label}
          </Option>
        )
      })
    } else {
      // key-value type
      return options.map((item, index) => {
        if (typeof item === 'object' && item !== null) {
          const [key, value] = Object.entries(item)[0] || ['', '']
          return (
            <Option key={`${key}-${index}`} value={String(value)}>
              {String(value)}
            </Option>
          )
        } else {
          return (
            <Option key={`${item}-${index}`} value={String(item)}>
              {String(item)}
            </Option>
          )
        }
      })
    }
  }

  return (
    <div className='block text-sm font-semibold mb-4'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography.Text strong>{title}</Typography.Text>
        <Select
          value={value}
          onChange={handleSelectChange}
          onDropdownVisibleChange={handleDropdownVisibleChange}
          size='middle'
          style={{ width: '100%' }}
          placeholder={`Select ${title}`}
          allowClear
          getPopupContainer={triggerNode =>
            triggerNode.parentNode || document.body
          }
        >
          <Option value=''>All</Option>
          {renderOptions()}
        </Select>
      </div>
    </div>
  )
}

export default FilterDropdown
