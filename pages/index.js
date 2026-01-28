import Link from 'next/link'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Header />

      <section className="hero banner">
        <div className="hero-bg" />
        <div className="hero-inner container">
          <h1 className="hero-title">Ram Venture Labs</h1>
          <p className="hero-sub">Supporting student founders, makers, and intrapreneurs — events, mentorship, and project teams.</p>

          <div className="hero-actions">
            <Link href="/ventures"><a className="cta primary">Browse Ventures</a></Link>
            <Link href="/events"><a className="cta secondary">Upcoming Events</a></Link>
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
              <Link href="/events"><a className="card"><h3>Hackathon Workshop</h3><p className="small">Next: Feb 14 — Intro to Product-Market Fit</p></a></Link>
              <Link href="/events"><a className="card"><h3>Mentor Office Hours</h3><p className="small">Weekly sessions with alumni mentors</p></a></Link>
              <Link href="/events"><a className="card"><h3>Demo Day</h3><p className="small">Spring showcase for student ventures</p></a></Link>
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
          <h2>Gallery</h2>
          <div className="gallery">
            <img src="/pathways-composite.png" alt="gallery" />
            <img src="/ram-logo.svg" alt="logo" />
            <img src="/pathways-composite.png" alt="gallery2" />
          </div>
        </section>

        <section id="contact" className="section container">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:info@ramventures.edu">info@ramventures.edu</a></p>
          <p>Follow us on social: <a href="#">Twitter</a> · <a href="#">Instagram</a></p>
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
