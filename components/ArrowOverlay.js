import { useEffect, useRef } from 'react'

export default function ArrowOverlay({ ids = [] }){
  const svgRef = useRef(null)
  const pathsRef = useRef([])
  const arrowsRef = useRef([])

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
        const arrow = arrowsRef.current[idx]
        if (!el || !path) return
        const r = el.getBoundingClientRect()
        const endX = r.left + r.width/2 - svgRect.left
        const endY = r.top + r.height/2 - svgRect.top

        // control points roughly 1/3 and 2/3 along x, with vertical curvature
        const dx = endX - startX
        const dy = endY - startY
        const curv = Math.max(40, Math.abs(dy) * 0.4)
        const cp1x = startX + dx * 0.25
        const cp1y = startY + curv
        const cp2x = startX + dx * 0.75
        const cp2y = endY - curv

        const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`
        path.setAttribute('d', d)

        // compute arrowhead placement and rotation using path length
        try{
          const len = path.getTotalLength()
          const head = path.getPointAtLength(len)
          const before = path.getPointAtLength(Math.max(0, len - Math.min(20, len*0.05)))
          const angle = Math.atan2(head.y - before.y, head.x - before.x) * 180 / Math.PI
          if (arrow){
            // position arrow as triangle centered at head, rotated
            arrow.setAttribute('transform', `translate(${head.x},${head.y}) rotate(${angle})`)
            arrow.style.display = ''
          }
        }catch(e){
          // ignore if path API not available
        }
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
        <style>{`
          .dash{stroke:#e7f3ee;stroke-width:2;fill:none;stroke-dasharray:12 8;opacity:0.95;animation:dash 2.2s linear infinite}
          @keyframes dash{to{stroke-dashoffset:-20}}
          .arrow{fill:#e7f3ee}
        `}</style>
      </defs>
      {ids.map((id, i)=> (
        <g key={id}>
          <path ref={el=>pathsRef.current[i]=el} className="dash" d="M0 0" />
          <polygon ref={el=>arrowsRef.current[i]=el} className="arrow" points="0,-6 10,0 0,6" style={{display:'none'}} />
        </g>
      ))}
    </svg>
  )
}
