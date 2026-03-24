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
    <>
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
      </div>

      <style jsx>{`
        .startup-map-container {
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

        .startup-list h2 {
          color: #1a1a1a;
          margin-bottom: 2rem;
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: -0.5px;
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
          transform: translateX(0);
        }

        .startup-card.active {
          border-color: #667eea;
          border-left-color: #667eea;
          background: #f0f4ff;
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.2);
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

        .location {
          color: #999;
          font-size: 0.85rem !important;
          margin-top: 0.7rem !important;
          display: flex;
          align-items: center;
        }

        .location::before {
          content: '📍';
          margin-right: 0.5rem;
        }

        @media (max-width: 1024px) {
          .startup-map-container {
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
        }
      `}</style>
    </>
  );
}
