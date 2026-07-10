import { content } from '../data/content'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-tagline">{content.footer.tagline}</p>
      <p className="footer-email">{content.footer.email}</p>
    </footer>
  )
}
