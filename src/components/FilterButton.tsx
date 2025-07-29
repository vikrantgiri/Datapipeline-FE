import React, { useRef, useCallback } from 'react'
import { Button } from 'antd'

interface FilterButtonProps {
  children: React.ReactNode
  onToggle: (show: boolean) => void
  isOpen: boolean
}

const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  onToggle,
  isOpen,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onToggle(!isOpen)
    },
    [isOpen, onToggle]
  )

  return (
    <Button
      ref={buttonRef}
      type='primary'
      style={{
        width: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        textDecorationStyle: 'solid',
      }}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}

export default FilterButton
