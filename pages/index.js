import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('unknown');

  // TEMPORARILY DISABLED: Load manual gigs from concerts.txt file
  // useEffect(() => {
  //   async function loadManualGigs() {
  //     try {
  //       const response = await fetch('/concerts.txt');
  //       if (response.ok) {
  //         const text = await response.text();
  //         const lines = text.split('\n').filter(line =>
  //           line.trim() && !line.trim().startsWith('#')
  //         );

  //         const parsedGigs = lines.map(line => {
  //           const [date, venue, city, link] = line.split('|').map(s => s.trim());
  //           return {
  //             date: date || 'Date TBA',
  //             venue: venue || 'Venue TBA',
  //             city: city || '',
  //             link: link || '',
  //             source: 'manual'
  //           };
  //         }).filter(gig => gig.date || gig.venue);

  //         setManualGigs(parsedGigs);
  //       }
  //     } catch (err) {
  //       console.log('No manual concerts file found or error loading it:', err);
  //     }
  //   }

  //   loadManualGigs();
  // }, []);



  useEffect(() => {
    async function fetchGigs() {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/gigs');
        setGigs(data);

        // Determine data source from the response
        if (data.length > 0) {
          const sources = data.map(gig => gig.source);
          if (sources.includes('scraped')) {
            setDataSource('live-scraping');
          } else if (sources.includes('manual-json')) {
            setDataSource('manual-json');
          } else {
            setDataSource('fallback');
          }
        }
      } catch (err) {
        console.error('Failed to fetch gigs:', err);
        setError('Failed to load concert data');
        setDataSource('error');
      } finally {
        setLoading(false);
      }
    }
    fetchGigs();
  }, []);

  const getDataSourceMessage = () => {
    switch (dataSource) {
      case 'live-scraping': return '✅ Live data from kuhnfumusic.com';
      case 'manual-json': return '📄 Data from manual JSON file';
      case 'fallback': return '⚠️ Fallback data displayed';
      case 'error': return '❌ Unable to load data';
      default: return '⏳ Loading data...';
    }
  };

  const handleEditGig = (index) => {
    setEditingGig(index);
    setShowAddForm(true);
  };



  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '2rem' }}>George Hadow - Upcoming Concerts</h1>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '1rem' }}>
          <strong>Data Source:</strong> {getDataSourceMessage()}
        </p>
        {dataSource === 'manual-json' && (
          <p style={{ fontSize: '0.8em', color: '#888' }}>
            To update concert data, edit <code>public/concerts-manual.json</code> in the repository.
          </p>
        )}
      </div>



      {loading && <p>Loading concerts...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && allGigs.length === 0 && <p>No upcoming gigs found.</p>}

      {!loading && allGigs.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allGigs.map((gig, idx) => (
            <li key={gig.id || idx} style={{
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
        <p>Fallback data available in <code>public/concerts-manual.json</code></p>
      </footer>
    </div>
  );
}

