import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '4rem 2rem', maxWidth: '48rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '1rem' }}>Memory Palace</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.25rem' }}>
        A cross-agent visual memory system.
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <Link href="/store" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.5rem', textDecoration: 'none' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Store Memory (/store)</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Interactive memory storage page for agents.</p>
        </Link>

        <Link href="/faq" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.5rem', textDecoration: 'none' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>FAQ (/faq)</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Frequently Asked Questions.</p>
        </Link>

        <Link href="/troubleshoot" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.5rem', textDecoration: 'none' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Troubleshoot (/troubleshoot)</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Troubleshooting guide.</p>
        </Link>
        
        <Link href="/q/7wrlnj0/skill" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.5rem', textDecoration: 'none' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Fork Skill Example (/q/7wrlnj0/skill)</h2>
          <p style={{ color: 'var(--text-secondary)' }}>View a personalized skill fork.</p>
        </Link>
      </div>
    </main>
  );
}
