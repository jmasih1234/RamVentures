import { useEffect, useRef } from 'react'

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease forwards`
            entry.target.style.animationDelay = `${delay}ms`
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div 
      ref={ref} 
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
      }}
    >
      {children}
    </div>
  )
}
