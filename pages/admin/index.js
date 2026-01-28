import { useState } from 'react'

export default function Admin() {
  const [venture, setVenture] = useState({ name:'', description:'', contact_email:'' })
  const [event_, setEvent] = useState({ title:'', date:'', description:'' })
  const [msg, setMsg] = useState('')

  async function submitV(e){
    e.preventDefault()
    const res = await fetch('/api/ventures', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(venture) })
    const data = await res.json()
    setMsg(data.message || 'Saved')
  }

  async function submitE(e){
    e.preventDefault()
    const res = await fetch('/api/events', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(event_) })
    const data = await res.json()
    setMsg(data.message || 'Saved')
  }

  return (
    <div style={{padding:20}}>
      <h1>Admin</h1>
      <p>Use these forms to add Ventures and Events (MVP).</p>
      <div style={{display:'flex',gap:20}}>
        <form onSubmit={submitV} style={{maxWidth:420}}>
          <h2>Add Venture</h2>
          <input placeholder="Name" value={venture.name} onChange={e=>setVenture({...venture,name:e.target.value})} style={{width:'100%',marginBottom:8}} />
          <textarea placeholder="Description" value={venture.description} onChange={e=>setVenture({...venture,description:e.target.value})} style={{width:'100%',marginBottom:8}} />
          <input placeholder="Contact email" value={venture.contact_email} onChange={e=>setVenture({...venture,contact_email:e.target.value})} style={{width:'100%',marginBottom:8}} />
          <button type="submit">Create Venture</button>
        </form>

        <form onSubmit={submitE} style={{maxWidth:420}}>
          <h2>Add Event</h2>
          <input placeholder="Title" value={event_.title} onChange={e=>setEvent({...event_,title:e.target.value})} style={{width:'100%',marginBottom:8}} />
          <input placeholder="Date" value={event_.date} onChange={e=>setEvent({...event_,date:e.target.value})} style={{width:'100%',marginBottom:8}} />
          <textarea placeholder="Description" value={event_.description} onChange={e=>setEvent({...event_,description:e.target.value})} style={{width:'100%',marginBottom:8}} />
          <button type="submit">Create Event</button>
        </form>
      </div>
      <div style={{marginTop:12}}>{msg}</div>
    </div>
  )
}
