import { useState } from 'react'
import Header from '../../components/Header'

export default function BenchmarkPage() {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  async function handleRun(e) {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)

    try {
      const res = await fetch('/api/benchmark', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ idea })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Benchmark request failed.')

      setResult(data)
    } catch (err) {
      setError(err.message || 'Unable to run benchmark.')
    } finally {
      setLoading(false)
    }
  }

  const analysis = result?.analysis

  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Venture Benchmarking</h1>
          <p className="page-subtitle">
            Compare your idea against existing solutions and identify differentiation plus market signals.
          </p>
        </div>
      </section>

      <main style={{ paddingTop: 0 }}>
        <section className="section container benchmark-wrap">
          <form onSubmit={handleRun} className="benchmark-card benchmark-form">
            <h2>Describe your startup idea</h2>
            <p className="muted">Be specific about customer, pain point, and solution.</p>

            <textarea
              value={idea}
              onChange={e => setIdea(e.target.value)}
              placeholder="Example: AI tool that helps university founders benchmark startup ideas against existing products and market demand..."
              rows={8}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Running benchmark…' : 'Run Benchmark'}
            </button>

            {error && <div className="alert error">{error}</div>}
          </form>

          {analysis && (
            <div className="benchmark-results">
              <section className="benchmark-card">
                <h3>Idea Summary</h3>
                <p>{analysis.idea_summary}</p>
              </section>

              <section className="benchmark-card">
                <h3>Existing Solutions</h3>
                <div className="list">
                  {(analysis.existing_solutions || []).map((item, idx) => (
                    <article key={`${item.name}-${idx}`} className="item">
                      <h4>{item.name}</h4>
                      <p><strong>What it does:</strong> {item.what_it_does}</p>
                      <p><strong>Evidence:</strong> {item.evidence}</p>
                      {item.source_url && (
                        <a href={item.source_url} target="_blank" rel="noopener noreferrer">Source</a>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              <section className="benchmark-card">
                <h3>Differentiation Opportunities</h3>
                <div className="list">
                  {(analysis.differentiation_opportunities || []).map((item, idx) => (
                    <article key={`${item.opportunity}-${idx}`} className="item">
                      <h4>{item.opportunity}</h4>
                      <p><strong>Why whitespace:</strong> {item.why_it_is_whitespace}</p>
                      <p><strong>Execution:</strong> {item.suggested_execution}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="benchmark-card">
                <h3>Financial Snapshot</h3>
                <p><strong>TAM:</strong> {analysis.financial_snapshot?.tam_notes}</p>
                <p><strong>SAM:</strong> {analysis.financial_snapshot?.sam_notes}</p>
                <p><strong>SOM:</strong> {analysis.financial_snapshot?.som_notes}</p>
                <p><strong>Confidence:</strong> {analysis.financial_snapshot?.confidence}</p>
                <p><strong>Pricing Benchmarks:</strong></p>
                <ul>
                  {(analysis.financial_snapshot?.pricing_benchmarks || []).map((x, i) => <li key={`p-${i}`}>{x}</li>)}
                </ul>
                <p><strong>Funding Benchmarks:</strong></p>
                <ul>
                  {(analysis.financial_snapshot?.funding_benchmarks || []).map((x, i) => <li key={`f-${i}`}>{x}</li>)}
                </ul>
              </section>

              <section className="benchmark-card">
                <h3>Risks</h3>
                <ul>
                  {(analysis.risks || []).map((x, i) => <li key={`r-${i}`}>{x}</li>)}
                </ul>
              </section>

              <section className="benchmark-card">
                <h3>Next Steps</h3>
                <ul>
                  {(analysis.next_steps || []).map((x, i) => <li key={`n-${i}`}>{x}</li>)}
                </ul>
              </section>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Ventures</div>
          <div className="footer-right">Benchmark tool</div>
        </div>
      </footer>

      <style jsx>{`
        .benchmark-wrap {
          display: grid;
          gap: 18px;
          max-width: 980px;
          margin: 0 auto;
        }

        .benchmark-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
          padding: 20px;
        }

        .benchmark-form {
          display: grid;
          gap: 10px;
        }

        .benchmark-card h2,
        .benchmark-card h3 {
          margin: 0 0 6px;
        }

        .benchmark-card p {
          margin: 0;
          line-height: 1.55;
        }

        .benchmark-card ul {
          margin: 6px 0 0;
          padding-left: 18px;
        }

        .benchmark-card li {
          margin: 4px 0;
        }

        textarea {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px;
          font-size: 15px;
          margin: 4px 0 8px;
          resize: vertical;
        }

        button {
          border: none;
          border-radius: 10px;
          padding: 10px 14px;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, var(--brand-accent), var(--accent-primary));
          cursor: pointer;
          width: fit-content;
        }

        button:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .alert.error {
          margin-top: 10px;
          padding: 9px 11px;
          border: 1px solid rgba(184, 45, 45, 0.2);
          border-radius: 8px;
          color: #8b1f1f;
          background: rgba(184, 45, 45, 0.08);
        }

        .benchmark-results {
          display: grid;
          gap: 14px;
        }

        .item {
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 8px;
          display: grid;
          gap: 6px;
        }

        .item h4 {
          margin: 0;
        }
      `}</style>
    </>
  )
}
