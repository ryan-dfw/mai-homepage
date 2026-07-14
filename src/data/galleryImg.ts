// Non-copy image data for the Gallery page: file paths, aspect ratios, offsets,
// and alt text (image-bound accessibility metadata, not editable body copy).
// Keyed by the same category label used in ./pages/gallery.ts, in the same order.
export const galleryLayout = 'portrait' as const

export const galleryImages: { category: string; images: {
  src: string
  thumbSrc: string
  alt: string
  aspectRatio: number
  desktopOffset: number
  mobileOffset: number
}[] }[] = [
  {
    category: 'Lorem ipsum',
    images: [
      { src: '/res/img/A7202824.webp',  thumbSrc: '/res/img/A7202824.webp',  alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-p01.svg', thumbSrc: '/res/img/filler-p01.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-p07.svg', thumbSrc: '/res/img/filler-p07.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-s01.svg', thumbSrc: '/res/img/filler-s01.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-t01.svg', thumbSrc: '/res/img/filler-t01.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-p02.svg', thumbSrc: '/res/img/filler-p02.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x01.svg', thumbSrc: '/res/img/filler-x01.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x02.svg', thumbSrc: '/res/img/filler-x02.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-t02.svg', thumbSrc: '/res/img/filler-t02.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x03.svg', thumbSrc: '/res/img/filler-x03.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
    ],
  },
  {
    category: 'Dolor sit amet',
    images: [
      { src: '/res/img/filler-p08.svg', thumbSrc: '/res/img/filler-p08.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-s02.svg', thumbSrc: '/res/img/filler-s02.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-p03.svg', thumbSrc: '/res/img/filler-p03.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x04.svg', thumbSrc: '/res/img/filler-x04.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-v01.svg', thumbSrc: '/res/img/filler-v01.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-p09.svg', thumbSrc: '/res/img/filler-p09.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x05.svg', thumbSrc: '/res/img/filler-x05.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x07.svg', thumbSrc: '/res/img/filler-x07.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-s03.svg', thumbSrc: '/res/img/filler-s03.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
    ],
  },
  {
    category: 'Consectetur',
    images: [
      { src: '/res/img/filler-p04.svg', thumbSrc: '/res/img/filler-p04.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x08.svg', thumbSrc: '/res/img/filler-x08.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-t03.svg', thumbSrc: '/res/img/filler-t03.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-p10.svg', thumbSrc: '/res/img/filler-p10.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-v02.svg', thumbSrc: '/res/img/filler-v02.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x09.svg', thumbSrc: '/res/img/filler-x09.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-p05.svg', thumbSrc: '/res/img/filler-p05.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x10.svg', thumbSrc: '/res/img/filler-x10.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-t04.svg', thumbSrc: '/res/img/filler-t04.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x13.svg', thumbSrc: '/res/img/filler-x13.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
    ],
  },
  {
    category: 'Adipiscing',
    images: [
      { src: '/res/img/filler-s04.svg', thumbSrc: '/res/img/filler-s04.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x11.svg', thumbSrc: '/res/img/filler-x11.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-p06.svg', thumbSrc: '/res/img/filler-p06.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-v03.svg', thumbSrc: '/res/img/filler-v03.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x12.svg', thumbSrc: '/res/img/filler-x12.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-t05.svg', thumbSrc: '/res/img/filler-t05.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-v04.svg', thumbSrc: '/res/img/filler-v04.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x14.svg', thumbSrc: '/res/img/filler-x14.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-t06.svg', thumbSrc: '/res/img/filler-t06.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
      { src: '/res/img/filler-x15.svg', thumbSrc: '/res/img/filler-x15.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
    ],
  },
]
