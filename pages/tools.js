import Head from 'next/head';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

export default function Tools() {
  return (
    <>
      <Head>
        <title>Tools | George Hadow</title>
        <meta
          name="description"
          content="Musician tools and apps by George Hadow. Free online metronome and practice resources for drummers and musicians."
        />
      </Head>
      <div style={{
        backgroundColor: '#ffffff',
        color: '#000000',
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
          <h1 style={{
            color: '#333333',
            marginBottom: '2rem',
            fontSize: '1.5rem'
          }}>Tools & Apps</h1>

          <div style={{
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: '#333333', marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>Metronome Tool</h2>
            <p style={{ color: '#666666', lineHeight: '1.6', fontSize: '1rem' }}>
              <a
                href="https://clik.georgehadow.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0066cc',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Free Online Metronome
              </a> – Practice tool for drummers and musicians.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}