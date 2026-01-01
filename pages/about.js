import SEO from '../components/SEO';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

export default function About() {
  return (
    <>
      <SEO
        title="About | George Hadow"
        description="Biography of George Hadow, Amsterdam-based drummer and avant-garde percussionist. Musical background, ensembles, collaborations, and discography."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "name": "George Hadow",
                "jobTitle": "Drummer and Avant-Garde Percussionist",
                "description": "English drummer and avant-garde percussionist based in Amsterdam, active in experimental, improvised, and contemporary music since 2012.",
                "url": "https://www.georgehadow.com/about",
                "homeLocation": {
                  "@type": "Place",
                  "name": "Amsterdam, Netherlands"
                },
                "knowsAbout": [
                  "Avant-garde music",
                  "Experimental percussion",
                  "Improvised music",
                  "Contemporary music",
                  "Jazz ensembles"
                ]
              },
              {
                "@type": "MusicGroup",
                "name": "Blue Lines Trio",
                "genre": "Avant-garde Jazz",
                "member": {
                  "@type": "Person",
                  "name": "George Hadow"
                }
              },
              {
                "@type": "MusicGroup",
                "name": "Mulligan – Baker Project",
                "genre": "Avant-garde Jazz",
                "member": {
                  "@type": "Person",
                  "name": "George Hadow"
                }
              }
            ]
          })
        }}
      />
      <div style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        minHeight: '100vh'
      }}>
        <Logo />
        <Navigation />



       <div style={{
         padding: '2rem',
         fontFamily: 'sans-serif',
         maxWidth: '800px',
         margin: '0 auto'
       }}>
          <div style={{
            marginBottom: '2rem'
          }}>
            <h1 style={{ color: 'var(--heading-color)', marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>Biography</h1>
            <p style={{ color: 'var(--secondary-text)', lineHeight: '1.6', fontSize: '0.95rem' }}>
             George Hadow represents the newest wave of improvisers to hit the Dutch scene. Like many of the active newcomers, George is an expat, hailing from Devon in the UK. George first came to the Netherlands in 2011 to take part in the Dutch Impro Academy, where he studied with Han Bennink and Michael Moore, among others. He has quickly developed into a mature musician, playing with acute sensitivity as well as unbridled power.
           </p>

            <p style={{ color: 'var(--secondary-text)', lineHeight: '1.6', fontSize: '0.95rem' }}>
             Based in Amsterdam since June 2012, George has established himself as a prominent figure in the European avant-garde and improvisational music scene. His innovative approach to rhythm and percussion has led to collaborations across diverse musical projects.
           </p>
         </div>

          <div style={{
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: 'var(--heading-color)', marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>Regular Groups & Ensembles</h2>
           <ul style={{ color: 'var(--secondary-text)', lineHeight: '1.8', fontSize: '1rem', paddingLeft: '1.5rem' }}>
             <li>Blue Lines Trio</li>
             <li>Mulligan – Baker Project</li>
             <li>Terrie Ex/Raoul van der Weide/George Hadow</li>
             <li>Aya ba yaya</li>
             <li>Almeida/Dikeman/Hadow</li>
             <li>Molino</li>
             <li>Galm Quartet</li>
             <li>Blue Lines Sextet</li>
             <li>Kuhn Fu</li>
             <li>The Bertch Quartet</li>
             <li>Mixing Memory And Desire</li>
             <li>Xavier Pamplona Septet</li>
             <li>Zwerv</li>
           </ul>
         </div>

          <div style={{
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: 'var(--heading-color)', marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>Collaborations</h2>
           <p style={{ color: 'var(--secondary-text)', lineHeight: '1.6', fontSize: '1rem', marginBottom: '1rem' }}>
             George has collaborated with a wide array of artists including:
           </p>
           <div style={{ color: 'var(--secondary-text)', fontSize: '0.95rem', lineHeight: '1.6' }}>
             <strong>Notable Collaborators:</strong> Andy Moor, Roy Paci, Anne-James Chaton, Joe Williamson, The Ex, Cactus Truck<br/>
             <strong>Additional Artists:</strong> Jasper Stadhouders, Onno Govaert, Wilbert de Joode, Felicity Provan, Wolter Wierbos, Eric Boeren, Michael Moore, Joost Buis, Renato Ferreira, Terrie Ex, Christian Ferlaino, Raoul van der Weide, Michel Scheen, Leo Svirsky, Dianne Verdonk, Frank van Bommel, Michael Foster, Leila Bordreuil, Yedo Gibson, Mikael Szafirowski, Nora Mulder, Laurens van de Wee, Andreas Fulgosi, DJ Sniff, Bart van de Putten, Alex Hood, Stephen Simpson, Jamie Benzies
           </div>
         </div>

          <div style={{
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: 'var(--heading-color)', marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>Selected Discography</h2>
           <p style={{ color: 'var(--secondary-text)', lineHeight: '1.6', fontSize: '1rem', marginBottom: '1rem' }}>
              George&apos;s work spans from 2014 to 2022 with releases on Creative Sources, Raw Tonk, and TRPTK labels:
           </p>
           <ul style={{ color: 'var(--secondary-text)', lineHeight: '1.8', fontSize: '0.95rem', paddingLeft: '1.5rem' }}>
             <li><em>O Monstro</em> (with Gonçalo Almeida, John Dikeman) - 2014</li>
             <li><em>Live</em> (with Zwerv) - 2017</li>
             <li><em>Outermission</em> (with Dirk Serries) - 2017</li>
             <li><em>Music From Any Moment</em> (with Zwerv) - 2018</li>
             <li><em>Ideal Principle</em> (with John Dikeman, Dirk Serries, Martina Verhoeven, Luis Vicente) - 2018</li>
             <li><em>Chapel</em> (with Dirk Serries) - 2021</li>
             <li><em>Kurkuma</em> (with Irene Sorozábal, Kirsi-Marja Harju, Adrián Moncada, Pedro Ivo Ferreira) - 2022</li>
           </ul>
         </div>


       </div>
    </div>
    </>
  );
}