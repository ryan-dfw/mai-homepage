import { useRef, useState, useEffect } from 'react'
import GalleryThumbnail from './GalleryThumbnail'
import { cloudinaryThumb } from '../../cloudinary'

type Image = {
  id: string
  url: string
  alt: string
  aspectRatio: number
}

type Props = {
  images: Image[]
  layout: 'portrait' | 'landscape' | 'mixed'
  startIndex: number
  onOpen: (index: number) => void
  onDelete: (imageId: string) => void
  onReplace: (imageId: string, file: File) => Promise<void>
  isImageReplacing: (imageId: string) => boolean
  onReorder: (fromIndex: number, toIndex: number) => void
}

type Row = {
  indices: number[]
  widths: number[]
  height: number
}

/**
 * Greedy justified layout — fills each row to exactly containerWidth with no gaps.
 *
 * Edge case: a row with few images and a low total aspect ratio (e.g. a lone
 * portrait photo left over as the last row) would need to stretch far taller
 * than targetRowHeight to reach the full container width. Capping the row
 * height at maxRowHeight avoids absurdly tall tiles — that row just won't
 * reach the edge, which is a much better tradeoff than a blown-up photo.
 */
function computeRows(
  images: Image[],
  containerWidth: number,
  targetRowHeight: number,
  maxPerRow: number,
  minPerRow: number,
  gap: number,
  maxRowHeight: number
): Row[] {
  if (containerWidth <= 0 || images.length === 0) return []

  const rows: Row[] = []
  let start = 0

  while (start < images.length) {
    let end = start
    let totalAspect = 0

    while (end < images.length) {
      const count = end - start + 1
      const newAspect = totalAspect + images[end].aspectRatio
      const gapsWidth = (count - 1) * gap
      const projectedWidth = newAspect * targetRowHeight + gapsWidth

      if (count > maxPerRow) break
      // Don't break until we have at least minPerRow images in the row
      if (projectedWidth > containerWidth && count > minPerRow) break

      totalAspect += images[end].aspectRatio
      end++
    }

    const count = end - start
    const gapsWidth = (count - 1) * gap
    const availableWidth = containerWidth - gapsWidth
    const rowHeight = Math.min(availableWidth / totalAspect, maxRowHeight)
    const widths = images.slice(start, end).map(img => img.aspectRatio * rowHeight)

    rows.push({
      indices: Array.from({ length: count }, (_, k) => start + k),
      widths,
      height: rowHeight,
    })

    start = end
  }

  return rows
}

export default function GallerySectionZone({ images, layout, startIndex, onOpen, onDelete, onReplace, isImageReplacing, onReorder }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const GAP = 6
  const TARGET_HEIGHT = 280
  const MAX_PER_ROW = 5
  const MIN_PER_ROW = 2
  const MAX_ROW_HEIGHT = TARGET_HEIGHT * 1.5

  const rows = computeRows(images, containerWidth, TARGET_HEIGHT, MAX_PER_ROW, MIN_PER_ROW, GAP, MAX_ROW_HEIGHT)

  const resetDrag = () => {
    setDragIndex(null)
    setDragOverIndex(null)
  }

  return (
    <div
      ref={containerRef}
      className={`gallery-zone ${layout}`}
    >
      {rows.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            marginBottom: ri < rows.length - 1 ? `${GAP}px` : 0,
          }}
        >
          {row.indices.map((imgIdx, ii) => (
            <GalleryThumbnail
              key={images[imgIdx].id}
              thumbSrc={cloudinaryThumb(images[imgIdx].url, 600)}
              alt={images[imgIdx].alt}
              width={row.widths[ii]}
              height={row.height}
              onClick={() => onOpen(startIndex + imgIdx)}
              onDelete={() => onDelete(images[imgIdx].id)}
              onReplace={file => onReplace(images[imgIdx].id, file)}
              replacing={isImageReplacing(images[imgIdx].id)}
              draggable
              isDragOver={dragOverIndex === imgIdx && dragIndex !== imgIdx}
              onDragStart={() => setDragIndex(imgIdx)}
              onDragOver={e => { e.preventDefault(); setDragOverIndex(imgIdx) }}
              onDragLeave={() => setDragOverIndex(prev => (prev === imgIdx ? null : prev))}
              onDrop={e => {
                e.preventDefault()
                if (dragIndex !== null && dragIndex !== imgIdx) onReorder(dragIndex, imgIdx)
                resetDrag()
              }}
              onDragEnd={resetDrag}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
