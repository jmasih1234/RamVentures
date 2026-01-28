import Link from 'next/link'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Header />
      <section className="hero">
        <div className="container">
          <img src="/ram-logo.svg" alt="ram ventures" className="logo" />
          <p className="tag">A university incubator: pathways for Explorer, Entrepreneur, Creative, Civic, and Intrapreneur</p>

          <div className="pathways">
            <div className="pathway">
              <img src="/pathways/innovator.svg" alt="Innovator" />
              <p>Innovator</p>
            </div>
            <div className="pathway">
              <img src="/pathways/creative.svg" alt="Creative" />
              <p>Creative</p>
            </div>
            <div className="pathway">
              <img src="/pathways/entrepreneur.svg" alt="Entrepreneur" />
              <p>Entrepreneur</p>
            </div>
            <div className="pathway">
              <img src="/pathways/explorer.svg" alt="Explorer" />
              <p>Explorer</p>
            </div>
            <div className="pathway">
              <img src="/pathways/intrapreneur.svg" alt="Intrapreneur" />
              <p>Intrapreneur</p>
            </div>
          </div>
        </div>
      </section>

      <main className="container" style={{padding:20}}>
        <h2 style={{marginTop:12}}>Quick Links</h2>
        <p>Central hub for student startups and senior design projects.</p>

        <div className="grid">
          <Link href="/ventures">
            <div className="card">
              <h3>Ventures directory</h3>
              <p className="small">Browse student startups and senior design projects.</p>
            </div>
          </Link>

          <Link href="/events">
            <div className="card">
              <h3>Events & Demo Day</h3>
              <p className="small">See upcoming events and demo opportunities.</p>
            </div>
          </Link>

          <Link href="/admin">
            <div className="card">
              <h3>Admin dashboard</h3>
              <p className="small">Add or edit ventures and events (MVP).</p>
            </div>
          </Link>
        </div>
      </main>
    </>
  )
}
