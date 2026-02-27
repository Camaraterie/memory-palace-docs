'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function StorePageContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; short_id?: string; error?: string } | null>(null);

  const auth = searchParams.get('auth');
  const session_name = searchParams.get('session_name') || searchParams.get('session') || '';
  const agent = searchParams.get('agent') || '';
  const status = searchParams.get('status') || '';
  const outcome = searchParams.get('outcome') || 'succeeded';
  const built = searchParams.get('built') ? searchParams.get('built')?.split(',') : [];
  const decisions = searchParams.get('decisions') ? searchParams.get('decisions')?.split(',') : [];
  const next_steps = searchParams.get('next') ? searchParams.get('next')?.split(',') : [];
  const files = searchParams.get('files') ? searchParams.get('files')?.split(',') : [];
  const blockers = searchParams.get('blockers') ? searchParams.get('blockers')?.split(',') : [];
  const context = searchParams.get('context') || searchParams.get('conversation_context') || '';
  const template = searchParams.get('template') || '';

  const handleStore = async () => {
    setLoading(true);
    setResult(null);

    try {
      const payload = {
        session_name,
        agent,
        status,
        outcome,
        built,
        decisions,
        next_steps,
        files,
        blockers,
        conversation_context: context,
        roster: {},
        metadata: template ? { fork_template: template } : {}
      };

      // Base64url encode
      const encoded = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      
      const res = await fetch(`https://m.cuer.ai/api/ingest?auth=${auth}&data=${encoded}`);
      const data = await res.json();

      if (res.ok) {
        setResult({ success: true, short_id: data.short_id });
      } else {
        setResult({ success: false, error: data.error || 'Failed to store memory' });
      }
    } catch (err: any) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (result?.success) {
    return (
      <div style={{ padding: '2rem', maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '1rem' }}>Memory Stored Successfully!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Please report this short ID back to the agent:
        </p>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '0.5rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          {result.short_id}
        </div>
        <Link href={`/q/${result.short_id}`} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
          View Capsule
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
      
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '2rem' }}>Store Memory</h1>
      
      <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Preview</h2>
        
        <div style={{ display: 'grid', gap: '1rem', color: 'var(--text-secondary)' }}>
          <div><strong style={{ color: 'var(--text-primary)' }}>Session:</strong> {session_name}</div>
          <div><strong style={{ color: 'var(--text-primary)' }}>Agent:</strong> {agent}</div>
          <div><strong style={{ color: 'var(--text-primary)' }}>Status:</strong> {status}</div>
          <div><strong style={{ color: 'var(--text-primary)' }}>Outcome:</strong> {outcome}</div>
          
          {built && built.length > 0 && (
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Built:</strong>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                {built.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
          
          {decisions && decisions.length > 0 && (
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Decisions:</strong>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                {decisions.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
          
          {next_steps && next_steps.length > 0 && (
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Next Steps:</strong>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                {next_steps.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
          
          {context && (
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Context:</strong>
              <p style={{ marginTop: '0.5rem' }}>{context}</p>
            </div>
          )}
        </div>
      </div>

      {result?.error && (
        <div style={{ backgroundColor: '#3a1510', color: '#ff4e00', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid #ff4e00' }}>
          <strong>Error:</strong> {result.error}
        </div>
      )}

      <button 
        onClick={handleStore}
        disabled={loading || !auth}
        style={{ 
          backgroundColor: 'var(--gold)', 
          color: '#000', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '0.5rem', 
          fontWeight: 'bold',
          fontSize: '1.125rem',
          width: '100%',
          cursor: loading || !auth ? 'not-allowed' : 'pointer',
          opacity: loading || !auth ? 0.7 : 1,
          border: 'none'
        }}
      >
        {loading ? 'Storing...' : 'Confirm & Store →'}
      </button>
      
      {!auth && (
        <p style={{ color: '#ff4e00', marginTop: '1rem', textAlign: 'center' }}>
          Missing auth token in URL.
        </p>
      )}
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>}>
      <StorePageContent />
    </Suspense>
  );
}
