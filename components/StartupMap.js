import { useState, useEffect } from 'react';

const startupData = [
  {
    id: 1,
    name: 'GreenGrow Innovations',
    industry: 'Agriculture',
    location: 'California, USA',
    lat: 36.7783,
    lng: -119.4179,
    description: 'Precision agriculture AI for crop optimization',
    stage: 'Seed',
  },
  {
    id: 2,
    name: 'AquaFarm Tech',
    industry: 'Agriculture',
    location: 'Netherlands',
    lat: 52.1326,
    lng: 5.2913,
    description: 'Sustainable aquaponics systems',
    stage: 'Series A',
  },
  {
    id: 3,
    name: 'SoilSense Analytics',
    industry: 'Agriculture',
    location: 'Iowa, USA',
    lat: 42.0115,
    lng: -93.2105,
    description: 'IoT soil monitoring and analytics',
    stage: 'Seed',
  },
  {
    id: 4,
    name: 'CropConnect',
    industry: 'Agriculture',
    location: 'India',
    lat: 20.5937,
    lng: 78.9629,
    description: 'Farm-to-market supply chain platform',
    stage: 'Growth',
  },
  {
    id: 5,
    name: 'VerticalHarvest',
    industry: 'Agriculture',
    location: 'Denmark',
    lat: 56.2639,
    lng: 9.5018,
    description: 'Vertical farming automation systems',
    stage: 'Series B',
  },
  {
    id: 6,
    name: 'DroneAg Solutions',
    industry: 'Agriculture',
    location: 'Brazil',
    lat: -14.2350,
    lng: -51.9253,
    description: 'Drone-based crop monitoring and spraying',
    stage: 'Growth',
  },
];

export default function StartupMap() {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const avgLat = startupData.reduce((sum, s) => sum + s.lat, 0) / startupData.length;
  const avgLng = startupData.reduce((sum, s) => sum + s.lng, 0) / startupData.length;

  const markers = startupData
    .map((startup) => `&markers=color:blue%7C${startup.lat},${startup.lng}`)
    .join('');

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${avgLat},${avgLng}&zoom=3&size=600x600&style=feature:all%7Celement:labels%7Cvisibility:off&style=feature:water%7Ccolor:0xb3d9ff&style=feature:land%7Ccolor:0xf3f3f3&style=feature:road%7Cvisibility:off&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xcccccc${markers}&key=AIzaSyBu-916DdpKAjTmJKoperQ4AGg-_8Ujg90`;

  return (
    <div className="startup-map-container">
      <div className="map-wrapper">
        <img
          src={mapUrl}
          alt="Startup Locations Map"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className="startup-list">
        <h2>Agriculture Startups Portal</h2>
        <div className="startups-grid">
          {startupData.map((startup) => (
            <div
              key={startup.id}
              className={`startup-card ${selectedStartup?.id === startup.id ? 'active' : ''}`}
              onClick={() => setSelectedStartup(startup)}
            >
              <h3>{startup.name}</h3>
              <p className="stage-badge">{startup.stage}</p>
              <p>{startup.description}</p>
              <p className="location">{startup.location}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .startup-map-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          height: calc(100vh - 100px);
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .map-wrapper {
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .startup-list {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .startup-list h2 {
          color: #333;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .startups-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .startup-card {
          padding: 1.2rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f9f9f9;
        }

        .startup-card:hover {
          border-color: #667eea;
          background: #f0f4ff;
          transform: translateX(5px);
        }

        .startup-card.active {
          border-color: #667eea;
          background: #e8ecff;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .startup-card h3 {
          margin: 0 0 0.5rem 0;
          color: #333;
          font-size: 1rem;
        }

        .startup-card p {
          margin: 0.3rem 0;
          color: #666;
          font-size: 0.9rem;
        }

        .stage-badge {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          margin: 0.5rem 0 !important;
        }

        .location {
          color: #999;
          font-size: 0.85rem !important;
        }

        @media (max-width: 1024px) {
          .startup-map-container {
            grid-template-columns: 1fr;
            height: auto;
          }

          .map-wrapper {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
}
