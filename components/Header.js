import Link from 'next/link'

export default function Header(){
  return (
    <header className="header site-header">
      <div className="brand">
        <Link href="/">
          <a className="brand-link">
            <img src="/ram-logo.svg" alt="Ram Venture Labs" className="nav-logo" />
          </a>
        </Link>
      </div>
      <nav className="main-nav">
        <Link href="/ventures"><a>Ventures</a></Link>
        <Link href="/events"><a>Events</a></Link>
        <a href="#membership">Membership</a>
        <Link href="/admin"><a className="muted">Admin</a></Link>
      </nav>
    </header>
  )
}
