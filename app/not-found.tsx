import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '1rem' }}>Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Could not find requested resource</p>
      <Link href="/" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
        Return Home
      </Link>
    </div>
  );
}
