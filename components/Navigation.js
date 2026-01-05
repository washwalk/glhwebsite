import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
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
           color: router.pathname === '/' ? 'var(--text-color)' : 'var(--secondary-text)',
           backgroundColor: router.pathname === '/' ? 'var(--hover-bg)' : 'transparent',
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
           color: router.pathname === '/concerts' ? 'var(--text-color)' : 'var(--secondary-text)',
           backgroundColor: router.pathname === '/concerts' ? 'var(--hover-bg)' : 'transparent',
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
           color: router.pathname === '/about' ? 'var(--text-color)' : 'var(--secondary-text)',
           backgroundColor: router.pathname === '/about' ? 'var(--hover-bg)' : 'transparent',
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
           color: router.pathname === '/contact' ? 'var(--text-color)' : 'var(--secondary-text)',
           backgroundColor: router.pathname === '/contact' ? 'var(--hover-bg)' : 'transparent',
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