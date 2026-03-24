import Link from 'next/link'
import Header from '../../components/Header'

const teamMembers = [
  {
    slug: 'daniel-ortiz-valencia',
    name: 'Daniel Ortiz Valencia',
    role: 'Management',
    summary: 'Leads strategy, partnerships, and organizational direction for Ram Ventures.'
  },
  {
    slug: 'jay-suthar',
    name: 'Jay Suthar',
    role: 'Head of Operations',
    summary: 'Runs day-to-day operations, events, and internal processes.'
  },
  {
    slug: 'joshua-masih',
    name: 'Joshua Masih',
    role: 'Head of Tech',
    summary: 'Oversees technical initiatives, product development, and engineering support.'
  },
  {
    slug: 'abraham-maptano',
    name: 'Abraham Maptano',
    role: 'Head of Marketing',
    summary: 'Leads brand, outreach, and growth across the Ram Ventures community.'
  }
]

export default function TeamIndex() {
  return (
    <>
      <Header />
      <main className="page-content">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title">Team</h1>
            <p className="page-subtitle">Meet the leaders building Ram Ventures</p>
          </div>
        </section>

        <section className="section container">
          <div className="team-grid">
            {teamMembers.map((member) => (
              <Link key={member.slug} href={`/team/${member.slug}`} className="team-card">
                <div className="team-role">{member.role}</div>
                <div className="team-name">{member.name}</div>
                <p className="team-summary">{member.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
