import { useEffect, useCallback } from 'react'

type Image = { src: string; alt: string }

type Props = {
  images: Image[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function GalleryLightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  const btnBase: React.CSSProperties = {
    position: 'fixed',
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    lineHeight: 1,
    transition: 'color 0.2s',
    zIndex: 501,
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'rgba(4,4,4,0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{ ...btnBase, top: '1.5rem', right: '1.5rem', fontSize: '1.5rem', padding: '0.5rem' }}
      >✕</button>

      {images.length > 1 && <>
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Previous"
          style={{ ...btnBase, top: '50%', left: '1rem', transform: 'translateY(-50%)', fontSize: '3rem', padding: '1rem' }}
        >‹</button>
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Next"
          style={{ ...btnBase, top: '50%', right: '1rem', transform: 'translateY(-50%)', fontSize: '3rem', padding: '1rem' }}
        >›</button>
      </>}

      <div
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img
          src={images[index].src}
          alt={images[index].alt}
          style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', display: 'block' }}
        />
      </div>
    </div>
  )
}
