'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getBlogById } from '../../../features/blog/blog.service';

export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ Next.js 15 fix
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id === 'undefined') {
      router.push('/blog');
      return;
    }

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await getBlogById(id);

        // ✅ handle both { data: blog } and blog directly
        setBlog(res?.data ?? res);
      } catch (err: any) {
        alert(err.message);
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ color: '#6b7280' }}>Loading...</p>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>

      {/* Back */}
      <button
        onClick={() => router.push('/blog')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#6b7280', fontSize: 14, padding: 0, marginBottom: 28
        }}
      >
        ← Back to blogs
      </button>

      {/* Blog card */}
      <div style={{
        border: '1px solid #e5e7eb', borderRadius: 12,
        padding: '32px 36px', background: '#fff'
      }}>
        {/* Title */}
        <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 700, color: '#111', lineHeight: 1.3 }}>
          {blog.title}
        </h1>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 28, fontSize: 13, color: '#9ca3af' }}>
          {blog.createdAt && (
            <span>
              {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </span>
          )}
          {blog.author?.email && <span>By {blog.author.email}</span>}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#f3f4f6', marginBottom: 28 }} />

        {/* Content */}
        <p style={{
          margin: 0, fontSize: 16, color: '#374151',
          lineHeight: 1.8, whiteSpace: 'pre-wrap'
        }}>
          {blog.content}
        </p>
      </div>

      {/* Footer actions */}
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <button
          onClick={() => router.push(`/blog/edit/${blog.id}`)}
          style={{
            padding: '8px 20px', fontSize: 14, border: '1px solid #d1d5db',
            borderRadius: 6, background: '#fff', cursor: 'pointer',
            color: '#374151', fontWeight: 500
          }}
        >
          Edit
        </button>
        <button
          onClick={() => router.push('/blog')}
          style={{
            padding: '8px 20px', fontSize: 14, border: 'none',
            borderRadius: 6, background: '#111', cursor: 'pointer',
            color: '#fff', fontWeight: 500
          }}
        >
          All Blogs
        </button>
      </div>
    </div>
  );
}