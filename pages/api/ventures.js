import supabase from '../../lib/supabaseClient'

export default async function handler(req, res){
  if (req.method === 'POST'){
    const body = req.body
    // ensure open_roles is an array if provided as CSV
    if (typeof body.open_roles === 'string') body.open_roles = body.open_roles.split(',').map(s=>s.trim())
    const { data, error } = await supabase.from('ventures').insert([{...body}])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: 'Venture created', data })
  }
  res.status(405).json({ error: 'Method not allowed' })
}
