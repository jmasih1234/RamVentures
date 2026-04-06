import Link from 'next/link'
import Header from '../../components/Header'

const PROJECT_INTAKE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfx49YqZRDpIq5sK-U-sA9KUJyoEXfLvVLl904g5L99FtUwtQ/viewform?usp=dialog'

export default function Research() {
  return (
    <>
      <Header />

      <section className="hero banner">
        <div className="hero-inner container">
          <h1 className="hero-title">Research Projects</h1>
          <p className="hero-sub">Cutting-edge student research initiatives and academic ventures at CSU</p>
        </div>
      </section>

      <main>
        <section className="section container">
          <div className="split">
            <div>
              <h2>About Our Research</h2>
              <p>Ram Ventures supports student-led research projects that push the boundaries of innovation. From deep tech to applied research, our projects bridge academic excellence with real-world impact.</p>
            </div>
            <div>
              <h3>Research Areas</h3>
              <ul>
                <li>AgTech and Sustainability</li>
                <li>Deep Tech and Advanced Engineering</li>
                <li>Applied Science and Engineering</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section alt container">
          <h2>Featured Research Projects</h2>
          <p className="muted">Explore student research initiatives and academic ventures.</p>
          <div className="empty-state">
            <div className="empty-icon">🔬</div>
            <h3>Research Projects Coming Soon</h3>
            <p>Check back soon to see exciting research initiatives from our community.</p>
          </div>
        </section>

        <section className="section container">
          <h2>Get Involved</h2>
          <p>Interested in leading or contributing to a research project? Connect with us to learn more opportunities.</p>
          <div style={{marginTop:32, textAlign:'center'}}>
            <a href={PROJECT_INTAKE_FORM_URL} target="_blank" rel="noopener noreferrer" className="button">Apply for projects</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Ventures</div>
          <div className="footer-right">Built for students · <Link href="/admin">Membership</Link></div>
        </div>
      </footer>
    </>
  )
}
