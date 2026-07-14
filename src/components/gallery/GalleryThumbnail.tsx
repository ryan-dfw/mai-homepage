import { useRef, useState } from 'react'
import type { DragEvent, ChangeEvent } from 'react'
import { useControlsVisible } from '../../editable/ControlsVisibilityContext'

type Props = {
  thumbSrc: string
  alt: string
  width: number
  height: number
  onClick: () => void
  onDelete: () => void
  onReplace: (file: File) => Promise<void>
  replacing?: boolean
  draggable?: boolean
  isDragOver?: boolean
  onDragStart?: (e: DragEvent<HTMLDivElement>) => void
  onDragOver?: (e: DragEvent<HTMLDivElement>) => void
  onDragLeave?: (e: DragEvent<HTMLDivElement>) => void
  onDrop?: (e: DragEvent<HTMLDivElement>) => void
  onDragEnd?: (e: DragEvent<HTMLDivElement>) => void
}

export default function GalleryThumbnail({
  thumbSrc, alt, width, height, onClick, onDelete, onReplace, replacing,
  draggable, isDragOver, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd,
}: Props) {
  const { visible: controlsVisible } = useControlsVisible()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const stop = (e: { stopPropagation: () => void; preventDefault: () => void }) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onPickReplace = () => fileInputRef.current?.click()

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError(null)
    try {
      await onReplace(file)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed — try again.')
    }
  }

  return (
    <div
      className={`galleryimage${loaded ? ' loaded' : ''}${isDragOver ? ' drag-over' : ''}`}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
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
        }}
      />

      {controlsVisible && (
        <div
          className="gallery-thumb-controls"
          draggable={false}
          onDragStart={e => { e.preventDefault(); e.stopPropagation() }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            onClick={e => e.stopPropagation()}
            style={{ display: 'none' }}
          />
          <span
            role="button"
            tabIndex={0}
            draggable={false}
            className={`gallery-thumb-btn gallery-replace-btn${replacing ? ' is-busy' : ''}`}
            aria-label="Replace photo"
            onClick={e => { stop(e); onPickReplace() }}
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { stop(e); onPickReplace() } }}
          >
            <span className="gallery-thumb-icon">{replacing ? '…' : '➕'}</span>
          </span>
          <span
            role="button"
            tabIndex={0}
            draggable={false}
            className="gallery-thumb-btn gallery-delete-btn"
            aria-label="Remove photo"
            onClick={e => { stop(e); onDelete() }}
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { stop(e); onDelete() } }}
          >
            <span className="gallery-thumb-icon">🗑️</span>
          </span>
        </div>
      )}

      {error && controlsVisible && (
        <div className="gallery-thumb-error" onClick={e => e.stopPropagation()}>
          {error}
        </div>
      )}
    </div>
  )
}
