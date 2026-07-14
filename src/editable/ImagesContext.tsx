import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { uploadImageToCloudinary } from '../cloudinary'

const STORAGE_KEY = 'mai-editable:images'
const DOC_COLLECTION = 'site'
const DOC_ID = 'images'

export type ImageSlot = { url: string; width?: number; height?: number }
type ImageSlots = Record<string, ImageSlot>

type ImagesContextValue = {
  getImage: (id: string, defaultUrl: string) => ImageSlot
  /** Uploads a file to Cloudinary and saves it into the given slot */
  uploadImage: (id: string, file: File) => Promise<void>
  isUploading: (id: string) => boolean
}

const ImagesContext = createContext<ImagesContextValue | null>(null)

function loadLocalCache(): ImageSlots {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveLocalCache(slots: ImageSlots) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots))
  } catch {
    // ignore
  }
}

export function ImagesProvider({ children }: { children: ReactNode }) {
  const [slots, setSlots] = useState<ImageSlots>(() => loadLocalCache())
  const [uploadingIds, setUploadingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!db) return
    const ref = doc(db, DOC_COLLECTION, DOC_ID)
    const unsubscribe = onSnapshot(
      ref,
      snapshot => {
        const remote = (snapshot.data() as ImageSlots | undefined) ?? {}
        setSlots(remote)
        saveLocalCache(remote)
      },
      error => {
        console.error('[images] Firestore sync failed, falling back to local storage only:', error)
      }
    )
    return unsubscribe
  }, [])

  const getImage = useCallback((id: string, defaultUrl: string) => {
    return slots[id] ?? { url: defaultUrl }
  }, [slots])

  const uploadImage = useCallback(async (id: string, file: File) => {
    setUploadingIds(prev => new Set(prev).add(id))
    try {
      const uploaded = await uploadImageToCloudinary(file)
      const next = { ...slots, [id]: { url: uploaded.url, width: uploaded.width, height: uploaded.height } }
      setSlots(next)
      saveLocalCache(next)
      if (db) {
        await setDoc(doc(db, DOC_COLLECTION, DOC_ID), next)
      }
    } finally {
      setUploadingIds(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }, [slots])

  const isUploading = useCallback((id: string) => uploadingIds.has(id), [uploadingIds])

  return (
    <ImagesContext.Provider value={{ getImage, uploadImage, isUploading }}>
      {children}
    </ImagesContext.Provider>
  )
}

export function useImages() {
  const ctx = useContext(ImagesContext)
  if (!ctx) throw new Error('useImages must be used within an ImagesProvider')
  return ctx
}
