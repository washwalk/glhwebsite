import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#ffffff',
      minHeight: '100vh',
      textAlign: 'center'
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
        fontSize: '3rem'
      }}>George Hadow</h1>

      <p style={{
        color: '#cccccc',
        marginBottom: '3rem',
        fontSize: '1.2rem',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: '1.6'
      }}>
        English drummer from South-West Devon, now a prominent figure in Amsterdam's avant-garde scene since 2012.
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        marginBottom: '4rem'
      }}>
        <Link href="/concerts" style={{
          display: 'inline-block',
          backgroundColor: '#00d4ff',
          color: '#121212',
          padding: '1rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          transition: 'all 0.2s ease',
          border: '2px solid transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0099cc';
          e.currentTarget.style.borderColor = '#ffffff';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#00d4ff';
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        >
          🎵 View Concerts
        </Link>

        <Link href="/about" style={{
          display: 'inline-block',
          backgroundColor: '#ff6b35',
          color: '#ffffff',
          padding: '1rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          transition: 'all 0.2s ease',
          border: '2px solid transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e55a2b';
          e.currentTarget.style.borderColor = '#ffffff';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ff6b35';
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        >
          👤 About George
        </Link>
      </div>

      <div style={{
        backgroundColor: '#1e1e1e',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #333',
        marginBottom: '2rem',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h2 style={{ color: '#00d4ff', marginTop: 0 }}>Welcome</h2>
        <p style={{ color: '#cccccc', lineHeight: '1.6', fontSize: '1.1rem' }}>
          Explore George Hadow's musical journey through Amsterdam's avant-garde scene.
          Discover upcoming performances and learn about his innovative approach to rhythm and percussion.
        </p>
      </div>

        <footer style={{
          marginTop: '4rem',
          textAlign: 'center',
          color: '#888',
          fontSize: '0.9em'
        }}>
          <p>🎸 George Hadow - Amsterdam-based drummer and avant-garde artist 🎸</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8em' }}>
            Data sourced from <a href="https://kuhnfumusic.com/tour-dates" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: 'bold' }}>kuhnfumusic.com</a>
          </p>
        </footer>
      </div>
    </div>
  );
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
      case 'live-scraping': return '🟢 Live data from kuhnfumusic.com';
      case 'fallback': return '🟡 Service temporarily unavailable';
      case 'error': return '🔴 Unable to load data';
      default: return '⏳ Loading data...';
    }
  };

  // Use gigs directly since manual concerts are handled via API fallback
  const allGigs = gigs;

  const handleEditGig = (index) => {
    setEditingGig(index);
    setShowAddForm(true);
  };



  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'sans-serif',
      maxWidth: '1000px',
      margin: '0 auto',
      backgroundColor: '#121212',
      color: '#ffffff',
      minHeight: '100vh'
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

      {!loading && !error && allGigs.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#cccccc',
          fontSize: '1.1em'
        }}>
          🎵 No upcoming concerts found.
        </div>
      )}

      {!loading && allGigs.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allGigs.map((gig, idx) => (
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
        <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.8em' }}>
          Debug: <a href="/api/gigs?debug=test" style={{ color: '#ff6b35', textDecoration: 'none' }}>Connection Test</a> |
          <a href="/api/gigs?debug=html" style={{ color: '#ff6b35', textDecoration: 'none', marginLeft: '1rem' }}>HTML Debug</a>
        </p>
        <p style={{ marginTop: '1rem', color: '#666' }}>
          🎸 George Hadow - English drummer from Devon, Amsterdam-based avant-garde artist since 2012 🎸
        </p>
      </footer>
    </div>
  );
}

