import { useState } from 'react'

export default function VentureFilters({ onChange }){
  const [filters, setFilters] = useState({ skill:'', major:'', stage:'' })
  function update(k,v){
    const n = {...filters,[k]:v}
    setFilters(n)
    onChange && onChange(n)
  }
  return (
    <div style={{display:'flex',gap:8,marginBottom:12}}>
      <input placeholder="Skill" value={filters.skill} onChange={e=>update('skill',e.target.value)} />
      <input placeholder="Major" value={filters.major} onChange={e=>update('major',e.target.value)} />
      <select value={filters.stage} onChange={e=>update('stage',e.target.value)}>
        <option value="">Any stage</option>
        <option>Idea</option>
        <option>Prototype</option>
        <option>Growth</option>
      </select>
    </div>
  )
}
