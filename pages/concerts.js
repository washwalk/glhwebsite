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
      backgroundColor: '#121212',
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
      <h1 style={{
        color: '#ffffff',
        marginBottom: '1rem',
        textShadow: '0 0 10px rgba(255,255,255,0.3)',
        fontSize: '2.5rem'
      }}>George Hadow</h1>
      <p style={{
        color: '#cccccc',
        marginBottom: '2rem',
        fontSize: '1.1rem',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: '1.6'
      }}>
        English drummer from South-West Devon, now a prominent figure in Amsterdam's avant-garde scene since 2012.
      </p>
      <h2 style={{
        color: '#00d4ff',
        marginBottom: '2rem',
        fontSize: '1.8rem',
        textAlign: 'center'
      }}>🎵 Upcoming Concerts</h2>

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{
          fontSize: '0.9em',
          color: '#cccccc',
          marginBottom: '1rem',
          fontFamily: 'monospace'
        }}>
          <strong>Data Source:</strong> {getDataSourceMessage()}
        </p>
      </div>

      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#00d4ff',
          fontSize: '1.1em'
        }}>
          🔄 Loading concerts...
        </div>
      )}

      {error && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#ff6b35',
          backgroundColor: '#2a2a2a',
          borderRadius: '8px',
          border: '1px solid #ff6b35'
        }}>
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && gigs.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#cccccc',
          fontSize: '1.1em'
        }}>
          🎵 No upcoming concerts found.
        </div>
      )}

      {!loading && gigs.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {gigs.map((gig, idx) => (
            <li key={gig.id || idx} style={{
              margin: '1rem 0',
              padding: '1.5rem',
              border: '1px solid #333',
              borderRadius: '12px',
              backgroundColor: '#1e1e1e',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{
                    fontSize: '1.2em',
                    color: '#00d4ff',
                    marginRight: '1rem'
                  }}>{gig.date}</strong>
                  <span style={{ color: '#ffffff', fontSize: '1.1em' }}>
                    {gig.venue}, {gig.city}
                  </span>
                </div>
                {gig.link && (
                  <a
                    href={gig.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#ff6b35',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.9em',
                      transition: 'background-color 0.2s ease',
                      border: '2px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ff5722';
                      e.currentTarget.style.borderColor = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ff6b35';
                      e.currentTarget.style.borderColor = 'transparent';
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
          marginTop: '4rem',
          textAlign: 'center',
          color: '#888',
          fontSize: '0.9em',
          borderTop: '1px solid #333',
          paddingTop: '2rem'
        }}>
          <p>Data sourced from <a href="https://kuhnfumusic.com/tour-dates" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: 'bold' }}>kuhnfumusic.com/tour-dates</a></p>
          <p>🎸 George Hadow - Live Music Experience 🎸</p>
        </footer>
      </div>
    </div>
  );
}