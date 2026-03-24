import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import ScrollReveal from '../components/ScrollReveal'

export default function Home({ ventures = [] }) {
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
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Active Ventures</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="stat-card">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Community Members</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="stat-card">
                  <div className="stat-number">$500K+</div>
                  <div className="stat-label">In Funding</div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="about" className="section container">
          <div className="split">
            <ScrollReveal>
              <div>
                <h2>About</h2>
                <p>Ram Ventures is a university incubator and student startup hub modeled to help students build teams, ship projects, and connect with mentors and investors.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div>
                <h3>Our focus</h3>
                <ul>
                  <li>Student startups & senior design projects</li>
                  <li>Mentorship and office hours</li>
                  <li>Demo days and funding opportunities</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="events" className="section alt">
          <div className="container">
            <ScrollReveal>
              <div>
                <h2>Upcoming Events</h2>
                <p className="muted">Quick list of upcoming meetups, workshops, and demo days.</p>
              </div>
            </ScrollReveal>
            <div className="grid">
              <ScrollReveal delay={50}>
                <Link href="/events" className="card"><h3>Hackathon Workshop</h3><p className="small">Next: Feb 14 — Intro to Product-Market Fit</p></Link>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <Link href="/events" className="card"><h3>Mentor Office Hours</h3><p className="small">Weekly sessions with alumni mentors</p></Link>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <Link href="/events" className="card"><h3>Demo Day</h3><p className="small">Spring showcase for student ventures</p></Link>
              </ScrollReveal>
            </div>
            <div style={{marginTop: '2rem', textAlign: 'center'}}>
              <img src="/ram-events-poster.png" alt="Ram Ventures Events Poster" style={{maxWidth: '100%', height: 'auto', borderRadius: '8px'}} />
            </div>
            <div style={{marginTop: '2rem', textAlign: 'center'}}>
              <a href="https://luma.com/exz9fc9w" target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', padding: '12px 24px', backgroundColor: '#0f5b3f', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '700', transition: 'all 0.3s ease'}}>View All Events on Luma</a>
            </div>
          </div>
        </section>

        {/* Testimonials Section - REMOVED */}

        <section id="membership" className="section container membership-section">
          <div className="membership-content">
            <ScrollReveal>
              <div>
                <h2>Join Our Community</h2>
                <p>Whether you're a founder, mentor, or investor — there's a place for you at Ram Ventures. Connect with ambitious students building the future.</p>
              </div>
            </ScrollReveal>
            <div className="membership-grid">
              <ScrollReveal delay={50}>
                <div className="membership-card">
                  <h3>🚀 Founders</h3>
                  <p>Get access to resources, mentorship, and a community of fellow builders.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="membership-card">
                  <h3>🎓 Mentors</h3>
                  <p>Share your expertise and guide the next generation of entrepreneurs.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="membership-card">
                  <h3>💼 Investors</h3>
                  <p>Discover early-stage opportunities and support student ventures.</p>
                </div>
              </ScrollReveal>
            </div>
            <div style={{marginTop:48, textAlign:'center'}}>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfx49YqZRDpIq5sK-U-sA9KUJyoEXfLvVLl904g5L99FtUwtQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="button">Apply to Join</a>
            </div>
          </div>
        </section>

        <section id="gallery" className="section alt container">
          <ScrollReveal>
            <div>
              <h2>Featured Ventures</h2>
              <p className="muted">Latest student projects and startups — click to view details.</p>
            </div>
          </ScrollReveal>
          <div className="gallery">
            {ventures.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🚀</div>
                <h3>Ventures Coming Soon</h3>
                <p>Check back soon to see amazing projects from our student founders.</p>
              </div>
            ) : (
              ventures.map((v, i) => (
                <ScrollReveal key={v.id} delay={i * 50}>
                  <a href={`/ventures/${v.id}`} className="gallery-card">
                    <div className="gallery-thumb">
                      {v.logo_url ? (
                        <img src={v.logo_url} alt={v.name} />
                      ) : (
                        <div className="thumb-fallback">{(v.name||'').split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase()}</div>
                      )}
                    </div>
                    <div className="gallery-meta">
                      <strong>{v.name}</strong>
                      <div className="small muted">{v.majors || 'Student project'}</div>
                    </div>
                  </a>
                </ScrollReveal>
              ))
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
          <div className="footer-right">Built for students · <a href="/admin">Admin</a></div>
        </div>
      </footer>
    </>
  )
}

export async function getServerSideProps(){
  // fetch latest ventures from Supabase for the gallery
  let ventures = []
  try{
    const supabase = (await import('../lib/supabaseClient')).default
    if (supabase) {
      const { data } = await supabase.from('ventures').select('*').order('created_at', { ascending: false }).limit(8)
      ventures = data || []
    }
  }catch(e){
    console.warn('Could not load ventures for homepage', e.message)
  }
  return { props: { ventures } }
}
