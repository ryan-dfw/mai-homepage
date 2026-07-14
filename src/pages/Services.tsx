import { services } from '../data/pages/services'
import Editable from '../components/Editable'
import EditableCtaLink from '../components/EditableCtaLink'

export default function Services() {
  const { headline, subheadline, items, cta } = services
  return (
    <main className="page-pad">
      <header className="services-header max-w-wide">
        <Editable as="h1" id="services.headline" defaultValue={headline} />
        <Editable as="p" id="services.subheadline" defaultValue={subheadline} multiline />
      </header>

      <div className="max-w-wide">
        {items.map((item, i) => (
          <section key={i} className="service-panel">
            <Editable as="p" className="service-panel-meta" id={`services.items.${i}.duration`} defaultValue={item.duration} />
            <Editable as="h2" id={`services.items.${i}.title`} defaultValue={item.title} />
            <Editable as="p" id={`services.items.${i}.description`} defaultValue={item.description} multiline />
            <Editable as="p" className="service-panel-note" id={`services.items.${i}.note`} defaultValue={item.note} />
          </section>
        ))}

        <div className="services-cta">
          <Editable as="h2" id="services.cta.headline" defaultValue={cta.headline} />
          <Editable as="p" id="services.cta.body" defaultValue={cta.body} multiline />
          <EditableCtaLink to={cta.ctaTo} className="btn-primary" id="services.cta.cta" defaultValue={cta.cta} />
        </div>
      </div>
    </main>
  )
}
