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

  // Debug endpoint - return raw HTML if requested
  if (req.query.debug === 'html') {
    try {
      const { data } = await axios.get('https://kuhnfumusic.com/tour-dates', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 15000
      });
      return res.status(200).json({ html: data.substring(0, 2000) }); // First 2000 chars
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    console.log('Attempting to fetch concert data with enhanced headers...');

    const { data } = await axios.get('https://kuhnfumusic.com/tour-dates', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
      },
      timeout: 20000, // 20 second timeout
      maxRedirects: 5
    });

    console.log('Successfully fetched HTML, length:', data.length);

    // Check if we got a valid HTML response
    if (!data || data.length < 1000) {
      console.log('Response too small, likely blocked or error page');
      return res.status(200).json([{
        date: 'Service temporarily unavailable',
        venue: 'Please try again later',
        city: '',
        link: '',
        source: 'error'
      }]);
    }

    const $ = cheerio.load(data);

    // Debug: Check if the page loaded correctly
    const pageTitle = $('title').text();
    console.log('Page title:', pageTitle);

    if (!pageTitle.includes('Tour Dates')) {
      console.log('Page did not load correctly, got title:', pageTitle);
      return res.status(200).json([{
        date: 'Service temporarily unavailable',
        venue: 'Website may be blocking requests',
        city: '',
        link: '',
        source: 'error'
      }]);
    }

    const gigs = [];

    console.log('Searching for concert data...');

    // Direct approach: find all table rows with concert data
    // Based on the HTML structure provided, each concert is in a <tr> with 3 <td> elements
    $('tr').each((i, row) => {
      const cells = $(row).find('td');

      // Each concert row has exactly 3 cells: date, city, venue
      if (cells.length === 3) {
        const dateText = $(cells[0]).text().trim();
        const cityText = $(cells[1]).text().trim();
        const venueText = $(cells[2]).text().trim();

        // Find any link in this row (all cells may have the same link)
        const link = $(row).find('a').first().attr('href') || '';

        console.log(`Found potential concert: "${dateText}" - "${venueText}" in "${cityText}"`);

        // Validate: date should be in DD.MM.YYYY format
        if (dateText && /^\d{2}\.\d{2}\.\d{4}$/.test(dateText) && venueText) {
          gigs.push({
            date: dateText,
            venue: venueText,
            city: cityText,
            link: link.startsWith('http') ? link : (link ? `https://kuhnfumusic.com${link}` : ''),
            source: 'scraped'
          });
          console.log('✅ Added concert:', { date: dateText, venue: venueText, city: cityText });
        }
      }
    });

    console.log(`Total concerts found: ${gigs.length}`);

    // Return the scraped data if found, otherwise show simple message
    if (gigs.length > 0) {
      console.log(`Successfully scraped ${gigs.length} concerts`);
      return res.status(200).json(gigs);
    }

    // No concerts found - return simple message
    console.log('No concerts found - website may be blocking requests');
    res.status(200).json([{
      date: 'Data temporarily unavailable',
      venue: 'Please check back later or contact for updates',
      city: 'Manual updates in progress',
      link: '',
      source: 'fallback'
    }]);
  } catch (error) {
    console.error('Failed to fetch concerts:', error.message);
    console.error('Error details:', error.response?.status, error.response?.statusText);



    res.status(200).json([{
      date: 'Service temporarily unavailable',
      venue: 'Unable to load concert data',
      city: 'Please try again later',
      link: '',
      source: 'error'
    }]);
  }
}