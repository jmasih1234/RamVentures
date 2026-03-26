import { useEffect, useMemo, useRef, useState } from 'react';

const coloradoStartups = [
  { id: 1, name: 'AEMS Corp', location: 'Fort Collins, CO', lat: 40.5853, lng: -105.0844, description: 'CSU Spur graduate with ag-tech innovation expertise', stage: 'Growth', contact: 'Dr. W. Scott Compel', generalContact: 'Contact via aemscorp.com', linkedin: 'https://linkedin.com/in/scott-compel', website: 'aemscorp.com' },
  { id: 2, name: 'AgriWebb', location: 'Denver, CO', lat: 39.7392, lng: -104.9903, description: 'Livestock management software. 17.5M animals, 12K users globally.', stage: 'Growth', contact: 'Kevin Baum', generalContact: 'Contact via agriwebb.com', linkedin: 'https://linkedin.com/in/kevin-baum', website: 'agriwebb.com' },
  { id: 3, name: 'AtmosZero', location: 'Fort Collins, CO', lat: 40.5928, lng: -105.0833, description: 'Electrified boiler technology producing decarbonized steam.', stage: 'Seed', contact: 'General Contact', generalContact: 'Contact via atmoszero.energy', linkedin: 'Not publicly listed', website: 'atmoszero.energy' },
  { id: 4, name: 'Axiota Animal Health', location: 'Fort Collins, CO', lat: 40.5892, lng: -105.0901, description: 'Animal health products for beef and dairy producers.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via axiota.com', linkedin: 'Not publicly listed', website: 'axiota.com' },
  { id: 5, name: 'Barn Owl Tech', location: 'Colorado Springs, CO', lat: 38.8339, lng: -104.8202, description: 'IoT/ag-tech for producers. 7K+ customers, 250% growth.', stage: 'Growth', contact: 'Josh Phifer', generalContact: 'Contact via barnowl.tech', linkedin: 'https://www.linkedin.com/in/joshdphifer/', website: 'barnowl.tech' },
  { id: 6, name: 'BillGO', location: 'Fort Collins, CO', lat: 40.5835, lng: -105.0797, description: 'Modern bill management and payments platform for banks, fintechs, and billers.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via billgo.com', linkedin: 'Not publicly listed', website: 'billgo.com' },
  { id: 7, name: 'Cloud Agronomics', location: 'Boulder, CO', lat: 40.015, lng: -105.2705, description: 'Remote soil carbon measurement. Climate-smart agriculture focus.', stage: 'Series A', contact: 'Mark Tracy', generalContact: 'Contact via cloudagronomics.com', linkedin: 'https://linkedin.com/in/mark-tracy', website: 'cloudagronomics.com' },
  { id: 8, name: 'Compost Colorado', location: 'Denver, CO', lat: 39.7392, lng: -104.9903, description: 'Employee-owned PBC. Denver\'s first commercial composting facility.', stage: 'Growth', contact: 'Vann Fussell', generalContact: 'commercial@compost-colorado.com', linkedin: 'https://linkedin.com/in/vann-fussell', website: 'compost-colorado.com' },
  { id: 9, name: 'Compost Queen', location: 'Fort Collins, CO', lat: 40.5853, lng: -105.0844, description: 'Local Fort Collins composting. 700 tons/year capacity.', stage: 'Growth', contact: 'Jamie Blanchard-Poling', generalContact: 'Contact via compostqueenfc.com', linkedin: 'https://linkedin.com/in/jamie-blanchard-poling', website: 'compostqueenfc.com' },
  { id: 10, name: 'Farmbrite', location: 'Hygiene, CO', lat: 40.3183, lng: -105.2236, description: 'Farm management SaaS. 4K+ users. Bootstrap success story.', stage: 'Growth', contact: 'Ian & Janine Russell', generalContact: 'hello@farmbrite.com', linkedin: 'https://linkedin.com/in/ian-russell-farmbrite', website: 'farmbrite.com' },
  { id: 11, name: 'FoodMaven', location: 'Denver, CO', lat: 39.7392, lng: -104.9903, description: 'B2B surplus food marketplace. $39.6M raised. Food waste solutions.', stage: 'Series C', contact: 'General Contact', generalContact: 'Contact via foodmaven.com', linkedin: 'https://linkedin.com/company/foodmaven', website: 'foodmaven.com' },
  { id: 12, name: 'Growcentia', location: 'Loveland, CO', lat: 40.3937, lng: -105.0039, description: 'CSU-licensed soil science technology for sustainable agriculture', stage: 'Growth', contact: 'Scott Wiley', generalContact: 'scott@growcentia.com', linkedin: 'https://linkedin.com/in/scott-wiley-growcentia', website: 'growcentia.com' },
  { id: 13, name: 'Infinite Harvest', location: 'Lakewood, CO', lat: 39.7294, lng: -105.0662, description: 'Indoor vertical farming. 30+ Whole Foods locations.', stage: 'Growth', contact: 'Jim Romano', generalContact: 'Contact via infinite-harvest.com', linkedin: 'https://linkedin.com/in/jim-romano', website: 'infinite-harvest.com' },
  { id: 14, name: 'Innosphere Ventures', location: 'Fort Collins, CO', lat: 40.5853, lng: -105.0844, description: '201+ investments, $1.2B raised. CSU partnership & bioscience lab.', stage: 'Active', contact: 'Mike Freeman', generalContact: 'mfreeman@innosphereventures.org', linkedin: 'https://www.linkedin.com/in/mikeafreeman/', website: 'innosphereventures.org' },
  { id: 15, name: 'KLOwen Braces', location: 'Fort Collins, CO', lat: 40.5901, lng: -105.0781, description: 'Orthodontic technology with prefabricated modular braces systems.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via klowenbraces.com', linkedin: 'Not publicly listed', website: 'klowenbraces.com' },
  { id: 16, name: 'Mad Agriculture', location: 'Boulder, CO', lat: 40.015, lng: -105.2705, description: 'Regenerative agriculture education & implementation programs.', stage: 'Growth', contact: 'Philip Taylor, PhD', generalContact: 'Contact via madagriculture.org', linkedin: 'https://www.linkedin.com/in/philipgrahamtaylor/', website: 'madagriculture.org' },
  { id: 17, name: 'Madwire', location: 'Fort Collins, CO', lat: 40.5799, lng: -105.0735, description: 'Marketing and CRM platform helping small businesses grow online.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via madwire.com', linkedin: 'Not publicly listed', website: 'madwire.com' },
  { id: 18, name: 'New West Genetics', location: 'Fort Collins, CO', lat: 40.5853, lng: -105.0844, description: 'Hemp genetics and crop innovation from CSU faculty expertise', stage: 'Growth', contact: 'Wendy Mosher', generalContact: 'wmosher@newwestgenetics.com', linkedin: 'https://www.linkedin.com/in/wmosher/', website: 'newwestgenetics.com' },
  { id: 19, name: 'Prieto Battery', location: 'Fort Collins, CO', lat: 40.5818, lng: -105.0887, description: 'Advanced battery company with origins in CSU\'s energy innovation ecosystem.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via prietobattery.com', linkedin: 'Not publicly listed', website: 'prietobattery.com' },
  { id: 20, name: 'Rooted Robotics', location: 'Boulder, CO', lat: 40.015, lng: -105.2705, description: 'Indoor farming automation. Raising $1M, $100K+ sold globally.', stage: 'Seed', contact: 'Max Knight', generalContact: 'Contact via rootedrobotics.com', linkedin: 'https://linkedin.com/in/max-knight', website: 'rootedrobotics.com' },
  { id: 21, name: 'Secure64', location: 'Fort Collins, CO', lat: 40.5764, lng: -105.0863, description: 'Carrier-grade DNS and network security software for critical infrastructure.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via secure64.com', linkedin: 'Not publicly listed', website: 'secure64.com' },
  { id: 22, name: 'SWIIM System', location: 'Denver, CO', lat: 39.7392, lng: -104.9903, description: 'Irrigation optimization. Forbes top 25 ag-tech. 70K+ acres deployed.', stage: 'Series B', contact: 'Kevin France', generalContact: 'Contact via swiim.com', linkedin: 'https://www.linkedin.com/in/kevin-france/', website: 'swiim.com' },
  { id: 23, name: 'The Food Corridor', location: 'Fort Collins, CO', lat: 40.584, lng: -105.0718, description: 'Platform for finding, booking, and paying for commercial kitchen space.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via thefoodcorridor.com', linkedin: 'Not publicly listed', website: 'thefoodcorridor.com' },
  { id: 24, name: 'TurboTenant', location: 'Fort Collins, CO', lat: 40.5878, lng: -105.0849, description: 'Rental management software for tenant screening, payments, and listings.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via turbotenant.com', linkedin: 'Not publicly listed', website: 'turbotenant.com' }
];

