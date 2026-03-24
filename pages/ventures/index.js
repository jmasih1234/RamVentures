import Link from 'next/link'
import { useState, useEffect } from 'react'
import supabase from '../../lib/supabaseClient'
import Header from '../../components/Header'
import VentureCard from '../../components/VentureCard'
import ScrollReveal from '../../components/ScrollReveal'

export default function Ventures({ ventures: initialVentures }) {
  const [ventures, setVentures] = useState(initialVentures)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredVentures = ventures.filter(v => {
    const matchesFilter = filter === 'all' || (v.category && v.category.toLowerCase() === filter.toLowerCase())
    const matchesSearch = !searchTerm || v.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const categories = ['all', ...new Set(ventures.map(v => v.category || 'Other'))]

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
          <div style={{ marginBottom: '48px' }}>
            <ScrollReveal>
              <div style={{ marginBottom: '32px' }}>
                <input 
                  type="text" 
                  placeholder="Search ventures..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '14px 20px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 8px 24px rgba(15,91,63,0.15), 0 0 0 3px rgba(15,91,63,0.1)'}
                  onBlur={(e) => e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
                />
              </div>
            </ScrollReveal>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {categories.map((cat, i) => (
                <ScrollReveal key={cat} delay={i * 30}>
                  <button
                    onClick={() => setFilter(cat)}
                    style={{
                      padding: '10px 20px',
                      border: filter === cat ? 'none' : '1px solid #e5e5e5',
                      background: filter === cat ? 'linear-gradient(135deg, #0f5b3f, #ff6b35)' : '#ffffff',
                      color: filter === cat ? '#ffffff' : '#0a0a0a',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '14px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textTransform: 'capitalize',
                      boxShadow: filter === cat ? '0 8px 24px rgba(15,91,63,0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (filter !== cat) {
                        e.target.style.borderColor = '#0f5b3f'
                        e.target.style.color = '#0f5b3f'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filter !== cat) {
                        e.target.style.borderColor = '#e5e5e5'
                        e.target.style.color = '#0a0a0a'
                      }
                    }}
                  >
                    {cat}
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {filteredVentures.length === 0 ? (
            <ScrollReveal>
              <div style={{
                textAlign: 'center',
                padding: '80px 40px',
                background: 'linear-gradient(135deg, rgba(15,91,63,0.03) 0%, rgba(15,91,63,0.06) 100%)',
                borderRadius: '16px',
                border: '2px dashed #e5e5e5'
              }}>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ fontSize: '24px', margin: '0 0 12px 0', color: '#0a0a0a' }}>No ventures found</h3>
                <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>Try adjusting your search or filters</p>
              </div>
            </ScrollReveal>
          ) : (
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
          <div className="footer-right">Built for students · <a href="/admin">Admin</a></div>
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
