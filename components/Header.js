import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Header(){
  const ref = useRef()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(()=>{
    const el = ref.current
    if (!el) return
    
    function onScroll(){
      if (window.scrollY > 60) {
        el.classList.add('solid')
        setIsScrolled(true)
      }
      else {
        el.classList.remove('solid')
        setIsScrolled(false)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return ()=> window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={ref} className="header site-header">
      <div className="brand">
        <Link href="/" className="brand-link" aria-label="Ram Ventures">
          <img src="/ramventuresologo.jpeg" alt="Ram Ventures" className="nav-logo" />
        </Link>
      </div>
      <nav className="main-nav">
        <Link href="/ventures" className="nav-item">Ventures</Link>
        <Link href="/startups" className="nav-item">Startups</Link>
        <Link href="/research" className="nav-item">Research</Link>
        <Link href="/events" className="nav-item">Events</Link>
        <Link href="/gallery" className="nav-item">Gallery</Link>
        <a href="#membership" className="nav-item">Membership</a>
        <Link href="/admin" className="nav-item muted">Admin</Link>
      </nav>
    </header>
  )
}
