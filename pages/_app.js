import '../styles/globals.css'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    // dynamically mount ArrowOverlay on client if available
    if (typeof window !== 'undefined' && window.__arrow_ids){
      import('../components/ArrowOverlay').then(mod =>{
        const ArrowOverlay = mod.default
        const mount = document.getElementById('arrow-mount')
        if (mount) {
          // render into mount
          const root = require('react-dom/client').createRoot(mount)
          root.render(React.createElement(ArrowOverlay, { ids: window.__arrow_ids }))
        }
      }).catch(()=>{})
    }
  }, [])

  return <Component {...pageProps} />
}
