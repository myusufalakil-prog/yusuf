import { useState } from 'react'

/**
 * Wrap any <img> with this to show a shimmer skeleton while loading.
 *
 * Usage:
 *   <SkeletonImage src="..." alt="..." className="w-full h-[450px] object-cover" />
 */
export default function SkeletonImage({ src, alt, className = '', style = {}, ...props }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Shimmer skeleton */}
      {!loaded && !error && (
        <div
          className="absolute inset-0 skeleton-shimmer"
          aria-hidden="true"
        />
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-midnight/80">
          <span className="text-3xl mb-2">🖼️</span>
          <span className="font-inter text-xs text-ivory/30">Image unavailable</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true) }}
        {...props}
      />
    </div>
  )
}
