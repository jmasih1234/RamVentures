import supabase from '../../lib/supabaseClient'

export default async function handler(req, res){
  if (req.method === 'POST'){
    const body = req.body
    const { data, error } = await supabase.from('events').insert([{...body}])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: 'Event created', data })
  }
  res.status(405).json({ error: 'Method not allowed' })
}
