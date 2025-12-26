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

    // Try multiple selectors to find concert data
    console.log('Searching for concert data...');

    // First, try the most specific selectors
    $('ul.tour-dates li, .tour-dates li, .concerts li, .shows li, .gigs li, .event, .show').each((i, el) => {
      const element = $(el);
      const text = element.text().trim();

      // Extract date - look for month names followed by numbers
      const dateMatch = text.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/i);
      const date = dateMatch ? dateMatch[0] : '';

      // Extract venue and city from text
      let venue = '';
      let city = '';

      // Try to find venue and city patterns
      const venueMatch = text.match(/at\s+([^,\n]+)/i) || text.match(/@\s*([^,\n]+)/i);
      if (venueMatch) {
        venue = venueMatch[1].trim();
      }

      const cityMatch = text.match(/,\s*([A-Z][a-zA-Z\s]+,\s*[A-Z]{2,})/) || text.match(/([A-Z][a-zA-Z\s]+,\s*[A-Z]{2,})/);
      if (cityMatch) {
        city = cityMatch[1].trim();
      }

      // If no specific venue found, try to extract from remaining text
      if (!venue && date) {
        const afterDate = text.split(date)[1] || '';
        const venueFromText = afterDate.split(',')[0]?.trim();
        if (venueFromText) {
          venue = venueFromText;
        }
      }

      const link = element.find('a').attr('href') ||
                   element.closest('a').attr('href') ||
                   element.attr('href') ||
                   '';

      // Only add if we found some useful information
      if (date || venue || city) {
        gigs.push({
          date: date || 'Date TBA',
          venue: venue || 'Venue TBA',
          city: city || '',
          link: link ? (link.startsWith('http') ? link : `https://kuhnfumusic.com${link}`) : '',
          source: 'scraped'
        });
        console.log('Found concert:', { date, venue, city, link });
      }
    });

    // If still no gigs found, try a more aggressive approach
    if (gigs.length === 0) {
      console.log('No concerts found with specific selectors, trying broader search...');

      $('*').each((i, el) => {
        const text = $(el).text().trim();
        if (text.length > 10 && text.length < 200) { // Reasonable text length
          // Look for date patterns
          const hasDate = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{1,2}/i.test(text);
          const hasConcertTerms = /\b(concert|show|tour|gig|performance|live)\b/i.test(text);

          if (hasDate || hasConcertTerms) {
            console.log('Potential concert text found:', text);
          }
        }
      });
    }

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