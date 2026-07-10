type Props = {
  label: string
}

export default function GallerySectionHeader({ label }: Props) {
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
      <span>{label}</span>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}
