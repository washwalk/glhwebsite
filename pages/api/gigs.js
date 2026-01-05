/* eslint-disable @typescript-eslint/no-require-imports */

import axios from 'axios';
import path from 'path';
import sgMail from '@sendgrid/mail';

const cheerio = require('cheerio');

const fs = require('fs');

// Cache utilities
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const CACHE_PATH = path.join(process.cwd(), 'data', 'concerts-cache.json');

function readCache() {
  try {
    const cacheData = fs.readFileSync(CACHE_PATH, 'utf8');
    const cache = JSON.parse(cacheData);
    const now = Date.now();
    if (now - cache.lastScraped < CACHE_DURATION) {
      console.log('Using cached concert data');
      return cache.data;
    }
    console.log('Cache is stale, will rescrape');
    return null;
  } catch (error) {
    console.log('Cache read failed:', error.message);
    return null;
  }
}

function writeCache(data) {
  try {
    const dataDir = path.dirname(CACHE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const cache = {
      lastScraped: Date.now(),
      data: data
    };
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
    console.log('Cache updated');
  } catch (error) {
    console.error('Cache write failed:', error.message);
  }
}

async function sendErrorEmail(error) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SENDGRID_API_KEY not set, skipping error email');
    return;
  }
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'georgehadow@gmail.com',
      from: {
        email: 'noreply@georgehadow.com',
        name: 'George Hadow Website'
      },
      subject: 'Concert Scraping Error',
      html: `
        <p>Failed to scrape concert data from external sources.</p>
        <p>Error: ${error.message}</p>
        <p>Using cached data if available.</p>
        <p>Time: ${new Date().toISOString()}</p>
      `,
      text: `
Failed to scrape concert data from external sources.
Error: ${error.message}
Using cached data if available.
Time: ${new Date().toISOString()}
      `.trim()
    };
    await sgMail.send(msg);
    console.log('Error email sent');
  } catch (emailError) {
    console.error('Failed to send error email:', emailError.message);
  }
}

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
    // Load manual concerts first (always fresh)
    const manualGigs = [];
    try {
      const manualPath = path.join(process.cwd(), 'data', 'concerts-manual.json');
      const manualData = fs.readFileSync(manualPath, 'utf8');
      const manualConcerts = JSON.parse(manualData);
      manualConcerts.forEach(gig => {
        manualGigs.push({
          date: gig.date,
          venue: gig.venue,
          city: gig.city,
          band: gig.band,
          link: gig.link,
          source: 'manual'
        });
      });
      console.log(`Loaded ${manualGigs.length} manual concerts`);
    } catch (error) {
      console.log('Failed to load manual concerts:', error.message);
    }

    // Try to get scraped data from cache or fresh scrape
    let scrapedGigs = readCache();
    let cacheNeedsUpdate = false;

    if (!scrapedGigs) {
      console.log('No valid cache, scraping fresh data...');
      try {
        scrapedGigs = await scrapeConcerts();
        if (scrapedGigs && scrapedGigs.length > 0) {
          cacheNeedsUpdate = true;
        }
      } catch (scrapeError) {
        console.error('Scraping failed:', scrapeError.message);
        await sendErrorEmail(scrapeError);
        // Try cache as fallback
        scrapedGigs = readCache();
        if (!scrapedGigs) {
          console.log('No cache available, using fallback data');
          scrapedGigs = [{
            date: 'Service temporarily unavailable',
            venue: 'Unable to load concert data',
            city: 'Please try again later',
            link: '',
            source: 'error'
          }];
          // Still cache the fallback to avoid constant scraping on failure
          cacheNeedsUpdate = true;
        }
      }
    }

    // Write cache if needed (after scraping succeeds or with fallback)
    if (cacheNeedsUpdate && scrapedGigs) {
      writeCache(scrapedGigs);
    }

    // Merge scraped and manual gigs
    const allGigs = [...(scrapedGigs || []), ...manualGigs];

    // Sort by date
    allGigs.sort((a, b) => {
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

    console.log(`Returning ${allGigs.length} total concerts`);
    return res.status(200).json(allGigs);
  } catch (error) {
    console.error('Unexpected error in gigs API:', error.message);
    await sendErrorEmail(error);
    return res.status(200).json([{
      date: 'Service temporarily unavailable',
      venue: 'Unable to load concert data',
      city: 'Please try again later',
      link: '',
      source: 'error'
    }]);
  }

  // Scraping function
  async function scrapeConcerts() {
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
      throw new Error('Response too small, likely blocked or error page');
    }

    const $ = cheerio.load(data);

    // Debug: Check if the page loaded correctly
    const pageTitle = $('title').text();
    console.log('Page title:', pageTitle);

    if (!pageTitle.includes('Tour Dates')) {
      throw new Error(`Page did not load correctly, got title: ${pageTitle}`);
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
              band: 'KUHN FU',
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
                band: 'KUHN FU',
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

    // Scrape from labasheeda.nl

    try {
      const labasheedaResponse = await axios.get('https://www.labasheeda.nl/agenda/', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        },
        timeout: 15000
      });

      console.log('Labasheeda response length:', labasheedaResponse.data.length);

      const $lab = cheerio.load(labasheedaResponse.data);

      console.log('Labasheeda page title:', $lab('title').text());
      console.log('Labasheeda total divs:', $lab('div').length);
      console.log('Labasheeda event_listing divs:', $lab('.event_listing').length);
      console.log('Labasheeda wpem-event-layout-wrapper divs:', $lab('.wpem-event-layout-wrapper').length);
      console.log('Labasheeda h3 elements:', $lab('h3').length);
      console.log('Labasheeda wpem-heading-text elements:', $lab('.wpem-heading-text').length);

      const events = $lab('.event_listing');

      console.log('Labasheeda events found:', events.length);

      events.each((i, elem) => {
        const title = $lab(elem).find('a h3.wpem-heading-text').text().trim();
        const dateTimeText = $lab(elem).find('a .wpem-event-date-time-text').text().trim();
        const locationText = $lab(elem).find('a .wpem-event-location-text').text().trim();
        const link = $lab(elem).find('a.wpem-event-action-url').attr('href');

        console.log('Processing labasheeda event:', { title, dateTimeText, locationText, link });

        // Parse date from dateTimeText, e.g., "22-11-2025 > 19:00 - 00:00" or "27-11-2025"
        const dateMatch = dateTimeText.match(/(\d{2}-\d{2}-\d{4})/);

        if (dateMatch && title) {
          const date = dateMatch[1]; // DD-MM-YYYY
          // Convert DD-MM-YYYY to DD.MM.YYYY for consistency
          const [day, month, year] = date.split('-');
          const formattedDate = `${day}.${month}.${year}`;

          gigs.push({
            date: formattedDate,
            venue: title, // Use title as venue
            city: locationText, // Use location as city
            band: 'Labasheeda',
            link: link,
            source: 'labasheeda'
          });

          console.log('Added labasheeda gig:', formattedDate, title);
        }
      });

      console.log('Scraped from Labasheeda, total added:', events.length);
    } catch (error) {
      console.log('Failed to scrape labasheeda:', error.message);
    }

    return gigs;
  }
}