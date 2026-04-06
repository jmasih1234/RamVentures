import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const PROJECT_INTAKE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfx49YqZRDpIq5sK-U-sA9KUJyoEXfLvVLl904g5L99FtUwtQ/viewform?usp=dialog'

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
        <Link href="/startups" className="nav-item">Startups Map</Link>
        <Link href="/benchmark" className="nav-item">Benchmark</Link>
        <Link href="/research" className="nav-item">Research</Link>
        <Link href="/events" className="nav-item">Events</Link>
        <Link href="/gallery" className="nav-item">Gallery</Link>
        <Link href="/admin" className="nav-item">Membership</Link>
        <a href={PROJECT_INTAKE_FORM_URL} target="_blank" rel="noopener noreferrer" className="nav-item nav-apply">Apply for projects</a>
      </nav>
    </header>
  )
}
