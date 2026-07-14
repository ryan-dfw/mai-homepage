import type { ReactNode } from 'react'
import { useControlsVisible } from '../../editable/ControlsVisibilityContext'

type Props = {
  label: ReactNode
  onDeleteCategory?: () => void
}

export default function GallerySectionHeader({ label, onDeleteCategory }: Props) {
  const { visible: controlsVisible } = useControlsVisible()
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      padding: '2rem 0 1.5rem',
      color: 'var(--text-dim)',
      fontSize: '0.68rem',
      fontWeight: 500,
      letterSpacing: '0.18em',
      textTransform: 'uppercase' as const,
      fontFamily: 'var(--font-body)',
    }}>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {label}
        {onDeleteCategory && controlsVisible && (
          <span
            role="button"
            tabIndex={0}
            className="gallery-category-delete"
            aria-label="Delete category"
            onClick={onDeleteCategory}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onDeleteCategory() } }}
          >
            ✕
          </span>
        )}
      </span>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}
