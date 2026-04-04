import Link from 'next/link'
import Header from '../../components/Header'

const industries = [
  { icon: '🍺', name: 'Brewing' },
  { icon: '🥫', name: 'Food Processing' },
  { icon: '💊', name: 'Pharmaceuticals' },
  { icon: '📄', name: 'Pulp & Paper' },
  { icon: '🧪', name: 'Specialty Chemicals' },
  { icon: '🏭', name: 'Fast-Moving Consumer Goods' },
  { icon: '🏥', name: 'Hospitals' },
  { icon: '🔬', name: 'Life Science' },
  { icon: '🏢', name: 'Commercial & Office Buildings' },
  { icon: '🏫', name: 'Campus & Cities' },
]

const stats = [
  { value: '50%', label: 'of process heat used in industry' },
  { value: '8%', label: 'of global primary energy use' },
  { value: '2.25 GT', label: 'GHG emissions per year' },
]

const newsItems = [
  {
    date: 'January 22, 2026',
    title: 'New heat pump tech modernizes century old boilers to cut emissions in factories',
    source: 'Interesting Engineering',
  },
  {
    date: 'January 21, 2026',
    title: 'Electrifying boilers to decarbonize industry',
    source: 'MIT News',
  },
]

export default function AtmosZeroPage() {
  return (
    <>
      <Header />

      <section className="az-hero">
        <div className="container">
          <Link href="/research" className="az-back">← Back to Research</Link>
          <div className="az-hero-content">
            <span className="az-category">Clean Energy</span>
            <h1 className="az-title">AtmosZero</h1>
            <p className="az-tagline">Decarbonizing Industry</p>
            <p className="az-lead">
              The lowest cost solution to electrify the boiler room. A modular electrified heat pump
              that takes the heat in the air and turns it into decarbonized industrial steam — at the
              temperature you need, whenever you need it.
            </p>
            <div className="az-actions">
              <a
                href="https://atmoszero.energy"
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                Visit AtmosZero ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Impact Stats */}
        <section className="section container">
          <h2>The Scale of the Problem</h2>
          <p style={{ maxWidth: 640, marginBottom: 40, color: 'var(--text-secondary)' }}>
            Steam has been made the same way for over 150 years: burn fuels to boil water.
            Industrial steam is one of the largest sources of greenhouse gas emissions globally.
          </p>
          <div className="az-stats">
            {stats.map((s, i) => (
              <div key={i} className="az-stat-card">
                <span className="az-stat-value">{s.value}</span>
                <span className="az-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section className="section alt container">
          <h2>The Technology</h2>
          <div className="az-tech-grid">
            <div className="az-tech-card">
              <div className="az-tech-icon">⚡</div>
              <h3>Electrified Heat Pump</h3>
              <p>A modular industrial heat pump boiler that replaces fossil-fuel combustion with electric power, extracting ambient heat from the air.</p>
            </div>
            <div className="az-tech-card">
              <div className="az-tech-icon">♻️</div>
              <h3>Drop-In Replacement</h3>
              <p>Designed as a direct replacement for traditional boilers — no facility redesign needed. Plug into existing steam infrastructure.</p>
            </div>
            <div className="az-tech-card">
              <div className="az-tech-icon">🌡️</div>
              <h3>On-Demand Steam</h3>
              <p>Delivers decarbonized steam at the temperature you need, when you need it. Full control over output parameters.</p>
            </div>
            <div className="az-tech-card">
              <div className="az-tech-icon">🚫</div>
              <h3>Zero Emissions</h3>
              <p>Eliminates both criteria pollutants and GHG emissions from steam generation, powering the next industrial revolution.</p>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="section container">
          <h2>Target Industries</h2>
          <p style={{ maxWidth: 640, marginBottom: 40, color: 'var(--text-secondary)' }}>
            AtmosZero serves a wide range of sectors that depend on industrial steam and process heat.
          </p>
          <div className="az-industries">
            {industries.map((ind, i) => (
              <div key={i} className="az-industry-chip">
                <span className="az-industry-icon">{ind.icon}</span>
                <span>{ind.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* News */}
        <section className="section alt container">
          <h2>In the Spotlight</h2>
          <div className="az-news-grid">
            {newsItems.map((item, i) => (
              <div key={i} className="az-news-card">
                <span className="az-news-date">{item.date}</span>
                <h3 className="az-news-title">{item.title}</h3>
                <span className="az-news-source">{item.source}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section container" style={{ textAlign: 'center' }}>
          <h2>Get Involved</h2>
          <p style={{ maxWidth: 540, margin: '0 auto 32px', color: 'var(--text-secondary)' }}>
            Interested in clean energy research or contributing to ventures like AtmosZero?
            Join the Ram Ventures community.
          </p>
          <Link href="/apply" className="button">Apply Now</Link>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Ventures</div>
          <div className="footer-right">Built for students</div>
        </div>
      </footer>
    </>
  )
}
