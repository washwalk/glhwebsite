
import Head from 'next/head';
import Logo from '../components/Logo';
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "George Hadow",
              "jobTitle": "Drummer and Avant-Garde Percussionist",
              "description": "English drummer and avant-garde percussionist based in Amsterdam, active in experimental, improvised, and contemporary music since 2012.",
              "url": "https://www.georgehadow.com",
              "homeLocation": {
                "@type": "Place",
                "name": "Amsterdam, Netherlands"
              },
              "knowsAbout": [
                "Avant-garde music",
                "Experimental percussion",
                "Improvised music",
                "Contemporary music"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Musician",
                "occupationLocation": {
                  "@type": "Place",
                  "name": "Amsterdam, Netherlands"
                }
              }
            })
          }}
        />
      </Head>
      <div style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        textAlign: 'center'
      }}>
        <Logo />
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
          marginBottom: '2rem',
          fontSize: '1rem',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Amsterdam-based drummer and avant-garde percussionist. Active in experimental, improvised, and contemporary music since 2012.
          Work focuses on rhythm, texture, and sonic exploration.
        </p>

        <p style={{
          color: '#666666',
          marginBottom: '3rem',
          fontSize: '1rem',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Explore selected performances, current projects, and upcoming live dates.
        </p>

        <footer style={{
          marginTop: '4rem',
          textAlign: 'center',
          color: '#888',
          fontSize: '0.8em'
        }}>
          <p style={{ marginTop: '0.5rem' }}>
            Data sourced from <a href="https://kuhnfumusic.com/tour-dates" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>kuhnfumusic.com</a>
          </p>
        </footer>
      </div>
    </div>
    </>
  );
}