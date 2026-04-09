'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../features/auth/auth.service';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await registerUser({ email, password });
      router.push('/login'); // ✅ redirect to login after register
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9ca3af', margin: '0 0 6px' }}>
          Get started
        </p>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: '#111' }}>Create your account</h1>
        <div style={{ width: 32, height: 2, background: '#e5e7eb', marginTop: 16 }} />
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Email */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 14px',
              border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 15,
              outline: 'none', color: '#111'
            }}
          />
        </div>

        {/* Password */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 characters"
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 14px',
              border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 15,
              outline: 'none', color: '#111'
            }}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
            Confirm password
          </label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter your password"
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 14px',
              border: `1px solid ${confirm && confirm !== password ? '#fca5a5' : '#e5e7eb'}`,
              borderRadius: 8, fontSize: 15, outline: 'none', color: '#111'
            }}
          />
          {/* inline mismatch hint */}
          {confirm && confirm !== password && (
            <p style={{ margin: '5px 0 0', fontSize: 12, color: '#dc2626' }}>
              Passwords do not match
            </p>
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: 8, padding: '10px 14px'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: 13, color: '#dc2626' }}>{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '11px', background: loading ? '#9ca3af' : '#111', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4
          }}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>

      </form>

      {/* Footer */}
      <p style={{ marginTop: 24, fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#374151', fontWeight: 500, textDecoration: 'none' }}>
          Sign in
        </a>
      </p>

    </div>
  );
}