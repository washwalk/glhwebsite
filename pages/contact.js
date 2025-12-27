import { useState } from 'react';
import Head from 'next/head';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        console.error('Contact form error:', data.error);
      }
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        minHeight: '100vh'
      }}>
        <Logo />
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
            color: 'var(--heading-color)',
            marginBottom: '2rem',
            fontSize: '1.5rem'
          }}>Contact</h1>

          <p style={{ color: 'var(--secondary-text)', lineHeight: '1.6', fontSize: '1rem', marginBottom: '2rem' }}>
            Get in touch with George Hadow for booking inquiries, collaboration opportunities,
            or any questions about his music and performances.
          </p>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="name" style={{
                  display: 'block',
                  color: 'var(--heading-color)',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    backgroundColor: '#ffffff',
                    color: '#000000'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="email" style={{
                  display: 'block',
                  color: 'var(--heading-color)',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-color)'
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" style={{
                display: 'block',
                color: 'var(--heading-color)',
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-color)'
                  }}
              />
            </div>

            <div>
              <label htmlFor="message" style={{
                display: 'block',
                color: 'var(--heading-color)',
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-color)',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--button-bg)',
                color: 'var(--button-text)',
                border: '1px solid var(--button-bg)',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1,
                alignSelf: 'flex-start'
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {submitStatus === 'success' && (
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: '#f0f8f0',
              color: '#2d5016',
              borderRadius: '4px',
              border: '1px solid #4caf50'
            }}>
              Thank you for your message! George will get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              borderRadius: '4px',
              border: '1px solid #ef4444'
            }}>
              Sorry, there was an error sending your message. Please try again later or contact directly at georgehadow@gmail.com.
            </div>
          )}
        </div>
      </div>
    </>
  );
}