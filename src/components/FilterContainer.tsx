import React, { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

interface FilterContainerProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
  containerRef?: RefObject<HTMLDivElement | null>
}

const FilterContainer: React.FC<FilterContainerProps> = ({
  children,
  isOpen,
  onClose,
  className = '',
  containerRef: externalContainerRef,
}) => {
  const internalContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = externalContainerRef || internalContainerRef

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Check if click is inside the filter container
      if (containerRef.current?.contains(target)) {
        return
      }

      // Check if click is on any Ant Design dropdown elements
      const isInsideAntDropdown =
        target.closest('.ant-select-dropdown') ||
        target.closest('.ant-picker-dropdown') ||
        target.closest('.ant-dropdown') ||
        target.closest('.ant-select') ||
        target.closest('.ant-picker') ||
        target.closest('.ant-select-selector') ||
        target.closest('.ant-select-selection-item') ||
        target.closest('.ant-select-selection-search') ||
        target.closest('.ant-select-item') ||
        target.closest('.ant-select-item-option') ||
        target.closest('.ant-select-dropdown-menu') ||
        target.closest('.ant-select-dropdown-menu-item')

      if (isInsideAntDropdown) {
        return
      }

      // Close filters if click is outside
      onClose()
    }

    if (isOpen) {
      // Add event listener with a longer delay to avoid immediate closure
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside, true)
      }, 200)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mousedown', handleClickOutside, true)
      }
    }
  }, [isOpen, onClose, containerRef])

  if (!isOpen) return null

  return (
    <div
      ref={containerRef}
      className={`absolute right-0 top-12 z-10 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-2 ${className}`}
      onClick={e => {
        // Prevent clicks inside the container from bubbling up
        e.stopPropagation()
      }}
      onMouseDown={e => {
        // Prevent mousedown events from bubbling up
        e.stopPropagation()
      }}
    >
      {children}
    </div>
  )
}

export default FilterContainer
