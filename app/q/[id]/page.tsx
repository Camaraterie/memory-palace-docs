import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [];
}

export default async function MemoryCapsulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main style={{ minHeight: '100vh', padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          &larr; Back to Home
        </Link>
      </div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '2rem' }}>Memory Capsule: {id}</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        This is a placeholder for the memory capsule viewer.
      </p>
      <Link href={`/q/${id}/skill`} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
        View Fork Skill
      </Link>
    </main>
  );
}
