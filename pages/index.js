import Link from 'next/link'
import Header from '../components/Header'
import dynamic from 'next/dynamic'

const MermaidChart = dynamic(() => import('../components/MermaidChart'), { ssr: false })

export default function Home({ ventures = [] }) {
  return (
    <>
      <Header />

      <section className="hero banner">
        <div className="hero-bg" />
        <div className="hero-inner container">
          <h1 className="hero-title">Ram Venture Labs</h1>
          <p className="hero-sub">Supporting student founders, makers, and intrapreneurs — events, mentorship, and project teams.</p>

          <div className="hero-actions">
            <Link href="/ventures" className="cta primary">Browse Ventures</Link>
            <Link href="/events" className="cta secondary">Upcoming Events</Link>
            <a className="cta ghost" href="#membership">Join</a>
          </div>
        </div>
      </section>

      <main>
        <section id="about" className="section container">
          <div className="split">
            <div>
              <h2>About</h2>
              <p>Ram Venture Labs is a university incubator and student startup hub modeled to help students build teams, ship projects, and connect with mentors and investors.</p>
            </div>
            <div>
              <h3>Our focus</h3>
              <ul>
                <li>Student startups & senior design projects</li>
                <li>Mentorship and office hours</li>
                <li>Demo days and funding opportunities</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="events" className="section alt">
          <div className="container">
            <h2>Upcoming Events</h2>
            <p className="muted">Quick list of upcoming meetups, workshops, and demo days.</p>
            <div className="grid">
              <Link href="/events" className="card"><h3>Hackathon Workshop</h3><p className="small">Next: Feb 14 — Intro to Product-Market Fit</p></Link>
              <Link href="/events" className="card"><h3>Mentor Office Hours</h3><p className="small">Weekly sessions with alumni mentors</p></Link>
              <Link href="/events" className="card"><h3>Demo Day</h3><p className="small">Spring showcase for student ventures</p></Link>
            </div>
          </div>
        </section>

        <section id="membership" className="section container">
          <h2>Membership</h2>
          <p>Join as a founder, mentor, or investor. Signups open to students and alumni.</p>
          <div style={{marginTop:12}}>
            <a href="/admin" className="button">Apply / Sign Up</a>
          </div>
        </section>

        <section id="gallery" className="section alt container">
          <h2>Featured Ventures</h2>
          <p className="muted">Latest student projects and startups — click to view details.</p>
          <div className="gallery">
            {ventures.length === 0 && (
              <div className="empty">No ventures yet</div>
            )}
            {ventures.map((v, i) => (
              <a key={v.id} href={`/ventures/${v.id}`} className="gallery-card" style={{animationDelay:`${i * 80}ms`}}>
                <div className="gallery-thumb">
                  {v.logo_url ? (
                    // use provided logo if available
                    <img src={v.logo_url} alt={v.name} />
                  ) : (
                    // fallback: generated initials block
                    <div className="thumb-fallback">{(v.name||'').split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase()}</div>
                  )}
                </div>
                <div className="gallery-meta">
                  <strong>{v.name}</strong>
                  <div className="small muted">{v.majors || 'Student project'}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="org-chart" className="section container alt">
          <h2>Organizational Chart</h2>
          <p className="muted">High-level management and departments.</p>
          <MermaidChart code={`flowchart TD
          Management[Management<br/>Daniel]

          %% Leadership layer
          Management --> Jay[Jay<br/>Head of Operations]
          Management --> Joshua[Joshua<br/>Head of Tech]
          Management --> AbrahamM[Abraham<br/>Head of Marketing]
          Management --> AbrahamA[Abraham<br/>Head of Analytics]
          Management --> DanielI[Daniel<br/>Head of Investment]

          %% Departments under heads
          Jay --> Ops[Operations]
          Joshua --> Tech[Tech]
          AbrahamM --> Mkt[Marketing]
          AbrahamA --> Anal[Analytics]
          DanielI --> Invest[Investment]

          %% Operations subtree
          Ops --> AgaThon[Ag-a-thon]
          AgaThon --> James[James]
          AgaThon --> Lucas[Lucas]
          AgaThon --> Aidan[Aidan]
          AgaThon --> Bailey[Bailey]
      `} />
        </section>

        <section id="contact" className="section container">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:csuramventure@gmail.com">csuramventure@gmail.com</a></p>
          <p>Follow us on our socials: <a href="https://www.linkedin.com/in/ramventure/">Linkedin</a> · <a href="https://www.instagram.com/csuramventurelabs/">Instagram</a></p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Venture Labs</div>
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
    const { data } = await supabase.from('ventures').select('*').order('created_at', { ascending: false }).limit(8)
    ventures = data || []
  }catch(e){
    console.warn('Could not load ventures for homepage', e.message)
  }
  return { props: { ventures } }
}
