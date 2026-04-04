import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import ScrollReveal from '../../components/ScrollReveal'

const APPLY_URL = '/apply'
const DEADLINE = new Date('2026-04-05T23:59:59')

function useCountdown() {
  const [days, setDays] = useState(null)
  useEffect(() => {
    const calc = () =>
      setDays(Math.max(0, Math.floor((DEADLINE - new Date()) / 86400000)))
    calc()
    const id = setInterval(calc, 60000)
    return () => clearInterval(id)
  }, [])
  return days
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="sprint-faq-item">
      <button
        className="sprint-faq-btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className={`sprint-faq-icon${open ? ' open' : ''}`}>+</span>
      </button>
      <div className={`sprint-faq-body${open ? ' open' : ''}`}>
        <p>{a}</p>
      </div>
    </div>
  )
}

const ROLES = [
  {
    title: 'Market Research Analyst',
    spots: '3–4 spots',
    desc: "Size the addressable market for AtmosZero's Boiler 2.0 across target industries — food & beverage, pharma, chemicals, district heating. Build the TAM/SAM analysis that a $28.5M-funded company uses to plan their next move.",
    tags: ['Business', 'Econ', 'Data Science'],
    primary: ['Business', 'Econ', 'Data Science'],
  },
  {
    title: 'Finance Analyst',
    spots: '2–3 spots',
    desc: 'Model unit economics, customer payback periods, and total cost of ownership comparisons (Boiler 2.0 vs. fossil boilers vs. resistive electric). The exact deliverable consulting and banking interviewers ask about — except yours is for a real company.',
    tags: ['Finance', 'Econ', 'Business'],
    primary: ['Finance', 'Econ', 'Business'],
  },
  {
    title: 'Go-to-Market Strategist',
    spots: '2–3 spots',
    desc: "Map out how AtmosZero acquires their next 50 industrial customers. Channel strategy, pricing analysis, vertical prioritization. Figure out which industries convert fastest — then put it in a deck.",
    tags: ['Business', 'Data Science'],
    primary: ['Business', 'Data Science'],
  },
  {
    title: 'Brand & Design Consultant',
    spots: '1–2 spots',
    desc: 'Create pitch materials, sales collateral, or market-facing content for a Cleantech 100 company. If you think in visuals and know your way around Figma or Canva — this is yours.',
    tags: ['Business', 'Any Major'],
    primary: ['Business', 'Any Major'],
  },
  {
    title: 'Project Coordinator',
    spots: '2–3 spots',
    desc: 'Keep the sprint on rails. Own timelines, meeting schedules, Notion docs, and mentor logistics. The person who makes sure deliverables ship on time.',
    tags: ['Business', 'Data Science'],
    primary: ['Business', 'Data Science'],
  },
]

const TIMELINE = [
  {
    date: 'Now – Apr 5',
    title: 'Applications Open',
    desc: 'Apply in under 3 minutes. We review on a rolling basis — earlier is better.',
    active: true,
  },
  {
    date: 'Apr 7',
    title: 'Kickoff & Client Brief',
    desc: 'Meet your team. Get the AtmosZero project brief. Align on deliverables and success criteria.',
  },
  {
    date: 'Apr 7 – Apr 20',
    title: 'Sprint Phase 1: Research & Build',
    desc: 'Deep work on your project. Weekly check-ins with your team + mentor office hours.',
  },
  {
    date: 'Apr 21 – May 1',
    title: 'Sprint Phase 2: Refine & Present',
    desc: 'Polish deliverables, prep your presentation, get feedback from VC mentors.',
  },
  {
    date: 'May 2 – May 5',
    title: 'Final Report & Showcase',
    desc: 'Deliver final report to AtmosZero. Present your work. Ship it.',
  },
]

