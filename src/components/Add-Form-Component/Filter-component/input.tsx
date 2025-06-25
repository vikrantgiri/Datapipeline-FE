import React from 'react'

interface FilterCardWrapperProps {
  title?: string
  children: React.ReactNode
}

const FilterCardWrapper: React.FC<FilterCardWrapperProps> = ({
  //   title,
  children,
}) => {
  return (
    <div className='col-span-3'>
      <div className='bg-white p-4 shadow rounded border space-y-4 '>
        <div className='flex items-center justify-between'>
          <h3 className='text-md font-semibold'>Filter</h3>
        </div>
        {children}
      </div>
    </div>
  )
}

export default FilterCardWrapper
