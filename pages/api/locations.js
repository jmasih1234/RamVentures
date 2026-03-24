import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!GOOGLE_MAPS_API_KEY) {
    return res.status(500).json({ error: 'Google Maps API key not configured' });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: query,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const locations = response.data.results.slice(0, 5).map((result) => ({
      name: result.name,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      address: result.formatted_address,
      placeId: result.place_id,
    }));

    return res.status(200).json({ locations });
  } catch (error) {
    console.error('Google Maps API error:', error);
    return res.status(500).json({ error: 'Failed to fetch location data' });
  }
}
