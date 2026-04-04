/**
 * CompanyDetail — Cinematic company intro + scrollable detail view
 *
 * Sequence:
 * 1. Hero image fills viewport
 * 2. Title + tagline stagger in from below
 * 3. "Scroll down" hint appears
 * 4. Scrolling reveals: stats (with animated counters), features, industries
 * 5. Back button returns to scatter view
 *
 * Uses a VirtualScroll engine (same as scatter) for smooth momentum scrolling,
 * plus IntersectionObserver for scroll-triggered reveals.
 */

import { useState, useEffect, useRef, useCallback } from 'react'

// Simple virtual scroll for smooth momentum
class DetailScroll {
  constructor(ease = 0.08) {
    this.current = 0; this.target = 0; this.limit = 0; this.ease = ease
    this.running = false; this.raf = null; this.subs = new Set(); this._touchY = 0
    this._onWheel = (e) => { e.preventDefault(); this.target = Math.max(0, Math.min(this.target + e.deltaY, this.limit)) }
    this._onTS = (e) => { this._touchY = e.touches[0].clientY }
    this._onTM = (e) => { const d = this._touchY - e.touches[0].clientY; this._touchY = e.touches[0].clientY; this.target = Math.max(0, Math.min(this.target + d * 2, this.limit)) }
  }
  setLimit(v) { this.limit = Math.max(0, v) }
  subscribe(fn) { this.subs.add(fn); return () => this.subs.delete(fn) }
  start() {
    if (this.running) return; this.running = true
    window.addEventListener('wheel', this._onWheel, { passive: false })
    window.addEventListener('touchstart', this._onTS, { passive: true })
    window.addEventListener('touchmove', this._onTM, { passive: true })
    this._loop()
  }
  stop() {
    this.running = false
    window.removeEventListener('wheel', this._onWheel)
    window.removeEventListener('touchstart', this._onTS)
    window.removeEventListener('touchmove', this._onTM)
    if (this.raf) cancelAnimationFrame(this.raf)
  }
  reset() { this.current = 0; this.target = 0 }
  _loop = () => {
    if (!this.running) return
    this.current += (this.target - this.current) * this.ease
    if (Math.abs(this.target - this.current) < 0.5) this.current = this.target
    this.subs.forEach(fn => fn(this.current))
    this.raf = requestAnimationFrame(this._loop)
  }
}

