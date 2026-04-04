import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function InteractiveEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Context for cleanup
    const ctx = gsap.context(() => {
      // ============================================
      // HERO ANIMATIONS
      // ============================================

      // Split hero title into words and animate
      const heroTitle = document.querySelector('.hero-title')
      if (heroTitle && !heroTitle.dataset.split) {
        const text = heroTitle.textContent.trim()
        const words = text.split(/\s+/)

        // Check if "Labs" should be accented
        heroTitle.innerHTML = words
          .map((word, i) => {
            const isAccent = word.toLowerCase() === 'labs'
            return `<span class="word ${isAccent ? 'accent' : ''}" style="display:inline-block">${word}</span>`
          })
          .join(' ')
        heroTitle.dataset.split = '1'

        // Animate words in
        const wordSpans = heroTitle.querySelectorAll('.word')
        gsap.fromTo(
          wordSpans,
          {
            opacity: 0,
            y: 60,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.3,
            onComplete: () => {
              wordSpans.forEach(w => w.classList.add('revealed'))
            },
          }
        )
      }

      // Animate hero subtitle
      const heroSub = document.querySelector('.hero-sub')
      if (heroSub) {
        gsap.fromTo(
          heroSub,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.8,
            onComplete: () => heroSub.classList.add('revealed'),
          }
        )
      }

      // Animate hero actions
      const heroActions = document.querySelector('.hero-actions')
      if (heroActions) {
        gsap.fromTo(
          heroActions,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 1,
            onComplete: () => heroActions.classList.add('revealed'),
          }
        )
      }

      // ============================================
      // PARALLAX EFFECTS
      // ============================================

      const heroBg = document.querySelector('.hero-bg')
      const heroInner = document.querySelector('.hero-inner')

      if (heroBg) {
        gsap.to(heroBg, {
          y: 150,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      if (heroInner) {
        gsap.to(heroInner, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // ============================================
      // SECTION REVEAL ANIMATIONS
      // ============================================

      // Sections fade in and reveal
      const sections = document.querySelectorAll('.section')
      sections.forEach(section => {
        gsap.fromTo(
          section,
          { opacity: 0.3 },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
              onEnter: () => section.classList.add('in-view'),
            },
          }
        )

        // Animate heading underline
        const h2 = section.querySelector('h2')
        if (h2) {
          ScrollTrigger.create({
            trigger: h2,
            start: 'top 85%',
            onEnter: () => h2.classList.add('in-view'),
          })
        }
      })

      // ============================================
      // GALLERY CARD ANIMATIONS
      // ============================================

      const gallery = document.querySelector('.gallery')
      if (gallery) {
        const cards = gallery.querySelectorAll('.gallery-card')

        ScrollTrigger.create({
          trigger: gallery,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              {
                opacity: 0,
                y: 40,
                scale: 0.95,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                onComplete: () => {
                  cards.forEach(card => card.classList.add('revealed'))
                },
              }
            )
          },
          once: true,
        })

        // 3D tilt effect on hover
        cards.forEach(card => {
          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height
            const rotateX = (y - 0.5) * -10
            const rotateY = (x - 0.5) * 10

            gsap.to(card, {
              rotateX,
              rotateY,
              scale: 1.02,
              duration: 0.4,
              ease: 'power2.out',
              transformPerspective: 1000,
            })

            // Update CSS custom properties for glow
            card.style.setProperty('--mouse-x', `${x * 100}%`)
            card.style.setProperty('--mouse-y', `${y * 100}%`)
          }

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.6,
              ease: 'elastic.out(1, 0.5)',
            })
          }

          card.addEventListener('mousemove', handleMouseMove)
          card.addEventListener('mouseleave', handleMouseLeave)
        })
      }

      // ============================================
      // GRID CARDS (Events, etc)
      // ============================================

      const gridCards = document.querySelectorAll('.grid .card')
      if (gridCards.length) {
        gsap.fromTo(
          gridCards,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.grid',
              start: 'top 80%',
            },
          }
        )
      }

      // ============================================
      // POINTER PARALLAX ON HERO
      // ============================================

      const hero = document.querySelector('.hero')
      if (hero && heroInner && heroBg) {
        const handlePointerMove = (e) => {
          const rect = hero.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5

          gsap.to(heroInner, {
            x: x * 20,
            y: y * 15,
            duration: 0.8,
            ease: 'power2.out',
          })

          gsap.to(heroBg, {
            x: x * 30,
            y: y * 20,
            duration: 1,
            ease: 'power2.out',
          })
        }

        const handlePointerLeave = () => {
          gsap.to([heroInner, heroBg], {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          })
        }

        hero.addEventListener('pointermove', handlePointerMove)
        hero.addEventListener('pointerleave', handlePointerLeave)
      }
    })

    // Cleanup
    return () => {
      ctx.revert()
    }
  }, [])

  return null
}
