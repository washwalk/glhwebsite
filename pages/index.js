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
          English drummer from South-West Devon, now a prominent figure in Amsterdam&apos;s avant-garde scene since 2012.
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
           Explore George Hadow&apos;s musical journey through Amsterdam&apos;s avant-garde scene.
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