import { content } from '../data/content'

export default function Contact() {
  const { eyebrow, headline, subheadline, fields, aside } = content.contact
  return (
    <main className="page-pad">
      <header className="contact-header max-w">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{headline}</h1>
        <p>{subheadline}</p>
      </header>

      <form className="contact-form max-w" onSubmit={e => e.preventDefault()}>
        <div className="form-field">
          <label htmlFor="name">{fields.name.label}</label>
          <input id="name" type="text" placeholder={fields.name.placeholder} />
        </div>
        <div className="form-field">
          <label htmlFor="email">{fields.email.label}</label>
          <input id="email" type="email" placeholder={fields.email.placeholder} />
        </div>
        <div className="form-field">
          <label htmlFor="service">{fields.service.label}</label>
          <select id="service">
            <option value="">Select…</option>
            {fields.service.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="message">{fields.message.label}</label>
          <textarea id="message" placeholder={fields.message.placeholder} />
        </div>
        <button type="submit" className="btn-primary">{fields.submit}</button>
      </form>

      <div className="contact-aside max-w">
        <div className="contact-aside-item">
          <span className="contact-aside-label">Email</span>
          <span className="contact-aside-value">{aside.email}</span>
        </div>
        <div className="contact-aside-item">
          <span className="contact-aside-label">Phone</span>
          <span className="contact-aside-value">{aside.phone}</span>
        </div>
        <div className="contact-aside-item">
          <span className="contact-aside-label">Social</span>
          <span className="contact-aside-value">{aside.social}</span>
        </div>
        <p className="contact-note">{aside.note}</p>
      </div>
    </main>
  )
}
