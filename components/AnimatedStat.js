import { useEffect, useRef, useState } from 'react'

export default function AnimatedStat({ number, label, suffix = '' }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          observer.disconnect()

          // Extract numeric part
          const numericValue = parseInt(number.toString().replace(/\D/g, '')) || 5
          
          const duration = 2000
          const start = Date.now()
          
          const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - start) / duration, 1)
            const current = Math.floor(progress * numericValue)
            setCount(current)
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [number, hasAnimated])

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-number">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
