import { contact } from '../data/pages/contact'
import { services } from '../data/pages/services'
import Editable from '../components/Editable'
import EditableSubmitButton from '../components/EditableSubmitButton'

export default function Contact() {
  const { eyebrow, headline, subheadline, fields, aside } = contact
  // n options, one per service item: options[i] derives from services.items[i].title
  const serviceOptions = services.items.map(item => item.title)

  return (
    <main className="page-pad">
      <header className="contact-header max-w">
        <Editable as="p" className="eyebrow" id="contact.eyebrow" defaultValue={eyebrow} />
        <Editable as="h1" id="contact.headline" defaultValue={headline} />
        <Editable as="p" id="contact.subheadline" defaultValue={subheadline} multiline />
      </header>

      <form className="contact-form max-w" onSubmit={e => e.preventDefault()}>
        <div className="form-field">
          <label htmlFor="name">
            <Editable as="span" id="contact.fields.name.label" defaultValue={fields.name.label} />
          </label>
          <input id="name" type="text" placeholder={fields.name.placeholder} />
        </div>
        <div className="form-field">
          <label htmlFor="email">
            <Editable as="span" id="contact.fields.email.label" defaultValue={fields.email.label} />
          </label>
          <input id="email" type="email" placeholder={fields.email.placeholder} />
        </div>
        <div className="form-field">
          <label htmlFor="service">
            <Editable as="span" id="contact.fields.service.label" defaultValue={fields.service.label} />
          </label>
          <select id="service">
            <option value="">Select…</option>
            {serviceOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="message">
            <Editable as="span" id="contact.fields.message.label" defaultValue={fields.message.label} />
          </label>
          <textarea id="message" placeholder={fields.message.placeholder} />
        </div>
        <EditableSubmitButton className="btn-primary" id="contact.fields.submit" defaultValue={fields.submit} />
      </form>

      <div className="contact-aside max-w">
        <div className="contact-aside-item">
          <span className="contact-aside-label">Email</span>
          <Editable as="span" className="contact-aside-value" id="contact.aside.email" defaultValue={aside.email} />
        </div>
        <div className="contact-aside-item">
          <span className="contact-aside-label">Phone</span>
          <Editable as="span" className="contact-aside-value" id="contact.aside.phone" defaultValue={aside.phone} />
        </div>
        <div className="contact-aside-item">
          <span className="contact-aside-label">Social</span>
          <Editable as="span" className="contact-aside-value" id="contact.aside.social" defaultValue={aside.social} />
        </div>
        <Editable as="p" className="contact-note" id="contact.aside.note" defaultValue={aside.note} multiline />
      </div>
    </main>
  )
}
