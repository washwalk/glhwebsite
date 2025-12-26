import Link from 'next/link';

export default function Navigation() {
  return (
    <nav style={{
      backgroundColor: '#1e1e1e',
      padding: '1rem',
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
        gap: '2rem'
      }}>
        <Link href="/" style={{
          color: '#00d4ff',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#00d4ff';
          e.currentTarget.style.color = '#121212';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#00d4ff';
        }}
        >
          Home
        </Link>

        <Link href="/concerts" style={{
          color: '#ff6b35',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ff6b35';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#ff6b35';
        }}
        >
          Concerts
        </Link>

        <Link href="/about" style={{
          color: '#4caf50',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#4caf50';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#4caf50';
        }}
        >
          About
        </Link>
      </div>
    </nav>
  );
}