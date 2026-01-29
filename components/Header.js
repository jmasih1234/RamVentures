import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

const LogoAnimator = dynamic(()=>import('./LogoAnimator'), { ssr: false })

export default function Header(){
  const ref = useRef()

  useEffect(()=>{
    const el = ref.current
    if (!el) return
    function onScroll(){
      if (window.scrollY > 60) el.classList.add('solid')
      else el.classList.remove('solid')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return ()=> window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={ref} className="header site-header">
      <div className="brand">
        <Link href="/" className="brand-link" aria-label="Ram Venture Labs">
          <LogoAnimator />
        </Link>
      </div>
      <nav className="main-nav">
        <Link href="/ventures">Ventures</Link>
        <Link href="/events">Events</Link>
        <a href="#membership">Membership</a>
        <Link href="/admin" className="muted">Admin</Link>
      </nav>
    </header>
  )
}
