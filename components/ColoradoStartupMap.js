import { useState, useEffect } from 'react';

const coloradoStartups = [
  {
    id: 1,
    name: 'Growcentia',
    industry: 'Agriculture',
    location: 'Loveland, CO',
    lat: 40.3937,
    lng: -105.0039,
    description: 'CSU-licensed soil science technology for sustainable agriculture',
    stage: 'Growth',
    contact: 'Scott Wiley',
    website: 'growcentia.com',
  },
  {
    id: 2,
    name: 'New West Genetics',
    industry: 'Agriculture',
    location: 'Fort Collins, CO',
    lat: 40.5853,
    lng: -105.0844,
    description: 'Hemp genetics and crop innovation from CSU faculty expertise',
    stage: 'Growth',
    contact: 'Wendy Mosher',
    website: 'newwestgenetics.com',
  },
  {
    id: 3,
    name: 'AEMS Corp',
    industry: 'Agriculture',
    location: 'Fort Collins, CO',
    lat: 40.5853,
    lng: -105.0844,
    description: 'CSU Spur graduate with ag-tech innovation expertise',
    stage: 'Growth',
    contact: 'Dr. W. Scott Compel',
    website: 'aemscorp.com',
  },
  {
    id: 4,
    name: 'SWIIM System',
    industry: 'Agriculture',
    location: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    description: 'Irrigation optimization. Forbes top 25 ag-tech. 70K+ acres deployed.',
    stage: 'Series B',
    contact: 'Kevin France',
    website: 'swiim.com',
  },
  {
    id: 5,
    name: 'Innosphere Ventures',
    industry: 'Accelerator',
    location: 'Fort Collins, CO',
    lat: 40.5853,
    lng: -105.0844,
    description: '201+ investments, $1.2B raised. CSU partnership & bioscience lab.',
    stage: 'Active',
    contact: 'Mike Freeman',
    website: 'innosphereventures.org',
  },
  {
    id: 6,
    name: 'Barn Owl Tech',
    industry: 'Agriculture',
    location: 'Colorado Springs, CO',
    lat: 38.8339,
    lng: -104.8202,
    description: 'IoT/ag-tech for producers. 7K+ customers, 250% growth.',
    stage: 'Growth',
    contact: 'Josh Phifer',
    website: 'barnowl.tech',
  },
  {
    id: 7,
    name: 'Rooted Robotics',
    industry: 'Agriculture',
    location: 'Boulder, CO',
    lat: 40.0150,
    lng: -105.2705,
    description: 'Indoor farming automation. Raising $1M, $100K+ sold globally.',
    stage: 'Seed',
    contact: 'Max Knight',
    website: 'rootedrobotics.com',
  },
  {
    id: 8,
    name: 'AgriWebb',
    industry: 'Agriculture',
    location: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    description: 'Livestock management software. 17.5M animals, 12K users globally.',
    stage: 'Growth',
    contact: 'Kevin Baum',
    website: 'agriwebb.com',
  },
  {
    id: 9,
    name: 'Compost Queen',
    industry: 'Sustainability',
    location: 'Fort Collins, CO',
    lat: 40.5853,
    lng: -105.0844,
    description: 'Local Fort Collins composting. 700 tons/year capacity.',
    stage: 'Growth',
    contact: 'Jamie Blanchard-Poling',
    website: 'compostqueenfc.com',
  },
  {
    id: 10,
    name: 'Compost Colorado',
    industry: 'Sustainability',
    location: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    description: 'Employee-owned PBC. Denver\'s first commercial composting facility.',
    stage: 'Growth',
    contact: 'Vann Fussell',
    website: 'compost-colorado.com',
  },
  {
    id: 11,
    name: 'Mad Agriculture',
    industry: 'Agriculture',
    location: 'Boulder, CO',
    lat: 40.0150,
    lng: -105.2705,
    description: 'Regenerative agriculture education & implementation programs.',
    stage: 'Growth',
    contact: 'Philip Taylor, PhD',
    website: 'madagriculture.org',
  },
  {
    id: 12,
    name: 'Farmbrite',
    industry: 'Agriculture',
    location: 'Hygiene, CO',
    lat: 40.3183,
    lng: -105.2236,
    description: 'Farm management SaaS. 4K+ users. Bootstrap success story.',
    stage: 'Growth',
    contact: 'Ian & Janine Russell',
    website: 'farmbrite.com',
  },
  {
    id: 13,
    name: 'Cloud Agronomics',
    industry: 'Agriculture',
    location: 'Boulder, CO',
    lat: 40.0150,
    lng: -105.2705,
    description: 'Remote soil carbon measurement. Climate-smart agriculture focus.',
    stage: 'Series A',
    contact: 'Mark Tracy',
    website: 'cloudagronomics.com',
  },
  {
    id: 14,
    name: 'FoodMaven',
    industry: 'Food Tech',
    location: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    description: 'B2B surplus food marketplace. $39.6M raised. Food waste solutions.',
    stage: 'Series C',
    contact: 'FoodMaven Team',
    website: 'foodmaven.com',
  },
  {
    id: 15,
    name: 'Infinite Harvest',
    industry: 'Agriculture',
    location: 'Lakewood, CO',
    lat: 39.7294,
    lng: -105.0662,
    description: 'Indoor vertical farming. 30+ Whole Foods locations.',
    stage: 'Growth',
    contact: 'Jim Romano',
    website: 'infinite-harvest.com',
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
        <div className="map-section">
          <div className="map-wrapper">
            <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%', background: '#e8f4f8' }}>
              {/* Colorado SVG Map Background */}
              <defs>
                <style>{`
                  .map-state { fill: #f0f0f0; stroke: #ccc; stroke-width: 1; }
                  .startup-marker { fill: #667eea; stroke: white; stroke-width: 2; cursor: pointer; }
                  .startup-marker:hover { fill: #764ba2; }
                  .map-text { font-size: 12px; fill: #666; text-anchor: middle; }
                `}</style>
              </defs>
              
              {/* Simplified Colorado outline */}
              <rect x="100" y="80" width="600" height="440" className="map-state" rx="5" />
              
              {/* Fort Collins marker */}
              <circle cx="320" cy="180" r="12" className="startup-marker" />
              <text x="320" y="175" className="map-text" fontSize="10" fontWeight="bold">FC</text>
              <text x="320" y="220" className="map-text">Fort Collins</text>
              <text x="320" y="235" className="map-text" fontSize="10">{fortCollinsCount} startups</text>
              
              {/* Denver marker */}
              <circle cx="380" cy="320" r="12" className="startup-marker" />
              <text x="380" y="315" className="map-text" fontSize="10" fontWeight="bold">D</text>
              <text x="380" y="360" className="map-text">Denver</text>
              <text x="380" y="375" className="map-text" fontSize="10">{denverCount} startups</text>
              
              {/* Other location markers */}
              <circle cx="280" cy="280" r="8" className="startup-marker" opacity="0.6" />
              <circle cx="420" cy="240" r="8" className="startup-marker" opacity="0.6" />
              <circle cx="350" cy="400" r="8" className="startup-marker" opacity="0.6" />
              
              {/* Map labels */}
              <text x="400" y="50" className="map-text" fontSize="16" fontWeight="bold">Colorado Agriculture Ecosystem</text>
            </svg>
          </div>
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
                {startup.contact && <p className="contact">👤 {startup.contact}</p>}
                {startup.website && <p className="website">🌐 {startup.website}</p>}
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
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #f8f9fa;
        }

        .map-section {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .map-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
          background: #e8e8e8;
        }

        .startup-list {
          background: white;
          border-radius: 0;
          padding: 2.5rem 2rem;
          overflow-y: auto;
          box-shadow: none;
          border-left: 1px solid #e8e8e8;
          height: 100%;
          width: 100%;
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

        .contact {
          font-size: 0.8rem !important;
          color: #666 !important;
          margin-top: 0.5rem !important;
        }

        .website {
          font-size: 0.8rem !important;
          color: #667eea !important;
          margin-top: 0.3rem !important;
          text-decoration: none;
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
