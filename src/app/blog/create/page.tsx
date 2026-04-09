'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog } from '../../../features/blog/blog.service';

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) return alert('Fill in all fields');
    try {
      setLoading(true);
      await createBlog({ title, content });
      router.push('/blog'); // ✅ redirect after create
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 28 }}>
        <button
          onClick={() => router.push('/blog')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 14, padding: 0 }}
        >
          ← Back to blogs
        </button>
        <h1 style={{ margin: '8px 0 0', fontSize: 24, fontWeight: 600, color: '#111' }}>Create Blog</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
            Title
          </label>
          <input
            placeholder="Enter blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 14px',
              border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 15,
              outline: 'none', color: '#111'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
            Content
          </label>
          <textarea
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 14px',
              border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 15,
              outline: 'none', color: '#111', resize: 'vertical', lineHeight: 1.6,
              fontFamily: 'system-ui, sans-serif'
            }}
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={loading}
          style={{
            padding: '11px', background: loading ? '#9ca3af' : '#111', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </div>
    </div>
  );
}