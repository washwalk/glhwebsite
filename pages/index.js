
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

function YouTubeVideo({ videoId, title }) {
  return (
    <div style={{ 
      position: 'relative', 
      paddingBottom: '56.25%', 
      height: 0, 
      overflow: 'hidden',
      backgroundColor: '#000',
      borderRadius: '4px'
    }}>
      <a 
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${title} on YouTube`}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
      >
        <img 
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          loading="lazy"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '68px',
          height: '48px',
          backgroundImage: 'url(https://www.youtube.com/img/youtube_socials_red.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }} />
      </a>
    </div>
  );
}

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

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
            width: '100%'
          }}>
            <YouTubeVideo videoId="JwwqNoUAQ6M" title="roodkapje" />
            <YouTubeVideo videoId="jOOCX8HFRKo" title="dogs mercury" />
            <YouTubeVideo videoId="xkW4NARYq5M" title="kf" />
          </div>

        </div>
      </div>
    </>
  );
}
