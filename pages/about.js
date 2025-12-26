import Navigation from '../components/Navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function About() {
  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      <Navigation />

      <div style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          color: '#ffffff',
          marginBottom: '2rem',
          textShadow: '0 0 10px rgba(255,255,255,0.3)',
          fontSize: '2.5rem'
        }}>About George Hadow</h1>

        <div style={{
          backgroundColor: '#1e1e1e',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #333',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#00d4ff', marginTop: 0 }}>Biography</h2>
          <p style={{ color: '#cccccc', lineHeight: '1.6', fontSize: '1.1rem' }}>
            George Hadow is an English drummer originally from South-West Devon, England.
            He relocated to Amsterdam in 2012 after attending the Dutch Impro Academy the year prior,
            where he is now a prominent figure in the avant-garde scene.
          </p>

          <p style={{ color: '#cccccc', lineHeight: '1.6', fontSize: '1.1rem' }}>
            Known for his innovative approach to rhythm and percussion, George has collaborated
            with numerous artists in the European jazz and improvisational music community.
            His work spans from traditional jazz ensembles to cutting-edge experimental projects.
          </p>
        </div>

        <div style={{
          backgroundColor: '#1e1e1e',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #333',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#00d4ff', marginTop: 0 }}>Musical Style</h2>
          <p style={{ color: '#cccccc', lineHeight: '1.6', fontSize: '1.1rem' }}>
            George's drumming combines technical precision with creative improvisation.
            He draws inspiration from both traditional jazz rhythms and contemporary experimental techniques,
            creating a unique sound that bridges classical training with modern innovation.
          </p>
        </div>

        <div style={{
          backgroundColor: '#1e1e1e',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #333'
        }}>
          <h2 style={{ color: '#00d4ff', marginTop: 0 }}>Collaborations</h2>
          <p style={{ color: '#cccccc', lineHeight: '1.6', fontSize: '1.1rem' }}>
            George has performed with various ensembles and artists across Europe,
            contributing his distinctive rhythmic approach to diverse musical projects.
            His work continues to push the boundaries of contemporary percussion.
          </p>
        </div>

        <footer style={{
          marginTop: '4rem',
          textAlign: 'center',
          color: '#888',
          fontSize: '0.9em'
        }}>
          <p>🎸 George Hadow - Amsterdam-based drummer and avant-garde artist 🎸</p>
        </footer>
      </div>
    </div>
  );
}