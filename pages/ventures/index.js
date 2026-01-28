import Link from 'next/link'
import supabase from '../../lib/supabaseClient'
import VentureCard from '../../components/VentureCard'

export default function Ventures({ ventures }) {
  return (
    <div style={{padding:20}}>
      <h1>Ventures</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
        {ventures.map(v => (
          <VentureCard key={v.id} venture={v} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from('ventures').select('*').order('created_at', { ascending: false })
  return { props: { ventures: data || [] } }
}
