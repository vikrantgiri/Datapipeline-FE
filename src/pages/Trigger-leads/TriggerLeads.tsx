import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Input, Table, Pagination, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import client from '../../api/axiosInstance'
import FilterDropdown from '../../components/Add-Form-Component/Filter-dropdown'
import { getThirdPartyFilters } from '../../api/filter-api'
import { getCampaignFilters, getStatesFilters } from '../../api/filter-api'

const { Search } = Input

export interface TriggerLeadItem {
  key: string
  id: number
  firstName: string
  lastName: string
  state: string
  zip: string
  dataSource: string
  leadType: string
  createdAt: string
}

interface PaginationData {
  current: number
  pageSize: number
  total: number
  skip: number
  limit: number
}

const TriggerLeads = () => {
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState<TriggerLeadItem[]>([])
  const [loading, setLoading] = useState(false)

  // Filter states
  const [thirdParyFilters, setThirdPartyFilters] = useState()
  const [selectedFilter, setSelectedFilter] = useState('')
  const [campaignTypeFilters, setCampaignTypeFilters] = useState()
  const [selectedCampaignFilter, setSelectedCampaignFilter] = useState('')
  const [stateFilters, setStateFilters] = useState()
  const [selectedStateFilter, setSelectedStateFilter] = useState('')

  // Pagination state
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    pageSize: 10,
    total: 0,
    skip: 0,
    limit: 10,
  })

  const fetchData = useCallback(
    async (page: number = 1, pageSize: number = 10) => {
      setLoading(true)
      try {
        const skip = (page - 1) * pageSize
        const limit = pageSize

        const res = await client.post(
          `/trigger-leads/filtered?skip=${skip}&limit=${limit}`,
          {
            data_source: String(selectedFilter),
            lead_type: String(selectedCampaignFilter),
            us_states: String(selectedStateFilter),
            search: searchText || undefined,
          }
        )

        const responseData = res?.data?.data
        const rawData = responseData?.data || []
        const total = responseData?.total || 0

        if (Array.isArray(rawData)) {
          setData(rawData)

          // Update pagination state
          setPagination(prev => ({
            ...prev,
            current: page,
            pageSize,
            total,
            skip,
            limit,
          }))
        }
      } catch (error) {
        console.error('Failed to fetch trigger leads', error)
        setData([])
        message.error('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    },
    [selectedFilter, selectedCampaignFilter, selectedStateFilter, searchText]
  )

  useEffect(() => {
    fetchData(1, pagination.pageSize)
  }, [fetchData, pagination.pageSize])

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData(1, pagination.pageSize)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [fetchData, pagination.pageSize])

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [thirdPartyRes, campaignRes, stateRes] = await Promise.all([
          getThirdPartyFilters(),
          getCampaignFilters(),
          getStatesFilters(),
        ])

        setThirdPartyFilters(thirdPartyRes?.data || [])
        setCampaignTypeFilters(campaignRes?.data || [])
        setStateFilters(stateRes?.data || [])
      } catch (error) {
        console.error('Failed to fetch filters', error)
      }
    }

    fetchFilters()
  }, [])

  const handleTableChange = (page: number, pageSize: number) => {
    fetchData(page, pageSize)
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const columns: ColumnsType<TriggerLeadItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: string, record: any) => (
        <Link
          to={{
            pathname: '',
          }}
          state={{ record }}
          className='text-blue-600 hover:text-blue-800 font-medium'
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'FIRST NAME',
      dataIndex: 'first_name',
      key: 'first_name',
      width: 120,
    },
    {
      title: 'LAST NAME',
      dataIndex: 'last_name',
      key: 'last_name',
      width: 120,
    },
    {
      title: 'STATE',
      dataIndex: 'state',
      key: 'state',
      width: 80,
    },
    {
      title: 'ZIP',
      dataIndex: 'zip',
      key: 'zip',
      width: 80,
    },
    {
      title: 'DATA SOURCE',
      dataIndex: 'data_source',
      key: 'data_source',
      width: 120,
    },
    {
      title: 'LEAD TYPE',
      dataIndex: 'lead_type',
      key: 'lead_type',
      width: 150,
    },
    {
      title: 'CREATED AT',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (text: string) => (
        <span className='text-sm text-gray-600'>
          {new Date(text).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
  ]

  return (
    <div className='space-y-6 min-h-screen'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Trigger Leads</h1>
        <p className='text-gray-600 mt-1'>
          Manage and view your trigger lead data
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Main Content */}
        <div className='lg:col-span-3 space-y-6'>
          {/* Search Bar */}
          <div className='relative'>
            <Search
              placeholder='Search trigger leads...'
              allowClear
              enterButton={<SearchOutlined />}
              className='w-full'
              onSearch={handleSearch}
              onChange={e => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>

          {/* Table */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <Table
              columns={columns}
              dataSource={data}
              rowKey='id'
              loading={loading}
              scroll={{ x: 'max-content' }}
              pagination={false} // We'll handle pagination manually
              size='middle'
              className='custom-table'
            />

            {/* Custom Pagination */}
            <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200 '>
              <div className='text-sm text-gray-600'>
                Showing {(pagination.current - 1) * pagination.pageSize + 1} to{' '}
                {Math.min(
                  pagination.current * pagination.pageSize,
                  pagination.total
                )}{' '}
                of {pagination.total} entries
              </div>
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                showSizeChanger
                onChange={handleTableChange}
                onShowSizeChange={handleTableChange}
                pageSizeOptions={['10', '20', '50', '100']}
                className='custom-pagination'
              />
            </div>
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center mb-4'>
              <svg
                className='w-5 h-5 text-gray-500 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z'
                />
              </svg>
              <h3 className='text-lg font-medium text-gray-900'>Filters</h3>
            </div>

            <div className='space-y-4'>
              <FilterDropdown
                title='By Data Source'
                options={[...(thirdParyFilters || [])]}
                onChange={value => setSelectedFilter(value)}
                value={selectedFilter}
              />
              <FilterDropdown
                title='By Lead Type'
                options={[...(campaignTypeFilters || [])]}
                onChange={value => setSelectedCampaignFilter(value)}
                value={selectedCampaignFilter}
              />
              <FilterDropdown
                title='By State'
                options={[...(stateFilters || [])]}
                onChange={value => setSelectedStateFilter(value)}
                value={selectedStateFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TriggerLeads
