import { useState, useEffect } from 'react'

type Props = {
  src: string
  thumbSrc: string
  alt: string
  width: number
  height: number
  desktopOffset: number
  mobileOffset: number
  onClick: () => void
}

export default function GalleryThumbnail({ src: _src, thumbSrc, alt, width, height, desktopOffset, mobileOffset, onClick }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const update = () => setOffset(window.innerWidth > 800 ? desktopOffset : mobileOffset)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [desktopOffset, mobileOffset])

  return (
    <div
      className={`galleryimage${loaded ? ' loaded' : ''}`}
      onClick={onClick}
      style={{
        width,
        height,
        flexShrink: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <img
        src={thumbSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          transform: offset ? `translateY(${offset}px)` : undefined,
        }}
      />
    </div>
  )
}
