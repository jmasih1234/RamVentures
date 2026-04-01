import { useEffect, useMemo, useRef, useState } from 'react';

const coloradoStartups = [
  { id: 1, name: 'AEMS Corp', location: 'Fort Collins, CO', lat: 40.5519, lng: -105.0789, description: 'CSU-linked ag-tech innovation company focused on engineering solutions.', stage: 'Growth', contact: 'Dr. W. Scott Compel', generalContact: 'Contact via aemscorp.com', linkedin: 'https://linkedin.com/in/scott-compel', website: 'aemscorp.com' },
  { id: 2, name: 'AtmosZero', location: 'Fort Collins, CO', lat: 40.5538, lng: -105.0825, description: 'Electrified boiler technology producing decarbonized steam.', stage: 'Seed', contact: 'General Contact', generalContact: 'Contact via atmoszero.energy', linkedin: 'Not publicly listed', website: 'atmoszero.energy' },
  { id: 3, name: 'Axiota Animal Health', location: 'Fort Collins, CO', lat: 40.5478, lng: -105.0749, description: 'Animal health products for beef and dairy producers.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via axiota.com', linkedin: 'Not publicly listed', website: 'axiota.com' },
  { id: 4, name: 'BillGO', location: 'Fort Collins, CO', lat: 40.5592, lng: -105.0482, description: 'Modern bill management and payments platform for banks, fintechs, and billers.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via billgo.com', linkedin: 'Not publicly listed', website: 'billgo.com' },
  { id: 5, name: 'Compost Queen', location: 'Fort Collins, CO', lat: 40.5738, lng: -105.0641, description: 'Local Fort Collins composting with circular economy focus.', stage: 'Growth', contact: 'Jamie Blanchard-Poling', generalContact: 'Contact via compostqueenfc.com', linkedin: 'https://linkedin.com/in/jamie-blanchard-poling', website: 'compostqueenfc.com' },
  { id: 6, name: 'Farmbrite', location: 'Longmont, CO', lat: 40.1804, lng: -105.1019, description: 'Farm management SaaS used by diversified producers globally.', stage: 'Growth', contact: 'Ian & Janine Russell', generalContact: 'hello@farmbrite.com', linkedin: 'https://linkedin.com/in/ian-russell-farmbrite', website: 'farmbrite.com' },
  { id: 7, name: 'Growcentia', location: 'Loveland, CO', lat: 40.4236, lng: -105.0748, description: 'CSU-licensed soil science technology for sustainable agriculture.', stage: 'Growth', contact: 'Scott Wiley', generalContact: 'scott@growcentia.com', linkedin: 'https://linkedin.com/in/scott-wiley-growcentia', website: 'growcentia.com' },
  { id: 8, name: 'Innosphere Ventures', location: 'Fort Collins, CO', lat: 40.5239, lng: -105.0672, description: 'Northern Colorado venture platform supporting startup acceleration.', stage: 'Active', contact: 'Mike Freeman', generalContact: 'mfreeman@innosphereventures.org', linkedin: 'https://www.linkedin.com/in/mikeafreeman/', website: 'innosphereventures.org' },
  { id: 9, name: 'KLOwen Braces', location: 'Fort Collins, CO', lat: 40.5298, lng: -105.0576, description: 'Orthodontic technology with prefabricated modular brace systems.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via klowenbraces.com', linkedin: 'Not publicly listed', website: 'klowenbraces.com' },
  { id: 10, name: 'Madwire', location: 'Fort Collins, CO', lat: 40.5679, lng: -105.0336, description: 'Marketing and CRM platform helping small businesses grow online.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via madwire.com', linkedin: 'Not publicly listed', website: 'madwire.com' },
  { id: 11, name: 'New West Genetics', location: 'Fort Collins, CO', lat: 40.5751, lng: -105.0763, description: 'Hemp genetics and crop innovation company with CSU roots.', stage: 'Growth', contact: 'Wendy Mosher', generalContact: 'wmosher@newwestgenetics.com', linkedin: 'https://www.linkedin.com/in/wmosher/', website: 'newwestgenetics.com' },
  { id: 12, name: 'Prieto Battery', location: 'Fort Collins, CO', lat: 40.5454, lng: -105.1028, description: 'Advanced battery company from CSU\'s energy innovation ecosystem.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via prietobattery.com', linkedin: 'Not publicly listed', website: 'prietobattery.com' },
  { id: 13, name: 'Secure64', location: 'Fort Collins, CO', lat: 40.5368, lng: -105.0766, description: 'Carrier-grade DNS and network security software for critical infrastructure.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via secure64.com', linkedin: 'Not publicly listed', website: 'secure64.com' },
  { id: 14, name: 'The Food Corridor', location: 'Fort Collins, CO', lat: 40.5647, lng: -105.0468, description: 'Platform for finding, booking, and paying for commercial kitchen space.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via thefoodcorridor.com', linkedin: 'Not publicly listed', website: 'thefoodcorridor.com' },
  { id: 15, name: 'TurboTenant', location: 'Fort Collins, CO', lat: 40.5486, lng: -105.0548, description: 'Rental management software for tenant screening, payments, and listings.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via turbotenant.com', linkedin: 'Not publicly listed', website: 'turbotenant.com' },
  { id: 16, name: 'Engine', location: 'Denver, CO', lat: 39.7488, lng: -104.9957, description: 'Denver startup ecosystem platform focused on founder support and growth infrastructure.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via engine.xyz', linkedin: 'https://www.linkedin.com/company/engine/', website: 'engine.xyz' },
  { id: 17, name: 'Legora', location: 'Denver, CO', lat: 39.7339, lng: -104.9872, description: 'Legal technology startup building modern tools for legal and compliance workflows.', stage: 'Seed', contact: 'General Contact', generalContact: 'Contact via legora.com', linkedin: 'https://www.linkedin.com/company/legora/', website: 'legora.com' },
  { id: 18, name: 'Rooted Robotics', location: 'Boulder, CO', lat: 40.015, lng: -105.2705, description: 'Indoor farming automation company building robotics for controlled environment agriculture.', stage: 'Seed', contact: 'Max Knight', generalContact: 'Contact via rootedrobotics.com', linkedin: 'https://linkedin.com/in/max-knight', website: 'rootedrobotics.com' },
  { id: 19, name: 'Lightning eMotors', location: 'Loveland, CO', lat: 40.4189, lng: -105.0325, description: 'Electric fleet vehicle technology and commercial EV powertrain solutions.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via lightningemotors.com', linkedin: 'https://www.linkedin.com/company/lightning-emotors/', website: 'lightningemotors.com' },
  { id: 20, name: 'Ursa Major', location: 'Berthoud, CO', lat: 40.3096, lng: -105.0811, description: 'Aerospace propulsion company building rocket engines for defense and space applications.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via ursamajor.com', linkedin: 'https://www.linkedin.com/company/ursa-major-technologies/', website: 'ursamajor.com' },
  { id: 21, name: 'Solid Power', location: 'Louisville, CO', lat: 39.9778, lng: -105.1319, description: 'Next-generation solid-state battery company for electric mobility.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via solidpowerbattery.com', linkedin: 'https://www.linkedin.com/company/solid-power-inc-/', website: 'solidpowerbattery.com' },
  { id: 22, name: 'Sphero', location: 'Boulder, CO', lat: 40.0237, lng: -105.2556, description: 'EdTech and robotics company known for programmable robots used in STEM education.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via sphero.com', linkedin: 'https://www.linkedin.com/company/sphero/', website: 'sphero.com' },
  { id: 23, name: 'Meati', location: 'Boulder, CO', lat: 40.0164, lng: -105.2775, description: 'Alternative protein startup producing mycelium-based food products.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via meati.com', linkedin: 'https://www.linkedin.com/company/meati-foods/', website: 'meati.com' },
  { id: 24, name: 'Gloo', location: 'Boulder, CO', lat: 40.0178, lng: -105.2827, description: 'Technology platform supporting mission-driven communities with data and engagement tools.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via gloo.us', linkedin: 'https://www.linkedin.com/company/gloo/', website: 'gloo.us' },
  { id: 25, name: 'Techstars Boulder', location: 'Boulder, CO', lat: 40.0171, lng: -105.2812, description: 'Startup accelerator supporting early-stage founders across sectors.', stage: 'Active', contact: 'General Contact', generalContact: 'Contact via techstars.com', linkedin: 'https://www.linkedin.com/company/techstars/', website: 'techstars.com' },
  { id: 26, name: 'Homebot', location: 'Denver, CO', lat: 39.7503, lng: -104.999, description: 'Homeownership engagement platform for lenders, agents, and homeowners.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via homebot.ai', linkedin: 'https://www.linkedin.com/company/homebot/', website: 'homebot.ai' },
  { id: 27, name: 'Guild', location: 'Denver, CO', lat: 39.7374, lng: -104.9865, description: 'Career mobility and workforce education platform for employers and employees.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via guild.com', linkedin: 'https://www.linkedin.com/company/guildeducation/', website: 'guild.com' },
  { id: 28, name: 'Ibotta', location: 'Denver, CO', lat: 39.7412, lng: -104.9897, description: 'Performance marketing and retail media technology platform.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via ibotta.com', linkedin: 'https://www.linkedin.com/company/ibotta-inc-/', website: 'ibotta.com' },
  { id: 29, name: 'Boom Supersonic', location: 'Broomfield, CO', lat: 39.9272, lng: -105.0867, description: 'Aerospace startup developing sustainable supersonic passenger aircraft.', stage: 'Growth', contact: 'General Contact', generalContact: 'Contact via boomsupersonic.com', linkedin: 'https://www.linkedin.com/company/boom-technology-inc/', website: 'boomsupersonic.com' }
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
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [cityFilter, setCityFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All industries');
  const [searchTerm, setSearchTerm] = useState('');
  const [mapError, setMapError] = useState('');
  const [useFallbackMap, setUseFallbackMap] = useState(false);
  const mapNodeRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const cityOptions = useMemo(() => {
    const cities = [...new Set(coloradoStartups.map((s) => s.location.split(',')[0].trim()))].sort((a, b) => a.localeCompare(b));
    return ['All', ...cities];
  }, []);

  const cityStats = useMemo(() => {
    return cityOptions
      .filter((city) => city !== 'All')
      .map((city) => ({
        city,
        count: coloradoStartups.filter((s) => s.location.includes(city)).length,
      }))
      .sort((a, b) => b.count - a.count || a.city.localeCompare(b.city));
  }, [cityOptions]);

  const startupsWithIndustry = useMemo(() => {
    const industryByName = {
      'AEMS Corp': 'AgTech',
      AtmosZero: 'Climate Tech',
      'Axiota Animal Health': 'Animal Health',
      BillGO: 'Fintech',
      'Compost Queen': 'Circular Economy',
      Farmbrite: 'AgTech SaaS',
      Growcentia: 'AgTech',
      'Innosphere Ventures': 'Venture Platform',
      'KLOwen Braces': 'HealthTech',
      Madwire: 'Marketing Tech',
      'New West Genetics': 'Ag-Biotech',
      'Prieto Battery': 'Energy',
      Secure64: 'Cybersecurity',
      'The Food Corridor': 'FoodTech',
      TurboTenant: 'PropTech',
      Engine: 'Startup Platform',
      Legora: 'Legal Tech',
      'Rooted Robotics': 'Ag Robotics',
      'Lightning eMotors': 'Mobility Tech',
      'Ursa Major': 'Aerospace',
      'Solid Power': 'Energy Storage',
      Sphero: 'EdTech Robotics',
      Meati: 'FoodTech',
      Gloo: 'Community Tech',
      'Techstars Boulder': 'Accelerator',
      Homebot: 'PropTech',
      Guild: 'Workforce Tech',
      Ibotta: 'Retail Tech',
      'Boom Supersonic': 'Aerospace',
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
    'Fort Collins': 0,
    Loveland: 1,
    Longmont: 2,
    Boulder: 3,
    Denver: 4,
    Broomfield: 5,
    Louisville: 6,
    Berthoud: 7,
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

  const fortCollinsPlaceholderMap =
    'https://www.openstreetmap.org/export/embed.html?bbox=-105.2600%2C40.4700%2C-104.9400%2C40.7000&layer=mapnik&marker=40.5853%2C-105.0844';

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
          ...(mapId ? { mapId } : {}),
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
  }, [apiKey, mapId, sortedStartups]);

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
            <h3>{useFallbackMap ? 'Fort Collins Startup Map' : 'Northern Colorado Startup Map'}</h3>
            <p>
              {useFallbackMap
                ? 'Placeholder view centered on Fort Collins while live pins load.'
                : 'Live map pinned across NoCo, Boulder, and Denver startup locations'}
            </p>
          </div>
          {useFallbackMap ? (
            <>
              <iframe
                className="map"
                src={fortCollinsPlaceholderMap}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fort Collins Placeholder Map"
              />
              <div className="fallbackBadge">Placeholder map active</div>
            </>
          ) : (
            <div ref={mapNodeRef} className="map" />
          )}
        </div>

        <div className="listPane">
          <h3 className="listTitle">Colorado Startup Directory</h3>
          <div className="stats">
            {cityStats.map((entry) => (
              <span key={entry.city}>{entry.count} {entry.city}</span>
            ))}
          </div>

          <input
            className="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search startups, city, or focus…"
          />

          <div className="filters">
            {cityOptions.map((city) => (
              <button
                key={city}
                type="button"
                className={`chip ${cityFilter === city ? 'activeChip' : ''}`}
                onClick={() => setCityFilter(city)}
              >
                {city === 'All' ? 'All Startups' : city}
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
        .mapHeader h3 { margin: 0; font-size: 16px; font-family: 'Playfair Display', serif; color: var(--text-color); }
        .mapHeader p { margin: 2px 0 0; font-size: 12px; color: var(--text-secondary); }
        .map { width: 100%; height: 100%; }
        .error { height: 100%; display: flex; align-items: center; justify-content: center; padding: 24px; text-align: center; color: #8a1f1f; background: #fff5f5; }
        .fallbackBadge {
          position: absolute;
          right: 12px;
          bottom: 12px;
          z-index: 2;
          border: 1px solid #d3e6dc;
          background: rgba(255, 255, 255, 0.94);
          color: #355a4d;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 12px;
          font-weight: 600;
        }
        .listPane { overflow-y: auto; padding: 18px; background: #fff; }
        .listTitle {
          margin: 2px 0 10px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1.08;
          letter-spacing: -0.02em;
        }
        .stats { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; color: #355a4d; font-size: 12px; }
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
          .listTitle { font-size: clamp(26px, 8vw, 40px); }
        }
      `}</style>
    </>
  );
}
