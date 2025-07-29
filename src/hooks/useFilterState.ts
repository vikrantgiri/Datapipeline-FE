import { useState, useCallback, useRef, useEffect } from 'react'

export const useFilterState = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleFilterToggle = useCallback((show: boolean) => {
    setShowFilters(show)
  }, [])

  const handleCloseFilters = useCallback(() => {
    if (!isSelecting) {
      setShowFilters(false)
    }
  }, [isSelecting])

  const handleSelectStart = useCallback(() => {
    setIsSelecting(true)
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleSelectEnd = useCallback(() => {
    // Delay setting isSelecting to false to prevent immediate closure
    timeoutRef.current = setTimeout(() => {
      setIsSelecting(false)
    }, 300)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // If we're in the middle of selecting, don't close
      if (isSelecting) {
        return
      }

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
      handleCloseFilters()
    }

    if (showFilters) {
      // Add event listener with a delay to avoid immediate closure
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside, true)
      }, 200)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mousedown', handleClickOutside, true)
      }
    }
  }, [showFilters, isSelecting, handleCloseFilters])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    showFilters,
    containerRef,
    handleFilterToggle,
    handleCloseFilters,
    handleSelectStart,
    handleSelectEnd,
  }
}
