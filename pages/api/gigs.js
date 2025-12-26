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
    const { data } = await axios.get('https://kuhnfumusic.com/tour-dates', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);

    const gigs = [];

    // Adjust selector based on actual HTML structure
    // Try different possible selectors for concert listings
    $('ul.tour-dates li, .tour-dates li, .concerts li, .shows li, .gigs li').each((i, el) => {
      const date = $(el).find('.date, .event-date, time').text().trim() ||
                   $(el).find('time').attr('datetime') ||
                   $(el).text().match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/)?.[0] ||
                   '';

      const venue = $(el).find('.venue, .location, .place').text().trim() ||
                    $(el).find('strong').first().text().trim() ||
                    '';

      const city = $(el).find('.city, .state').text().trim() ||
                   $(el).text().match(/\b[A-Z][a-zA-Z\s]+,\s*[A-Z]{2}\b/)?.[0] ||
                   '';

      const link = $(el).find('a').attr('href') ||
                   $(el).closest('a').attr('href') ||
                   '';

      // Only add if we have at least a date and venue
      if ((date || venue) && (venue || city)) {
        gigs.push({
          date: date || 'Date TBA',
          venue: venue || 'Venue TBA',
          city: city || '',
          link: link ? (link.startsWith('http') ? link : `https://kuhnfumusic.com/tour-dates${link}`) : ''
        });
      }
    });

    // If no gigs found with specific selectors, try a broader approach
    if (gigs.length === 0) {
      $('li, .event, .show').each((i, el) => {
        const text = $(el).text().trim();
        // Look for patterns that might indicate concert info
        if (text.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i) ||
            text.toLowerCase().includes('show') ||
            text.toLowerCase().includes('concert')) {

          gigs.push({
            date: text.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/)?.[0] || 'Date TBA',
            venue: text.split(',')[0]?.trim() || text,
            city: text.split(',')[1]?.trim() || '',
            link: $(el).find('a').attr('href') || ''
          });
        }
      });
    }

    res.status(200).json(gigs);
  } catch (error) {
    console.error('Failed to fetch concerts:', error);
    res.status(500).json({
      error: 'Failed to fetch concert data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}