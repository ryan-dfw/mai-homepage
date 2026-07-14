import { useState, useCallback } from 'react'
import { gallery } from '../data/pages/gallery'
import { galleryLayout } from '../data/galleryImg'
import { useGalleryData } from '../editable/GalleryDataContext'
import { cloudinaryFull } from '../cloudinary'
import GallerySection from '../components/gallery/GallerySection'
import GalleryLightbox from '../components/gallery/GalleryLightbox'
import Editable from '../components/Editable'
import { useControlsVisible } from '../editable/ControlsVisibilityContext'

export default function GalleryPage() {
  const { eyebrow, headline } = gallery
  const layout = galleryLayout
  const { visible: controlsVisible } = useControlsVisible()
  const { categories, loaded, addCategory, removeCategory, renameCategory, addImages, replaceImage, removeImage, reorderImage, isUploading, isImageReplacing } = useGalleryData()

  const allImages = categories.flatMap(c => c.images).map(img => ({ src: cloudinaryFull(img.url), alt: img.alt }))

  const [lightbox, setLightbox] = useState<number | null>(null)
  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() => setLightbox(i => i !== null ? (i - 1 + allImages.length) % allImages.length : null), [allImages.length])
  const next = useCallback(() => setLightbox(i => i !== null ? (i + 1) % allImages.length : null), [allImages.length])

  let globalIndex = 0

  return (
    <main className="gallery-page page-pad">
      <header className="gallery-page-header">
        <Editable as="p" className="eyebrow" id="gallery.eyebrow" defaultValue={eyebrow} />
        <Editable as="h1" id="gallery.headline" defaultValue={headline} />
      </header>

      {!loaded && <p className="gallery-loading">Loading gallery…</p>}

      {categories.map(cat => {
        const startIndex = globalIndex
        globalIndex += cat.images.length
        return (
          <GallerySection
            key={cat.id}
            category={cat}
            layout={layout}
            startIndex={startIndex}
            onOpen={setLightbox}
            onRenameLabel={label => renameCategory(cat.id, label)}
            onDeleteCategory={() => removeCategory(cat.id)}
            onDeleteImage={imageId => removeImage(cat.id, imageId)}
            onReplaceImage={(imageId, file) => replaceImage(cat.id, imageId, file)}
            isImageReplacing={isImageReplacing}
            onReorderImage={(from, to) => reorderImage(cat.id, from, to)}
            onAddPhotos={files => addImages(cat.id, files)}
            uploading={isUploading(cat.id)}
          />
        )
      })}

      {controlsVisible && (
        <button type="button" className="gallery-add-category-btn" onClick={addCategory}>
          + Add category
        </button>
      )}

      {lightbox !== null && (
        <GalleryLightbox
          images={allImages}
          index={lightbox}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </main>
  )
}
