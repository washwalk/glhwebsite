import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('Fetching concert data from kuhnfumusic.com/tour-dates');

    const { data } = await axios.get('https://kuhnfumusic.com/tour-dates', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 10000 // 10 second timeout
    });

    console.log('Successfully fetched HTML, length:', data.length);
    const $ = cheerio.load(data);

    const gigs = [];

    console.log('Searching for concert data in table format...');

    // Target the table structure on kuhnfumusic.com/tour-dates
    $('table tbody tr').each((i, row) => {
      const tds = $(row).find('td');

      if (tds.length >= 3) {
        // Extract date from first td
        const dateLink = $(tds[0]).find('a');
        const date = dateLink.length > 0 ? dateLink.text().trim() : $(tds[0]).text().trim();

        // Extract city from second td
        const cityLink = $(tds[1]).find('a');
        const cityText = cityLink.length > 0 ? cityLink.text().trim() : $(tds[1]).text().trim();

        // Extract venue from third td
        const venueLink = $(tds[2]).find('a');
        const venue = venueLink.length > 0 ? venueLink.text().trim() : $(tds[2]).text().trim();

        // Get link from any of the anchor tags
        let link = '';
        $(tds).find('a').each((j, anchor) => {
          const href = $(anchor).attr('href');
          if (href && href.includes('http') && !link) {
            link = href;
          }
        });

        // Clean up the data
        const cleanDate = date.replace(/\s+/g, ' ').trim();
        const cleanVenue = venue.replace(/\s+/g, ' ').trim();
        const cleanCity = cityText.replace(/\s+/g, ' ').trim();

        // Only add if we have meaningful data
        if (cleanDate && (cleanVenue || cleanCity)) {
          gigs.push({
            date: cleanDate,
            venue: cleanVenue || 'Venue TBA',
            city: cleanCity || '',
            link: link || '',
            source: 'scraped'
          });
          console.log('Found concert:', { date: cleanDate, venue: cleanVenue, city: cleanCity, link });
        }
      }
    });

    console.log(`Found ${gigs.length} concerts total`);

    // If we still have no gigs, return a fallback message
    if (gigs.length === 0) {
      console.log('No concerts found, returning fallback data');
      return res.status(200).json([{
        date: 'Check back soon',
        venue: 'Tour dates coming soon',
        city: 'Stay tuned',
        link: '',
        source: 'fallback'
      }]);
    }

    res.status(200).json(gigs);
  } catch (error) {
    console.error('Failed to fetch concerts:', error.message);
    console.error('Error details:', error.response?.status, error.response?.statusText);

    // Return fallback data instead of error
    res.status(200).json([{
      date: 'Unable to load concerts',
      venue: 'Please check back later',
      city: 'Service temporarily unavailable',
      link: '',
      source: 'error'
    }]);
  }
}