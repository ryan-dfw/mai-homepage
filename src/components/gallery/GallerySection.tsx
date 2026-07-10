import GallerySectionHeader from './GallerySectionHeader'
import GallerySectionZone from './GallerySectionZone'

type Image = {
  src: string
  thumbSrc: string
  alt: string
  aspectRatio: number
  desktopOffset: number
  mobileOffset: number
}

type Props = {
  label: string
  images: Image[]
  layout: 'portrait' | 'landscape' | 'mixed'
  startIndex: number
  showHeader: boolean
  onOpen: (index: number) => void
}

export default function GallerySection({ label, images, layout, startIndex, showHeader, onOpen }: Props) {
  return (
    <section>
      {showHeader && <GallerySectionHeader label={label} />}
      <GallerySectionZone
        images={images}
        layout={layout}
        startIndex={startIndex}
        onOpen={onOpen}
      />
    </section>
  )
}
