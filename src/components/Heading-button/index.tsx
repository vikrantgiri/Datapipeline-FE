import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

interface HeadingWithButtonProps {
  heading: string
  buttonText?: string
  buttonColor?: 'default' | 'primary' | 'dashed' | 'link' | 'text'
  buttonIcon?: React.ReactNode
  to?: string
}

const HeadingWithButton: React.FC<HeadingWithButtonProps> = ({
  heading,
  buttonText,
  buttonColor = 'primary',
  buttonIcon,
  to,
}) => {
  const button = (
    <Button type={buttonColor} icon={buttonIcon}>
      {buttonText}
    </Button>
  )

  return (
    <div className='flex items-center justify-between mb-6'>
      <h1 className='text-xl font-semibold'>{heading}</h1>
      {buttonText && (to ? <Link to={to}>{button}</Link> : button)}
    </div>
  )
}

export default HeadingWithButton
