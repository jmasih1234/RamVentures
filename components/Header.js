import Link from 'next/link'
import dynamic from 'next/dynamic'

const LogoAnimator = dynamic(()=>import('./LogoAnimator'), { ssr: false })

export default function Header(){
  return (
    <header className="header site-header">
      <div className="brand">
        <Link href="/">
          <a className="brand-link" aria-label="Ram Venture Labs">
            <LogoAnimator />
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
