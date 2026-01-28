import { useEffect, useRef } from 'react'

export default function ArrowOverlay({ ids = [] }){
  const svgRef = useRef(null)
  const pathsRef = useRef([])

  useEffect(()=>{
    function update(){
      const svg = svgRef.current
      if (!svg) return
      const logo = document.getElementById('hero-logo')
      if (!logo) return
      const svgRect = svg.getBoundingClientRect()

      const logoRect = logo.getBoundingClientRect()
      const startX = logoRect.left + logoRect.width/2 - svgRect.left
      const startY = logoRect.top + logoRect.height/2 - svgRect.top

      ids.forEach((id, idx)=>{
        const el = document.getElementById(id)
        const path = pathsRef.current[idx]
        if (!el || !path) return
        const r = el.getBoundingClientRect()
        const endX = r.left + r.width/2 - svgRect.left
        const endY = r.top + r.height/2 - svgRect.top

        // control points roughly 1/3 and 2/3 along x, with vertical curvature
        const curv = Math.max(40, Math.abs(endY - startY) * 0.4)
        const cp1x = startX + (endX - startX) * 0.25
        const cp1y = startY + curv
        const cp2x = startX + (endX - startX) * 0.75
        const cp2y = endY - curv

        const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`
        path.setAttribute('d', d)
      })
    }

    update()
    window.addEventListener('resize', update)
    // also update after fonts/images load
    window.addEventListener('load', update)
    return ()=>{
      window.removeEventListener('resize', update)
      window.removeEventListener('load', update)
    }
  }, [ids])

  return (
    <svg ref={svgRef} className="overlay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid meet">
      <defs>
        <style>{`.dash{stroke:#e7f3ee;stroke-width:2;fill:none;stroke-dasharray:8 6;opacity:0.95}.arrow{fill:#e7f3ee}`}</style>
      </defs>
      {ids.map((id, i)=> (
        <g key={id}>
          <path ref={el=>pathsRef.current[i]=el} className="dash" d="M0 0" />
          <polygon className="arrow" points="0,0 0,0 0,0" style={{display:'none'}} />
        </g>
      ))}
    </svg>
  )
}
