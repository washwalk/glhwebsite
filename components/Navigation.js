import Link from 'next/link';

export default function Navigation() {
  return (
    <nav style={{
      backgroundColor: '#000000',
      padding: '0.75rem',
      borderBottom: '1px solid #333',
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
          Home
        </Link>

        <Link href="/concerts" style={{
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
      </div>
    </nav>
  );
}