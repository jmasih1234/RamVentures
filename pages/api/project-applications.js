import supabase from '../../lib/supabaseClient'
import nodemailer from 'nodemailer'

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function sendApplicationNotification(application) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const notifyTo = process.env.VENTURE_NOTIFY_EMAIL || 'ramventure@gmail.com'

  if (!host || !user || !pass || !notifyTo) return

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  })

  await transporter.sendMail({
    from: `Ram Ventures <${user}>`,
    to: notifyTo,
    replyTo: application.email,
    subject: `New Project Application: ${application.full_name}`,
    text: [
      'A new project application was submitted.',
      '',
      `Name: ${application.full_name}`,
      `Email: ${application.email}`,
      `Major: ${application.major || 'N/A'}`,
      `Graduation Year: ${application.graduation_year || 'N/A'}`,
      `Role Interest: ${application.role_interest || 'N/A'}`,
      `Weekly Hours: ${application.weekly_hours || 'N/A'}`,
      '',
      'Why interested:',
      application.why_interested || 'N/A',
      '',
      'Relevant experience:',
      application.relevant_experience || 'N/A'
    ].join('\n')
  })
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body || {}

    const payload = {
      full_name: normalizeText(body.full_name),
      email: normalizeText(body.email),
      phone: normalizeText(body.phone),
      major: normalizeText(body.major),
      graduation_year: normalizeText(body.graduation_year),
      linkedin_url: normalizeText(body.linkedin_url),
      role_interest: normalizeText(body.role_interest),
      why_interested: normalizeText(body.why_interested),
      relevant_experience: normalizeText(body.relevant_experience),
      weekly_hours: normalizeText(body.weekly_hours),
      resume_url: normalizeText(body.resume_url),
      portfolio_url: normalizeText(body.portfolio_url),
      availability: normalizeText(body.availability),
      ai_experience: normalizeText(body.ai_experience),
      team_preference: normalizeText(body.team_preference),
      additional_notes: normalizeText(body.additional_notes),
      status: 'new',
      admin_response: ''
    }

    if (!payload.full_name || !payload.email || !payload.why_interested) {
      return res.status(400).json({ error: 'Full name, email, and interest response are required.' })
    }

    if (!isValidEmail(payload.email)) {
      return res.status(400).json({ error: 'Please provide a valid email.' })
    }

    const { data, error } = await supabase.from('project_applications').insert([payload]).select('*').single()
    if (error) return res.status(500).json({ error: error.message })

    try {
      await sendApplicationNotification(payload)
    } catch {
      // Non-blocking notification failure.
    }

    return res.status(200).json({ message: 'Application submitted successfully.', data })
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('project_applications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ data: data || [] })
  }

  if (req.method === 'PATCH') {
    const id = normalizeText(req.body?.id)
    const status = normalizeText(req.body?.status)
    const admin_response = normalizeText(req.body?.admin_response)

    if (!id) return res.status(400).json({ error: 'Application id is required.' })

    const allowed = ['new', 'reviewing', 'accepted', 'waitlisted', 'declined']
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' })
    }

    const updatePayload = {}
    if (status) updatePayload.status = status
    if (typeof req.body?.admin_response === 'string') updatePayload.admin_response = admin_response

    const { data, error } = await supabase
      .from('project_applications')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single()

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: 'Application updated.', data })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
