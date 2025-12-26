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

    // Target the specific content-table from kuhnfumusic.com
    const contentTable = $('.content-table table');
    console.log('Found content table:', contentTable.length > 0);

    if (contentTable.length > 0) {
      // Get all table rows, skipping the first one (header)
      const tableRows = contentTable.find('tr').slice(1); // Skip header row
      console.log(`Found ${tableRows.length} concert rows in content table`);

      tableRows.each((i, row) => {
        const tds = $(row).find('td');
        console.log(`Row ${i} has ${tds.length} columns`);

        if (tds.length >= 3) {
          // Extract date from first td
          const dateText = $(tds[0]).text().trim();
          const dateLink = $(tds[0]).find('a').attr('href');

          // Extract city from second td
          const cityText = $(tds[1]).text().trim();
          const cityLink = $(tds[1]).find('a').attr('href');

          // Extract venue from third td
          const venueText = $(tds[2]).text().trim();
          const venueLink = $(tds[2]).find('a').attr('href');

          // Determine the best link (prefer specific venue/city links)
          let link = '';
          if (venueLink && venueLink.includes('http')) {
            link = venueLink;
          } else if (cityLink && cityLink.includes('http')) {
            link = cityLink;
          } else if (dateLink && dateLink.includes('http')) {
            link = dateLink;
          }

          // Clean up the data
          const cleanDate = dateText.replace(/\s+/g, ' ').trim();
          const cleanVenue = venueText.replace(/\s+/g, ' ').trim();
          const cleanCity = cityText.replace(/\s+/g, ' ').trim();

          console.log(`Processing row ${i}:`, { date: cleanDate, city: cleanCity, venue: cleanVenue, link });

          // Only add if we have a date and some location info
          if (cleanDate && (cleanVenue || cleanCity)) {
            gigs.push({
              date: cleanDate,
              venue: cleanVenue || 'Venue TBA',
              city: cleanCity || '',
              link: link ? (link.startsWith('http') ? link : `https://kuhnfumusic.com${link}`) : '',
              source: 'scraped'
            });
            console.log('Added concert:', { date: cleanDate, venue: cleanVenue, city: cleanCity, link });
          } else {
            console.log('Skipped row - insufficient data');
          }
        } else {
          console.log(`Skipping row ${i} - not enough columns`);
        }
      });
    } else {
      console.log('No content table found, trying fallback approach...');

      // Fallback: try to find any table
      $('table').first().find('tr').slice(1).each((i, row) => {
        const tds = $(row).find('td');
        if (tds.length >= 3) {
          const date = $(tds[0]).text().trim();
          const city = $(tds[1]).text().trim();
          const venue = $(tds[2]).text().trim();
          const link = $(row).find('a').first().attr('href') || '';

          if (date && (venue || city)) {
            gigs.push({
              date: date,
              venue: venue || 'Venue TBA',
              city: city || '',
              link: link ? (link.startsWith('http') ? link : `https://kuhnfumusic.com${link}`) : '',
              source: 'scraped'
            });
          }
        }
      });
    }

    console.log(`Total concerts found: ${gigs.length}`);

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