function loadGoogleMapsScript(apiKey) {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.google && window.google.maps) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.getElementById('google-maps-script');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Google Maps failed to load')));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Maps failed to load'));
    document.head.appendChild(script);
  });
}

export default function ColoradoStartupMapGoogle() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [cityFilter, setCityFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All industries');
  const [searchTerm, setSearchTerm] = useState('');
  const [mapError, setMapError] = useState('');
  const [useFallbackMap, setUseFallbackMap] = useState(false);
  const mapNodeRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const fortCollinsCount = useMemo(() => coloradoStartups.filter((s) => s.location.includes('Fort Collins')).length, []);
  const denverCount = useMemo(() => coloradoStartups.filter((s) => s.location.includes('Denver')).length, []);
  const boulderCount = useMemo(() => coloradoStartups.filter((s) => s.location.includes('Boulder')).length, []);

  const startupsWithIndustry = useMemo(() => {
    const industryByName = {
      'AEMS Corp': 'AgTech',
      AgriWebb: 'AgTech SaaS',
      AtmosZero: 'Climate Tech',
      'Axiota Animal Health': 'Animal Health',
      'Barn Owl Tech': 'AgTech IoT',
      BillGO: 'Fintech',
      'Cloud Agronomics': 'Climate Tech',
      'Compost Colorado': 'Circular Economy',
      'Compost Queen': 'Circular Economy',
      Farmbrite: 'AgTech SaaS',
      FoodMaven: 'FoodTech',
      Growcentia: 'AgTech',
      'Infinite Harvest': 'Controlled Environment Ag',
      'Innosphere Ventures': 'Venture Platform',
      'KLOwen Braces': 'HealthTech',
      'Mad Agriculture': 'Regenerative Ag',
      Madwire: 'Marketing Tech',
      'New West Genetics': 'Ag-Biotech',
      'Prieto Battery': 'Energy',
      'Rooted Robotics': 'Ag Robotics',
      Secure64: 'Cybersecurity',
      'SWIIM System': 'WaterTech',
      'The Food Corridor': 'FoodTech',
      TurboTenant: 'PropTech',
    };

    return coloradoStartups.map((startup) => ({
      ...startup,
      industry: industryByName[startup.name] || 'Other',
    }));
  }, []);

  const industries = useMemo(() => {
    const unique = [...new Set(startupsWithIndustry.map((s) => s.industry))].sort((a, b) => a.localeCompare(b));
    return ['All industries', ...unique];
  }, [startupsWithIndustry]);

  const filteredStartups = useMemo(() => {
    return startupsWithIndustry.filter((startup) => {
      const cityMatch = cityFilter === 'All' || startup.location.includes(cityFilter);
      const industryMatch = industryFilter === 'All industries' || startup.industry === industryFilter;
      const search = searchTerm.trim().toLowerCase();
      const textMatch = !search ||
        startup.name.toLowerCase().includes(search) ||
        startup.description.toLowerCase().includes(search) ||
        startup.location.toLowerCase().includes(search) ||
        startup.industry.toLowerCase().includes(search);

      return cityMatch && industryMatch && textMatch;
    });
  }, [startupsWithIndustry, cityFilter, industryFilter, searchTerm]);

  const locationPriority = {
    'Colorado Springs': 0,
    Denver: 1,
    'Fort Collins': 2,
    Loveland: 3,
    Boulder: 4,
    Lakewood: 5,
    Hygiene: 6,
  };

  const sortedStartups = useMemo(() => {
    const byCityPriority = (location) => {
      const match = Object.keys(locationPriority).find((city) => location.includes(city));
      return match ? locationPriority[match] : 999;
    };

    return [...filteredStartups].sort((a, b) => {
      const cityDiff = byCityPriority(a.location) - byCityPriority(b.location);
      if (cityDiff !== 0) return cityDiff;
      return a.name.localeCompare(b.name);
    });
  }, [filteredStartups]);

  useEffect(() => {
    const invalidPlaceholder =
      !apiKey ||
      apiKey === 'YOUR_GOOGLE_MAPS_API_KEY' ||
      apiKey.toLowerCase().includes('your_google_maps_api_key');

    if (invalidPlaceholder) {
      setMapError('Google Maps API key is missing or still set to placeholder. Add a real NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local, then restart the dev server.');
      setUseFallbackMap(true);
      return;
    }

    let disposed = false;

    window.gm_authFailure = () => {
      setMapError('Google Maps authentication failed. Check API key restrictions (allow http://localhost:3000/*), enable Maps JavaScript API, and ensure billing is active.');
      setUseFallbackMap(true);
    };

    (async () => {
      try {
        await loadGoogleMapsScript(apiKey);
        if (disposed || !mapNodeRef.current || !window.google) return;

        const map = new window.google.maps.Map(mapNodeRef.current, {
          center: { lat: 40.05, lng: -104.95 },
          zoom: 7,
          mapTypeControl: false,
          streetViewControl: false,
        });

        const bounds = new window.google.maps.LatLngBounds();
        const infoWindow = new window.google.maps.InfoWindow();

        markersRef.current = sortedStartups.map((startup) => {
          const marker = new window.google.maps.Marker({
            position: { lat: startup.lat, lng: startup.lng },
            map,
            title: startup.name,
          });

          bounds.extend(marker.getPosition());

          marker.addListener('click', () => {
            setSelectedStartup(startup);
            infoWindow.setContent(`<div><strong>${startup.name}</strong><br/>${startup.location}</div>`);
            infoWindow.open({ map, anchor: marker });
          });

          return { startup, marker };
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds);
        }
        mapRef.current = map;
      } catch (error) {
        setMapError('Google Maps failed to load. Verify key, billing, and Maps JavaScript API enablement.');
        setUseFallbackMap(true);
      }
    })();

    return () => {
      disposed = true;
      markersRef.current.forEach(({ marker }) => marker.setMap(null));
      markersRef.current = [];
      if (window.gm_authFailure) {
        window.gm_authFailure = null;
      }
    };
  }, [apiKey, sortedStartups]);

  useEffect(() => {
    if (!selectedStartup || !mapRef.current) return;
    mapRef.current.panTo({ lat: selectedStartup.lat, lng: selectedStartup.lng });
    mapRef.current.setZoom(10);
  }, [selectedStartup]);

  return (
    <>
      <div className="layout">
        <div className="mapPane">
          <div className="mapHeader">
            <h2>CSU & Colorado Venture Map</h2>
            <p>Live Google Map with startup markers</p>
          </div>
          {useFallbackMap ? (
            <>
              <iframe
                className="map"
                src="https://www.google.com/maps?q=Fort+Collins,+Colorado&z=7&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Colorado Fallback Map"
              />
              {mapError ? <div className="fallbackError">{mapError}</div> : null}
            </>
          ) : (
            <div ref={mapNodeRef} className="map" />
          )}
        </div>

        <div className="listPane">
          <h2>Colorado Startup Directory</h2>
          <div className="stats">
            <span>{fortCollinsCount} Fort Collins</span>
            <span>{denverCount} Denver</span>
            <span>{boulderCount} Boulder</span>
          </div>

          <input
            className="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search startups, city, or focus…"
          />

          <div className="filters">
            {[
              { label: 'NoCo startups', value: 'All' },
              { label: 'Fort Collins', value: 'Fort Collins' },
              { label: 'Denver', value: 'Denver' },
              { label: 'Boulder', value: 'Boulder' },
            ].map((city) => (
              <button
                key={city.value}
                type="button"
                className={`chip ${cityFilter === city.value ? 'activeChip' : ''}`}
                onClick={() => setCityFilter(city.value)}
              >
                {city.label}
              </button>
            ))}
          </div>

          <div className="industryRow">
            <label htmlFor="industry-filter" className="industryLabel">Industry</label>
            <select
              id="industry-filter"
              className="industrySelect"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {sortedStartups.map((startup) => (
            <div key={startup.id} className={`card ${selectedStartup?.id === startup.id ? 'active' : ''}`} onClick={() => setSelectedStartup(startup)}>
              <div className="location">{startup.location}</div>
              <h3>{startup.name}</h3>
              <p className="badge">{startup.stage}</p>
              <p className="industryTag">{startup.industry}</p>
              <p>{startup.description}</p>
              <p className="meta"><strong>Contact:</strong> {startup.contact || startup.generalContact}</p>
              <p className="meta"><strong>General:</strong> {startup.generalContact}</p>
              {startup.linkedin && startup.linkedin !== 'Not publicly listed' ? (
                <a className="metaLink" href={startup.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              ) : (
                <p className="meta mutedMeta">LinkedIn: Not publicly listed</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .layout {
          display: grid;
          grid-template-columns: 1.25fr 0.95fr;
          height: min(78vh, 860px);
          min-height: 620px;
          background: #f7faf8;
        }
        .mapPane {
          border-right: 1px solid var(--border);
          position: relative;
          background: linear-gradient(180deg, #eff5f2 0%, #e8f1ec 100%);
        }
        .mapHeader {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          background: rgba(255,255,255,.95);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 12px;
          box-shadow: var(--shadow-sm);
        }
        .mapHeader h2 { margin: 0; font-size: 16px; font-family: 'Playfair Display', serif; color: var(--text-color); }
        .mapHeader p { margin: 2px 0 0; font-size: 12px; color: var(--text-secondary); }
        .map { width: 100%; height: 100%; }
        .error { height: 100%; display: flex; align-items: center; justify-content: center; padding: 24px; text-align: center; color: #8a1f1f; background: #fff5f5; }
        .fallbackError {
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 2;
          border: 1px solid #f2c9b6;
          background: rgba(255, 248, 244, 0.96);
          color: #8a3b1f;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 12px;
          line-height: 1.4;
        }
        .listPane { overflow-y: auto; padding: 18px; background: #fff; }
        .listPane h2 { margin: 2px 0 10px; font-family: 'Playfair Display', serif; }
        .stats { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; color: #355a4d; font-size: 12px; }
        .stats span { background: #edf6f1; border: 1px solid #d3e6dc; border-radius: 999px; padding: 4px 10px; }
        .search { width: 100%; border: 1px solid #d4e3dc; border-radius: 10px; padding: 10px 12px; margin-bottom: 10px; font-size: 14px; }
        .search:focus { outline: none; border-color: var(--brand-accent); box-shadow: 0 0 0 3px rgba(15,91,63,0.1); }
        .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .industryRow { margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
        .industryLabel { font-size: 13px; font-weight: 600; color: #355a4d; }
        .industrySelect {
          flex: 1;
          border: 1px solid #d4e3dc;
          border-radius: 10px;
          padding: 9px 12px;
          font-size: 13px;
          color: #29453c;
          background: #fff;
        }
        .industrySelect:focus {
          outline: none;
          border-color: var(--brand-accent);
          box-shadow: 0 0 0 3px rgba(15,91,63,0.1);
        }
        .chip { border: 1px solid #d4e3dc; background: #fff; color: #385f53; padding: 6px 10px; border-radius: 999px; cursor: pointer; font-size: 12px; }
        .activeChip { background: linear-gradient(135deg, var(--brand-accent), var(--accent-primary)); border-color: transparent; color: #fff; }
        .card { border: 1px solid #e6e6e6; border-left: 4px solid transparent; border-radius: 10px; padding: 12px; margin-bottom: 10px; cursor: pointer; box-shadow: var(--shadow-sm); }
        .card.active, .card:hover { border-left-color: var(--brand-accent); background: #f7fbf9; }
        .location { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: .06em; }
        .badge { display: inline-block; background: linear-gradient(135deg, var(--brand-accent), var(--accent-primary)); color: #fff; border-radius: 999px; padding: 2px 8px; font-size: 12px; }
        .industryTag { display: inline-block; margin-left: 8px; font-size: 12px; color: #355a4d; background: #edf6f1; border: 1px solid #d3e6dc; border-radius: 999px; padding: 2px 8px; }
        .meta { margin: 6px 0; font-size: 13px; color: #4f5b56; }
        .metaLink { display: inline-block; margin-top: 4px; font-size: 13px; font-weight: 600; }
        .mutedMeta { color: #8a9590; }
        @media (max-width: 1024px) {
          .layout { grid-template-columns: 1fr; height: auto; }
          .mapPane { height: 360px; }
        }
      `}</style>
    </>
  );
}
