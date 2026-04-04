import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { COMPANIES } from '../../data/researchCompanies'
import CompanyDetail from '../../components/CompanyDetail'

export default function Research() {
  const [view, setView] = useState('scatter')
  const [activeSlug, setActiveSlug] = useState(null)
  const iframeRef = useRef(null)

  // Listen for postMessage from the scatter iframe
  useEffect(() => {
    function onMessage(e) {
      if (e.data?.type === 'companySelected') {
        setActiveSlug(e.data.slug)
        setView('detail')
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  function handleBack() {
    setView('scatter')
    setActiveSlug(null)
    // Tell iframe to reset (re-run entrance animation)
    iframeRef.current?.contentWindow?.postMessage({ type: 'reset' }, '*')
  }

  const activeCompany = COMPANIES.find(c => c.slug === activeSlug)

  return (
    <>
      <Head><title>Research Portfolio | Ram Ventures</title></Head>
      <div className="research-shell">
        {/* Scatter iframe — always mounted, hidden when viewing detail */}
        <iframe
          ref={iframeRef}
          src="/research-scatter.html"
          style={{
            position: 'fixed', inset: 0, width: '100%', height: '100%',
            border: 'none', zIndex: 1,
            display: view === 'scatter' ? 'block' : 'none'
          }}
        />
        {/* Company detail — React component on top */}
        {view === 'detail' && activeCompany && (
          <CompanyDetail company={activeCompany} onBack={handleBack} />
        )}
      </div>
    </>
  )
}
