import { footer as footerContent } from '../data/pages/footer'
import Editable from './Editable'

export default function Footer() {
  return (
    <footer className="footer">
      <Editable as="p" className="footer-tagline" id="footer.tagline" defaultValue={footerContent.tagline} />
      <Editable as="p" className="footer-email" id="footer.email" defaultValue={footerContent.email} />
    </footer>
  )
}
