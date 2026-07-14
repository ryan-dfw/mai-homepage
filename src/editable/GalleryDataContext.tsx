import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { uploadImageToCloudinary } from '../cloudinary'
import { gallery as gallerySeed } from '../data/pages/gallery'
import { galleryImages as galleryImagesSeed } from '../data/galleryImg'

const DOC_COLLECTION = 'site'
const DOC_ID = 'gallery'
const STORAGE_KEY = 'mai-editable:gallery'

export type GalleryImage = {
  id: string
  url: string
  alt: string
  aspectRatio: number
}

export type GalleryCategory = {
  id: string
  label: string
  images: GalleryImage[]
}

type GalleryDataValue = {
  categories: GalleryCategory[]
  loaded: boolean
  addCategory: () => void
  removeCategory: (categoryId: string) => void
  renameCategory: (categoryId: string, label: string) => void
  addImages: (categoryId: string, files: File[]) => Promise<void>
  replaceImage: (categoryId: string, imageId: string, file: File) => Promise<void>
  removeImage: (categoryId: string, imageId: string) => void
  reorderImage: (categoryId: string, fromIndex: number, toIndex: number) => void
  isUploading: (categoryId: string) => boolean
  isImageReplacing: (imageId: string) => boolean
}

const GalleryDataContext = createContext<GalleryDataValue | null>(null)

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

