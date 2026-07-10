import { useRef, useState, useEffect } from 'react'
import GalleryThumbnail from './GalleryThumbnail'

type Image = {
  src: string
  thumbSrc: string
  alt: string
  aspectRatio: number
  desktopOffset: number
  mobileOffset: number
}

type Props = {
  images: Image[]
  layout: 'portrait' | 'landscape' | 'mixed'
  startIndex: number
  onOpen: (index: number) => void
}

type Row = {
  indices: number[]
  widths: number[]
  height: number
}

/** Greedy justified layout — fills each row to exactly containerWidth with no gaps. */
function computeRows(
  images: Image[],
  containerWidth: number,
  targetRowHeight: number,
  maxPerRow: number,
  minPerRow: number,
  gap: number
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
    const rowHeight = availableWidth / totalAspect
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

export default function GallerySectionZone({ images, layout, startIndex, onOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

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

  const rows = computeRows(images, containerWidth, TARGET_HEIGHT, MAX_PER_ROW, MIN_PER_ROW, GAP)

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
              key={images[imgIdx].src}
              src={images[imgIdx].src}
              thumbSrc={images[imgIdx].thumbSrc}
              alt={images[imgIdx].alt}
              width={row.widths[ii]}
              height={row.height}
              desktopOffset={images[imgIdx].desktopOffset}
              mobileOffset={images[imgIdx].mobileOffset}
              onClick={() => onOpen(startIndex + imgIdx)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