const FAQS = [
  {
    q: 'Do I need experience in consulting or startups?',
    a: "No. We're looking for sharp people who can learn fast and do focused work. If you can research a market, build a spreadsheet, or think strategically — you're qualified. We'll teach you the rest.",
  },
  {
    q: 'How much time does this actually take?',
    a: "4–6 hours per week for 4 weeks. One team meeting, one mentor session, and focused async work. It's designed to fit around your classes, not compete with them.",
  },
  {
    q: 'What do I get out of it?',
    a: "A real deliverable for a $28.5M-funded climate tech company — on your resume. Direct access to VC mentors. A network of driven students across majors. And if you're good — a leadership role in Fall 2026.",
  },
  {
    q: 'What majors are you looking for?',
    a: "Economics, Finance, Business, Data Science are the primary targets — but strong candidates from any major are welcome. We care about what you can do, not what your department is called.",
  },
  {
    q: 'What is AtmosZero?',
    a: "AtmosZero is a Fort Collins climate tech company that spun out of CSU. They've raised $28.5M to build the world's first mass-manufactured electric steam boiler. Their CTO is a CSU professor named to TIME's 100 Most Influential Climate Leaders. Their factory is 15 minutes from campus.",
  },
  {
    q: 'Is this a paid position?',
    a: "Not for this sprint. The value is the experience, the portfolio piece, the mentor access, and the network. Think of it as a 4-week micro-internship — except your client has been featured in MIT News, TIME, and Canary Media.",
  },
  {
    q: 'Can I continue after May?',
    a: 'Yes. Top performers will be invited to lead teams or take on larger projects in Fall 2026. This sprint is how you prove yourself.',
  },
]

const ADVISORS = [
  {
    name: 'Bailey Banach',
    role: 'Engineering Faculty & Former VC',
    desc: 'Engineering faculty and bioengineering PhD. Former venture capitalist at Cavallo Ventures, bridging deep tech research with early-stage investing.',
    photo: '/mentors/BaileyBanach.jpeg',
    initials: 'BB',
  },
  {
    name: 'Bert Vermeulen',
    role: 'Engineering Faculty & Serial Inventor',
    desc: 'Engineering faculty and former manufacturing founder. Holds 50+ patents spanning advanced materials and industrial systems.',
    photo: '/mentors/BertV.jpg',
    initials: 'BV',
  },
  {
    name: 'Blake Teipel',
    role: 'Serial Founder, $500M+ Raised',
    desc: 'Serial exited founder with $500M+ raised across multiple companies. Currently leading a real estate fintech company.',
    photo: '/mentors/Blake-Teipel.jpg',
    initials: 'BT',
  },
]

