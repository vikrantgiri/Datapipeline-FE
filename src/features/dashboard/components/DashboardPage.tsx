import React from 'react'

const DashboardPage: React.FC = () => {
  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-2'>Total Files</h3>
          <p className='text-3xl font-bold text-blue-600'>1,234</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-2'>Active Tasks</h3>
          <p className='text-3xl font-bold text-green-600'>56</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-2'>Completed</h3>
          <p className='text-3xl font-bold text-purple-600'>789</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-2'>Errors</h3>
          <p className='text-3xl font-bold text-red-600'>12</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
