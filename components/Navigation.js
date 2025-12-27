import Link from 'next/link';

export default function Navigation() {
  return (
    <nav style={{
      backgroundColor: 'var(--nav-bg)',
      padding: '0.5rem',
      borderBottom: '1px solid var(--border-color)',
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
          color: 'var(--secondary-text)',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.125rem 0.5rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
          e.currentTarget.style.color = 'var(--text-color)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--secondary-text)';
        }}
        >
          Home
        </Link>

        <Link href="/concerts" style={{
          color: 'var(--secondary-text)',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.125rem 0.5rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
          e.currentTarget.style.color = 'var(--text-color)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--secondary-text)';
        }}
        >
          Concerts
        </Link>

        <Link href="/about" style={{
          color: 'var(--secondary-text)',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.125rem 0.5rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
          e.currentTarget.style.color = 'var(--text-color)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--secondary-text)';
        }}
        >
          About
        </Link>

        <Link href="/contact" style={{
          color: 'var(--secondary-text)',
          textDecoration: 'none',
          fontSize: '1rem',
          padding: '0.125rem 0.5rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
          e.currentTarget.style.color = 'var(--text-color)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--secondary-text)';
        }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}