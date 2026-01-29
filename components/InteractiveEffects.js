import { useEffect } from 'react'

export default function InteractiveEffects(){
  useEffect(()=>{
    if (typeof window === 'undefined') return

    // Helper: stagger apply in-view with per-item delay
    function applyStagger(items, base = 60){
      items.forEach((el, i) => {
        el.style.transitionDelay = `${i * base}ms`
        el.classList.add('in-view')
      })
    }

    // 1) Enhanced scroll reveal for sections and gallery cards
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (!e.isIntersecting) return
        const el = e.target
        if (el.classList.contains('gallery')){
          const cards = Array.from(el.querySelectorAll('.gallery-card'))
          applyStagger(cards, 80)
        } else if (el.classList.contains('hero')){
          // hero words reveal handled separately
          el.classList.add('in-view')
        } else {
          el.classList.add('in-view')
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.section, .gallery, .hero').forEach(el=>observer.observe(el))

    // 2) Split hero title words into spans for staggered reveal (idempotent)
    const title = document.querySelector('.hero-title')
    if (title && !title.dataset.split){
      const words = title.textContent.trim().split(/\s+/)
      title.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ')
      title.dataset.split = '1'
    }

    // when hero becomes visible, animate words with stagger
    const hero = document.querySelector('.hero')
    function revealHeroWords(){
      const words = Array.from(document.querySelectorAll('.hero-title .word'))
      words.forEach((w, i)=>{
        w.style.transition = `transform 520ms cubic-bezier(.2,.9,.2,1) ${i*70}ms, opacity 420ms ease ${i*70}ms`
        w.classList.add('in-view')
      })
    }

    // If hero already in view, reveal now, otherwise observe once
    if (hero && hero.getBoundingClientRect().top < window.innerHeight) revealHeroWords()
    else if (hero){
      const hObs = new IntersectionObserver((ents, o)=>{
        ents.forEach(en=>{ if (en.isIntersecting){ revealHeroWords(); o.disconnect() } })
      }, { threshold: 0.2 })
      hObs.observe(hero)
    }

    // 3) Parallax: scroll and pointer parallax for hero background and inner content
    const heroBg = document.querySelector('.hero-bg')
    const heroInner = document.querySelector('.hero-inner')
    function onScroll(){
      const sc = window.scrollY
      if (heroBg) heroBg.style.transform = `translateY(${sc * 0.12}px) scale(${1 + Math.min(sc/1800,0.08)})`
      if (heroInner) heroInner.style.transform = `translateY(${Math.min(sc * 0.06, 28)}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // subtle pointer parallax on hero
    function onPointer(e){
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const px = (e.clientX - rect.left)/rect.width - 0.5
      const py = (e.clientY - rect.top)/rect.height - 0.5
      if (heroInner) heroInner.style.transform = `translate3d(${px*10}px, ${Math.min(window.scrollY * 0.02,28) + py*8}px, 0)`
      if (heroBg) heroBg.style.transform = `translate3d(${px*18}px, ${window.scrollY * 0.12}px, 0) scale(${1 + Math.min(window.scrollY/1800,0.08)})`
    }
    hero && hero.addEventListener('pointermove', onPointer)
    hero && hero.addEventListener('pointerleave', ()=>{ if (heroInner) heroInner.style.transform = '' })

    // 4) Tilt effect for gallery cards (preserve previous behaviour, but slightly softer)
    const cards = Array.from(document.querySelectorAll('.gallery-card'))
    const handlers = new Map()
    cards.forEach((card, idx) => {
      // set initial stagger delay so they cascade in
      card.style.transitionDelay = `${idx * 60}ms`

      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height
        const rx = (py - 0.5) * -6
        const ry = (px - 0.5) * 10
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
      }
      const onLeave = () => { card.style.transform = '' }
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
      handlers.set(card, { onMove, onLeave })
    })

    // cleanup
    return ()=>{
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      hero && hero.removeEventListener('pointermove', onPointer)
      hero && hero.removeEventListener('pointerleave', ()=>{})
      handlers.forEach((h, el)=>{
        el.removeEventListener('pointermove', h.onMove)
        el.removeEventListener('pointerleave', h.onLeave)
      })
    }
  }, [])

  return null
}
