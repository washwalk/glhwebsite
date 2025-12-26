georgehadow/
├─ pages/
│  ├─ index.js       # Home page (with concert dates)
│  └─ api/
│     └─ gigs.js     # Serverless function to fetch tour dates
├─ public/
├─ package.json
└─ next.config.js


npx create-next-app georgehadow
cd georgehadow
npm install axios cheerio


// pages/api/gigs.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://kuhnfumusic.com/');
    const $ = cheerio.load(data);

    const gigs = [];

    // Adjust selector based on actual HTML structure
    $('ul.tour-dates li').each((i, el) => {
      const date = $(el).find('.date').text().trim();
      const venue = $(el).find('.venue').text().trim();
      const city = $(el).find('.city').text().trim();
      const link = $(el).find('a').attr('href') || '';

      if (date && venue) gigs.push({ date, venue, city, link });
    });

    res.status(200).json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch gigs' });
  }
}


// pages/index.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    async function fetchGigs() {
      try {
        const { data } = await axios.get('/api/gigs');
        setGigs(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchGigs();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>George Shadow - Upcoming Concerts</h1>
      {gigs.length === 0 && <p>No gigs found.</p>}
      <ul>
        {gigs.map((gig, idx) => (
          <li key={idx} style={{ margin: '1rem 0' }}>
            <strong>{gig.date}</strong> — {gig.venue}, {gig.city}{' '}
            {gig.link && (
              <a href={gig.link} target="_blank" rel="noopener noreferrer">
                Tickets
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
