import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Input, Table, Pagination, message, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import client from '../../api/axiosInstance'
import FilterDropdown from '../../components/Add-Form-Component/Filter-dropdown'
import {
  getThirdPartyFilters,
  getCampaignFilters,
  getStatesFilters,
} from '../../api/filter-api'
import { PROTECTED_ROUTES } from '../../constants/routes'

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
  const [thirdPartyFilters, setThirdPartyFilters] = useState<any[]>([])
  const [selectedFilter, setSelectedFilter] = useState('')
  const [campaignTypeFilters, setCampaignTypeFilters] = useState<any[]>([])
  const [selectedCampaignFilter, setSelectedCampaignFilter] = useState('')
  const [stateFilters, setStateFilters] = useState<any[]>([])
  const [selectedStateFilter, setSelectedStateFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  // Pagination
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    pageSize: 10,
    total: 0,
    skip: 0,
    limit: 10,
  })

  // Fetch trigger leads
  const fetchData = useCallback(
    async (page: number = 1, pageSize: number = 10) => {
      setLoading(true)
      try {
        const skip = (page - 1) * pageSize
        const limit = pageSize

        const res = await client.post(
          `/trigger-leads/filtered?skip=${skip}&limit=${limit}`,
          {
            data_source: selectedFilter || undefined,
            lead_type: selectedCampaignFilter || undefined,
            us_states: selectedStateFilter || undefined,
            search: searchText || undefined,
          }
        )

        const responseData = res?.data?.data
        const rawData = responseData?.data || []
        const total = responseData?.total || 0

        if (Array.isArray(rawData)) {
          setData(rawData)
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

  // Initial fetch
  useEffect(() => {
    fetchData(1, pagination.pageSize)
  }, [fetchData, pagination.pageSize])

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData(1, pagination.pageSize)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [fetchData, pagination.pageSize, searchText])

  // Fetch filters
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (
        filterRef.current &&
        !filterRef.current.contains(target) &&
        !document.querySelector('.ant-select-dropdown')?.contains(target)
      ) {
        setShowFilters(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
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
      render: (text, record) => (
        <Link
          to={PROTECTED_ROUTES.TRIGGER_LEADS_BY_ID}
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
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Trigger Leads</h1>
          <p className='text-gray-600 mt-1'>
            Manage and view your trigger lead data
          </p>
        </div>
      </div>

      {/* Search & Filter Toggle */}
      <div className='relative'>
        <div className='flex items-center gap-2'>
          <Search
            placeholder='Search credentials...'
            allowClear
            enterButton={<SearchOutlined />}
            className='w-full'
            onSearch={handleSearch}
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
          />
          <Button
            type='primary'
            style={{
              width: 100,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              textDecorationStyle: 'solid',
            }}
            onClick={() => setShowFilters(prev => !prev)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M6 10.117V15l4-2v-2.883l4.447-5.34A1 1 0 0 0 13.763 5H2.237a1 1 0 0 0-.684 1.777L6 10.117z' />
            </svg>
            Filters
          </Button>
        </div>
        {/* Filter Sidebar */}
        {showFilters && (
          <div
            ref={filterRef}
            className='absolute right-0 top-12 z-10 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-2'
          >
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-medium text-gray-900'>Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className='text-gray-500 hover:text-gray-700'
              >
                ✕
              </button>
            </div>
            <FilterDropdown
              title='By Data Source'
              options={thirdPartyFilters}
              onChange={value => setSelectedFilter(value)}
              value={selectedFilter}
            />
            <FilterDropdown
              title='By Lead Type'
              options={campaignTypeFilters}
              onChange={value => setSelectedCampaignFilter(value)}
              value={selectedCampaignFilter}
            />
            <FilterDropdown
              title='By State'
              options={stateFilters}
              onChange={value => setSelectedStateFilter(value)}
              value={selectedStateFilter}
            />
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className='relative w-full'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full'>
          <Table
            columns={columns}
            dataSource={data}
            rowKey='id'
            loading={loading}
            scroll={{ x: 'max-content' }}
            pagination={false}
            size='middle'
          />

          {/* Pagination */}
          <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200'>
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TriggerLeads
