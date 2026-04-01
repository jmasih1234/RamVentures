import supabase from '../../lib/supabaseClient'
import nodemailer from 'nodemailer'

async function sendVentureNotification(venture) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const notifyTo = process.env.VENTURE_NOTIFY_EMAIL || 'ramventure@gmail.com'

  if (!host || !user || !pass || !notifyTo) {
    return { sent: false, reason: 'email_not_configured' }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  })

  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })

  await transporter.sendMail({
    from: `Ram Ventures <${user}>`,
    to: notifyTo,
    replyTo: venture.contact_email,
    subject: `New Venture Registration: ${venture.name}`,
    text: [
      'A new venture was registered on the Membership page.',
      '',
      `Name: ${venture.name}`,
      `Contact Email: ${venture.contact_email}`,
      `Submitted: ${submittedAt}`,
      '',
      'Description:',
      venture.description
    ].join('\n')
  })

  return { sent: true }
}

export default async function handler(req, res){
  if (req.method === 'POST'){
    const body = req.body || {}
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const description = typeof body.description === 'string' ? body.description.trim() : ''
    const contact_email = typeof body.contact_email === 'string' ? body.contact_email.trim() : ''

    if (!name || !description || !contact_email) {
      return res.status(400).json({ error: 'Name, description, and contact email are required.' })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(contact_email)) {
      return res.status(400).json({ error: 'Please provide a valid contact email.' })
    }

    const payload = {
      name,
      description,
      contact_email
    }

    const { data, error } = await supabase.from('ventures').insert([payload])
    if (error) return res.status(500).json({ error: error.message })

    const notification = await sendVentureNotification(payload)

    return res.status(200).json({
      message: 'Venture registered',
      data,
      notification
    })
  }
  res.status(405).json({ error: 'Method not allowed' })
}