export default function CompanyDetail({ company, onBack }) {
  const [revealed, setRevealed] = useState(false)
  const [sailDone, setSailDone] = useState(false)
  const contentRef = useRef(null)
  const heroImgRef = useRef(null)
  const scrollRef = useRef(null)
  const sailRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)

  // ---- Sail-out on mount (reveal content) ----
  useEffect(() => {
    const sail = sailRef.current
    if (!sail) { setSailDone(true); return }
    // Start at translateY(0%) (covering), then sweep up to -100%
    sail.style.transform = 'translateY(0%)'
    requestAnimationFrame(() => {
      sail.style.transition = 'transform 0.7s cubic-bezier(0.33,1,0.68,1)'
      sail.style.transform = 'translateY(-100%)'
    })
    const t = setTimeout(() => setSailDone(true), 750)
    return () => clearTimeout(t)
  }, [])

  // ---- Text reveal after sail ----
  useEffect(() => {
    if (!sailDone) return
    const t = setTimeout(() => setRevealed(true), 200)
    return () => clearTimeout(t)
  }, [sailDone])

  // ---- Smooth scroll engine ----
  useEffect(() => {
    if (!sailDone) return
    const ds = new DetailScroll(0.08)
    scrollRef.current = ds

    const t = setTimeout(() => {
      const el = contentRef.current
      if (!el) return
      ds.setLimit(el.scrollHeight - window.innerHeight)
      ds.start()
      ds.subscribe((scrollY) => {
        el.style.transform = `translate3d(0,${-scrollY}px,0)`
        // Parallax on hero image
        if (heroImgRef.current) {
          heroImgRef.current.style.transform = `translate3d(0,${scrollY * 0.15}px,0) scale(1.05)`
        }
      })
    }, 100)

    return () => { clearTimeout(t); ds.stop() }
  }, [sailDone])

  // ---- Intersection Observer for scroll reveals ----
  useEffect(() => {
    if (!sailDone) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cd-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    // Observe stat items and feature cards
    const items = document.querySelectorAll('.cd-reveal')
    items.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [sailDone])

  // ---- Animated counter for stats ----
  useEffect(() => {
    if (!sailDone) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate all stat numbers within this container
          entry.target.querySelectorAll('.cd-stat-value').forEach(el => {
            const target = el.dataset.value
            // If it's a plain number, animate it. Otherwise just reveal.
            const num = parseFloat(target.replace(/[^0-9.]/g, ''))
            if (!isNaN(num) && num > 0) {
              const suffix = target.replace(/[0-9.,]/g, '')
              const prefix = target.match(/^[^0-9]*/)?.[0] || ''
              let start = 0
              const dur = 1500
              const t0 = performance.now()
              function tick() {
                const p = Math.min(1, (performance.now() - t0) / dur)
                const eased = 1 - Math.pow(1 - p, 3)
                const current = Math.round(num * eased * 10) / 10
                // Format nicely
                el.textContent = prefix + (current % 1 === 0 ? Math.round(current) : current.toFixed(1)) + suffix
                if (p < 1) requestAnimationFrame(tick)
              }
              requestAnimationFrame(tick)
            }
          })
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })

    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [sailDone])

  // ---- Back handler with sail ----
  const handleBack = useCallback(() => {
    const sail = sailRef.current
    if (!sail) { onBack?.(); return }
    scrollRef.current?.stop()
    sail.style.transition = 'transform 0.7s cubic-bezier(0.76,0,0.24,1)'
    sail.style.transform = 'translateY(0%)'
    setTimeout(() => {
      sail.style.transform = 'translateY(100%)'
      onBack?.()
    }, 700)
  }, [onBack])

  if (!company) return null

  return (
    <div className="cd-shell">
      {/* Sail overlay */}
      <div className="cd-sail" ref={sailRef} />

      {/* Back button */}
      <button className={`cd-back ${revealed ? 'show' : ''}`} onClick={handleBack}>
        <span>&larr;</span> Back
      </button>

      {/* Category badge */}
      <div className={`cd-category ${revealed ? 'show' : ''}`}>{company.category}</div>

      {/* Scrollable content */}
      <div className="cd-scroll-wrap">
        <div ref={contentRef}>
          {/* Hero section */}
          <section className="cd-hero">
            <div className="cd-hero-img" ref={heroImgRef}>
              <img src={company.hero} alt={company.name} />
            </div>
            <div className="cd-hero-content">
              <h1 className="cd-hero-title">
                <span className="cd-line"><span className={revealed ? 'show' : ''}>{company.name}</span></span>
              </h1>
              <p className="cd-hero-tagline">
                <span className="cd-line"><span className={revealed ? 'show' : ''} style={{ transitionDelay: '0.15s' }}>{company.tagline}</span></span>
              </p>
              <p className="cd-hero-desc">
                <span className="cd-line"><span className={revealed ? 'show' : ''} style={{ transitionDelay: '0.3s' }}>{company.description}</span></span>
              </p>
            </div>
          </section>

          {/* Stats section */}
          <section className="cd-stats" ref={statsRef}>
            <h2 className="cd-section-label cd-reveal">Impact</h2>
            <div className="cd-stats-grid">
              {company.stats.map((stat, i) => (
                <div key={i} className="cd-stat cd-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="cd-stat-value" data-value={stat.value}>0</div>
                  <div className="cd-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Features section */}
          <section className="cd-features" ref={featuresRef}>
            <h2 className="cd-section-label cd-reveal">Technology</h2>
            <div className="cd-features-grid">
              {company.features.map((feat, i) => (
                <div key={i} className="cd-feature cd-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="cd-feature-num">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="cd-feature-title">{feat.title}</h3>
                  <p className="cd-feature-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Industries */}
          {company.industries && (
            <section className="cd-industries">
              <h2 className="cd-section-label cd-reveal">Target Industries</h2>
              <div className="cd-industry-tags cd-reveal">
                {company.industries.map((ind, i) => (
                  <span key={i} className="cd-industry-tag">{ind}</span>
                ))}
              </div>
            </section>
          )}

          {/* CTA / footer */}
          <section className="cd-footer cd-reveal">
            <div className="cd-footer-inner">
              <p className="cd-footer-text">Interested in this venture?</p>
              <button className="cd-footer-btn" onClick={handleBack}>View All Companies</button>
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="cd-footer-link">
                  Visit Website &rarr;
                </a>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={`cd-scroll-hint ${revealed ? 'show' : ''}`}>
        <span>Scroll</span>
        <svg viewBox="0 0 12 12" width="14" height="14"><path d="M6 1L6 11M2 7L6 11L10 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  )
}
