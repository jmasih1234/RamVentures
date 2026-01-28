import supabase from '../../lib/supabaseClient'
import Link from 'next/link'

export default function VenturePage({ venture }) {
  if (!venture) return <div style={{padding:20}}>Not found</div>
  return (
    <div style={{padding:20}}>
      <h1>{venture.name}</h1>
      <p>{venture.description}</p>
      <h3>Open Roles</h3>
      <ul>
        {(venture.open_roles || []).map((r,i)=>(<li key={i}>{r}</li>))}
      </ul>
      <p>
        <a href={`mailto:${venture.contact_email || ''}`}>Contact</a>
        {' '}|{' '}
        <Link href={`/ventures`}>Back to directory</Link>
      </p>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const id = params.id
  const { data } = await supabase.from('ventures').select('*').eq('id', id).single()
  return { props: { venture: data || null } }
}
