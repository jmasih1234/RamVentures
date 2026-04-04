import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Header from '../../components/Header'

const STEPS = [
  { id: 'basics', label: 'Basics', icon: '01' },
  { id: 'engagement', label: 'Engagement', icon: '02' },
  { id: 'track', label: 'Your Track', icon: '03' },
  { id: 'psi', label: 'PSI', icon: '04' },
  { id: 'commitment', label: 'Commitment', icon: '05' },
  { id: 'signal', label: 'Signal', icon: '06' },
  { id: 'confirm', label: 'Confirm', icon: '07' },
]

const YEAR_OPTIONS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad']

const ENGAGEMENT_OPTIONS = [
  'I have a venture idea I want to build',
  'I want to be an operator on an existing venture',
  'I want to explore both building and operating',
  "I'm PSI-certified and want real execution experience",
]

const NEEDS_OPTIONS = ['Operators', 'Validation', 'Technical help', 'Go-to-market', 'Structure / accountability']

const SKILLS_OPTIONS = ['Growth/Marketing', 'Automation/Systems', 'Analytics/Research', 'Operations/PM', 'Finance', 'Engineering/Product']

const PROBLEMS_OPTIONS = ['Startups', 'Campus-based ventures', 'External companies', 'Open-ended/anything hard']

const PSI_OPTIONS = ['Yes (certified)', 'Yes (in progress)', 'No, but interested', 'No']

const HOURS_OPTIONS = ['3–5', '5–8', '8–12', '12+']

const EVAL_OPTIONS = ['Yes', "I'm leaning towards yes", 'Not right now']

const CONFIRMATIONS = [
  'I understand Ram Ventures is selective and execution-driven',
  'I understand this is not a guaranteed placement',
  "I'm willing to learn fast, iterate, and take feedback",
]

const initialForm = {
  fullName: '',
  csuEmail: '',
  majors: '',
  year: '',
  college: '',
  linkedin: '',
  portfolioUrl: '',
  engagement: [],
  ventureName: '',
  problemDescription: '',
  whoIsThisFor: '',
  needs: [],
  skills: [],
  ambiguityStory: '',
  problemTypes: [],
  psiInvolvement: '',
  psiGoals: '',
  hoursPerWeek: '',
  successVision: '',
  evaluationComfort: '',
  proudWork: '',
  walkAway: '',
  anythingElse: '',
  confirmations: [],
}

function ProgressBar({ currentStep, totalSteps }) {
  const pct = ((currentStep + 1) / totalSteps) * 100
  return (
    <div className="apply-progress">
      <div className="apply-progress__bar">
        <div className="apply-progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="apply-progress__label">
        {currentStep + 1} of {totalSteps}
      </span>
    </div>
  )
}

function StepNav({ steps, current, setCurrent, visited }) {
  return (
    <div className="apply-step-nav">
      {steps.map((step, i) => (
        <button
          key={step.id}
          className={`apply-step-dot ${i === current ? 'active' : ''} ${visited.has(i) ? 'visited' : ''}`}
          onClick={() => visited.has(i) && setCurrent(i)}
          title={step.label}
          type="button"
        >
          <span className="apply-step-dot__num">{step.icon}</span>
          <span className="apply-step-dot__label">{step.label}</span>
        </button>
      ))}
    </div>
  )
}

