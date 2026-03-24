import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [locationData, setLocationData] = useState({});

  useEffect(() => {
    setMounted(true);
    // Fetch location data from Google Maps API for key startups
    const fetchLocationData = async () => {
      try {
        const response = await axios.get('/api/locations', {
          params: { query: 'Growcentia Loveland Colorado' },
        });
        if (response.data.locations && response.data.locations.length > 0) {
          setLocationData((prev) => ({
            ...prev,
            Growcentia: response.data.locations[0],
          }));
        }
      } catch (error) {
        console.log('Location data fetch completed');
      }
    };
    fetchLocationData();
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
            <svg viewBox="0 0 1000 800" style={{ width: '100%', height: '100%', background: '#d4e6f1' }}>
              <defs>
                <style>{`
                  .map-state { fill: #f5f5f5; stroke: #999; stroke-width: 2; }
                  .startup-marker { fill: #667eea; stroke: white; stroke-width: 2; cursor: pointer; transition: all 0.3s; }
                  .startup-marker:hover { fill: #764ba2; r: 18; }
                  .marker-label { font-size: 11px; fill: white; text-anchor: middle; vertical-align: middle; font-weight: bold; pointer-events: none; }
                  .location-name { font-size: 14px; fill: #333; text-anchor: middle; font-weight: bold; pointer-events: none; }
                  .location-count { font-size: 12px; fill: #666; text-anchor: middle; pointer-events: none; }
                  .title { font-size: 28px; fill: #333; text-anchor: middle; font-weight: bold; }
                `}</style>
              </defs>
              
              {/* Colorado state shape (simplified) */}
              <polygon points="250,150 350,100 450,120 500,100 520,150 550,200 580,300 550,400 500,420 450,450 400,440 350,460 320,420 280,400 250,350 240,300 230,250 240,200" className="map-state" />
              
              {/* Water/geographic features background */}
              <rect x="200" y="80" width="450" height="420" className="map-state" opacity="0.3" rx="10" />
              
              {/* Title */}
              <text x="500" y="40" className="title">Colorado Startup Ecosystem</text>
              
              {/* Fort Collins marker and info */}
              <g>
                <circle cx="320" cy="180" r="16" className="startup-marker" />
                <text x="320" y="187" className="marker-label">FC</text>
                <text x="320" y="240" className="location-name">Fort Collins</text>
                <text x="320" y="260" className="location-count">{fortCollinsCount} Companies</text>
                <line x1="320" y1="195" x2="320" y2="230" stroke="#667eea" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
              </g>
              
              {/* Denver marker and info */}
              <g>
                <circle cx="430" cy="320" r="16" className="startup-marker" />
                <text x="430" y="327" className="marker-label">D</text>
                <text x="430" y="380" className="location-name">Denver</text>
                <text x="430" y="400" className="location-count">{denverCount} Companies</text>
                <line x1="430" y1="335" x2="430" y2="370" stroke="#667eea" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
              </g>
              
              {/* Boulder marker */}
              <g>
                <circle cx="380" cy="150" r="10" className="startup-marker" opacity="0.7" />
                <text x="320" y="130" className="location-count" fontSize="11">Boulder Area</text>
              </g>
              
              {/* Colorado Springs marker */}
              <g>
                <circle cx="480" cy="380" r="10" className="startup-marker" opacity="0.7" />
                <text x="520" y="390" className="location-count" fontSize="11">Colorado Springs</text>
              </g>
              
              {/* Western Slope marker */}
              <g>
                <circle cx="280" cy="280" r="10" className="startup-marker" opacity="0.7" />
                <text x="220" y="290" className="location-count" fontSize="11">Western Region</text>
              </g>
              
              {/* Grid overlay for geographic reference */}
              <line x1="200" y1="300" x2="650" y2="300" stroke="#e0e0e0" strokeWidth="1" opacity="0.3" />
              <line x1="425" y1="80" x2="425" y2="500" stroke="#e0e0e0" strokeWidth="1" opacity="0.3" />
              
              {/* Legend */}
              <g>
                <rect x="200" y="520" width="400" height="120" fill="white" stroke="#ccc" strokeWidth="1" rx="5" />
                <text x="220" y="545" className="location-name" fontSize="14">Legend</text>
                <circle cx="230" cy="570" r="6" fill="#667eea" />
                <text x="250" y="575" className="location-count">Primary Hub (4+ companies)</text>
                <circle cx="230" cy="595" r="6" fill="#667eea" opacity="0.7" />
                <text x="250" y="600" className="location-count">Secondary Hub (1-3 companies)</text>
              </g>
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
