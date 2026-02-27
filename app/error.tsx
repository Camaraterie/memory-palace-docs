'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '1rem' }}>Something went wrong!</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        style={{ backgroundColor: 'var(--gold)', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginBottom: '1rem' }}
      >
        Try again
      </button>
      <Link href="/" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
        Return Home
      </Link>
    </div>
  );
}
