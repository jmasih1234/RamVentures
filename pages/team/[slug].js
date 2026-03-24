import Link from 'next/link'
import Header from '../../components/Header'

const teamMembers = {
  'daniel-ortiz-valencia': {
    name: 'Daniel Ortiz Valencia',
    role: 'Management',
    overview: 'Daniel leads the strategic direction of Ram Ventures, aligning programs, partnerships, and growth initiatives with the mission of empowering student founders.',
    responsibilities: [
      'Define long-term vision and organizational priorities',
      'Develop external partnerships and sponsorships',
      'Coordinate leadership team planning and execution',
      'Guide venture pipeline and program development'
    ]
  },
  'jay-suthar': {
    name: 'Jay Suthar',
    role: 'Head of Operations',
    overview: 'Jay runs day-to-day operations to ensure events, meetings, and initiatives run smoothly across the organization.',
    responsibilities: [
      'Plan and execute events and workshops',
      'Manage internal processes and logistics',
      'Coordinate cross-team collaboration and timelines',
      'Oversee operational documentation and execution'
    ]
  },
  'joshua-masih': {
    name: 'Joshua Masih',
    role: 'Head of Tech',
    overview: 'Joshua leads technical development and supports founders with product engineering, tooling, and technical strategy.',
    responsibilities: [
      'Oversee technical projects and product builds',
      'Support venture teams with engineering guidance',
      'Maintain digital infrastructure and internal tools',
      'Drive innovation in technical programming'
    ]
  },
  'abraham-maptano': {
    name: 'Abraham Maptano',
    role: 'Head of Marketing',
    overview: 'Abraham drives brand strategy, growth, and community engagement to expand the reach of Ram Ventures.',
    responsibilities: [
      'Lead brand storytelling and marketing strategy',
      'Manage social media and communications',
      'Coordinate outreach campaigns and partnerships',
      'Grow community engagement and awareness'
    ]
  }
}

export default function TeamMember({ member }) {
  if (!member) return null

  return (
    <>
      <Header />
      <main className="page-content">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title">{member.name}</h1>
            <p className="page-subtitle">{member.role}</p>
          </div>
        </section>

        <section className="section container">
          <div className="team-detail">
            <div className="team-detail-card">
              <h2>Role Overview</h2>
              <p>{member.overview}</p>
            </div>
            <div className="team-detail-card">
              <h2>Key Responsibilities</h2>
              <ul>
                {member.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/team" className="button">Back to Team</Link>
          </div>
        </section>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(teamMembers).map((slug) => ({ params: { slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      member: teamMembers[params.slug] || null
    }
  }
}
