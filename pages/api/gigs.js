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

    console.log('Searching for concert data in table format...');

    // First, try the most direct approach - look for any table with concert data
    const allTables = $('table');
    console.log('Found', allTables.length, 'tables on the page');

    allTables.each((tableIndex, table) => {
      const rows = $(table).find('tr');
      console.log(`Table ${tableIndex} has ${rows.length} rows`);

      // Process all rows (no header to skip based on HTML structure)
      rows.each((rowIndex, row) => {
        const tds = $(row).find('td');
        console.log(`Table ${tableIndex}, Row ${rowIndex} has ${tds.length} columns`);

        if (tds.length >= 3) {
          // Extract data from each column
          const dateText = $(tds[0]).text().trim();
          const cityText = $(tds[1]).text().trim();
          const venueText = $(tds[2]).text().trim();

          // Get link from any of the anchor tags in this row
          const rowLinks = $(row).find('a[href]');
          let link = '';
          if (rowLinks.length > 0) {
            link = $(rowLinks[0]).attr('href') || '';
          }

          console.log(`Extracted data:`, { dateText, cityText, venueText, link });

          // Only add if we have meaningful data and it looks like a date
          if (dateText && (venueText || cityText) && /\d{1,2}\.\d{1,2}\.\d{4}/.test(dateText)) {
            gigs.push({
              date: dateText,
              venue: venueText || 'Venue TBA',
              city: cityText || '',
              link: link.startsWith('http') ? link : `https://kuhnfumusic.com${link}`,
              source: 'scraped'
            });
            console.log('Added concert from table parsing:', { date: dateText, venue: venueText, city: cityText, link });
          } else {
            console.log('Skipped - invalid data or not a concert row');
          }
        }
      });
    });

    // If no gigs found, try a different approach - look for structured data
    if (gigs.length === 0) {
      console.log('No concerts found in tables, trying alternative parsing...');

      // Look for any elements that might contain concert info
      $('tr').each((i, row) => {
        const cells = $(row).find('td');
        if (cells.length >= 3) {
          const date = $(cells[0]).text().trim();
          const city = $(cells[1]).text().trim();
          const venue = $(cells[2]).text().trim();
          const link = $(row).find('a').attr('href') || '';

          // Check if this looks like concert data
          if (date && venue && /\d{2}\.\d{2}\.\d{4}/.test(date)) {
            gigs.push({
              date: date,
              venue: venue,
              city: city,
              link: link.startsWith('http') ? link : `https://kuhnfumusic.com${link}`,
              source: 'scraped'
            });
            console.log('Added concert from alternative parsing:', { date, venue, city, link });
          }
        }
      });
    }

    console.log(`Total concerts found: ${gigs.length}`);

    // If scraping worked, return the data
    if (gigs.length > 0) {
      return res.status(200).json(gigs);
    }

    // Fallback: Try to load from a manually maintained JSON file
    console.log('No concerts found from scraping, trying manual JSON fallback...');
    try {
      const manualResponse = await axios.get('https://raw.githubusercontent.com/washwalk/glhwebsite/main/public/concerts-manual.json', {
        timeout: 5000
      });

      if (manualResponse.data && Array.isArray(manualResponse.data)) {
        console.log('Loaded manual concert data:', manualResponse.data.length, 'concerts');
        return res.status(200).json(manualResponse.data.map(concert => ({
          ...concert,
          source: 'manual-json'
        })));
      }
    } catch (manualError) {
      console.log('Manual JSON fallback also failed:', manualError.message);
    }

    // Final fallback: Return helpful message
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

    // Try manual JSON as final attempt
    try {
      const manualResponse = await axios.get('https://raw.githubusercontent.com/washwalk/glhwebsite/main/public/concerts-manual.json', {
        timeout: 3000
      });

      if (manualResponse.data && Array.isArray(manualResponse.data)) {
        console.log('Loaded manual JSON after error:', manualResponse.data.length, 'concerts');
        return res.status(200).json(manualResponse.data.map(concert => ({
          ...concert,
          source: 'manual-json-fallback'
        })));
      }
    } catch (finalError) {
      console.log('All methods failed');
    }

    res.status(200).json([{
      date: 'Service temporarily unavailable',
      venue: 'Unable to load concert data',
      city: 'Please try again later',
      link: '',
      source: 'error'
    }]);
  }
}