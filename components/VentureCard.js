import Link from 'next/link'

export default function VentureCard({ venture, index = 0 }) {
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mouse-x', `${x}%`)
    card.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <Link
      href={`/ventures/${venture.id}`}
      className="venture-card"
      onMouseMove={handleMouseMove}
      style={{ '--delay': `${index * 0.05}s` }}
    >
      <div className="venture-card__image">
        {venture.logo_url ? (
          <img src={venture.logo_url} alt={venture.name} />
        ) : (
          <div className="venture-card__fallback">
            {(venture.name || '')
              .split(' ')
              .slice(0, 2)
              .map(n => n[0])
              .join('')
              .toUpperCase()}
          </div>
        )}
      </div>
      <div className="venture-card__content">
        {venture.stage && (
          <span className="venture-card__stage">{venture.stage}</span>
        )}
        <h3 className="venture-card__title">{venture.name}</h3>
        <p className="venture-card__description">
          {venture.description?.slice(0, 100)}
          {venture.description?.length > 100 ? '...' : ''}
        </p>
        <div className="venture-card__meta">
          <span className="venture-card__major">
            {venture.majors || 'Student project'}
          </span>
          <span className="venture-card__arrow">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
