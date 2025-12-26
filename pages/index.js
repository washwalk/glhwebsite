import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGigs() {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/gigs');
        setGigs(data);
      } catch (err) {
        console.error('Failed to fetch gigs:', err);
        setError('Failed to load concert data');
      } finally {
        setLoading(false);
      }
    }
    fetchGigs();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '2rem' }}>George Hadow - Upcoming Concerts</h1>

      {loading && <p>Loading concerts...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && gigs.length === 0 && <p>No upcoming gigs found.</p>}

      {!loading && gigs.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {gigs.map((gig, idx) => (
            <li key={idx} style={{
              margin: '1rem 0',
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <strong style={{ fontSize: '1.1em' }}>{gig.date}</strong> — {gig.venue}, {gig.city}{' '}
              {gig.link && (
                <a
                  href={gig.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0070f3',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Tickets
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#666', fontSize: '0.9em' }}>
        <p>Data sourced from <a href="https://kuhnfumusic.com/tour-dates" target="_blank" rel="noopener noreferrer">kuhnfumusic.com/tour-dates</a></p>
      </footer>
    </div>
  );
}