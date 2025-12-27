/* eslint-disable @typescript-eslint/no-require-imports */

import axios from 'axios';
import path from 'path';

const cheerio = require('cheerio');

const fs = require('fs');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Debug endpoints
  if (req.query.debug === 'html') {
    try {
      console.log('Fetching HTML for debugging...');
      const { data } = await axios.get('https://kuhnfumusic.com/tour-dates', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        },
        timeout: 15000
      });

      const $ = cheerio.load(data);

      // Extract table information
      const tables = $('table');
      const tableData = tables.map((i, table) => {
        const rows = $(table).find('tr');
        return {
          tableIndex: i,
          rowCount: rows.length,
          rows: rows.map((j, row) => {
            const cells = $(row).find('td');
            return {
              rowIndex: j,
              cellCount: cells.length,
              cells: cells.map((k, cell) => ({
                cellIndex: k,
                text: $(cell).text().trim(),
                hasLink: $(cell).find('a').length > 0,
                link: $(cell).find('a').attr('href') || null
              })).get()
            };
          }).get()
        };
      }).get();

      return res.status(200).json({
        success: true,
        htmlLength: data.length,
        title: $('title').text().trim(),
        hasContentTable: $('.content-table').length > 0,
        tableCount: tables.length,
        tableData: tableData,
        rawTableHTML: $('.content-table table').html()?.substring(0, 2000) || 'No table HTML found'
      });
    } catch (error) {
      console.log('Debug HTML fetch failed:', error.message);
      return res.status(500).json({
        success: false,
        error: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
    }
  }

  if (req.query.debug === 'test') {
    // Simple test to check if we can reach the website at all
    try {
      const response = await axios.head('https://kuhnfumusic.com/tour-dates', { timeout: 5000 });
      return res.status(200).json({
        reachable: true,
        status: response.status,
        headers: response.headers
      });
    } catch (error) {
      return res.status(200).json({
        reachable: false,
        error: error.message,
        status: error.response?.status
      });
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

    // More detailed debugging
    console.log('Total tables found:', $('table').length);
    console.log('Total rows found:', $('tr').length);
    console.log('Rows with 3+ cells:', $('tr').filter((i, row) => $(row).find('td').length >= 3).length);

    // Try multiple table selectors to find concert data
    let concertTable = null;

    // First try the content-table class
    if ($('.content-table table').length > 0) {
      concertTable = $('.content-table table');
      console.log('Found concerts in .content-table');
    }
    // Try any table in the main content area
    else if ($('table').length > 0) {
      concertTable = $('table').first();
      console.log('Found concerts in first table');
    }

    if (concertTable) {
      console.log('Processing concert table...');
      concertTable.find('tr').each((rowIndex, row) => {
        const cells = $(row).find('td');
        console.log(`Table row ${rowIndex}: ${cells.length} cells`);

        if (cells.length >= 3) {
          const dateText = $(cells[0]).text().trim();
          const cityText = $(cells[1]).text().trim();
          const venueText = $(cells[2]).text().trim();

          // Get link from any cell that has a link
          const link = $(cells[0]).find('a').attr('href') ||
                      $(cells[1]).find('a').attr('href') ||
                      $(cells[2]).find('a').attr('href') || '';

          console.log(`Row ${rowIndex} data:`, {
            date: dateText,
            city: cityText,
            venue: venueText,
            link: link
          });

          // More flexible date validation - European format (DD.MM.YYYY)
          const dateRegex = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
          if (dateText && dateRegex.test(dateText) && venueText && cityText) {
            gigs.push({
              date: dateText,
              venue: venueText,
              city: cityText,
              link: link.startsWith('http') ? link : (link ? `https://kuhnfumusic.com${link}` : ''),
              source: 'scraped'
            });
            console.log('✅ Added concert:', { date: dateText, venue: venueText, city: cityText });
          } else {
            console.log('❌ Skipped - validation failed:', {
              hasDate: !!dateText,
              dateValid: dateRegex.test(dateText),
              hasVenue: !!venueText,
              hasCity: !!cityText
            });
          }
        }
      });
    }

    // If no concerts found yet, try all tables with more flexible parsing
    if (gigs.length === 0) {
      console.log('No concerts found, trying comprehensive table search...');
      $('table').each((tableIndex, table) => {
        console.log(`Checking table ${tableIndex}...`);
        $(table).find('tr').each((rowIndex, row) => {
          const cells = $(row).find('td');
          console.log(`Table ${tableIndex}, row ${rowIndex}: ${cells.length} cells`);

          // Look for rows with at least 3 cells
          if (cells.length >= 3) {
            const dateText = $(cells[0]).text().trim();
            const cityText = $(cells[1]).text().trim();
            const venueText = $(cells[2]).text().trim();

            // Get link from any cell
            const link = $(row).find('a').attr('href') || '';

            const dateRegex = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
            if (dateText && dateRegex.test(dateText) && venueText && cityText) {
              gigs.push({
                date: dateText,
                venue: venueText,
                city: cityText,
                link: link.startsWith('http') ? link : (link ? `https://kuhnfumusic.com${link}` : ''),
                source: 'scraped-comprehensive'
              });
              console.log('✅ Added concert from comprehensive search:', { date: dateText, venue: venueText, city: cityText });
            }
          }
        });
      });
    }

    // Debug: show what we found
    console.log(`Final result: ${gigs.length} concerts found`);

console.log(`Total concerts found: ${gigs.length}`);

 

// Load manual concerts

try {

  const manualPath = path.join(process.cwd(), 'public', 'concerts-manual.json');

  const manualData = fs.readFileSync(manualPath, 'utf8');

  const manualGigs = JSON.parse(manualData);

  manualGigs.forEach(gig => {

    gigs.push({

      date: gig.date,

      venue: gig.venue,

      city: gig.city,

      link: gig.link,

      source: 'manual'

    });

  });

  console.log(`Loaded ${manualGigs.length} manual concerts`);

} catch (error) {

  console.log('Failed to load manual concerts:', error.message);

}

// Sort all gigs by date

gigs.sort((a, b) => {

  try {

    const [dayA, monthA, yearA] = a.date.split('.');

    const [dayB, monthB, yearB] = b.date.split('.');

    const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA));

    const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB));

    return dateA - dateB;

  } catch {

    return 0;

  }

});

console.log(`Total gigs after merge and sort: ${gigs.length}`);

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