import Link from 'next/link'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main className="container" style={{padding:20}}>
        <h1>University Incubator — MVP</h1>
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
