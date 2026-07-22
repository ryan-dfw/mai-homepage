import { home } from '../data/pages/home'
import { homeLinks } from '../data/homeLinks'
import Editable from '../components/Editable'
import EditableCtaLink from '../components/EditableCtaLink'
import EditableImageSlot from '../components/EditableImageSlot'
import { useControlsVisible } from '../editable/ControlsVisibilityContext'
import { withEditPrefix } from '../editable/editPrefix'

const HERO_PHOTO_DEFAULT = '/res/img/A7202824.webp'

export default function Home() {
  const { hero, teaser, serviceTeasers, closingCta } = home
  const { unlocked } = useControlsVisible()
  return (
    <main>
      {/* Hero */}
      <section className="hero page-pad">
        <div className="hero-bg" />
        {/* Mobile only: full-bleed background */}
        <EditableImageSlot id="home.heroBackground" defaultUrl={HERO_PHOTO_DEFAULT} mode="background" className="hero-photo-bg" />
        <div className="hero-inner">
          <Editable as="p" className="eyebrow hero-eyebrow" id="home.hero.eyebrow" defaultValue={hero.eyebrow} />
          <Editable as="h1" id="home.hero.headline" defaultValue={hero.headline} />
          <Editable as="p" className="hero-sub" id="home.hero.subheadline" defaultValue={hero.subheadline} multiline />
          <EditableCtaLink to={withEditPrefix(homeLinks.heroCtaTo, unlocked)} className="btn-primary" id="home.hero.cta" defaultValue={hero.cta} />
        </div>
        <EditableImageSlot id="home.heroBackground" defaultUrl={HERO_PHOTO_DEFAULT} mode="background" className="hero-photo-panel" />
      </section>

      <div className="page-pad">
        {/* Teaser */}
        <section className="home-teaser max-w-wide">
          <Editable as="p" className="eyebrow home-teaser-label" id="home.teaser.label" defaultValue={teaser.label} />
          <Editable as="h2" id="home.teaser.headline" defaultValue={teaser.headline} />
          <Editable as="p" id="home.teaser.body" defaultValue={teaser.body} multiline />
        </section>

        {/* Service teasers */}
        <div className="service-teasers max-w-wide">
          {serviceTeasers.map((s, i) => (
            <div key={i} className="service-teaser-item">
              <Editable as="h3" id={`home.serviceTeasers.${i}.title`} defaultValue={s.title} />
              <Editable as="p" id={`home.serviceTeasers.${i}.blurb`} defaultValue={s.blurb} multiline />
            </div>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <section className="home-closing">
        <div className="max-w">
          <Editable as="h2" id="home.closingCta.headline" defaultValue={closingCta.headline} />
          <Editable as="p" id="home.closingCta.body" defaultValue={closingCta.body} multiline />
          <EditableCtaLink to={withEditPrefix(homeLinks.closingCtaTo, unlocked)} className="btn-primary" id="home.closingCta.cta" defaultValue={closingCta.cta} />
        </div>
      </section>
    </main>
  )
}
