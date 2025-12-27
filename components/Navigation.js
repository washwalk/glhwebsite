import Link from 'next/link';

export default function Navigation() {
  return (
    <nav style={{
      backgroundColor: '#f8f8f8',
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
          color: '#000000',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.25rem 0.75rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#000000';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#000000';
        }}
        >
          Home
        </Link>

        <Link href="/concerts" style={{
          color: '#000000',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.25rem 0.75rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#000000';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#000000';
        }}
        >
          Concerts
        </Link>

        <Link href="/about" style={{
          color: '#ffffff',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.25rem 0.75rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.color = '#000000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#ffffff';
        }}
        >
          About
        </Link>

        <Link href="/contact" style={{
          color: '#ffffff',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.25rem 0.75rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.color = '#000000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#ffffff';
        }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}