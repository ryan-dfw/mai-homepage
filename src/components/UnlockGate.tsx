import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useControlsVisible } from '../editable/ControlsVisibilityContext'

/**
 * Visiting this route marks the browser as "unlocked" (persisted in
 * localStorage) so editing controls become available sitewide, then bounces
 * straight to the homepage. There's no real page here — it's just a private
 * on/off switch reached by typing the secret path into the address bar.
 */
export default function UnlockGate() {
  const { unlock } = useControlsVisible()

  useEffect(() => {
    unlock()
  }, [unlock])

  return <Navigate to="/" replace />
}
