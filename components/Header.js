import Link from 'next/link'

export default function Header(){
  return (
    <header className="header">
      <div>
        <Link href="/">Ram Venture Labs</Link>
      </div>
      <nav style={{display:'flex',gap:12}}>
        <Link href="/ventures">Ventures</Link>
        <Link href="/events">Events</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  )
}
