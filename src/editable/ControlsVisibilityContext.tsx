import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

/**
 * Nobody should see editing UI just by landing on the plain domain — it only
 * ever turns on for a browser that has visited the secret unlock route once.
 * That's a QoL gate for a private dev-preview link, not real security.
 */
const UNLOCK_STORAGE_KEY = 'mai-edit-unlocked'

type ControlsVisibilityValue = {
  /** True once this browser has visited the secret unlock route */
  unlocked: boolean
  /**
   * Whether pencils, plus/upload buttons, delete buttons, and the eye toggle
   * itself should render. Always false when not unlocked, regardless of the
   * manual show/hide toggle.
   */
  visible: boolean
  /** Flips the manual show/hide toggle (no-op while not unlocked) */
  toggle: () => void
  /** Marks this browser as unlocked (persisted) and shows controls by default */
  unlock: () => void
}

const ControlsVisibilityContext = createContext<ControlsVisibilityValue | null>(null)

export function ControlsVisibilityProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem(UNLOCK_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [manualVisible, setManualVisible] = useState(true)

  const toggle = useCallback(() => setManualVisible(v => !v), [])

  const unlock = useCallback(() => {
    try {
      localStorage.setItem(UNLOCK_STORAGE_KEY, 'true')
    } catch {
      // localStorage unavailable (private browsing, etc.) — unlock still
      // works for the rest of this session, just won't persist.
    }
    setUnlocked(true)
  }, [])

  const visible = unlocked && manualVisible

  return (
    <ControlsVisibilityContext.Provider value={{ unlocked, visible, toggle, unlock }}>
      {children}
    </ControlsVisibilityContext.Provider>
  )
}

export function useControlsVisible() {
  const ctx = useContext(ControlsVisibilityContext)
  if (!ctx) throw new Error('useControlsVisible must be used within a ControlsVisibilityProvider')
  return ctx
}
