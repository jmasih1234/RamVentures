import { useEffect, useRef } from 'react'

export default function LogoAnimator({ className = 'nav-logo' }){
  const mountRef = useRef()

  useEffect(()=>{
    let cancelled = false
    async function inline(){
      try{
        const res = await fetch('/ram-logo.svg')
        const svgText = await res.text()
        if (cancelled) return
        const mount = mountRef.current
        if (!mount) return
        mount.innerHTML = svgText
        const svg = mount.querySelector('svg')
        if (!svg) return
        svg.removeAttribute('width')
        svg.removeAttribute('height')
        svg.style.display = 'block'
        svg.style.maxWidth = '100%'

        // compute viewBox and overlay a stroked rect path for trim animation
        const vb = svg.getAttribute('viewBox') || svg.getAttribute('viewbox')
        let w=100,h=100
        if (vb){
          const parts = vb.split(/[ ,]+/).map(Number)
          if (parts.length===4){ w = parts[2]; h = parts[3] }
        } else {
          const bb = svg.getBBox ? svg.getBBox() : {width: svg.clientWidth||100, height: svg.clientHeight||100}
          w = bb.width; h = bb.height
        }

        // create overlay svg element
        const overlay = document.createElementNS('http://www.w3.org/2000/svg','svg')
        overlay.setAttribute('viewBox', `0 0 ${w} ${h}`)
        overlay.setAttribute('class','logo-anim-overlay')
        overlay.style.position = 'absolute'
        overlay.style.left = '0'
        overlay.style.top = '0'
        overlay.style.width = '100%'
        overlay.style.height = '100%'
        overlay.style.pointerEvents = 'none'

        const pad = Math.max(8, Math.min(w,h)*0.03)
        const rect = document.createElementNS('http://www.w3.org/2000/svg','rect')
        rect.setAttribute('x', pad)
        rect.setAttribute('y', pad)
        rect.setAttribute('width', Math.max(0,w - pad*2))
        rect.setAttribute('height', Math.max(0,h - pad*2))
        rect.setAttribute('rx', Math.min(24, Math.min(w,h)*0.06))
        rect.setAttribute('ry', Math.min(24, Math.min(w,h)*0.06))
        rect.setAttribute('fill','none')
        rect.setAttribute('stroke','#ffbf6b')
        rect.setAttribute('stroke-width','6')
        rect.setAttribute('class','logo-anim-path')

        overlay.appendChild(rect)

        // wrap the svg container to be positioned
        const wrapper = document.createElement('div')
        wrapper.style.position = 'relative'
        wrapper.style.display = 'inline-block'
        wrapper.style.width = '180px'
        wrapper.style.height = '44px'
        // move existing svg into wrapper
        const existingSvg = mount.querySelector('svg')
        if (existingSvg) {
          existingSvg.style.width = '100%'
          existingSvg.style.height = '100%'
          wrapper.appendChild(existingSvg)
        }
        wrapper.appendChild(overlay)

        // clear mount and append wrapper
        mount.innerHTML = ''
        mount.appendChild(wrapper)

      }catch(e){
        // fail silently
        console.warn('LogoAnimator failed', e)
      }
    }
    inline()
    return ()=>{ cancelled = true }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden="false" />
}
