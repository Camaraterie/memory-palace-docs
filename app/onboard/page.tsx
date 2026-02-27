import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function OnboardPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          &larr; Back to Home
        </Link>
      </div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '2rem' }}>Onboarding Flow</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Placeholder for the interactive onboarding flow.</p>
    </main>
  );
}
