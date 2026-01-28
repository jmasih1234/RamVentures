import Link from 'next/link'

export default function VentureCard({ venture }){
  return (
    <article style={{border:'1px solid #ddd',padding:12,borderRadius:6}}>
      <h3><Link href={`/ventures/${venture.id}`}>{venture.name}</Link></h3>
      <p style={{minHeight:40}}>{venture.description}</p>
      <div style={{fontSize:12,color:'#666'}}>
        <div>Major: {venture.majors || 'Any'}</div>
        <div>Stage: {venture.stage || 'Early'}</div>
      </div>
    </article>
  )
}
