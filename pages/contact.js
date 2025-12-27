import Head from 'next/head';
import Navigation from '../components/Navigation';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | George Hadow</title>
        <meta
          name="description"
          content="Contact George Hadow for booking, collaborations, and inquiries. Amsterdam-based drummer and avant-garde artist available for performances and projects."
        />
      </Head>
      <div style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        minHeight: '100vh'
      }}>
        <Navigation />

        {/* Hidden SEO text for search engines */}
        <div className="sr-only">
          Contact George Hadow for booking, collaborations, and performance inquiries. Amsterdam-based drummer and avant-garde artist available for live shows and musical projects.
        </div>

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
          }}>Contact</h1>

          <p style={{ color: '#666666', lineHeight: '1.6', fontSize: '1rem' }}>
            Get in touch with George Hadow for booking inquiries, collaboration opportunities,
            or any questions about his music and performances.
          </p>
        </div>
      </div>
    </>
  );
}