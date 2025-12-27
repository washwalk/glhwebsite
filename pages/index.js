
import Head from 'next/head';
import Link from 'next/link';
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
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
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
           color: 'var(--text-color)',
           fontSize: '2rem',
           marginBottom: '1rem',
           fontWeight: 'bold'
         }}>
           George Hadow
         </h1>

         <p style={{
           color: 'var(--secondary-text)',
           marginBottom: '2rem',
           fontSize: '1.1rem',
           lineHeight: '1.6'
         }}>
           Amsterdam-based drummer exploring experimental rhythms and avant-garde percussion since 2012.
         </p>

         <p style={{
           color: 'var(--secondary-text)',
           marginBottom: '2rem',
           fontSize: '1rem'
         }}>
           <Link href="/about" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
             Read full bio →
           </Link>
         </p>

         <div style={{
           display: 'flex',
           flexDirection: 'column',
           gap: '1rem',
           alignItems: 'center',
           marginTop: '2rem'
         }}>
           <Link href="/concerts" style={{
             backgroundColor: 'var(--accent-color)',
             color: 'var(--bg-color)',
             padding: '0.75rem 1.5rem',
             borderRadius: '4px',
             textDecoration: 'none',
             fontSize: '1rem',
             fontWeight: 'bold',
             display: 'inline-block'
           }}>
             Upcoming Shows
           </Link>

           <Link href="/contact" style={{
             backgroundColor: 'transparent',
             color: 'var(--text-color)',
             border: '1px solid var(--border-color)',
             padding: '0.75rem 1.5rem',
             borderRadius: '4px',
             textDecoration: 'none',
             fontSize: '1rem',
             display: 'inline-block'
           }}>
             Book a Gig
           </Link>
         </div>

       </div>
    </div>
    </>
  );
}