export default function SprintPage() {
  const daysLeft = useCountdown()

  return (
    <>
      <Head>
        <title>RAM Ventures — Spring Sprint | Consulting for AtmosZero</title>
        <meta
          name="description"
          content="RAM Ventures is recruiting 12–18 junior consultants to work on a pre-consulting engagement with AtmosZero. Apply by April 5, 2026."
        />
      </Head>

      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero banner">
        <div className="hero-inner container" style={{ textAlign: 'center' }}>
          <div className="sprint-eyebrow">Spring 2026 · Limited Spots</div>
          <h1 className="hero-title" style={{ textTransform: 'none' }}>
            Consult for a company<br />
            <em>changing the world.</em>
          </h1>
          <p className="hero-sub">
            RAM Ventures is recruiting <strong>12–18 junior consultants</strong> to
            work on a pre-consulting engagement with <strong>AtmosZero</strong> — a
            $28.5M-funded climate tech company born at CSU, with a co-founder named
            to TIME&apos;s 100 Most Influential Climate Leaders. Real work. Real
            client. Your name on the deliverable.
          </p>
          <div className="hero-actions">
            <Link href={APPLY_URL} className="cta primary">
              Apply Now →
            </Link>
            <a href="#roles" className="cta secondary">See Open Roles ↓</a>
          </div>
          <div className="sprint-deadline-badge">
            <span className="sprint-pulse-dot" />
            Applications close <strong>April 5</strong> · Sprint starts <strong>April 7</strong>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="sprint-stats-strip">
        <div className="sprint-stats-inner">
          {[
            { num: daysLeft !== null ? String(daysLeft) : '—', label: 'Days Left' },
            { num: '4', label: 'Week Sprint' },
            { num: '5', label: 'Open Roles' },
            { num: '4–6', label: 'Hrs / Week' },
          ].map((s, i) => (
            <div key={i} className="sprint-stat">
              {i > 0 && <div className="sprint-stat-divider" />}
              <div className="sprint-stat-content">
                <div className="stat-number">{s.num}</div>
                <div className="sprint-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main>
        {/* ── ATMOSZERO CLIENT ───────────────────────────────────────────── */}
        <section className="section container">
          <ScrollReveal>
            <div className="sprint-section-label">The Client</div>
            <h2>AtmosZero</h2>
            <p className="sprint-section-sub">
              Decarbonizing 8% of global energy use — from Fort Collins.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="sprint-client-card">
              <div className="sprint-client-logo-placeholder">
                <Image
                  src="/companies/AtmosZeroLogo.png"
                  alt="AtmosZero"
                  width={200}
                  height={80}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
              <p className="sprint-client-narrative">
                AtmosZero is building the world&apos;s first mass-manufactured electric
                steam boiler. Industrial steam generates over 2 gigatons of CO₂ per
                year — more than aviation and shipping combined. AtmosZero&apos;s Boiler
                2.0 is a drop-in replacement that uses zero fossil fuels, installs in
                an afternoon, and uses half the electricity of existing electric
                alternatives. The company spun directly out of CSU — CTO Todd
                Bandhauer built the core technology in his lab on campus.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="sprint-credentials">
              {[
                { num: '$28.5M+', label: 'Raised' },
                { num: 'TIME 100', label: 'Climate Leader (CTO)' },
                { num: 'Cleantech 100', label: 'Global List' },
                { num: '$24.3M', label: 'DOE Tax Credits' },
                { num: '100K sq ft', label: 'Factory in Loveland' },
              ].map((b, i) => (
                <div key={i} className="sprint-credential-badge">
                  <div className="sprint-cred-num">{b.num}</div>
                  <div className="sprint-cred-label">{b.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="sprint-investors">
              <div className="sprint-investors-label">Backed by</div>
              <div className="sprint-investors-row">
                {/* TODO: replace each span with <Image> from /public/clients/investors/ */}
                {['Engine Ventures', '2150', 'Constellation Energy', 'Energy Impact Partners', 'U.S. Dept. of Energy'].map((name, i) => (
                  <span key={i} className="sprint-investor-pill">{name}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <blockquote className="sprint-closing-quote">
              AtmosZero was founded at CSU. Their factory is 15 minutes from campus.
              This is your chance to work with them before the rest of the world catches on.
            </blockquote>
          </ScrollReveal>
        </section>

        {/* ── VALUE PROP ─────────────────────────────────────────────────── */}
        <section className="section alt">
          <div className="container">
            <ScrollReveal>
              <div className="sprint-section-label">Why Join</div>
              <h2>What you actually get</h2>
              <p className="sprint-section-sub">
                This isn&apos;t a club meeting. It&apos;s a consulting engagement with a
                globally-recognized client.
              </p>
            </ScrollReveal>
            <div className="grid">
              {[
                {
                  title: 'Real Client, Real Deliverable',
                  desc: "You're not building a hypothetical case study. You're producing market analysis, financial models, or go-to-market strategy for a company backed by MIT's The Engine, Constellation Energy, and the U.S. Department of Energy.",
                },
                {
                  title: 'VC Mentor Access',
                  desc: "Direct sessions with venture investors from Techstars Boulder, Innosphere Ventures, and Powerhouse. Ask questions you can't Google.",
                },
                {
                  title: 'Portfolio Piece',
                  desc: 'Walk out with a deliverable you built for a TIME 100-recognized company. Put it on your resume the same week you finish.',
                },
                {
                  title: 'Cross-Disciplinary Team',
                  desc: "Work alongside students from business, engineering, data science, and econ. The kind of team you'll have at your first real job.",
                },
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="card">
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPRINT KPIS ────────────────────────────────────────────────── */}
        <section className="stats-section">
          <div className="container">
            <ScrollReveal>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div className="sprint-section-label" style={{ justifyContent: 'center' }}>Sprint Targets</div>
                <h2 style={{ display: 'block' }}>The numbers</h2>
              </div>
            </ScrollReveal>
            <div className="stats-grid">
              {[
                { num: '12–18', label: 'Consultants' },
                { num: '3–5', label: 'VC Mentors' },
                { num: '4–6', label: 'Faculty Advisors' },
                { num: '2–3', label: 'Live Projects' },
              ].map((kpi, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="stat-card">
                    <div className="stat-number">{kpi.num}</div>
                    <div className="sprint-stat-label">{kpi.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPEN ROLES ─────────────────────────────────────────────────── */}
        <section id="roles" className="section container">
          <ScrollReveal>
            <div className="sprint-section-label">Open Roles</div>
            <h2>Find your fit</h2>
            <p className="sprint-section-sub">
              No experience required — just the willingness to do real work on a real
              engagement. Ideal for sophomores, juniors, and seniors in economics,
              finance, business, and data science.
            </p>
          </ScrollReveal>

          <div className="sprint-roles-grid">
            {ROLES.map((role, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="card sprint-role-card">
                  <div className="sprint-role-header">
                    <h3 style={{ margin: 0, fontSize: 18 }}>{role.title}</h3>
                    <span className="sprint-spots-badge">{role.spots}</span>
                  </div>
                  <p>{role.desc}</p>
                  <div className="sprint-tags">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`sprint-tag${role.primary.includes(tag) ? ' primary' : ''}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href={APPLY_URL} className="button">
              Apply for a Role →
            </Link>
          </div>
        </section>

        {/* ── TIMELINE ───────────────────────────────────────────────────── */}
        <section className="section alt">
          <div className="container" style={{ maxWidth: 760 }}>
            <ScrollReveal>
              <div className="sprint-section-label">How It Works</div>
              <h2>4 weeks. One deliverable.</h2>
              <p className="sprint-section-sub">
                Clear milestones, tight scope, real output. You&apos;ll know exactly what
                you&apos;re building from Day 1.
              </p>
            </ScrollReveal>

            <div className="sprint-timeline">
              {TIMELINE.map((item, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className={`sprint-timeline-item${item.active ? ' active' : ''}`}>
                    <div className="sprint-tl-dot" />
                    <div className="sprint-tl-content">
                      <div className="sprint-tl-date">{item.date}</div>
                      <h3 className="sprint-tl-title">{item.title}</h3>
                      <p className="sprint-tl-desc">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM PARTNERS ─────────────────────────────────────────── */}
        <section className="stats-section">
          <div className="container" style={{ textAlign: 'center' }}>
            <ScrollReveal>
              <div className="sprint-section-label" style={{ justifyContent: 'center' }}>
                Ecosystem Partners
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="sprint-partners-row">
                {[
                  { name: 'Techstars Boulder', src: '/companies/techstars_boulder_accelerator_logo.jpg' },
                  { name: 'CSU Institute for Entrepreneurship', src: '/companies/institute_for_entrepreneurship_college_of_business_logo.jpg' },
                  { name: 'CSU Energy Institute', src: '/companies/EnergyInstitute.png' },
                  { name: 'Innosphere Ventures', src: '/companies/innosphereventures_logo.jpg' },
                ].map((p, i) => (
                  <div key={i} className="sprint-partner-tile">
                    <div className="sprint-partner-logo">
                      <Image
                        src={p.src}
                        alt={p.name}
                        width={80}
                        height={56}
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      />
                    </div>
                    <span className="sprint-partner-name">{p.name}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── MENTORS ────────────────────────────────────────────────────── */}
        <section className="section container">
          <ScrollReveal>
            <div className="sprint-section-label">Mentors &amp; Advisors</div>
            <h2>Learn from people who&apos;ve done it</h2>
            <p className="sprint-section-sub">
              Our advisors have built companies, invested in startups, and mentored
              hundreds of founders. You get direct access.
            </p>
          </ScrollReveal>

          <div className="split" style={{ marginTop: 48 }}>
            {ADVISORS.map((a, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card sprint-advisor-card">
                  <div className="sprint-advisor-avatar">
                    <Image
                      src={a.photo}
                      alt={a.name}
                      width={72}
                      height={72}
                      style={{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, margin: '0 0 4px 0' }}>{a.name}</h3>
                    <div className="sprint-advisor-role">{a.role}</div>
                    <p style={{ marginTop: 12 }}>{a.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section className="section alt">
          <div className="container" style={{ maxWidth: 760 }}>
            <ScrollReveal>
              <div className="sprint-section-label">Questions</div>
              <h2>Real answers</h2>
            </ScrollReveal>
            <div className="sprint-faq" style={{ marginTop: 48 }}>
              {FAQS.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
        <section className="page-hero" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <div className="sprint-eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>Apply</div>
            <h1
              className="page-title"
              style={{ fontSize: 'clamp(48px, 8vw, 80px)', marginBottom: 24 }}
            >
              Applications close<br />April 5.
            </h1>
            <p
              style={{
                fontSize: 18,
                color: 'rgba(255,255,255,0.75)',
                marginBottom: 40,
                position: 'relative',
                zIndex: 1,
              }}
            >
              12–18 spots. A TIME 100 client. VC mentors. 4 weeks to build something real.
            </p>
            <Link
              href={APPLY_URL}
              className="button"
              style={{ position: 'relative', zIndex: 1 }}
            >
              Apply Now →
            </Link>
          </ScrollReveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Ventures</div>
          <div className="footer-right">
            Colorado State University&apos;s First Student Startup Incubator
          </div>
        </div>
      </footer>
    </>
  )
}
