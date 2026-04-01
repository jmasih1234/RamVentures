import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import ScrollReveal from '../components/ScrollReveal'

export default function Home({ agathonHighlights = [] }) {
  return (
    <>
      <Header />

      <section className="hero banner">
        <div className="hero-bg">
          <Image 
            src="/pathways-composite.png" 
            alt="Venture Backdrop" 
            className="venture-backdrop"
            fill
            priority
            quality={60}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero-inner container">
          <h1 className="hero-title">Ram Ventures</h1>
          <p className="hero-sub">Entrepreneurial Ecosystem at CSU: Supporting startups from Agtech to deep tech across Northern Colorado</p>

          <div className="hero-actions">
            <Link href="/ventures" className="cta primary">Browse Ventures</Link>
            <a href="https://luma.com/exz9fc9w" target="_blank" rel="noopener noreferrer" className="cta secondary">Upcoming Events</a>
            <a className="cta ghost" href="https://docs.google.com/forms/d/e/1FAIpQLSfx49YqZRDpIq5sK-U-sA9KUJyoEXfLvVLl904g5L99FtUwtQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">Join</a>
          </div>
        </div>
      </section>

      <main>
        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <ScrollReveal>
                <div className="stat-card">
                  <div className="stat-label">Seeking Active Ventures</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="stat-card">
                  <div className="stat-label">Vast Entrepreneurial Network</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="stat-card">
                  <div className="stat-label">Seeking Funding Actively</div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="about" className="section container">
          <div className="split about-split">
            <ScrollReveal>
              <div className="about-panel about-left">
                <h2>About</h2>
                <p>
                  Ram Ventures is a University incubator at Colorado State focused on helping students build teams, launch startups, and connect with mentors and investors across Northern Colorado.
                </p>
                <p>
                  Ram Ventures aims to be the "connective tissue" for entrepreneurial and driven undergraduate venture ideas, driving collaboration across all 8 CSU colleges.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="about-panel about-right">
                <h2>Our Focus</h2>
                <ul>
                  <li>Student startups & senior design projects</li>
                  <li>Mentorship and office hours</li>
                  <li>Demo days and funding opportunities</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        

        {/* Testimonials Section - REMOVED */}

        <section id="membership" className="section container membership-section">
          <div className="membership-content">
            <ScrollReveal>
              <div className="membership-intro">
                <h2>Join Our Community</h2>
                <p>Join Ram Ventures as a founder, mentor, or supporter and help build a stronger startup ecosystem at Colorado State.</p>
              </div>
            </ScrollReveal>
            <div className="membership-grid">
              <ScrollReveal delay={50}>
                <div className="membership-card">
                  <h3>Founders</h3>
                  <p>Build with peer teams, access mentorship, and move your venture from concept to traction.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="membership-card">
                  <h3>Mentors</h3>
                  <p>Support student-led ventures with practical guidance in product, growth, and fundraising.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="membership-card">
                  <h3>Partners</h3>
                  <p>Collaborate with emerging founders through sponsorships, pilots, and ecosystem partnerships.</p>
                </div>
              </ScrollReveal>
            </div>
            <div className="membership-cta">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfx49YqZRDpIq5sK-U-sA9KUJyoEXfLvVLl904g5L99FtUwtQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="button">Apply to Join</a>
            </div>
          </div>
        </section>

        <section id="gallery" className="section alt container">
          <ScrollReveal>
            <div>
              <h2>Ag-A-thon 2026 Highlights</h2>
            </div>
          </ScrollReveal>
          <div className="highlights-marquee-wrap">
            {agathonHighlights.length === 0 ? (
              <div className="empty-state">
                <h3>Photos Coming Soon</h3>
                <p>Ag-A-thon highlights will appear here soon.</p>
              </div>
            ) : (
              <div className="highlights-marquee-track" aria-label="Ag-A-thon 2026 photo strip">
                {agathonHighlights.map((img) => (
                  <div className="highlight-card" key={img.src}>
                    <img src={img.src} alt={img.title} loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Team Section - Simplified */}
        <section id="team" className="section container">
          <ScrollReveal>
            <div>
              <h2>Leadership Team</h2>
              <p className="muted">Meet the team driving Ram Ventures forward</p>
            </div>
          </ScrollReveal>
          <div className="team-grid">
            <ScrollReveal delay={50}>
              <Link href="/team/daniel-ortiz-valencia" className="team-card">
                <div className="team-role">Management</div>
                <div className="team-name">Daniel Ortiz Valencia</div>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Link href="/team/jay-suthar" className="team-card">
                <div className="team-role">Head of Operations</div>
                <div className="team-name">Jay Suthar</div>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <Link href="/team/joshua-masih" className="team-card">
                <div className="team-role">Head of Tech</div>
                <div className="team-name">Joshua Masih</div>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Link href="/team/abraham-maptano" className="team-card">
                <div className="team-role">Head of Marketing</div>
                <div className="team-name">Abraham Maptano</div>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <section id="contact" className="section container contact-section">
          <ScrollReveal>
            <div>
              <h2>Get In Touch</h2>
              <p className="muted">Have questions? Want to get involved? Reach out to us.</p>
            </div>
          </ScrollReveal>
          <div className="contact-grid">
            <ScrollReveal delay={50}>
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <h3>Email</h3>
                <a href="mailto:csuramventure@gmail.com">csuramventure@gmail.com</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="contact-card">
                <div className="contact-icon">💼</div>
                <h3>LinkedIn</h3>
                <a href="https://www.linkedin.com/company/csuramventures" target="_blank" rel="noopener noreferrer">Connect with us</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="contact-card">
                <div className="contact-icon">📸</div>
                <h3>Instagram</h3>
                <a href="https://www.instagram.com/csuramventures/" target="_blank" rel="noopener noreferrer">@csuramventures</a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Ventures</div>
          <div className="footer-right">Built for students · <a href="/admin">Membership</a></div>
        </div>
      </footer>
    </>
  )
}

export async function getServerSideProps(){
  let agathonHighlights = []

  try{
    const fs = await import('fs')
    const path = await import('path')
    const crypto = await import('crypto')
    const albumDir = path.join(process.cwd(), 'public', 'gallery', 'agathon-2026')
    const files = fs.readdirSync(albumDir)
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

    const getFrameNumber = (fileName) => {
      const match = fileName.match(/(\d+)/)
      return match ? Number(match[1]) : null
    }

    const uniqueByHash = []
    const seenHashes = new Set()

    files.forEach((file) => {
      const fullPath = path.join(albumDir, file)
      const hash = crypto.createHash('md5').update(fs.readFileSync(fullPath)).digest('hex')
      if (!seenHashes.has(hash)) {
        seenHashes.add(hash)
        uniqueByHash.push(file)
      }
    })

    const MIN_FRAME_GAP = 4
    const spaced = []
    let lastFrame = null

    uniqueByHash.forEach((file) => {
      const frame = getFrameNumber(file)
      if (frame === null || lastFrame === null || Math.abs(frame - lastFrame) >= MIN_FRAME_GAP) {
        spaced.push(file)
        if (frame !== null) lastFrame = frame
      }
    })

    const selected = spaced.slice(0, 36)

    agathonHighlights = selected.map((file, index) => ({
      id: index + 1,
      src: `/gallery/agathon-2026/${file}`,
      title: `Ag-A-thon Highlight ${index + 1}`,
    }))
  }catch(e){
    console.warn('Could not load Ag-A-thon highlights for homepage', e.message)
  }
  return { props: { agathonHighlights } }
}
