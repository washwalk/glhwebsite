import { useState } from 'react';
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

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      color: '#000000',
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
          color: '#333333',
          marginBottom: '2rem',
          fontSize: '1.5rem'
        }}>Contact</h1>

        <div style={{
          marginBottom: '3rem'
        }}>
          <p style={{ color: '#666666', lineHeight: '1.6', fontSize: '1rem' }}>
            Get in touch with George Hadow for booking inquiries, collaboration opportunities,
            or any questions about his music and performances.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="name" style={{
                display: 'block',
                color: '#333333',
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
                color: '#333333',
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
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: '#ffffff',
                  color: '#000000'
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" style={{
              display: 'block',
              color: '#333333',
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
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
            />
          </div>

          <div>
            <label htmlFor="message" style={{
              display: 'block',
              color: '#333333',
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
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                color: '#000000',
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
              backgroundColor: '#000000',
              color: '#ffffff',
              border: '1px solid #000000',
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
            Sorry, there was an error sending your message. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
}