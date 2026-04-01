import { useMemo, useState } from 'react'
import Header from '../../components/Header'
import ScrollReveal from '../../components/ScrollReveal'

const AGATHON_PAST_EVENT = {
  id: 'agathon-past-event',
  title: 'Agathon',
  date: '2026-03-06T18:00:00.000Z',
  end_date: '2026-03-08T18:00:00.000Z',
  description: 'A completed Ram Ventures Agathon event focused on rapid venture ideation and team collaboration.',
  poster_url: '/ram-events-poster.png',
  external_url: 'https://www.linkedin.com/feed/update/urn:li:activity:7443033159421669376/?actorCompanyId=110116195'
}

const BUSINESS_FOUNDER_SUMMIT_EVENT = {
  id: 'business-founder-summit-2026',
  title: 'The Business Founder Summit',
  date: '2026-06-15T18:00:00.000Z',
  description: 'How can the current Tech and Finance Landscape pave the way for Innovation in the age of AI',
  coming_soon: true
}

function parseDate(value) {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function formatDate(value) {
  const parsed = parseDate(value)
  if (!parsed) return 'Date TBD'
  return parsed.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

function formatEventDate(event) {
  const start = parseDate(event?.date)
  const end = parseDate(event?.end_date)

  if (!start) return 'Date TBD'
  if (!end) return formatDate(event?.date)

  const sameYear = start.getFullYear() === end.getFullYear()
  const sameMonth = start.getMonth() === end.getMonth() && sameYear

  if (sameMonth) {
    return `${start.toLocaleString('en-US', { month: 'short' })} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`
  }

  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
}

export default function Events({ events }) {
  const [activeTab, setActiveTab] = useState('current')

  const mergedEvents = useMemo(() => {
    const safeEvents = Array.isArray(events) ? [...events] : []
    const hasAgathon = safeEvents.some(e => (e?.title || '').toLowerCase().includes('agathon'))
    const hasBusinessFounderSummit = safeEvents.some(e => (e?.title || '').toLowerCase().includes('business founder summit'))

    if (!hasAgathon) {
      safeEvents.push(AGATHON_PAST_EVENT)
    }

    if (!hasBusinessFounderSummit) {
      safeEvents.push(BUSINESS_FOUNDER_SUMMIT_EVENT)
    }

    return safeEvents.sort((a, b) => {
      const aTime = parseDate(a?.date)?.getTime() || 0
      const bTime = parseDate(b?.date)?.getTime() || 0
      return bTime - aTime
    })
  }, [events])

  const { currentEvents, pastEvents } = useMemo(() => {
    const now = new Date()
    const current = []
    const past = []

    mergedEvents.forEach(event => {
      const eventDate = parseDate(event?.date)
      if (!eventDate || eventDate >= now) {
        current.push(event)
      } else {
        past.push(event)
      }
    })

    return { currentEvents: current, pastEvents: past }
  }, [mergedEvents])

  const visibleEvents = activeTab === 'current' ? currentEvents : pastEvents

  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Events</h1>
          <p className="page-subtitle">Track current and past events from the Ram Ventures community.</p>
        </div>
      </section>

      <main style={{ paddingTop: 0 }}>
        <section className="section container">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('current')}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: activeTab === 'current' ? 'none' : '1px solid #e5e5e5',
                background: activeTab === 'current' ? 'linear-gradient(135deg, #0f5b3f, #ff6b35)' : '#fff',
                color: activeTab === 'current' ? '#fff' : '#0a0a0a',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Current Events ({currentEvents.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('past')}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: activeTab === 'past' ? 'none' : '1px solid #e5e5e5',
                background: activeTab === 'past' ? 'linear-gradient(135deg, #0f5b3f, #ff6b35)' : '#fff',
                color: activeTab === 'past' ? '#fff' : '#0a0a0a',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>

          {visibleEvents.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
              {visibleEvents.map((event, i) => (
                <ScrollReveal key={event.id || `${event.title}-${i}`} delay={i * 40}>
                  <article
                    style={{
                      background: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      padding: '22px',
                      height: '100%'
                    }}
                  >
                    <h3 style={{ margin: '0 0 10px', fontSize: '24px' }}>{event.title || 'Untitled Event'}</h3>
                    {event.coming_soon && (
                      <p
                        style={{
                          margin: '0 0 10px',
                          display: 'inline-block',
                          fontSize: '12px',
                          fontWeight: 800,
                          letterSpacing: '0.03em',
                          textTransform: 'uppercase',
                          color: '#0f5b3f',
                          background: 'rgba(15, 91, 63, 0.08)',
                          border: '1px solid rgba(15, 91, 63, 0.2)',
                          borderRadius: '999px',
                          padding: '4px 10px'
                        }}
                      >
                        Coming Soon
                      </p>
                    )}
                    {!event.coming_soon && (
                      <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#666', fontWeight: 600 }}>
                        {formatEventDate(event)}
                      </p>
                    )}
                    <p style={{ margin: 0, color: '#444', lineHeight: 1.5 }}>
                      {event.description || 'No description available.'}
                    </p>
                    {event.poster_url && (
                      <div
                        style={{
                          marginTop: '14px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '10px',
                          padding: '8px',
                          background: '#fafafa'
                        }}
                      >
                        <img
                          src={event.poster_url}
                          alt={`${event.title} poster`}
                          style={{
                            width: '100%',
                            maxHeight: '220px',
                            objectFit: 'contain',
                            display: 'block',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                    {(event.external_url || event.linkedin_url || event.link) && (
                      <a
                        href={event.external_url || event.linkedin_url || event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          marginTop: '16px',
                          display: 'inline-block',
                          fontWeight: 700,
                          color: '#0f5b3f'
                        }}
                      >
                        View event post
                      </a>
                    )}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '56px 24px',
                border: '1px dashed #e5e5e5',
                borderRadius: '12px',
                color: '#666'
              }}
            >
              No {activeTab} events available.
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Ventures</div>
          <div className="footer-right">Built for students · <a href="/admin">Membership</a></div>
        </div>
      </footer>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const supabase = (await import('../../lib/supabaseClient')).default
    if (!supabase) return { props: { events: [] } }
    const { data } = await supabase.from('events').select('*').order('date', { ascending: true })
    return { props: { events: data || [] } }
  } catch (error) {
    console.error('Failed to load events:', error)
    return { props: { events: [] } }
  }
}
