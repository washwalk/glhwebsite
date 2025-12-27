import Link from 'next/link';

export default function Navigation() {
  return (
    <nav style={{
      backgroundColor: '#ffffff',
      padding: '0.75rem',
      borderBottom: '1px solid #e0e0e0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem'
      }}>
        <Link href="/" style={{
          color: '#666666',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.25rem 0.75rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.color = '#000000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#666666';
        }}
        >
          Home
        </Link>

        <Link href="/concerts" style={{
          color: '#666666',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.25rem 0.75rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.color = '#000000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#666666';
        }}
        >
          Concerts
        </Link>

        <Link href="/about" style={{
          color: '#666666',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.25rem 0.75rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.color = '#000000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#666666';
        }}
        >
          About
        </Link>

        <Link href="/contact" style={{
          color: '#666666',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.25rem 0.75rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.color = '#000000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#666666';
        }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}