import { Link } from 'react-router-dom'
import { content } from '../data/content'

export default function Home() {
  const { hero, teaser, serviceTeasers, closingCta } = content.home
  return (
    <main>
      {/* Hero */}
      <section className="hero page-pad">
        <div className="hero-bg" />
        {/* Mobile only: full-bleed background */}
        <div className="hero-photo-bg" aria-hidden="true" />
        <div className="hero-inner">
          <p className="eyebrow hero-eyebrow">{hero.eyebrow}</p>
          <h1>{hero.headline}</h1>
          <p className="hero-sub">{hero.subheadline}</p>
          <Link to={hero.ctaTo} className="btn-primary">{hero.cta}</Link>
        </div>
        <div className="hero-photo-panel" aria-hidden="true" />
      </section>

      <div className="page-pad">
        {/* Teaser */}
        <section className="home-teaser max-w-wide">
          <p className="eyebrow home-teaser-label">{teaser.label}</p>
          <h2>{teaser.headline}</h2>
          <p>{teaser.body}</p>
        </section>

        {/* Service teasers */}
        <div className="service-teasers max-w-wide">
          {serviceTeasers.map(s => (
            <div key={s.title} className="service-teaser-item">
              <h3>{s.title}</h3>
              <p>{s.blurb}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <section className="home-closing">
        <div className="max-w">
          <h2>{closingCta.headline}</h2>
          <p>{closingCta.body}</p>
          <Link to={closingCta.ctaTo} className="btn-primary">{closingCta.cta}</Link>
        </div>
      </section>
    </main>
  )
}
