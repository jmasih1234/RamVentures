import Link from 'next/link'

export default function Home() {
  return (
    <main style={{padding:20}}>
      <h1>University Incubator — MVP</h1>
      <p>Central hub for student startups and senior design projects.</p>
      <nav>
        <ul>
          <li><Link href="/ventures">Ventures directory</Link></li>
          <li><Link href="/events">Events & Demo Day</Link></li>
          <li><Link href="/admin">Admin dashboard</Link></li>
        </ul>
      </nav>
    </main>
  )
}