function loadLocalCache(): GalleryCategory[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveLocalCache(categories: GalleryCategory[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
  } catch {
    // ignore
  }
}

/** Builds the initial seed from the current static gallery.ts + galleryImg.ts */
function buildSeedCategories(): GalleryCategory[] {
  return gallerySeed.categories.map((cat, ci) => {
    const imageSet = galleryImagesSeed[ci]
    return {
      id: makeId('cat'),
      label: cat.label,
      images: (imageSet?.images ?? []).map(img => ({
        id: makeId('img'),
        url: img.src,
        alt: img.alt,
        aspectRatio: img.aspectRatio,
      })),
    }
  })
}

export function GalleryDataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<GalleryCategory[]>(() => loadLocalCache() ?? [])
  const [loaded, setLoaded] = useState(false)
  const [uploadingCategoryIds, setUploadingCategoryIds] = useState<Set<string>>(new Set())
  const [replacingImageIds, setReplacingImageIds] = useState<Set<string>>(new Set())
  const hasSeeded = useRef(false)

  useEffect(() => {
    if (!db) {
      // No Firebase config — fall back to local cache, or the static seed if empty.
      setCategories(prev => (prev.length > 0 ? prev : buildSeedCategories()))
      setLoaded(true)
      return
    }

    const ref = doc(db, DOC_COLLECTION, DOC_ID)
    const unsubscribe = onSnapshot(
      ref,
      async snapshot => {
        const data = snapshot.data()
        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories)
          saveLocalCache(data.categories)
          setLoaded(true)
        } else if (!hasSeeded.current) {
          // Nothing in Firestore yet — dump the current default gallery into it.
          hasSeeded.current = true
          const seed = buildSeedCategories()
          try {
            // Double-check with a direct read to avoid a race with another tab seeding concurrently.
            const fresh = await getDoc(ref)
            if (!fresh.exists()) {
              await setDoc(ref, { categories: seed })
            }
          } catch (error) {
            console.error('[gallery] Failed to seed default gallery into Firestore:', error)
          }
          setCategories(seed)
          saveLocalCache(seed)
          setLoaded(true)
        }
      },
      error => {
        console.error('[gallery] Firestore sync failed, falling back to local storage only:', error)
        setCategories(prev => (prev.length > 0 ? prev : buildSeedCategories()))
        setLoaded(true)
      }
    )
    return unsubscribe
  }, [])

  const persist = useCallback((next: GalleryCategory[]) => {
    setCategories(next)
    saveLocalCache(next)
    if (db) {
      setDoc(doc(db, DOC_COLLECTION, DOC_ID), { categories: next }).catch(error => {
        console.error('[gallery] Failed to save gallery change to Firestore:', error)
      })
    }
  }, [])

  const addCategory = useCallback(() => {
    setCategories(prev => {
      const next = [...prev, { id: makeId('cat'), label: 'New category', images: [] }]
      saveLocalCache(next)
      if (db) setDoc(doc(db, DOC_COLLECTION, DOC_ID), { categories: next }).catch(console.error)
      return next
    })
  }, [])

  const removeCategory = useCallback((categoryId: string) => {
    setCategories(prev => {
      const next = prev.filter(c => c.id !== categoryId)
      persist(next)
      return next
    })
  }, [persist])

  const renameCategory = useCallback((categoryId: string, label: string) => {
    setCategories(prev => {
      const next = prev.map(c => (c.id === categoryId ? { ...c, label } : c))
      persist(next)
      return next
    })
  }, [persist])

  const removeImage = useCallback((categoryId: string, imageId: string) => {
    setCategories(prev => {
      const next = prev.map(c =>
        c.id === categoryId ? { ...c, images: c.images.filter(img => img.id !== imageId) } : c
      )
      persist(next)
      return next
    })
  }, [persist])

  const reorderImage = useCallback((categoryId: string, fromIndex: number, toIndex: number) => {
    setCategories(prev => {
      const next = prev.map(c => {
        if (c.id !== categoryId) return c
        const images = [...c.images]
        const [moved] = images.splice(fromIndex, 1)
        images.splice(toIndex, 0, moved)
        return { ...c, images }
      })
      persist(next)
      return next
    })
  }, [persist])

  const addImages = useCallback(async (categoryId: string, files: File[]) => {
    if (files.length === 0) return
    setUploadingCategoryIds(prev => new Set(prev).add(categoryId))
    try {
      const uploaded = await Promise.all(files.map(async file => {
        const result = await uploadImageToCloudinary(file)
        const img: GalleryImage = {
          id: makeId('img'),
          url: result.url,
          alt: '',
          aspectRatio: result.width / result.height,
        }
        return img
      }))

      setCategories(prev => {
        const next = prev.map(c =>
          c.id === categoryId ? { ...c, images: [...c.images, ...uploaded] } : c
        )
        persist(next)
        return next
      })
    } finally {
      setUploadingCategoryIds(prev => {
        const next = new Set(prev)
        next.delete(categoryId)
        return next
      })
    }
  }, [persist])

  const replaceImage = useCallback(async (categoryId: string, imageId: string, file: File) => {
    setReplacingImageIds(prev => new Set(prev).add(imageId))
    try {
      const result = await uploadImageToCloudinary(file)
      setCategories(prev => {
        const next = prev.map(c =>
          c.id === categoryId
            ? {
                ...c,
                images: c.images.map(img =>
                  img.id === imageId
                    ? { ...img, url: result.url, aspectRatio: result.width / result.height }
                    : img
                ),
              }
            : c
        )
        persist(next)
        return next
      })
    } finally {
      setReplacingImageIds(prev => {
        const next = new Set(prev)
        next.delete(imageId)
        return next
      })
    }
  }, [persist])

  const isUploading = useCallback((categoryId: string) => uploadingCategoryIds.has(categoryId), [uploadingCategoryIds])
  const isImageReplacing = useCallback((imageId: string) => replacingImageIds.has(imageId), [replacingImageIds])

  return (
    <GalleryDataContext.Provider
      value={{ categories, loaded, addCategory, removeCategory, renameCategory, addImages, replaceImage, removeImage, reorderImage, isUploading, isImageReplacing }}
    >
      {children}
    </GalleryDataContext.Provider>
  )
}

export function useGalleryData() {
  const ctx = useContext(GalleryDataContext)
  if (!ctx) throw new Error('useGalleryData must be used within a GalleryDataProvider')
  return ctx
}
