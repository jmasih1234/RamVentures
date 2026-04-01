import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ScrollReveal from '../../components/ScrollReveal'

export default function Membership() {
  const [venture, setVenture] = useState({ name: '', description: '', contact_email: '' })
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applications, setApplications] = useState([])
  const [loadingApplications, setLoadingApplications] = useState(true)

  useEffect(() => {
    loadApplications()
  }, [])

  async function loadApplications() {
    setLoadingApplications(true)
    try {
      const res = await fetch('/api/project-applications')
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to load applications.')
      setApplications(data?.data || [])
    } catch {
      setApplications([])
    } finally {
      setLoadingApplications(false)
    }
  }

  async function updateApplication(id, status, admin_response) {
    try {
      const res = await fetch('/api/project-applications', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, status, admin_response })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to update application.')

      setApplications(prev => prev.map((item) => (
        item.id === id ? data.data : item
      )))
    } catch {
      // Keep UI stable even if update fails.
    }
  }

  async function submitVenture(e) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/ventures', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(venture)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to register venture')

      setMsg(data.message || 'Venture registered successfully.')
      setIsError(false)
      setVenture({ name: '', description: '', contact_email: '' })
    } catch (error) {
      setMsg(error.message || 'An unexpected error occurred while registering the venture.')
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Membership</h1>
          <p className="page-subtitle">Register your venture and apply to join the Ram Ventures community.</p>
        </div>
      </section>

      <main style={{ paddingTop: 0 }}>
        <section className="section container">
          <div className="membership-grid-admin">
            <ScrollReveal>
              <form onSubmit={submitVenture} className="membership-card-admin">
                <h2>Register Venture</h2>
                <p className="membership-copy">Submit your venture details for review and inclusion in our venture network.</p>

                <label htmlFor="venture-name">Venture Name</label>
                <input
                  id="venture-name"
                  value={venture.name}
                  onChange={e => setVenture({ ...venture, name: e.target.value })}
                  placeholder="Enter venture name"
                  required
                />

                <label htmlFor="venture-description">Description</label>
                <textarea
                  id="venture-description"
                  value={venture.description}
                  onChange={e => setVenture({ ...venture, description: e.target.value })}
                  placeholder="Share a concise summary"
                  rows={5}
                  required
                />

                <label htmlFor="venture-contact">Contact Email</label>
                <input
                  id="venture-contact"
                  type="email"
                  value={venture.contact_email}
                  onChange={e => setVenture({ ...venture, contact_email: e.target.value })}
                  placeholder="name@colostate.edu"
                  required
                />

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting…' : 'Register Venture'}
                </button>

                {msg && (
                  <div className={`membership-message ${isError ? 'error' : 'success'}`}>
                    {msg}
                  </div>
                )}
              </form>
            </ScrollReveal>

            <ScrollReveal delay={60}>
              <div className="membership-card-admin">
                <h2>Apply for Membership</h2>
                <p className="membership-copy">
                  Ready to participate in workshops, mentorship opportunities, and venture support programming?
                </p>
                <p className="membership-copy">
                  Complete the official membership form to join the Ram Ventures community.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfx49YqZRDpIq5sK-U-sA9KUJyoEXfLvVLl904g5L99FtUwtQ/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="membership-button"
                >
                  Open Membership Form
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="membership-card-admin">
              <h2>Project Intake Responses</h2>
              <p className="membership-copy">Review applications and add your response directly in the dashboard.</p>

              {loadingApplications ? (
                <p className="membership-copy">Loading applications…</p>
              ) : applications.length === 0 ? (
                <p className="membership-copy">No applications yet.</p>
              ) : (
                <div className="apps-list">
                  {applications.map((app) => (
                    <div key={app.id} className="app-item">
                      <div className="app-header">
                        <div>
                          <h3>{app.full_name || 'Unnamed applicant'}</h3>
                          <p className="membership-copy" style={{ margin: 0 }}>{app.email}</p>
                        </div>
                        <select
                          value={app.status || 'new'}
                          onChange={(e) => updateApplication(app.id, e.target.value, app.admin_response || '')}
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="accepted">Accepted</option>
                          <option value="waitlisted">Waitlisted</option>
                          <option value="declined">Declined</option>
                        </select>
                      </div>

                      <p><strong>Role Interest:</strong> {app.role_interest || 'N/A'}</p>
                      <p><strong>Major:</strong> {app.major || 'N/A'} {app.graduation_year ? `(${app.graduation_year})` : ''}</p>
                      <p><strong>Why Interested:</strong> {app.why_interested || 'N/A'}</p>

                      <label htmlFor={`response-${app.id}`}>Admin Response</label>
                      <textarea
                        id={`response-${app.id}`}
                        rows={3}
                        value={app.admin_response || ''}
                        onChange={(e) => setApplications(prev => prev.map((item) => item.id === app.id ? { ...item, admin_response: e.target.value } : item))}
                      />
                      <button type="button" onClick={() => updateApplication(app.id, app.status || 'new', app.admin_response || '')}>
                        Save Response
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Ventures</div>
          <div className="footer-right">Membership portal</div>
        </div>
      </footer>

      <style jsx>{`
        .membership-grid-admin {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          align-items: stretch;
        }

        .membership-card-admin {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow-sm);
          padding: 22px;
          display: grid;
          gap: 8px;
          height: 100%;
          align-content: start;
        }

        .membership-card-admin h2 {
          margin: 0 0 4px;
          font-size: clamp(24px, 2.4vw, 30px);
          line-height: 1.2;
        }

        .membership-copy {
          margin: 0 0 2px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .membership-card-admin label {
          margin-top: 4px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-color);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .membership-card-admin input,
        .membership-card-admin textarea {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 11px 13px;
          font-size: 15px;
          color: var(--text-color);
          background: #fff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .membership-card-admin input:focus,
        .membership-card-admin textarea:focus {
          outline: none;
          border-color: var(--brand-accent);
          box-shadow: 0 0 0 3px rgba(15, 91, 63, 0.12);
        }

        .membership-card-admin textarea {
          resize: vertical;
          min-height: 120px;
        }

        .membership-card-admin button,
        .membership-button {
          margin-top: 10px;
          border: none;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, var(--brand-accent), var(--accent-primary));
          box-shadow: 0 10px 24px rgba(15, 91, 63, 0.25);
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          display: inline-block;
        }

        .membership-card-admin button {
          width: 100%;
        }

        .membership-button {
          width: 100%;
          margin-top: auto;
        }

        .membership-card-admin button:hover:not(:disabled),
        .membership-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 28px rgba(15, 91, 63, 0.3);
          color: #fff;
        }

        .membership-card-admin button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .membership-message {
          margin-top: 8px;
          padding: 10px 12px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid transparent;
        }

        .membership-message.success {
          color: #0f5b3f;
          background: rgba(15, 91, 63, 0.08);
          border-color: rgba(15, 91, 63, 0.2);
        }

        .membership-message.error {
          color: #8b1f1f;
          background: rgba(184, 45, 45, 0.08);
          border-color: rgba(184, 45, 45, 0.2);
        }

        .apps-list {
          display: grid;
          gap: 12px;
          margin-top: 6px;
        }

        .app-item {
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px;
          display: grid;
          gap: 8px;
        }

        .app-item h3 {
          margin: 0;
          font-size: 20px;
        }

        .app-item p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .app-header select {
          border: 1px solid var(--border);
          border-radius: 9px;
          padding: 8px 10px;
          font-weight: 600;
          background: #fff;
        }
      `}</style>
    </>
  )
}
