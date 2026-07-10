import { content } from '../data/content'

export default function About() {
  const { eyebrow, headline, paragraphs, pillars } = content.about
  return (
    <main className="page-pad">
      <header className="about-header max-w">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{headline}</h1>
      </header>

      <div className="max-w">
        <div className="about-image-placeholder">Photo</div>

        <div className="about-body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="about-pillars">
          {pillars.map(pillar => (
            <div key={pillar.label}>
              <p className="pillar-label">{pillar.label}</p>
              <p className="pillar-body">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
