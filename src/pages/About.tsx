import { about } from '../data/pages/about'
import Editable from '../components/Editable'
import EditableImageSlot from '../components/EditableImageSlot'

export default function About() {
  const { eyebrow, headline, paragraphs, pillars } = about
  return (
    <main className="page-pad">
      <header className="about-header max-w">
        <Editable as="p" className="eyebrow" id="about.eyebrow" defaultValue={eyebrow} />
        <Editable as="h1" id="about.headline" defaultValue={headline} />
      </header>

      <div className="max-w">
        <EditableImageSlot id="about.photo" defaultUrl="" alt="" mode="img" className="about-image-placeholder" />

        <div className="about-body">
          {paragraphs.map((p, i) => (
            <Editable key={i} as="p" id={`about.paragraphs.${i}`} defaultValue={p} multiline />
          ))}
        </div>

        <div className="about-pillars">
          {pillars.map((pillar, i) => (
            <div key={i}>
              <Editable as="p" className="pillar-label" id={`about.pillars.${i}.label`} defaultValue={pillar.label} />
              <Editable as="p" className="pillar-body" id={`about.pillars.${i}.body`} defaultValue={pillar.body} multiline />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
