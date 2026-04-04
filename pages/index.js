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
            src="/logos/pathways-composite.png" 
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
              <h2>Featured Ventures</h2>
            </div>
          </ScrollReveal>
          <div className="gallery">
            {ventures.length === 0 ? (
              <div className="empty-state">
                <h3>Ventures Coming Soon</h3>
                <p>Check back soon for new ventures from CSU founders.</p>
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

        {/* Team Section */}
        <section id="team" className="section container">
          <ScrollReveal>
            <div>
              <h2>Leadership Team</h2>
              <p className="muted">Meet the team driving Ram Ventures forward</p>
            </div>
          </ScrollReveal>
          <div className="team-grid">
            <ScrollReveal delay={50}>
              <Link href="/team/daniel-ortiz-valencia" className="team-card team-card--dark">
                <div className="team-card__initials">DO</div>
                <div className="team-role">Management</div>
                <div className="team-name">Daniel Ortiz Valencia</div>
                <p className="team-summary">Leads strategy, partnerships, and organizational direction.</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Link href="/team/jay-suthar" className="team-card team-card--dark">
                <div className="team-card__initials">JS</div>
                <div className="team-role">Head of Operations</div>
                <div className="team-name">Jay Suthar</div>
                <p className="team-summary">Runs day-to-day operations, events, and internal processes.</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <Link href="/team/joshua-masih" className="team-card team-card--dark">
                <div className="team-card__initials">JM</div>
                <div className="team-role">Head of Tech</div>
                <div className="team-name">Joshua Masih</div>
                <p className="team-summary">Oversees technical initiatives and engineering support.</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Link href="/team/abraham-maptano" className="team-card team-card--dark">
                <div className="team-card__initials">AM</div>
                <div className="team-role">Head of Marketing</div>
                <div className="team-name">Abraham Maptano</div>
                <p className="team-summary">Leads brand, outreach, and growth across the community.</p>
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
              <a href="mailto:csuramventure@gmail.com" className="contact-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 4L12 13L2 4"/>
                  </svg>
                </div>
                <h3>Email</h3>
                <span className="contact-link">csuramventure@gmail.com</span>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <a href="https://www.linkedin.com/company/csuramventures" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3>LinkedIn</h3>
                <span className="contact-link">Connect with us</span>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <a href="https://www.instagram.com/csuramventures/" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="5"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <h3>Instagram</h3>
                <span className="contact-link">@csuramventures</span>
              </a>
            </ScrollReveal>
          </div>
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
