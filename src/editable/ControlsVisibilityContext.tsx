import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type ControlsVisibilityValue = {
  /** Whether pencils, plus/upload buttons, and delete buttons should render */
  visible: boolean
  toggle: () => void
}

const ControlsVisibilityContext = createContext<ControlsVisibilityValue | null>(null)

export function ControlsVisibilityProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true)
  const toggle = useCallback(() => setVisible(v => !v), [])

  return (
    <ControlsVisibilityContext.Provider value={{ visible, toggle }}>
      {children}
    </ControlsVisibilityContext.Provider>
  )
}

export function useControlsVisible() {
  const ctx = useContext(ControlsVisibilityContext)
  if (!ctx) throw new Error('useControlsVisible must be used within a ControlsVisibilityProvider')
  return ctx
}
