
import Head from 'next/head';
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <>
      <Head>
        <title>George Hadow | Amsterdam-based Drummer & Avant-Garde Percussionist</title>
        <meta
          name="description"
          content="Official site of George Hadow, Amsterdam-based drummer and avant-garde artist. Live performances, projects, and recordings."
        />
      </Head>
      <div style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        textAlign: 'center'
      }}>
        <Navigation />

      {/* Hidden SEO text for search engines */}
      <div className="sr-only">
        George Hadow is an English drummer and avant-garde percussionist based in Amsterdam, active in experimental, improvised, and contemporary music since 2012.
      </div>

      <div style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          color: '#000000',
          marginBottom: '1rem',
          fontSize: '2rem'
        }}>George Hadow</h1>

          <p style={{
            color: '#666666',
            marginBottom: '0.5rem',
            fontSize: '1.1rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.4',
            textAlign: 'center'
          }}>
            Amsterdam-based drummer & avant-garde artist
          </p>

          <p style={{
            color: '#666666',
            marginBottom: '3rem',
            fontSize: '0.95rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            George Hadow is an English drummer from South-West Devon, active in Amsterdam&apos;s avant-garde music scene since 2012.
            His work focuses on rhythm, texture, and experimentation across contemporary and improvised music.
          </p>



         <div style={{
           padding: '1rem',
           marginBottom: '2rem',
           maxWidth: '600px',
           marginLeft: 'auto',
           marginRight: 'auto'
         }}>
            <p style={{ color: '#666666', lineHeight: '1.6', fontSize: '1rem' }}>
             Explore selected performances, current projects, and upcoming live dates.
            </p>
         </div>

        <footer style={{
          marginTop: '4rem',
          textAlign: 'center',
          color: '#888',
          fontSize: '0.8em'
        }}>
          <p>George Hadow - Amsterdam-based drummer and avant-garde artist</p>
        </footer>
      </div>
    </div>
    </>
  );
}