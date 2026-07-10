import { Link } from 'react-router-dom'
import { content } from '../data/content'

export default function Services() {
  const { headline, subheadline, items, cta } = content.services
  return (
    <main className="page-pad">
      <header className="services-header max-w-wide">
        <h1>{headline}</h1>
        <p>{subheadline}</p>
      </header>

      <div className="max-w-wide">
        {items.map(item => (
          <section key={item.title} className="service-panel">
            <p className="service-panel-meta">{item.duration}</p>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p className="service-panel-note">{item.note}</p>
          </section>
        ))}

        <div className="services-cta">
          <h2>{cta.headline}</h2>
          <p>{cta.body}</p>
          <Link to={cta.ctaTo} className="btn-primary">{cta.cta}</Link>
        </div>
      </div>
    </main>
  )
}
