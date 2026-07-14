import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import GallerySectionHeader from './GallerySectionHeader'
import GallerySectionZone from './GallerySectionZone'
import Editable from '../Editable'
import type { GalleryCategory } from '../../editable/GalleryDataContext'
import { useControlsVisible } from '../../editable/ControlsVisibilityContext'

type Props = {
  category: GalleryCategory
  layout: 'portrait' | 'landscape' | 'mixed'
  startIndex: number
  onOpen: (index: number) => void
  onRenameLabel: (label: string) => void
  onDeleteCategory: () => void
  onDeleteImage: (imageId: string) => void
  onReplaceImage: (imageId: string, file: File) => Promise<void>
  isImageReplacing: (imageId: string) => boolean
  onReorderImage: (fromIndex: number, toIndex: number) => void
  onAddPhotos: (files: File[]) => Promise<void>
  uploading: boolean
}

export default function GallerySection({
  category, layout, startIndex, onOpen,
  onRenameLabel, onDeleteCategory, onDeleteImage, onReplaceImage, isImageReplacing, onReorderImage, onAddPhotos, uploading,
}: Props) {
  const { visible: controlsVisible } = useControlsVisible()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const onPickFiles = () => fileInputRef.current?.click()

  const onFilesSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    if (files.length === 0) return
    setError(null)
    try {
      await onAddPhotos(files)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed — try again.')
    }
  }

  return (
    <section>
      <GallerySectionHeader
        label={<Editable as="span" value={category.label} onSave={onRenameLabel} />}
        onDeleteCategory={onDeleteCategory}
      />
      <GallerySectionZone
        images={category.images}
        layout={layout}
        startIndex={startIndex}
        onOpen={onOpen}
        onDelete={onDeleteImage}
        onReplace={onReplaceImage}
        isImageReplacing={isImageReplacing}
        onReorder={onReorderImage}
      />

      {controlsVisible && (
        <div className="gallery-add-row">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onFilesSelected}
            onClick={e => e.stopPropagation()}
            style={{ display: 'none' }}
          />
          <button type="button" className="gallery-add-btn" onClick={onPickFiles} disabled={uploading}>
            {uploading ? 'Uploading…' : '+ Add photos'}
          </button>
          {error && <p className="gallery-add-error">{error}</p>}
        </div>
      )}
    </section>
  )
}
