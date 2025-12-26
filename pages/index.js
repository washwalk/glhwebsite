import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [manualGigs, setManualGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGig, setEditingGig] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // Load manual gigs from localStorage and check admin status
  useEffect(() => {
    const saved = localStorage.getItem('manualGigs');
    if (saved) {
      setManualGigs(JSON.parse(saved));
    }

    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Save manual gigs to localStorage
  const saveManualGigs = (newGigs) => {
    setManualGigs(newGigs);
    localStorage.setItem('manualGigs', JSON.stringify(newGigs));
  };

  useEffect(() => {
    async function fetchGigs() {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/gigs');
        setGigs(data);
      } catch (err) {
        console.error('Failed to fetch gigs:', err);
        setError('Failed to load concert data');
      } finally {
        setLoading(false);
      }
    }
    fetchGigs();
  }, []);

  // Combine and sort all gigs by date
  const allGigs = [...gigs, ...manualGigs].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date) - new Date(b.date);
  });

  const handleAddGig = (gigData) => {
    if (editingGig !== null) {
      // Update existing gig
      const updatedGigs = manualGigs.map((gig, idx) =>
        idx === editingGig ? { ...gigData, id: Date.now() } : gig
      );
      saveManualGigs(updatedGigs);
      setEditingGig(null);
    } else {
      // Add new gig
      const newGig = { ...gigData, id: Date.now() };
      saveManualGigs([...manualGigs, newGig]);
    }
    setShowAddForm(false);
  };

  const handleEditGig = (index) => {
    setEditingGig(index);
    setShowAddForm(true);
  };

  const handleDeleteGig = (index) => {
    if (confirm('Are you sure you want to delete this concert?')) {
      const updatedGigs = manualGigs.filter((_, idx) => idx !== index);
      saveManualGigs(updatedGigs);
    }
  };

  const handleAdminLogin = () => {
    // Simple password check - in production, use proper authentication
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'george2024';
    if (adminPassword === correctPassword) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '2rem' }}>George Hadow - Upcoming Concerts</h1>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {isAdmin ? (
          <>
            <button
              onClick={() => {
                setEditingGig(null);
                setShowAddForm(!showAddForm);
              }}
              style={{
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {showAddForm ? 'Cancel' : '+ Add Concert Manually'}
            </button>
            <button
              onClick={handleAdminLogout}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Admin Logout
            </button>
            <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓ Admin Mode</span>
          </>
        ) : (
          <button
            onClick={() => setShowAdminLogin(true)}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Admin Login
          </button>
        )}
      </div>

      {showAdminLogin && !isAdmin && (
        <div style={{
          border: '2px solid #0070f3',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Admin Login</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={handleAdminLogin}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowAdminLogin(false);
                setAdminPassword('');
              }}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showAddForm && (
        <ConcertForm
          onSubmit={handleAddGig}
          onCancel={() => {
            setShowAddForm(false);
            setEditingGig(null);
          }}
          initialData={editingGig !== null ? manualGigs[editingGig] : null}
        />
      )}

      {loading && <p>Loading concerts...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && allGigs.length === 0 && <p>No upcoming gigs found.</p>}

      {(!loading || manualGigs.length > 0) && allGigs.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allGigs.map((gig, idx) => {
            const isManual = manualGigs.some(mg => mg.id === gig.id);
            return (
              <li key={gig.id || idx} style={{
                margin: '1rem 0',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: isManual ? '#fff8e1' : '#f9f9f9',
                position: 'relative'
              }}>
                {isManual && (
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <button
                      onClick={() => handleEditGig(manualGigs.findIndex(mg => mg.id === gig.id))}
                      style={{
                        backgroundColor: '#ffa726',
                        color: 'white',
                        border: 'none',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGig(manualGigs.findIndex(mg => mg.id === gig.id))}
                      style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
                {isManual && (
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    left: '0.5rem',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '3px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    MANUAL
                  </div>
                )}
                <div style={{ paddingTop: isManual ? '2rem' : '0' }}>
                  <strong style={{ fontSize: '1.1em' }}>{gig.date}</strong> — {gig.venue}, {gig.city}{' '}
                  {gig.link && (
                    <a
                      href={gig.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#0070f3',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      Tickets
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#666', fontSize: '0.9em' }}>
        <p>Data sourced from <a href="https://kuhnfumusic.com/tour-dates" target="_blank" rel="noopener noreferrer">kuhnfumusic.com/tour-dates</a></p>
        <p>Manual concerts are stored locally in your browser</p>
      </footer>
    </div>
  );
}

function ConcertForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    date: '',
    venue: '',
    city: '',
    link: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ date: '', venue: '', city: '', link: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{
      border: '2px solid #0070f3',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>
        {initialData ? 'Edit Concert' : 'Add New Concert'}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Venue *
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Venue name"
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City, State"
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Ticket Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://..."
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {initialData ? 'Update Concert' : 'Add Concert'}
        </button>
      </div>
    </form>
  );
}