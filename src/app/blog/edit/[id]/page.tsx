'use client';

import { useEffect, useState, use } from 'react'; // ✅ import `use`
import { useRouter } from 'next/navigation';
import { getBlogById, updateBlog } from '../../../../features/blog/blog.service';

export default function EditBlog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap params with `use()`
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id || id === 'undefined') {
      alert('Invalid blog ID');
      router.push('/blog');
      return;
    }

    const fetchBlog = async () => {
      try {
        setFetching(true);
        const res = await getBlogById(id);

        console.log('edit res :>>', res);

        const blog = res?.data ?? res;

        if (!blog?.title) throw new Error('Blog data missing');

        setTitle(blog.title);
        setContent(blog.content);
      } catch (err: any) {
        alert(err.message);
        router.push('/blog');
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) return alert('Fill in all fields');
    try {
      setLoading(true);
      await updateBlog(id, { title, content });
      router.push('/blog');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ color: '#6b7280' }}>Loading blog...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 28 }}>
        <button
          onClick={() => router.push('/blog')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 14, padding: 0 }}
        >
          ← Back to blogs
        </button>
        <h1 style={{ margin: '8px 0 0', fontSize: 24, fontWeight: 600, color: '#111' }}>Edit Blog</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Title</label>
          <input
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
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Content</label>
          <textarea
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
          onClick={handleUpdate}
          disabled={loading}
          style={{
            padding: '11px', background: loading ? '#9ca3af' : '#111', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}