import supabase from '../../lib/supabaseClient'
import Link from 'next/link'

export default function Events({ events }) {
  return (
    <div style={{padding:20}}>
      <h1>Events & Demo Day</h1>
      {events && events.length > 0 ? (
        <ul>
          {events.map(e=> (
            <li key={e.id} style={{marginBottom:12}}>
              <strong>{e.title}</strong><br/>
              <small>{e.date}</small>
              <p>{e.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading events...</p>
      )}
      <div style={{marginTop: '2rem', textAlign: 'center'}}>
        <img src="/ram-events-poster.png" alt="Ram Ventures Events Poster" style={{maxWidth: '60%', height: 'auto', borderRadius: '8px'}} />
      </div>
      <div style={{marginTop: '2rem', textAlign: 'center'}}>
        <a href="https://luma.com/exz9fc9w" target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold'}}>View Upcoming Events on Luma</a>
      </div>
      <p><Link href="/">Home</Link></p>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const supabase = (await import('../../lib/supabaseClient')).default
    if (!supabase) return { props: { events: [] } }
    const { data } = await supabase.from('events').select('*').order('date', { ascending: true })
    return { props: { events: data || [] } }
  } catch (error) {
    console.error('Failed to load events:', error)
    return { props: { events: [] } }
  }
}
