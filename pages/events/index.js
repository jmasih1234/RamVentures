import supabase from '../../lib/supabaseClient'
import Link from 'next/link'

export default function Events({ events }) {
  return (
    <div style={{padding:20}}>
      <h1>Events & Demo Day</h1>
      <ul>
        {events.map(e=> (
          <li key={e.id} style={{marginBottom:12}}>
            <strong>{e.title}</strong><br/>
            <small>{e.date}</small>
            <p>{e.description}</p>
          </li>
        ))}
      </ul>
      <p><Link href="/">Home</Link></p>
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await supabase.from('events').select('*').order('date', { ascending: true })
  return { props: { events: data || [] } }
}
