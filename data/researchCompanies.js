// Research portfolio companies — AtmosZero is real, others are CSU-themed placeholders
export const COMPANIES = [
  {
    slug: 'atmoszero',
    name: 'AtmosZero',
    tagline: 'Decarbonizing Industrial Heat',
    category: 'Clean Energy',
    hero: '/images/research/atmoszero-hero.jpg',
    description:
      'Industrial heat pump boiler technology that converts ambient heat into decarbonized steam — a drop-in electrified replacement for century-old fossil-fuel boilers.',
    stats: [
      { value: '50%', label: 'of industrial process heat' },
      { value: '2.25 GT', label: 'GHG emissions per year' },
      { value: '8%', label: 'of global primary energy' },
    ],
    features: [
      { title: 'Electrified Heat Pump', desc: 'Converts ambient heat into high-temperature steam using electricity instead of fossil fuels.' },
      { title: 'Drop-In Replacement', desc: 'Designed to integrate with existing industrial infrastructure without costly retrofits.' },
      { title: 'On-Demand Steam', desc: 'Delivers precise temperature and pressure control for industrial processes.' },
      { title: 'Zero Emissions', desc: 'Eliminates on-site combustion, removing direct CO2 and NOx emissions entirely.' },
    ],
    industries: ['Brewing', 'Food Processing', 'Pharmaceuticals', 'Pulp & Paper', 'Specialty Chemicals'],
    website: 'https://atmoszero.energy',
  },
  {
    slug: 'agrisense',
    name: 'AgriSense',
    tagline: 'Precision Agriculture AI',
    category: 'AgTech',
    hero: '/images/research/agrisense-hero.jpg',
    description:
      'Computer vision and soil sensor network that gives small-to-mid-size farms satellite-grade field intelligence at a fraction of the cost.',
    stats: [
      { value: '30%', label: 'water savings per acre' },
      { value: '12K', label: 'acres monitored' },
      { value: '22%', label: 'yield improvement' },
    ],
    features: [
      { title: 'Drone Imaging', desc: 'Weekly aerial scans with multispectral cameras detect stress before visible symptoms appear.' },
      { title: 'Soil Sensor Mesh', desc: 'Low-power wireless sensors measure moisture, pH, and nutrients at 10-meter resolution.' },
      { title: 'Predictive Models', desc: 'ML models trained on Colorado microclimates forecast irrigation and fertilizer needs.' },
      { title: 'Mobile Dashboard', desc: 'Real-time field maps and alerts delivered straight to a farmer\'s phone.' },
    ],
    industries: ['Row Crops', 'Vineyards', 'Orchards', 'Greenhouses', 'Ranching'],
  },
  {
    slug: 'ramcharge',
    name: 'RamCharge',
    tagline: 'Campus-Scale EV Infrastructure',
    category: 'Energy',
    hero: '/images/research/ramcharge-hero.jpg',
    description:
      'Smart charging network and vehicle-to-grid platform designed for university campuses, turning parked EVs into distributed energy storage.',
    stats: [
      { value: '48', label: 'charging stations deployed' },
      { value: '1.2 MW', label: 'peak grid capacity' },
      { value: '340 MWh', label: 'energy managed annually' },
    ],
    features: [
      { title: 'Smart Load Balancing', desc: 'Dynamically allocates power across chargers based on grid demand and user schedules.' },
      { title: 'V2G Integration', desc: 'Bidirectional chargers let parked EVs feed energy back during peak campus demand.' },
      { title: 'Solar Canopies', desc: 'Parking structures with integrated solar panels offset up to 60% of charging energy.' },
      { title: 'Campus App', desc: 'Students reserve chargers, track costs, and earn credits for off-peak charging.' },
    ],
    industries: ['Universities', 'Corporate Campuses', 'Municipalities', 'Fleet Operators'],
  },
  {
    slug: 'peakbio',
    name: 'PeakBio',
    tagline: 'Rapid Pathogen Diagnostics',
    category: 'Biotech',
    hero: '/images/research/peakbio-hero.jpg',
    description:
      'Portable CRISPR-based diagnostic platform that identifies agricultural and veterinary pathogens in under 30 minutes, directly in the field.',
    stats: [
      { value: '<30 min', label: 'time to result' },
      { value: '98.5%', label: 'detection accuracy' },
      { value: '15', label: 'pathogens in panel' },
    ],
    features: [
      { title: 'CRISPR Detection', desc: 'Cas13-based lateral flow assay provides molecular-level specificity without a lab.' },
      { title: 'Field Portable', desc: 'Battery-powered reader weighs under 2 lbs with no cold chain requirements.' },
      { title: 'Multiplexed Panel', desc: 'Single test strip screens for 15 common livestock and crop pathogens simultaneously.' },
      { title: 'Cloud Reporting', desc: 'Results sync to a regional dashboard for epidemiological tracking.' },
    ],
    industries: ['Cattle Ranching', 'Poultry', 'Crop Science', 'Veterinary Clinics', 'Public Health'],
  },
  {
    slug: 'frontrange-ai',
    name: 'FrontRange AI',
    tagline: 'Wildfire Risk Intelligence',
    category: 'AI / ML',
    hero: '/images/research/frontrange-hero.jpg',
    description:
      'Machine learning platform that fuses satellite imagery, weather data, and fuel moisture sensors to predict wildfire ignition risk at the parcel level.',
    stats: [
      { value: '72 hr', label: 'forecast horizon' },
      { value: '89%', label: 'ignition prediction accuracy' },
      { value: '14 counties', label: 'in active deployment' },
    ],
    features: [
      { title: 'Satellite Fusion', desc: 'Combines GOES-16, Sentinel-2, and MODIS data streams updated every 15 minutes.' },
      { title: 'Fuel Moisture Index', desc: 'Proprietary sensor network measures live fuel moisture across the Front Range.' },
      { title: 'Parcel-Level Scoring', desc: 'Every property gets a dynamic risk score that insurers and planners can action on.' },
      { title: 'Evacuation Modeling', desc: 'Agent-based simulations predict traffic bottlenecks during evacuation scenarios.' },
    ],
    industries: ['Insurance', 'Municipal Planning', 'Forestry', 'Emergency Services', 'Real Estate'],
  },
  {
    slug: 'trailhead',
    name: 'TrailHead',
    tagline: 'Experiential Learning Platform',
    category: 'EdTech',
    hero: '/images/research/trailhead-hero.jpg',
    description:
      'Immersive simulation platform that lets engineering students practice real-world problem solving in virtual field environments before ever leaving campus.',
    stats: [
      { value: '2,400+', label: 'students enrolled' },
      { value: '38', label: 'simulation scenarios' },
      { value: '4.8/5', label: 'instructor rating' },
    ],
    features: [
      { title: 'Virtual Field Sites', desc: 'Photogrammetry-scanned Colorado terrain with embedded sensor data for realistic labs.' },
      { title: 'Collaborative Mode', desc: 'Teams of 4 work together in shared virtual environments with role assignments.' },
      { title: 'Assessment Engine', desc: 'AI evaluates decision-making process, not just final answers, for deeper learning.' },
      { title: 'LMS Integration', desc: 'Plugs into Canvas and Blackboard for seamless grade passback.' },
    ],
    industries: ['Universities', 'K-12 STEM', 'Corporate Training', 'Government'],
  },
  {
    slug: 'snowmelt',
    name: 'Snowmelt Labs',
    tagline: 'Smart Water Infrastructure',
    category: 'Water Tech',
    hero: '/images/research/snowmelt-hero.jpg',
    description:
      'IoT sensor network and digital twin platform that helps Colorado municipalities manage stormwater, snowmelt, and aging pipe infrastructure.',
    stats: [
      { value: '340 mi', label: 'of pipe monitored' },
      { value: '23%', label: 'leak reduction' },
      { value: '$4.2M', label: 'infrastructure savings' },
    ],
    features: [
      { title: 'Acoustic Sensors', desc: 'Detects pipe leaks and structural degradation through sound wave analysis.' },
      { title: 'Digital Twin', desc: 'Real-time hydraulic model of the entire municipal water network.' },
      { title: 'Flood Forecasting', desc: 'Snowmelt runoff predictions with 48-hour lead time for infrastructure managers.' },
      { title: 'Capital Planning', desc: 'Data-driven replacement schedules that prioritize the highest-risk pipe segments.' },
    ],
    industries: ['Municipalities', 'Water Utilities', 'Civil Engineering', 'Environmental Agencies'],
  },
  {
    slug: 'alpine-robotics',
    name: 'Alpine Robotics',
    tagline: 'Autonomous Trail Maintenance',
    category: 'Robotics',
    hero: '/images/research/alpine-hero.jpg',
    description:
      'Rugged autonomous robots that survey, maintain, and restore hiking trails in Colorado\'s national forests, reducing manual labor costs by 60%.',
    stats: [
      { value: '120 mi', label: 'of trail maintained' },
      { value: '60%', label: 'labor cost reduction' },
      { value: '3', label: 'national forests deployed' },
    ],
    features: [
      { title: 'Terrain Navigation', desc: 'LiDAR + stereo vision lets robots traverse uneven, rocky terrain at up to 3 mph.' },
      { title: 'Erosion Detection', desc: 'Identifies washouts, root exposure, and drainage issues before they become hazards.' },
      { title: 'Brush Clearing', desc: 'Robotic arm with cutting head clears overgrown vegetation from trail corridors.' },
      { title: 'Solar Powered', desc: 'Operates for 8+ hours on integrated solar panels with battery backup.' },
    ],
    industries: ['National Parks', 'Forest Service', 'Trail Associations', 'Ski Resorts', 'Conservation'],
  },
]
