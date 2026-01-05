/* eslint-disable @typescript-eslint/no-require-imports */

import axios from 'axios';
import path from 'path';
import fs from 'fs';

const cheerio = require('cheerio');

export const REVALIDATION_TIME = 86400; // 24 hours in seconds

export async function scrapeConcerts() {
  const gigs = [];

  try {
    console.log('Attempting to fetch concert data...');

    const { data } = await axios.get('https://kuhnfumusic.com/tour-dates', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      },
      timeout: 20000,
    });

    if (!data || data.length < 1000) {
      return [];
    }

    const $ = cheerio.load(data);
    const pageTitle = $('title').text();

    if (!pageTitle.includes('Tour Dates')) {
      return [];
    }

    let concertTable = $('.content-table table').length > 0
      ? $('.content-table table')
      : $('table').first();

    if (concertTable.length > 0) {
      concertTable.find('tr').each((_, row) => {
        const cells = $(row).find('td');
        if (cells.length >= 3) {
          const dateText = $(cells[0]).text().trim();
          const cityText = $(cells[1]).text().trim();
          const venueText = $(cells[2]).text().trim();
          const link = $(cells[0]).find('a').attr('href') ||
                       $(cells[1]).find('a').attr('href') ||
                       $(cells[2]).find('a').attr('href') || '';

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
          }
        }
      });
    }

  } catch (error) {
    console.error('Failed to scrape KUHN FU:', error.message);
  }

  // Scrape from labasheeda.nl
  try {
    const labasheedaResponse = await axios.get('https://www.labasheeda.nl/agenda/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 15000
    });

    const $lab = cheerio.load(labasheedaResponse.data);
    const events = $lab('.event_listing');

    events.each((_, elem) => {
      const title = $lab(elem).find('a h3.wpem-heading-text').text().trim();
      const dateTimeText = $lab(elem).find('a .wpem-event-date-time-text').text().trim();
      const locationText = $lab(elem).find('a .wpem-event-location-text').text().trim();
      const link = $lab(elem).find('a.wpem-event-action-url').attr('href');

      const dateMatch = dateTimeText.match(/(\d{2}-\d{2}-\d{4})/);

      if (dateMatch && title) {
        const [day, month, year] = dateMatch[1].split('-');
        gigs.push({
          date: `${day}.${month}.${year}`,
          venue: title,
          city: locationText,
          band: 'Labasheeda',
          link: link || '',
          source: 'labasheeda'
        });
      }
    });
  } catch (error) {
    console.log('Failed to scrape labasheeda:', error.message);
  }

  return gigs;
}

export function loadManualConcerts() {
  try {
    const manualPath = path.join(process.cwd(), 'data', 'concerts-manual.json');
    if (!fs.existsSync(manualPath)) {
      return [];
    }
    const manualData = fs.readFileSync(manualPath, 'utf8');
    const manualConcerts = JSON.parse(manualData);
    return manualConcerts.map(gig => ({
      date: gig.date,
      venue: gig.venue,
      city: gig.city,
      band: gig.band,
      link: gig.link || '',
      source: 'manual'
    }));
  } catch {
    return [];
  }
}

export function sortGigsByDate(gigs) {
  return gigs.sort((a, b) => {
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
}

export async function getAllConcerts() {
  const [scrapedGigs, manualGigs] = await Promise.all([
    scrapeConcerts(),
    Promise.resolve(loadManualConcerts())
  ]);
  return sortGigsByDate([...scrapedGigs, ...manualGigs]);
}

export function categorizeGigs(gigs) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingGigs = [];
  const pastGigs = [];

  gigs.forEach(gig => {
    try {
      const [day, month, year] = gig.date.split('.');
      const concertDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      if (concertDate >= today) {
        upcomingGigs.push(gig);
      } else {
        pastGigs.push(gig);
      }
    } catch {
      upcomingGigs.push(gig);
    }
  });

  pastGigs.sort((a, b) => {
    try {
      const [dayA, monthA, yearA] = a.date.split('.');
      const [dayB, monthB, yearB] = b.date.split('.');
      const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA));
      const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB));
      return dateB - dateA;
    } catch {
      return 0;
    }
  });

  return {
    upcoming: upcomingGigs,
    past: pastGigs.slice(0, 20)
  };
}
