import React, { useState } from 'react'
import { getOptimizedImageProps, type CDNImageProps } from '../../utils/cdn-image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: CDNImageProps) {
  const [didError, setDidError] = useState(false)
  const [useFallback, setUseFallback] = useState(false)

  const handleError = () => {
    // If we're using CDN and it failed, try the original src
    if (!useFallback && props.src) {
      setUseFallback(true)
    } else {
      // Original also failed, hide image
      setDidError(true)
    }
  }

  const { src, alt, style, className, sizes, eager, ...rest } = props

  // Don't render anything if the image failed to load
  if (didError) {
    return null;
  }

  // Get optimized props (with CDN) or use original if fallback is active
  const imageProps = useFallback 
    ? { src, alt, className, style, ...rest }
    : getOptimizedImageProps(props);

  return (
    <img {...imageProps} onError={handleError} />
  )
}