function TextInput({ label, name, value, onChange, required, placeholder, type = 'text' }) {
  const id = `field-${name}`
  return (
    <div className="apply-field">
      <label htmlFor={id} className="apply-field__label">
        {label}
        {required && <span className="apply-field__req">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        required={required}
        placeholder={placeholder || ''}
        className="apply-field__input"
        autoComplete="off"
      />
    </div>
  )
}

function TextArea({ label, name, value, onChange, required, placeholder, rows = 3 }) {
  const id = `field-${name}`
  return (
    <div className="apply-field">
      <label htmlFor={id} className="apply-field__label">
        {label}
        {required && <span className="apply-field__req">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        required={required}
        placeholder={placeholder || ''}
        rows={rows}
        className="apply-field__textarea"
      />
    </div>
  )
}

function RadioGroup({ label, name, options, value, onChange, required }) {
  return (
    <div className="apply-field">
      <div className="apply-field__label">
        {label}
        {required && <span className="apply-field__req">*</span>}
      </div>
      <div className="apply-radio-group">
        {options.map(opt => (
          <label key={opt} className={`apply-radio ${value === opt ? 'selected' : ''}`}>
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(name, opt)}
            />
            <span className="apply-radio__indicator" />
            <span className="apply-radio__text">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function CheckboxGroup({ label, name, options, values, onChange, required, max }) {
  const toggle = (opt) => {
    const arr = values || []
    if (arr.includes(opt)) {
      onChange(name, arr.filter(v => v !== opt))
    } else {
      if (max && arr.length >= max) return
      onChange(name, [...arr, opt])
    }
  }

  return (
    <div className="apply-field">
      <div className="apply-field__label">
        {label}
        {required && <span className="apply-field__req">*</span>}
        {max && <span className="apply-field__hint"> (select up to {max})</span>}
      </div>
      <div className="apply-checkbox-group">
        {options.map(opt => (
          <label key={opt} className={`apply-checkbox ${(values || []).includes(opt) ? 'selected' : ''}`}>
            <input
              type="checkbox"
              checked={(values || []).includes(opt)}
              onChange={() => toggle(opt)}
            />
            <span className="apply-checkbox__box">
              <svg viewBox="0 0 14 14" fill="none">
                <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="apply-checkbox__text">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="apply-section-header">
      <h2 className="apply-section-header__title">{title}</h2>
      {subtitle && <p className="apply-section-header__sub">{subtitle}</p>}
    </div>
  )
}

export default function ApplyPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [visited, setVisited] = useState(new Set([0]))
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const formRef = useRef(null)

  const update = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const goTo = (nextStep) => {
    setStep(nextStep)
    setVisited(prev => new Set([...prev, nextStep]))
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const next = () => goTo(Math.min(step + 1, STEPS.length - 1))
  const prev = () => goTo(Math.max(step - 1, 0))

  // Determine if venture or operator fields should show
  const isVenture = form.engagement.includes('I have a venture idea I want to build')
  const isOperator =
    form.engagement.includes('I want to be an operator on an existing venture') ||
    form.engagement.includes('I want to explore both building and operating') ||
    form.engagement.includes("I'm PSI-certified and want real execution experience")

  const handleSubmit = async () => {
    // Validate confirmations
    if (form.confirmations.length < CONFIRMATIONS.length) {
      setError('Please check all acknowledgment boxes to continue.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed. Please try again.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Success screen
  if (submitted) {
    return (
      <>
        <Head>
          <title>Application Submitted — Ram Ventures</title>
        </Head>
        <Header />
        <main className="apply-page">
          <div className="apply-success">
            <div className="apply-success__icon">
              <svg viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="var(--brand-accent)" strokeWidth="3" />
                <path d="M20 33l8 8 16-18" stroke="var(--brand-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="apply-success__title">You're in the pipeline.</h1>
            <p className="apply-success__sub">
              We received your application, {form.fullName.split(' ')[0]}. Our team reviews on a rolling basis —
              expect to hear back within 48 hours.
            </p>
            <div className="apply-success__socials">
              <p>Follow us while you wait:</p>
              <div className="apply-success__links">
                <a href="https://www.instagram.com/csuramventures" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.linkedin.com/in/ramventures/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <Link href="/" className="button" style={{ marginTop: 32 }}>
              Back to Home
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Apply — Ram Ventures Intake Form</title>
        <meta name="description" content="Apply to Ram Ventures — CSU's student-led venture and execution platform." />
      </Head>

      <Header />

      <main className="apply-page" ref={formRef}>
        <div className="apply-container">
          {/* Header */}
          <div className="apply-header">
            <h1 className="apply-header__title">Ram Ventures Intake Form</h1>
            <p className="apply-header__sub">
              This form helps us understand <strong>who you are, how you think, and how you execute.</strong>
            </p>
          </div>

          <ProgressBar currentStep={step} totalSteps={STEPS.length} />
          <StepNav steps={STEPS} current={step} setCurrent={goTo} visited={visited} />

          {/* STEP CONTENT */}
          <div className="apply-step-content">

            {/* STEP 0: Basic Information */}
            {step === 0 && (
              <div className="apply-step">
                <SectionHeader title="Basic Information" subtitle="Let's start with the essentials." />
                <TextInput label="Full Name" name="fullName" value={form.fullName} onChange={update} required />
                <TextInput label="CSU Email" name="csuEmail" value={form.csuEmail} onChange={update} required type="email" placeholder="you@colostate.edu" />
                <TextInput label="Major(s) / Minor(s)" name="majors" value={form.majors} onChange={update} required />
                <RadioGroup label="Year" name="year" options={YEAR_OPTIONS} value={form.year} onChange={update} required />
                <TextInput label="College" name="college" value={form.college} onChange={update} required placeholder="COB, Engineering, Liberal Arts, etc." />
                <TextInput label="LinkedIn Profile" name="linkedin" value={form.linkedin} onChange={update} required placeholder="https://linkedin.com/in/..." />
                <TextInput label="Portfolio / GitHub / Website" name="portfolioUrl" value={form.portfolioUrl} onChange={update} placeholder="Optional" />
              </div>
            )}

            {/* STEP 1: Engagement */}
            {step === 1 && (
              <div className="apply-step">
                <SectionHeader
                  title="How You're Coming In"
                  subtitle="Which best describes how you want to engage with Ram Ventures?"
                />
                <CheckboxGroup
                  label="How do you want to engage?"
                  name="engagement"
                  options={ENGAGEMENT_OPTIONS}
                  values={form.engagement}
                  onChange={update}
                  required
                />
              </div>
            )}

            {/* STEP 2: Track */}
            {step === 2 && (
              <div className="apply-step">
                {isVenture && (
                  <>
                    <SectionHeader title="Venture Track" subtitle="Tell us about your idea." />
                    <TextInput label="Venture Name (or Working Title)" name="ventureName" value={form.ventureName} onChange={update} />
                    <TextArea label="One-sentence description of the problem you're solving" name="problemDescription" value={form.problemDescription} onChange={update} rows={2} />
                    <TextArea label="Who is this for?" name="whoIsThisFor" value={form.whoIsThisFor} onChange={update} rows={2} />
                    <CheckboxGroup label="What do you need most right now?" name="needs" options={NEEDS_OPTIONS} values={form.needs} onChange={update} />
                  </>
                )}

                {isOperator && (
                  <>
                    <SectionHeader title="Operator Track" subtitle="Tell us what you bring to the table." />
                    <CheckboxGroup label="What skills do you feel strongest in right now?" name="skills" options={SKILLS_OPTIONS} values={form.skills} onChange={update} max={3} />
                    <TextArea label="Describe a time you executed under ambiguity" name="ambiguityStory" value={form.ambiguityStory} onChange={update} rows={4} />
                    <CheckboxGroup label="What kind of problems do you want to work on?" name="problemTypes" options={PROBLEMS_OPTIONS} values={form.problemTypes} onChange={update} />
                  </>
                )}

                {!isVenture && !isOperator && (
                  <SectionHeader
                    title="Your Track"
                    subtitle="Go back and select how you want to engage — we'll show you the right questions."
                  />
                )}
              </div>
            )}

            {/* STEP 3: PSI Alignment */}
            {step === 3 && (
              <div className="apply-step">
                <SectionHeader
                  title="PSI Alignment"
                  subtitle="The Pre-Skilling Institute (PSI) prepares students with real, job-ready skills before graduation. PSI develops pre-skilled talent; Ram Ventures deploys that talent into execution and ventures."
                />
                <RadioGroup label="Are you currently involved with PSI?" name="psiInvolvement" options={PSI_OPTIONS} value={form.psiInvolvement} onChange={update} required />
                <TextArea label="How do you see PSI and Ram Ventures fitting into your goals?" name="psiGoals" value={form.psiGoals} onChange={update} required rows={4} />
              </div>
            )}

            {/* STEP 4: Commitment */}
            {step === 4 && (
              <div className="apply-step">
                <SectionHeader
                  title="Commitment & Expectations"
                  subtitle="Just making sure you're serious."
                />
                <RadioGroup label="How many hours per week can you realistically commit?" name="hoursPerWeek" options={HOURS_OPTIONS} value={form.hoursPerWeek} onChange={update} required />
                <TextArea label='What does "success" look like for you in one semester with Ram Ventures?' name="successVision" value={form.successVision} onChange={update} required rows={4} />
                <RadioGroup label="Are you comfortable being evaluated on output, not effort?" name="evaluationComfort" options={EVAL_OPTIONS} value={form.evaluationComfort} onChange={update} required />
              </div>
            )}

            {/* STEP 5: Signal */}
            {step === 5 && (
              <div className="apply-step">
                <SectionHeader
                  title="Signal Questions"
                  subtitle="These matter the most. Be real."
                />
                <TextArea label="What's something you've built, shipped, or executed that you're proud of?" name="proudWork" value={form.proudWork} onChange={update} required rows={4} />
                <TextArea label="If this doesn't work out, what do you hope you still walk away with?" name="walkAway" value={form.walkAway} onChange={update} required rows={4} />
                <TextArea label="Anything else we should know?" name="anythingElse" value={form.anythingElse} onChange={update} rows={3} />
              </div>
            )}

            {/* STEP 6: Confirmation */}
            {step === 6 && (
              <div className="apply-step">
                <SectionHeader
                  title="Acknowledgment"
                  subtitle="Check all to become a part of the Venture Fam."
                />
                <CheckboxGroup
                  label="Confirmation"
                  name="confirmations"
                  options={CONFIRMATIONS}
                  values={form.confirmations}
                  onChange={update}
                  required
                />

                <div className="apply-socials-note">
                  <p>Follow us:</p>
                  <a href="https://www.instagram.com/csuramventures" target="_blank" rel="noopener noreferrer">Instagram</a>
                  {' · '}
                  <a href="https://www.linkedin.com/in/ramventures/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="apply-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="apply-nav">
            {step > 0 && (
              <button type="button" onClick={prev} className="apply-nav__btn apply-nav__btn--back">
                ← Back
              </button>
            )}
            <div className="apply-nav__spacer" />
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next} className="apply-nav__btn apply-nav__btn--next">
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="apply-nav__btn apply-nav__btn--submit"
              >
                {submitting ? 'Submitting...' : 'Submit Application →'}
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-left">© {new Date().getFullYear()} Ram Ventures</div>
          <div className="footer-right">
            Colorado State University's First Student Startup Incubator
          </div>
        </div>
      </footer>
    </>
  )
}
