import React, { useState, useEffect } from 'react'
import { Button, message } from 'antd'
import { getCredentialsFilters } from '../api/filter-api'
import FilterDropdown from './Add-Form-Component/Filter-dropdown'

const FilterTest: React.FC = () => {
  const [credentialsFilters, setCredentialsFilters] = useState<any[]>([])
  const [selectedValue, setSelectedValue] = useState<string>('')

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await getCredentialsFilters()
        console.log('Test - Credentials filters API response:', res)
        setCredentialsFilters(res?.data || [])
      } catch (error) {
        console.error('Test - Failed to fetch filters', error)
        message.error('Failed to fetch filters')
      }
    }
    fetchFilters()
  }, [])

  const handleChange = (value: string) => {
    console.log('Test - Filter changed:', value)
    setSelectedValue(value)
    message.success(`Selected: ${value}`)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Filter Test</h2>
      <p>Selected value: {selectedValue}</p>
      <p>Options count: {credentialsFilters.length}</p>

      <FilterDropdown
        title='Test Credentials Filter'
        options={credentialsFilters}
        onChange={handleChange}
        value={selectedValue}
        type='id-value'
      />

      <Button
        onClick={() => {
          console.log('Current state:', { credentialsFilters, selectedValue })
          message.info('Check console for current state')
        }}
        style={{ marginTop: '10px' }}
      >
        Log Current State
      </Button>
    </div>
  )
}

export default FilterTest
