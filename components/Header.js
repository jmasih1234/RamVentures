import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

const LogoAnimator = dynamic(() => import('./LogoAnimator'), { ssr: false })

export default function Header({ variant = 'default' }) {
  const headerRef = useRef()
  const menuRef = useRef()
  const menuLinksRef = useRef([])
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const handleScroll = () => {
      const isScrolled = window.scrollY > 60
      setScrolled(isScrolled)
      if (isScrolled) {
        el.classList.add('scrolled')
      } else {
        el.classList.remove('scrolled')
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate nav links on mount
  useEffect(() => {
    const navLinks = headerRef.current?.querySelectorAll('.nav-link')
    if (navLinks?.length) {
      gsap.fromTo(
        navLinks,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.5,
        }
      )
    }
  }, [])

  // Animate mobile menu open/close with GSAP
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    if (mobileMenuOpen) {
      // Lock body scroll while menu is open
      document.body.style.overflow = 'hidden'

      gsap.fromTo(menu,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      )
      // Stagger in each link for a polished feel
      gsap.fromTo(menuLinksRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      )
    } else {
      document.body.style.overflow = ''
    }

    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])

  const navItems = [
    { href: '/ventures', label: 'Ventures' },
    { href: '/startups', label: 'Startups' },
    { href: '/research', label: 'Research' },
    { href: '/events', label: 'Events' },
    { href: '/gallery', label: 'Gallery' },
    { href: '#membership', label: 'Membership' },
    { href: '/apply', label: 'Apply', highlight: true },
  ]

  return (
    <header
      ref={headerRef}
      className={`site-header ${variant === 'transparent' ? 'transparent' : ''}`}
    >
      <div className="brand">
        <Link href="/" className="brand-link" aria-label="Ram Ventures">
          <img src="/ramventuresologo.jpeg" alt="Ram Ventures" className="nav-logo" />
        </Link>
      </div>

      <nav className="main-nav">
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${item.muted ? 'muted' : ''} ${item.highlight ? 'nav-apply' : ''}`}
          >
            <span className="nav-link__text">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Hamburger / close toggle */}
      <button
        className={`mobile-menu-btn ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {mobileMenuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* Full-screen mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu" ref={menuRef}>
          <nav className="mobile-menu__nav">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-menu__link ${item.highlight ? 'mobile-menu__link--cta' : ''}`}
                onClick={closeMenu}
                ref={el => menuLinksRef.current[i] = el}
              >
                <span className="mobile-menu__label">{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <p>Colorado State University&apos;s Student Venture Incubator</p>
          </div>
        </div>
      )}
    </header>
  )
}
