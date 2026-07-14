import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const STORAGE_KEY = 'mai-editable:overrides'
const DOC_COLLECTION = 'site'
const DOC_ID = 'copy'

type Overrides = Record<string, string>

type EditableContextValue = {
  getValue: (id: string, fallback: string) => string
  setValue: (id: string, value: string) => void
  resetValue: (id: string) => void
  resetAll: () => void
  /** True once we know Firestore's real state (or Firestore isn't configured) */
  synced: boolean
}

const EditableContext = createContext<EditableContextValue | null>(null)

function loadLocalCache(): Overrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveLocalCache(overrides: Overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — edits just won't persist locally
  }
}

export function EditableProvider({ children }: { children: ReactNode }) {
  // Render instantly from whatever we cached locally last time, then let the
  // Firestore snapshot (if configured) take over as the source of truth.
  const [overrides, setOverrides] = useState<Overrides>(() => loadLocalCache())
  const [synced, setSynced] = useState(false)
  // Ids we've already pushed a default-copy seed for this session, so we
  // don't spam Firestore with a write on every re-render.
  const seededIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!db) {
      // No Firebase config present — local-only mode (e.g. the "real" production build).
      setSynced(true)
      return
    }
    const ref = doc(db, DOC_COLLECTION, DOC_ID)
    const unsubscribe = onSnapshot(
      ref,
      snapshot => {
        const remote = (snapshot.data()?.overrides as Overrides | undefined) ?? {}
        setOverrides(remote)
        saveLocalCache(remote)
        setSynced(true)
      },
      error => {
        console.error('[editable] Firestore sync failed, falling back to local storage only:', error)
        setSynced(true)
      }
    )
    return unsubscribe
  }, [])

  const persist = useCallback((next: Overrides) => {
    setOverrides(next)
    saveLocalCache(next)
    if (db) {
      setDoc(doc(db, DOC_COLLECTION, DOC_ID), { overrides: next }).catch(error => {
        console.error('[editable] Failed to save edit to Firestore:', error)
      })
    }
  }, [])

  const getValue = useCallback((id: string, fallback: string) => {
    if (id in overrides) return overrides[id]

    // Self-seed: once we've confirmed Firestore's real state and this id
    // genuinely isn't there yet, backfill it with the current default copy.
    // In practice this means just clicking through each page once "dumps"
    // all of its text into Firestore.
    if (synced && db && !seededIds.current.has(id)) {
      seededIds.current.add(id)
      setDoc(doc(db, DOC_COLLECTION, DOC_ID), { overrides: { [id]: fallback } }, { merge: true }).catch(error => {
        console.error('[editable] Failed to seed default copy to Firestore:', error)
      })
    }

    return fallback
  }, [overrides, synced])

  const setValue = useCallback((id: string, value: string) => {
    persist({ ...overrides, [id]: value })
  }, [overrides, persist])

  const resetValue = useCallback((id: string) => {
    const next = { ...overrides }
    delete next[id]
    persist(next)
  }, [overrides, persist])

  const resetAll = useCallback(() => {
    persist({})
  }, [persist])

  return (
    <EditableContext.Provider value={{ getValue, setValue, resetValue, resetAll, synced }}>
      {children}
    </EditableContext.Provider>
  )
}

export function useEditableText() {
  const ctx = useContext(EditableContext)
  if (!ctx) throw new Error('useEditableText must be used within an EditableProvider')
  return ctx
}
