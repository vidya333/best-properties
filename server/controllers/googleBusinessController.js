const axios = require('axios');

const getGoogleBusinessData = async (req, res) => {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!placeId || !apiKey) {
      return res.status(500).json({ error: 'Google Place ID or API Key not configured on server.' });
    }

    // Fetching place details including reviews, rating, hours, photos, user ratings total
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,opening_hours,photos,formatted_address,formatted_phone_number,website&key=${apiKey}`;

    const response = await axios.get(url);
    const placeData = response.data.result;

    if (!placeData) {
      return res.status(404).json({ error: 'Business place data not found.' });
    }

    // Format photo references into actual image URLs if needed
    const photos = placeData.photos ? placeData.photos.slice(0, 5).map(photo => {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${apiKey}`;
    }) : [];

    const payload = {
      name: placeData.name,
      address: placeData.formatted_address,
      phone: placeData.formatted_phone_number,
      website: placeData.website,
      rating: placeData.rating || 0,
      totalReviews: placeData.user_ratings_total || 0,
      openingHours: placeData.opening_hours ? placeData.opening_hours.weekday_text : [],
      isOpenNow: placeData.opening_hours ? placeData.opening_hours.open_now : null,
      reviews: placeData.reviews || [],
      photos: photos,
    };

    res.status(200).json({ success: true, data: payload });
  } catch (error) {
    console.error('Error fetching Google Business data:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch business data' });
  }
};

module.exports = { getGoogleBusinessData };