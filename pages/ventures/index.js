import Link from 'next/link'
import { useState, useEffect } from 'react'
import supabase from '../../lib/supabaseClient'
import Header from '../../components/Header'
import VentureCard from '../../components/VentureCard'
import ScrollReveal from '../../components/ScrollReveal'

export default function Ventures({ ventures: initialVentures }) {
  const [ventures, setVentures] = useState(initialVentures)
  const filteredVentures = ventures

  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Student Ventures</h1>
          <p className="page-subtitle">Innovative projects and startups led by CSU students. Browse our portfolio of ideas transforming industries.</p>
        </div>
      </section>

      <main style={{ paddingTop: 0 }}>
        <section className="section container">
          <div style={{ marginBottom: '48px', textAlign: 'center' }}>
            <ScrollReveal>
              <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>Ventures in progress</p>
            </ScrollReveal>
          </div>

          {filteredVentures.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '32px' }}>
              {filteredVentures.map((v, i) => (
                <ScrollReveal key={v.id} delay={i * 50}>
                  <a href={`/ventures/${v.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #e5e5e5',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(15,91,63,0.16)'
                      e.currentTarget.style.borderColor = '#0f5b3f'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                      e.currentTarget.style.borderColor = '#e5e5e5'
                    }}>
                      {v.logo_url && (
                        <div style={{
                          height: '200px',
                          background: 'linear-gradient(135deg, #f0f4f1 0%, #e6ede9 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden'
                        }}>
                          <img src={v.logo_url} alt={v.name} style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                          }} />
                        </div>
                      )}
                      <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0', color: '#0a0a0a' }}>{v.name}</h3>
                        <p style={{ fontSize: '14px', color: '#666', margin: '0 0 12px 0', flexGrow: 1 }}>{v.description || 'Innovative student project'}</p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {v.category && <span style={{
                            fontSize: '12px',
                            padding: '4px 12px',
                            background: '#f0f4f1',
                            color: '#0f5b3f',
                            borderRadius: '6px',
                            fontWeight: 600
                          }}>{v.category}</span>}
                        </div>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Ventures</div>
          <div className="footer-right">Built for students</div>
        </div>
      </footer>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const supabase = (await import('../../lib/supabaseClient')).default
    if (!supabase) return { props: { ventures: [] } }
    const { data, error } = await supabase.from('ventures').select('*').order('created_at', { ascending: false })
    return { props: { ventures: data || [] } }
  } catch (error) {
    console.error('Error loading ventures:', error)
    return { props: { ventures: [] } }
  }
}
