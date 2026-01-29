import { useEffect, useRef } from 'react'

export default function MermaidChart({ code, className='' }){
  const ref = useRef(null)

  useEffect(()=>{
    let mounted = true

    async function ensureMermaid(){
      if (typeof window === 'undefined') return
      if (!window.mermaid){
        await new Promise((res, rej)=>{
          const s = document.createElement('script')
          s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'
          s.async = true
          s.onload = res
          s.onerror = rej
          document.head.appendChild(s)
        }).catch(()=>{})
      }
    }

    async function render(){
      await ensureMermaid()
      if (!mounted) return
      const container = ref.current
      if (!container) return
      const mermaid = window.mermaid
      if (!mermaid || !mermaid.render) {
        container.textContent = 'Mermaid failed to load.'
        return
      }
      try{
        // initialize with non-blocking startOnLoad off
        mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
        const id = 'm' + Math.random().toString(36).slice(2,9)
        // mermaid.render returns a promise in some builds; handle both
        const res = mermaid.render(id, code)
        if (res && typeof res.then === 'function'){
          const out = await res
          if (!mounted) return
          container.innerHTML = out.svg || out
        } else if (typeof res === 'string'){
          container.innerHTML = res
        }
      }catch(e){
        container.textContent = 'Diagram failed to render.'
        console.warn('Mermaid render error', e)
      }
    }

    render()
    return ()=>{ mounted = false }
  }, [code])

  return <div ref={ref} className={`mermaid-chart ${className}`} />
}
