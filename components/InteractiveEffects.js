import { useEffect } from 'react'

export default function InteractiveEffects(){
  useEffect(()=>{
    if (typeof window === 'undefined') return

    // Scroll reveal with IntersectionObserver
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting) e.target.classList.add('in-view')
      })
    }, { threshold: 0.15 })
    document.querySelectorAll('.gallery-card, .section').forEach(el=>observer.observe(el))

    // Parallax for hero background
    const heroBg = document.querySelector('.hero-bg')
    function onScroll(){
      if (!heroBg) return
      const sc = window.scrollY
      // subtle translate and scale based on scroll
      heroBg.style.transform = `translateY(${sc * 0.08}px) scale(${1 + Math.min(sc/2000,0.06)})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Tilt effect for gallery cards
    const cards = Array.from(document.querySelectorAll('.gallery-card'))
    const handlers = new Map()
    cards.forEach(card => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height
        const rx = (py - 0.5) * -8
        const ry = (px - 0.5) * 12
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
      }
      const onLeave = () => { card.style.transform = '' }
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
      handlers.set(card, { onMove, onLeave })
    })

    return ()=>{
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      handlers.forEach((h, el)=>{
        el.removeEventListener('pointermove', h.onMove)
        el.removeEventListener('pointerleave', h.onLeave)
      })
    }
  }, [])

  return null
}
