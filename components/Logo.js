import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" style={{ textDecoration: 'none' }}>
      <div className="site-logo">
        George Hadow
      </div>
    </Link>
  );
}