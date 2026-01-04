
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <>
      <SEO
        title="George Hadow | Amsterdam-based Drummer & Avant-Garde Percussionist"
        description="Official site of George Hadow, Amsterdam-based drummer and avant-garde artist. Live performances, projects, and recordings."
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
       <div style={{
         backgroundColor: 'var(--bg-color)',
         color: 'var(--text-color)',
         minHeight: '100vh',
         display: 'flex',
         flexDirection: 'column'
       }}>
        <Logo />
        <Navigation />



        <div style={{
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>



          <p style={{
            color: 'var(--secondary-text)',
            fontSize: '1.1rem',
            lineHeight: '1.6'
          }}>

          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
            width: '100%'
          }}>
            <div style={{ textAlign: 'center' }}>
              <iframe
                width="100%"
                height="157"
                src="https://www.youtube.com/embed/JwwqNoUAQ6M"
                title="roodkapje"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <iframe
                width="100%"
                height="157"
                src="https://www.youtube.com/embed/jOOCX8HFRKo"
                title="dogs mercury"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <iframe
                width="100%"
                height="157"
                src="https://www.youtube.com/embed/xkW4NARYq5M"
                title="kf"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

        </div>
    </div>
    </>
  );
}