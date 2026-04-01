export default async function handler(req, res){
  if (req.method === 'POST'){
    return res.status(410).json({ error: 'Event database management is disabled. Use venture registration only.' })
  }
  res.status(405).json({ error: 'Method not allowed' })
}
