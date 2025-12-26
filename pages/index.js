import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [manualGigs, setManualGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load manual gigs from concerts.txt file
  useEffect(() => {
    async function loadManualGigs() {
      try {
        const response = await fetch('/concerts.txt');
        if (response.ok) {
          const text = await response.text();
          const lines = text.split('\n').filter(line =>
            line.trim() && !line.trim().startsWith('#')
          );

          const parsedGigs = lines.map(line => {
            const [date, venue, city, link] = line.split('|').map(s => s.trim());
            return {
              date: date || 'Date TBA',
              venue: venue || 'Venue TBA',
              city: city || '',
              link: link || '',
              source: 'manual'
            };
          }).filter(gig => gig.date || gig.venue);

          setManualGigs(parsedGigs);
        }
      } catch (err) {
        console.log('No manual concerts file found or error loading it:', err);
      }
    }

    loadManualGigs();
  }, []);



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

  // Combine and sort all gigs by date
  const allGigs = [...gigs, ...manualGigs].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date) - new Date(b.date);
  });

  const handleEditGig = (index) => {
    setEditingGig(index);
    setShowAddForm(true);
  };



  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '2rem' }}>George Hadow - Upcoming Concerts</h1>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '1rem' }}>
          <strong>Note:</strong> Manual concerts are managed via the <code>public/concerts.txt</code> file in the repository.
          Edit this file to add or modify concerts manually.
        </p>
      </div>



      {loading && <p>Loading concerts...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && allGigs.length === 0 && <p>No upcoming gigs found.</p>}

      {(!loading || manualGigs.length > 0) && allGigs.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allGigs.map((gig, idx) => (
            <li key={gig.id || idx} style={{
              margin: '1rem 0',
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: gig.source === 'manual' ? '#fff8e1' : '#f9f9f9',
              position: 'relative'
            }}>
              {gig.source === 'manual' && (
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '0.5rem',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '3px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  MANUAL
                </div>
              )}
              <div style={{ paddingTop: gig.source === 'manual' ? '2rem' : '0' }}>
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
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#666', fontSize: '0.9em' }}>
        <p>Data sourced from <a href="https://kuhnfumusic.com/tour-dates" target="_blank" rel="noopener noreferrer">kuhnfumusic.com/tour-dates</a></p>
        <p>Manual concerts are managed via the <code>public/concerts.txt</code> file in the repository</p>
      </footer>
    </div>
  );
}

