import { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';

export default function Concerts() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('unknown');

  const getDataSourceMessage = () => {
    switch (dataSource) {
      case 'live-scraping': return '🟢 Live data from kuhnfumusic.com';
      case 'fallback': return '🟡 Service temporarily unavailable';
      case 'error': return '🔴 Unable to load data';
      default: return '⏳ Loading data...';
    }
  };

  useEffect(() => {
    async function fetchGigs() {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/gigs');
        setGigs(data);

        // Determine data source from the response
        if (data.length > 0) {
          const sources = data.map(gig => gig.source);
          if (sources.includes('scraped') || sources.includes('scraped-fallback')) {
            setDataSource('live-scraping');
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

  return (
    <div style={{
      backgroundColor: '#ffffff',
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      <Navigation />

      <div style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>

      <h2 style={{
        color: '#000000',
        marginBottom: '2rem',
        fontSize: '1.2rem',
        textAlign: 'center'
      }}>Upcoming Concerts</h2>

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{
          fontSize: '0.8em',
          color: '#666666',
          marginBottom: '1rem'
        }}>
          Data Source: {getDataSourceMessage()}
        </p>
      </div>

      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#666666',
          fontSize: '1rem'
        }}>
          Loading concerts...
        </div>
      )}

      {error && (
        <div style={{
          textAlign: 'center',
          padding: '1rem',
          color: '#000000',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      {!loading && !error && gigs.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#666666',
          fontSize: '1rem'
        }}>
          No upcoming concerts found.
        </div>
      )}

      {!loading && gigs.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {gigs.map((gig, idx) => (
            <li key={gig.id || idx} style={{
              margin: '0.75rem 0',
              padding: '1rem',
              border: '1px solid #e0e0e0',
              backgroundColor: '#f9f9f9'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{
                    fontSize: '1rem',
                    color: '#000000',
                    marginRight: '0.75rem'
                  }}>{gig.date}</strong>
                  <span style={{ color: '#666666', fontSize: '0.9rem' }}>
                    {gig.venue}, {gig.city}
                  </span>
                </div>
                {gig.link && (
                  <a
                    href={gig.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '3px',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      border: '1px solid #000000'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#333333';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000000';
                    }}
                  >
                    🎫 Tickets
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

        <footer style={{
          marginTop: '3rem',
          textAlign: 'center',
          color: '#888',
          fontSize: '0.8em',
          borderTop: '1px solid #e0e0e0',
          paddingTop: '1rem'
        }}>
          <p>Data sourced from <a href="https://kuhnfumusic.com/tour-dates" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>kuhnfumusic.com</a></p>
          <p>George Hadow - Live Music Experience</p>
        </footer>
      </div>
    </div>
  );
}