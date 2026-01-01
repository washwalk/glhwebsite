import { useEffect, useState } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
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
      <SEO
        title="Concerts & Performances | George Hadow"
        description="Upcoming and past live performances by George Hadow. Concert dates, venues, and booking information for avant-garde music shows."
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

       {loading && (
         <div>
           <h2 style={{
             color: 'var(--text-color)',
             marginBottom: '2rem',
             fontSize: '1.2rem',
             textAlign: 'center'
           }}>Loading Concerts...</h2>
           <ul style={{ listStyle: 'none', padding: 0 }}>
             {Array.from({ length: 5 }, (_, idx) => (
               <li key={`skeleton-${idx}`} className="upcoming-gig" style={{ backgroundColor: 'var(--hover-bg)', borderBottom: '1px solid var(--border-color)' }}>
                 <div className="gig-details">
                   <div style={{ height: '1.2rem', backgroundColor: 'var(--secondary-text)', marginBottom: '2px', borderRadius: '2px' }}></div>
                   <div style={{ height: '1.2rem', backgroundColor: 'var(--secondary-text)', marginBottom: '2px', borderRadius: '2px', width: '80%' }}></div>
                   <div style={{ height: '1.2rem', backgroundColor: 'var(--secondary-text)', borderRadius: '2px', width: '60%' }}></div>
                 </div>
                 <div style={{ height: '1.5rem', width: '60px', backgroundColor: 'var(--button-bg)', borderRadius: '3px' }}></div>
               </li>
             ))}
           </ul>
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
                <li key={gig.id || idx} className="upcoming-gig">
                  <div className="gig-details">
                    <span className="gig-date">{gig.date}</span>
                    <span className="gig-venue">{gig.venue}</span>
                    <span className="gig-city">{gig.city}</span>
                  </div>
                  {gig.link && (
                    <a href={gig.link} className="gig-link" target="_blank">
                      TICKETS
                    </a>
                  )}
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
                <li key={gig.id || `past-${idx}`} className="past-gig">
                  <div className="gig-details">
                    <span className="gig-date">{gig.date}</span>
                    <span className="gig-venue">{gig.venue}</span>
                    <span className="gig-city">{gig.city}</span>
                  </div>
                  {gig.link && (
                    <a href={gig.link} className="gig-link" target="_blank">
                      TICKETS
                    </a>
                  )}
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