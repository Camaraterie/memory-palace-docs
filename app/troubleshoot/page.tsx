import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function TroubleshootPage() {
  const res = await fetch('https://m.cuer.ai/api/troubleshoot', { next: { revalidate: 3600 } });
  const markdown = await res.text();

  return (
    <main style={{ minHeight: '100vh', padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '2rem' }}>Troubleshooting Guide</h1>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
          {markdown}
        </pre>
      </div>
    </main>
  );
}
