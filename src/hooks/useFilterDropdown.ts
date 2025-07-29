import { useState, useEffect, useRef, useCallback } from 'react'

export const useFilterDropdown = () => {
  const [showFilters, setShowFilters] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleFilterButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setShowFilters(prev => !prev)
  }, [])

  const handleCloseFilters = useCallback(() => {
    setShowFilters(false)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Check if click is on the filter button
      if (buttonRef.current?.contains(target)) {
        return
      }

      // Check if click is inside the filter dropdown
      if (filterRef.current?.contains(target)) {
        return
      }

      // Check if click is on any Ant Design dropdown elements
      const isInsideAntDropdown =
        target.closest('.ant-select-dropdown') ||
        target.closest('.ant-picker-dropdown') ||
        target.closest('.ant-dropdown') ||
        target.closest('.ant-select') ||
        target.closest('.ant-picker')

      if (isInsideAntDropdown) {
        return
      }

      // Close filters if click is outside
      setShowFilters(false)
    }

    if (showFilters) {
      // Add event listener with a small delay to avoid immediate closure
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 100)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showFilters])

  return {
    showFilters,
    filterRef,
    buttonRef,
    handleFilterButtonClick,
    handleCloseFilters,
    setShowFilters,
  }
}
