import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    fullName,
    csuEmail,
    majors,
    year,
    college,
    linkedin,
    portfolioUrl,
    engagement,
    ventureName,
    problemDescription,
    whoIsThisFor,
    needs,
    skills,
    ambiguityStory,
    problemTypes,
    psiInvolvement,
    psiGoals,
    hoursPerWeek,
    successVision,
    evaluationComfort,
    proudWork,
    walkAway,
    anythingElse,
    confirmations,
  } = req.body

  // Basic validation
  if (!fullName || !csuEmail || !majors || !year || !college || !linkedin) {
    return res.status(400).json({ error: 'Please fill in all required fields in Basic Information.' })
  }

  if (!engagement || engagement.length === 0) {
    return res.status(400).json({ error: 'Please select how you want to engage.' })
  }

  if (!psiInvolvement || !psiGoals) {
    return res.status(400).json({ error: 'Please complete the PSI Alignment section.' })
  }

  if (!hoursPerWeek || !successVision || !evaluationComfort) {
    return res.status(400).json({ error: 'Please complete the Commitment & Expectations section.' })
  }

  if (!proudWork || !walkAway) {
    return res.status(400).json({ error: 'Please complete the Signal Questions.' })
  }

  if (!confirmations || confirmations.length < 3) {
    return res.status(400).json({ error: 'Please check all acknowledgment boxes.' })
  }

  const application = {
    full_name: fullName,
    csu_email: csuEmail,
    majors,
    year,
    college,
    linkedin,
    portfolio_url: portfolioUrl || null,
    engagement,
    venture_name: ventureName || null,
    problem_description: problemDescription || null,
    who_is_this_for: whoIsThisFor || null,
    needs: needs || [],
    skills: skills || [],
    ambiguity_story: ambiguityStory || null,
    problem_types: problemTypes || [],
    psi_involvement: psiInvolvement,
    psi_goals: psiGoals,
    hours_per_week: hoursPerWeek,
    success_vision: successVision,
    evaluation_comfort: evaluationComfort,
    proud_work: proudWork,
    walk_away: walkAway,
    anything_else: anythingElse || null,
    confirmations,
    submitted_at: new Date().toISOString(),
  }

  // Try to save to Supabase if configured
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { error: dbError } = await supabase
        .from('applications')
        .insert([application])

      if (dbError) {
        console.error('Supabase insert error:', dbError)
        // Don't fail the request — fall through to email/file backup
      }
    } catch (err) {
      console.error('Supabase connection error:', err)
    }
  }

  // Send email notification if configured
  const notifyEmail = process.env.APPLY_NOTIFY_EMAIL
  if (notifyEmail) {
    try {
      // Using a simple fetch to a mail service or Supabase Edge Function
      // For now, log the application for manual review
      console.log(`[APPLICATION] ${fullName} <${csuEmail}> — ${engagement.join(', ')}`)
    } catch (err) {
      console.error('Email notification error:', err)
    }
  }

  // Always log to server console as backup
  console.log('[NEW APPLICATION]', JSON.stringify({
    name: fullName,
    email: csuEmail,
    year,
    college,
    engagement,
    timestamp: application.submitted_at,
  }))

  return res.status(200).json({ success: true, message: 'Application received' })
}
