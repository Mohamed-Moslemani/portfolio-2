import { useState } from 'react'

/* ---------------------------------------------------------------
   LazyImage: native lazy loading plus a fade-in once decoded, and a
   quiet fallback if the file is missing rather than a broken icon.
   Width/height are always passed through so the layout never shifts.
   --------------------------------------------------------------- */

export default function LazyImage({
  src,
  alt = '',
  width,
  height,
  srcSet,
  sizes,
  className = '',
  eager = false,
  fallback = null,
  ...rest
}) {
  const [status, setStatus] = useState('loading')

  if (!src || status === 'error') return fallback

  return (
    <img
      src={src}
      srcSet={srcSet || undefined}
      sizes={sizes || undefined}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      className={`lazy-img${status === 'loaded' ? ' is-loaded' : ''}${className ? ` ${className}` : ''}`}
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      {...rest}
    />
  )
}
