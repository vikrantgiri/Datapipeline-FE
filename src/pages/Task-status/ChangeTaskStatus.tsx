import React from 'react'
import { useLocation } from 'react-router-dom'

import TaskStatusForm from '../../components/Add-Form-Component/TaskStatusForm'

const ChangeTaskStatus: React.FC = () => {
  const location = useLocation()
  const { record } = location.state || {}

  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values)
  }

  return (
    <div className='text-white'>
      <h1 className='text-2xl text-black font-semibold mb-6'>
        Change Task Status
      </h1>
      <div className='pr-4'></div>

      <TaskStatusForm onSubmit={handleSubmit} initialValues={record} />
    </div>
  )
}

export default ChangeTaskStatus
