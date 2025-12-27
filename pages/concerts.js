import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

export default function Concerts() {
  const [gigs, setGigs] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGigs() {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/gigs');

        // Filter concerts into upcoming and past
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day

        const upcomingGigs = [];
        const pastGigs = [];

        data.forEach(gig => {
          try {
            // Parse European date format (DD.MM.YYYY)
            const [day, month, year] = gig.date.split('.');
            const concertDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

            if (concertDate >= today) {
              upcomingGigs.push(gig);
            } else {
              pastGigs.push(gig);
            }
          } catch (error) {
            // If date parsing fails, include in upcoming to be safe
            console.warn('Failed to parse date:', gig.date, error);
            upcomingGigs.push(gig);
          }
        });

        // Sort past gigs by most recent first
        pastGigs.sort((a, b) => {
          try {
            const [dayA, monthA, yearA] = a.date.split('.');
            const [dayB, monthB, yearB] = b.date.split('.');
            const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA));
            const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB));
            return dateB - dateA; // Most recent first
          } catch {
            return 0;
          }
        });

        // Limit past gigs to most recent 20
        const limitedPastGigs = pastGigs.slice(0, 20);

        setGigs({ upcoming: upcomingGigs, past: limitedPastGigs });
      } catch (err) {
        console.error('Failed to fetch gigs:', err);
        setError('Failed to load concert data');
      } finally {
        setLoading(false);
      }
    }
    fetchGigs();
  }, []);

  return (
    <>
      <Head>
        <title>Concerts & Performances | George Hadow</title>
        <meta
          name="description"
          content="Upcoming and past live performances by George Hadow. Concert dates, venues, and booking information for avant-garde music shows."
        />
      </Head>
      <div style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        minHeight: '100vh'
      }}>
        <Logo />
        <Navigation />

        {/* Hidden SEO text for search engines */}
        <div className="sr-only">
          George Hadow concerts and live performances. Upcoming shows, past performances, booking information for avant-garde music events in Amsterdam and Europe.
        </div>

      <div style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>

      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#666666',
          fontSize: '1rem'
        }}>
          Loading concerts...
        </div>
      )}

      {error && (
        <div style={{
          textAlign: 'center',
          padding: '1rem',
          color: '#000000',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      {!loading && !error && gigs.upcoming.length === 0 && gigs.past.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#666666',
          fontSize: '1rem'
        }}>
          No concerts found.
        </div>
      )}

      {/* Upcoming Concerts */}
      {!loading && gigs.upcoming.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            color: 'var(--text-color)',
            marginBottom: '2rem',
            fontSize: '1.2rem',
            textAlign: 'center'
          }}>Upcoming Concerts</h2>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {gigs.upcoming.map((gig, idx) => (
              <li key={gig.id || idx} style={{
                margin: '0.75rem 0',
                padding: '1rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--card-bg)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr auto',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-color)'
                  }}>{gig.band}</strong>
                </div>
                <div>
                  <span style={{
                    color: 'var(--secondary-text)',
                    fontSize: '0.9rem'
                  }}>{gig.venue}</span>
                </div>
                <div>
                  <span style={{
                    color: 'var(--secondary-text)',
                    fontSize: '0.9rem'
                  }}>{gig.date}, {gig.city}</span>
                </div>
                <div>
                  {gig.link && (
                    <a
                      href={gig.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: 'var(--button-bg)',
                        color: 'var(--button-text)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '3px',
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        border: '1px solid var(--button-bg)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--button-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--button-bg)';
                      }}
                    >
                      Tickets
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Past Performances */}
      {!loading && gigs.past.length > 0 && (
        <div>
          <h2 style={{
            color: 'var(--text-color)',
            marginBottom: '2rem',
            fontSize: '1.2rem',
            textAlign: 'center'
          }}>Past Performances</h2>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {gigs.past.map((gig, idx) => (
              <li key={gig.id || `past-${idx}`} style={{
                margin: '0.5rem 0',
                padding: '0.5rem 1rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{
                    fontSize: '1rem',
                    color: 'var(--text-color)'
                  }}>{gig.band}</strong>
                </div>
                <div>
                  <span style={{
                    color: 'var(--secondary-text)',
                    fontSize: '0.85rem'
                  }}>{gig.venue}</span>
                </div>
                <div>
                  <span style={{
                    color: 'var(--secondary-text)',
                    fontSize: '0.85rem'
                  }}>{gig.date}, {gig.city}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}


      </div>
      </div>
    </>
  );
}