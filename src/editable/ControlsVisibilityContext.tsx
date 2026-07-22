import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { isEditPath } from './editPrefix'

type ControlsVisibilityValue = {
  /** True only while the current URL is under the secret edit-mode path */
  unlocked: boolean
  /**
   * Whether pencils, plus/upload buttons, delete buttons, and the eye toggle
   * itself should render. Always false outside the secret path, regardless
   * of the manual show/hide toggle.
   */
  visible: boolean
  /** Flips the manual show/hide toggle (only meaningful while unlocked) */
  toggle: () => void
}

const ControlsVisibilityContext = createContext<ControlsVisibilityValue | null>(null)

export function ControlsVisibilityProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const unlocked = isEditPath(location.pathname)

  const [manualVisible, setManualVisible] = useState(true)
  const toggle = useCallback(() => setManualVisible(v => !v), [])

  const visible = unlocked && manualVisible

  return (
    <ControlsVisibilityContext.Provider value={{ unlocked, visible, toggle }}>
      {children}
    </ControlsVisibilityContext.Provider>
  )
}

export function useControlsVisible() {
  const ctx = useContext(ControlsVisibilityContext)
  if (!ctx) throw new Error('useControlsVisible must be used within a ControlsVisibilityProvider')
  return ctx
}
