
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
           fontSize: '2rem'
         }}>George Hadow</h1>

         <p style={{
           color: '#cccccc',
           marginBottom: '3rem',
           fontSize: '1rem',
           maxWidth: '600px',
           marginLeft: 'auto',
           marginRight: 'auto',
           lineHeight: '1.6'
         }}>
           English drummer from South-West Devon, now a prominent figure in Amsterdam&apos;s avant-garde scene since 2012.
         </p>



         <div style={{
           padding: '1rem',
           marginBottom: '2rem',
           maxWidth: '600px',
           marginLeft: 'auto',
           marginRight: 'auto'
         }}>
           <p style={{ color: '#cccccc', lineHeight: '1.6', fontSize: '1rem' }}>
            Explore George Hadow&apos;s musical journey through Amsterdam&apos;s avant-garde scene.
              Discover upcoming performances and learn about his innovative approach to rhythm and percussion.
           </p>
         </div>

         <footer style={{
           marginTop: '4rem',
           textAlign: 'center',
           color: '#888',
           fontSize: '0.8em'
         }}>
           <p>George Hadow - Amsterdam-based drummer and avant-garde artist</p>
           <p style={{ marginTop: '0.5rem' }}>
             Data sourced from <a href="https://kuhnfumusic.com/tour-dates" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>kuhnfumusic.com</a>
           </p>
         </footer>
      </div>
    </div>
  );
}