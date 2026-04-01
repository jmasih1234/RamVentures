import Header from '../../components/Header'
import { useState } from 'react'

const ALBUM_TITLE = '2026 Ag-A-thon Pictures'

export async function getStaticProps() {
  try {
    const fs = await import('fs')
    const path = await import('path')
    const crypto = await import('crypto')

    const albumDir = path.join(process.cwd(), 'public', 'gallery', 'agathon-2026')
    const files = fs.readdirSync(albumDir)

    const uniqueByHash = []
    const seenHashes = new Set()

    files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .forEach((file) => {
        const fullPath = path.join(albumDir, file)
        const hash = crypto.createHash('md5').update(fs.readFileSync(fullPath)).digest('hex')
        if (!seenHashes.has(hash)) {
          seenHashes.add(hash)
          uniqueByHash.push(file)
        }
      })

    const getFrameNumber = (fileName) => {
      const match = fileName.match(/(\d+)/)
      return match ? Number(match[1]) : null
    }

    // Remove near-duplicate burst shots by keeping spaced keyframes.
    // Many camera bursts are sequential (_DSC####), so a frame gap helps avoid
    // visually repeated cards while still preserving broad coverage.
    const MIN_FRAME_GAP = 3
    const spacedImages = []
    let lastKeptFrame = null

    uniqueByHash.forEach((file) => {
      const frame = getFrameNumber(file)

      if (frame === null) {
        spacedImages.push(file)
        return
      }

      if (lastKeptFrame === null || Math.abs(frame - lastKeptFrame) >= MIN_FRAME_GAP) {
        spacedImages.push(file)
        lastKeptFrame = frame
      }
    })

    const agathonImages = spacedImages.map((file, index) => ({
        id: index + 1,
        src: `/gallery/agathon-2026/${file}`,
        title: `${ALBUM_TITLE} #${index + 1}`,
        date: 'Spring 2026',
      }))

    return { props: { agathonImages } }
  } catch (error) {
    console.error('Failed to load Ag-A-thon images:', error)
    return { props: { agathonImages: [] } }
  }
}

export default function Gallery({ agathonImages = [] }) {
  const [isAlbumOpen, setIsAlbumOpen] = useState(false)

  return (
    <>
      <Header />
      <main style={{ paddingTop: 0 }}>
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title">Gallery</h1>
            <p className="page-subtitle">Highlights from our events, workshops, and team collaborations</p>
          </div>
        </section>

        <section className="gallery-section">
          <div className="container">
            <h2 style={{ marginBottom: 12 }}>{ALBUM_TITLE}</h2>
            <p className="small muted" style={{ marginBottom: 18 }}>
              {agathonImages.length} photos
            </p>

            <div className="card" style={{ marginBottom: 20 }}>
              <p className="muted" style={{ margin: 0, marginBottom: 12 }}>
                Open the album to view all photos.
              </p>
              <button
                className="button"
                onClick={() => setIsAlbumOpen(!isAlbumOpen)}
                type="button"
              >
                {isAlbumOpen ? 'Hide Album' : `Open Album (${agathonImages.length})`}
              </button>
            </div>

            {isAlbumOpen && (
              <div className="photo-grid" style={{ marginTop: 0, marginBottom: 56 }}>
                {agathonImages.map((image, index) => (
                  <div key={`agathon-${image.id}`} className="photo-card" style={{ animationDelay: `${index * 20}ms` }}>
                    <div className="photo-wrapper">
                      <img src={image.src} alt={image.title} loading="lazy" />
                    </div>
                    <div className="photo-info">
                      <h3>{image.title}</h3>
                      <p className="small muted">{image.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>
      </main>
    </>
  )
}
