import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useImages } from '../editable/ImagesContext'
import PhotoPlaceholder from '../assets/PhotoPlaceholder'
import { useControlsVisible } from '../editable/ControlsVisibilityContext'

type Props = {
  /** Stable key for this image slot, e.g. "heroBackground" or "aboutPhoto" */
  id: string
  /** Static fallback URL (or '' if there's no real photo yet) */
  defaultUrl: string
  alt?: string
  className?: string
  /**
   * 'background' renders as a CSS background-image on the wrapper (for full-bleed
   * hero-style photos). 'img' renders an actual <img> inside the wrapper (for a
   * framed photo slot like the About page), falling back to a placeholder + hint
   * when no photo has been uploaded yet.
   */
  mode?: 'background' | 'img'
}

export default function EditableImageSlot({ id, defaultUrl, alt = '', className, mode = 'background' }: Props) {
  const { getImage, uploadImage, isUploading } = useImages()
  const { visible: controlsVisible } = useControlsVisible()
  const { url } = getImage(id, defaultUrl)
  const uploading = isUploading(id)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const onPick = () => inputRef.current?.click()

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError(null)
    try {
      await uploadImage(id, file)
    } catch (err) {
      console.error(err)
      setError('Upload failed — try again.')
    }
  }

  const hasPhoto = Boolean(url)

  return (
    <div
      className={`image-slot ${mode === 'background' ? 'image-slot-bg' : 'image-slot-framed'} ${className ?? ''}`}
      style={mode === 'background' && hasPhoto ? { backgroundImage: `url(${url})` } : undefined}
    >
      {mode === 'img' && (
        hasPhoto ? (
          <img src={url} alt={alt} className="image-slot-img" />
        ) : (
          <div className="image-slot-empty">
            <PhotoPlaceholder className="image-slot-placeholder-art" />
            <span>Add a photo</span>
          </div>
        )
      )}

      {controlsVisible && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onChange}
            onClick={e => e.stopPropagation()}
            style={{ display: 'none' }}
          />

          <span
            role="button"
            tabIndex={0}
            className={`image-slot-upload${uploading ? ' is-uploading' : ''}`}
            aria-label={hasPhoto ? 'Replace photo' : 'Upload photo'}
            onClick={onPick}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick() } }}
          >
            <span className="image-slot-icon">{uploading ? '…' : '➕'}</span>
          </span>
        </>
      )}

      {error && controlsVisible && <span className="image-slot-error">{error}</span>}
    </div>
  )
}
