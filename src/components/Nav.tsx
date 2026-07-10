import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { content } from '../data/content'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

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
        <Link to="/" className="nav-brand">Lorem Ipsum</Link>
        <nav className="nav-links" aria-label="Primary">
          {content.nav.links.map(link => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </nav>
        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <nav className={`nav-overlay${open ? ' open' : ''}`} aria-hidden={!open}>
        {content.nav.links.map(link => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
