import Header from '../../components/Header'

export default function Gallery() {
  const galleryImages = [
    { id: 1, src: '/gallery/event-1.jpg', title: 'Ram Ventures Presentation', date: 'Fall 2024' },
    { id: 2, src: '/gallery/event-2.jpg', title: 'IGNITE x Ram Ventures', date: 'Fall 2024' },
    { id: 3, src: '/gallery/event-3.jpg', title: 'Team Presentation', date: 'Fall 2024' },
    { id: 4, src: '/gallery/event-4.jpg', title: 'Audience Engagement', date: 'Fall 2024' },
    { id: 5, src: '/gallery/event-5.jpg', title: 'Event Setup', date: 'Fall 2024' },
    { id: 6, src: '/gallery/event-6.jpg', title: 'Hackathon Kick-off', date: 'Fall 2024' },
    { id: 7, src: '/gallery/event-7.jpg', title: 'Agriculture Hack-A-Thon', date: 'Fall 2024' },
    { id: 8, src: '/gallery/team-1.jpg', title: 'Team Collaboration', date: 'Fall 2024' },
    { id: 9, src: '/gallery/team-2.jpg', title: 'Working Session', date: 'Fall 2024' },
    { id: 10, src: '/gallery/team-3.jpg', title: 'Team Discussion', date: 'Fall 2024' },
    { id: 11, src: '/gallery/team-4.jpg', title: 'Project Development', date: 'Fall 2024' },
    { id: 12, src: '/gallery/team-5.jpg', title: 'Team Meeting', date: 'Fall 2024' },
    { id: 13, src: '/gallery/team-6.jpg', title: 'Development Session', date: 'Fall 2024' },
    { id: 14, src: '/gallery/team-7.jpg', title: 'Collaboration Space', date: 'Fall 2024' },
  ]

  return (
    <>
      <Header />
      <main className="page-content">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title">Gallery</h1>
            <p className="page-subtitle">Highlights from our events, workshops, and team collaborations</p>
          </div>
        </section>

        <section className="gallery-section">
          <div className="container">
            <div className="photo-grid">
              {galleryImages.map((image, index) => (
                <div key={image.id} className="photo-card" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="photo-wrapper">
                    <img src={image.src} alt={image.title} />
                  </div>
                  <div className="photo-info">
                    <h3>{image.title}</h3>
                    <p className="small muted">{image.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
