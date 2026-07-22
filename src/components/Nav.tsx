import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nav as navContent } from '../data/pages/nav'
import { navLinks, navMenuLabels } from '../data/navLinks'
import EditableCtaLink from './EditableCtaLink'
import { useControlsVisible } from '../editable/ControlsVisibilityContext'
import { withEditPrefix } from '../editable/editPrefix'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { unlocked, visible: controlsVisible, toggle: toggleControls } = useControlsVisible()

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="site-nav">
        <EditableCtaLink to={withEditPrefix('/', unlocked)} className="nav-brand" id="nav.brand" defaultValue={navContent.brand} />
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map(link => (
            <Link key={link.to} to={withEditPrefix(link.to, unlocked)}>{link.label}</Link>
          ))}
        </nav>
        {unlocked && (
          <span
            role="button"
            tabIndex={0}
            className={`controls-toggle-btn${controlsVisible ? ' is-active' : ''}`}
            aria-label={controlsVisible ? 'Hide editing controls' : 'Show editing controls'}
            aria-pressed={controlsVisible}
            onClick={toggleControls}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleControls() } }}
          >
            <span className="controls-toggle-icon">{controlsVisible ? '👁️' : '🙈'}</span>
          </span>
        )}

        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? navMenuLabels.menuCloseLabel : navMenuLabels.menuOpenLabel}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <nav className={`nav-overlay${open ? ' open' : ''}`} aria-hidden={!open}>
        {navLinks.map(link => (
          <Link key={link.to} to={withEditPrefix(link.to, unlocked)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
