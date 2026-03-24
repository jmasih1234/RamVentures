import { useState, useEffect } from 'react';

const coloradoStartups = [
  {
    id: 1,
    name: 'Local Bounce',
    industry: 'Agriculture',
    location: 'Fort Collins, CO',
    lat: 40.5853,
    lng: -105.0844,
    description: 'Precision livestock management and ag tech solutions',
    stage: 'Series A',
  },
  {
    id: 2,
    name: 'High Plains Bio',
    industry: 'Agriculture',
    location: 'Fort Collins, CO',
    lat: 40.5853,
    lng: -105.0844,
    description: 'Sustainable crop breeding and seed genetics',
    stage: 'Seed',
  },
  {
    id: 3,
    name: 'Rocky Mountain Agritech',
    industry: 'Agriculture',
    location: 'Fort Collins, CO',
    lat: 40.5853,
    lng: -105.0844,
    description: 'Water conservation and irrigation optimization',
    stage: 'Growth',
  },
  {
    id: 4,
    name: 'Colorado Agro Analytics',
    industry: 'Agriculture',
    location: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    description: 'Farm data analytics and yield prediction AI',
    stage: 'Series A',
  },
  {
    id: 5,
    name: 'Mile High Crops',
    industry: 'Agriculture',
    location: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    description: 'Urban vertical farming in Colorado',
    stage: 'Seed',
  },
  {
    id: 6,
    name: 'Colorado Sustainable Ag',
    industry: 'Agriculture',
    location: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    description: 'Organic farming technologies and soil health',
    stage: 'Growth',
  },
  {
    id: 7,
    name: 'Front Range Agri Solutions',
    industry: 'Agriculture',
    location: 'Fort Collins, CO',
    lat: 40.5853,
    lng: -105.0844,
    description: 'Drone-based crop monitoring for Colorado farmers',
    stage: 'Series B',
  },
  {
    id: 8,
    name: 'Denver Farm Tech',
    industry: 'Agriculture',
    location: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    description: 'Agricultural equipment rental and sharing platform',
    stage: 'Growth',
  },
];

export default function ColoradoStartupMap() {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Calculate center between Fort Collins and Denver
  const avgLat = 40.163;
  const avgLng = -104.537;

  const markers = coloradoStartups
    .map((startup) => `&markers=color:blue%7C${startup.lat},${startup.lng}`)
    .join('');

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${avgLat},${avgLng}&zoom=9&size=600x600&style=feature:all%7Celement:labels%7Cvisibility:off&style=feature:water%7Ccolor:0xb3d9ff&style=feature:land%7Ccolor:0xf3f3f3&style=feature:road%7Cvisibility:off&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xcccccc${markers}&key=AIzaSyBu-916DdpKAjTmJKoperQ4AGg-_8Ujg90`;

  const fortCollinsCount = coloradoStartups.filter(
    (s) => s.location.includes('Fort Collins')
  ).length;
  const denverCount = coloradoStartups.filter(
    (s) => s.location.includes('Denver')
  ).length;

  return (
    <>
      <div className="colorado-map-container">
        <div className="map-wrapper">
          <img
            src={mapUrl}
            alt="Colorado Agriculture Startups Map"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="startup-list">
          <div className="header-section">
            <h2>Colorado Agriculture Startups</h2>
            <div className="location-stats">
              <div className="stat">
                <span className="stat-number">{fortCollinsCount}</span>
                <span className="stat-label">Fort Collins</span>
              </div>
              <div className="stat">
                <span className="stat-number">{denverCount}</span>
                <span className="stat-label">Denver</span>
              </div>
            </div>
          </div>

          <div className="startups-grid">
            {coloradoStartups.map((startup) => (
              <div
                key={startup.id}
                className={`startup-card ${
                  selectedStartup?.id === startup.id ? 'active' : ''
                }`}
                onClick={() => setSelectedStartup(startup)}
              >
                <div className="card-location">{startup.location}</div>
                <h3>{startup.name}</h3>
                <p className="stage-badge">{startup.stage}</p>
                <p className="description">{startup.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .colorado-map-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 0;
          min-height: calc(100vh - 80px);
          padding: 0;
          background: #f8f9fa;
        }

        .map-wrapper {
          height: 100%;
          min-height: calc(100vh - 80px);
          border-radius: 0;
          overflow: hidden;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
        }

        .map-wrapper img {
          width: 100% !important;
          height: 100% !important;
        }

        .startup-list {
          background: white;
          border-radius: 0;
          padding: 2.5rem 2rem;
          overflow-y: auto;
          box-shadow: none;
          border-left: 1px solid #e8e8e8;
        }

        .header-section {
          margin-bottom: 2rem;
        }

        .startup-list h2 {
          color: #1a1a1a;
          margin: 0 0 1rem 0;
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .location-stats {
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.3rem;
        }

        .startups-grid {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .startup-card {
          padding: 1.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: #fff;
          border-left: 4px solid transparent;
        }

        .startup-card:hover {
          border-color: #667eea;
          border-left-color: #667eea;
          background: #f8faff;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .startup-card.active {
          border-color: #667eea;
          border-left-color: #667eea;
          background: #f0f4ff;
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.2);
        }

        .card-location {
          font-size: 0.8rem;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .startup-card h3 {
          margin: 0 0 0.6rem 0;
          color: #1a1a1a;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .startup-card p {
          margin: 0.4rem 0;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .description {
          margin-top: 0.7rem !important;
        }

        .stage-badge {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.35rem 0.85rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          margin: 0.7rem 0 !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 1024px) {
          .colorado-map-container {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .map-wrapper {
            height: 350px;
            min-height: 350px;
          }

          .startup-list {
            border-left: none;
            border-top: 1px solid #e8e8e8;
          }

          .location-stats {
            gap: 3rem;
            margin-top: 1rem;
          }
        }
      `}</style>
    </>
  );
}
