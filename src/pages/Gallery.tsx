import { useState, useCallback } from 'react'
import { content } from '../data/content'
import GallerySection from '../components/gallery/GallerySection'
import GalleryLightbox from '../components/gallery/GalleryLightbox'

export default function GalleryPage() {
  const { eyebrow, headline, layout, categories } = content.gallery
  const allImages = categories.flatMap(c => c.images)

  const [lightbox, setLightbox] = useState<number | null>(null)
  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() => setLightbox(i => i !== null ? (i - 1 + allImages.length) % allImages.length : null), [allImages.length])
  const next = useCallback(() => setLightbox(i => i !== null ? (i + 1) % allImages.length : null), [allImages.length])

  let globalIndex = 0

  return (
    <main className="gallery-page page-pad">
      <header className="gallery-page-header">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{headline}</h1>
      </header>

      {categories.map((cat, ci) => {
        const startIndex = globalIndex
        globalIndex += cat.images.length
        return (
          <GallerySection
            key={cat.label}
            label={cat.label}
            images={cat.images}
            layout={layout}
            startIndex={startIndex}
            showHeader={ci > 0}
            onOpen={setLightbox}
          />
        )
      })}

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
