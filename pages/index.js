
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