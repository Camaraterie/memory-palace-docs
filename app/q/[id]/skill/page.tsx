import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [];
}

export default async function ForkSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const res = await fetch(`https://m.cuer.ai/api/fork?id=${id}`);
  
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch fork skill');
  }
  
  const markdown = await res.text();

  return (
    <main style={{ minHeight: '100vh', padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href={`/q/${id}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} />
          Back to Capsule
        </Link>
      </div>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
          {markdown}
        </pre>
      </div>
    </main>
  );
}
