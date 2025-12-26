# Manual Concert Update Script
# Run this to update concerts-manual.json from the website
# Usage: node update-concerts.js

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function updateConcerts() {
  try {
    console.log('Fetching latest concert data...');

    const { data } = await axios.get('https://kuhnfumusic.com/tour-dates', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 15000
    });

    const $ = cheerio.load(data);
    const concerts = [];

    // Parse all table rows
    $('table tr').each((i, row) => {
      const tds = $(row).find('td');
      if (tds.length >= 3) {
        const date = $(tds[0]).text().trim();
        const city = $(tds[1]).text().trim();
        const venue = $(tds[2]).text().trim();
        const link = $(row).find('a').attr('href') || '';

        if (date && /\d{2}\.\d{2}\.\d{4}/.test(date)) {
          concerts.push({
            date,
            venue: venue || 'Venue TBA',
            city,
            link: link.startsWith('http') ? link : `https://kuhnfumusic.com${link}`
          });
        }
      }
    });

    // Save to file
    const filePath = path.join(__dirname, 'public', 'concerts-manual.json');
    fs.writeFileSync(filePath, JSON.stringify(concerts, null, 2));

    console.log(`Updated ${concerts.length} concerts in concerts-manual.json`);
    console.log('Concerts:', concerts.slice(0, 3).map(c => `${c.date} - ${c.venue}, ${c.city}`));

  } catch (error) {
    console.error('Failed to update concerts:', error.message);
  }
}

if (require.main === module) {
  updateConcerts();
}

module.exports = { updateConcerts };