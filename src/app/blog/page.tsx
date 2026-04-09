'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getBlogs, deleteBlog } from '../../features/blog/blog.service';

export default function BlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const query = `page=${page}&limit=${limit}&search=${search}`;
      const res = await getBlogs(query);
      setBlogs(res.data || []);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, [page, search]);

  const handleDelete = async (blog: any) => {
    if (!blog?.id) return alert('Invalid blog id');
    if (!confirm('Delete this blog?')) return;
    try {
      await deleteBlog(blog.id);
      fetchBlogs();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 600, color: '#111' }}>Blogs</h1>
        <Link href="/blog/create">
          <button style={{
            padding: '8px 18px', background: '#111', color: '#fff',
            border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer', fontWeight: 500
          }}>
            + New Blog
          </button>
        </Link>
      </div>

      {/* Search */}
      <input
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => { setPage(1); setSearch(e.target.value); }}
        style={{
          width: '100%', boxSizing: 'border-box', padding: '10px 14px',
          border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14,
          marginBottom: 24, outline: 'none', color: '#111'
        }}
      />

      {/* States */}
      {loading && <p style={{ color: '#6b7280', fontSize: 14 }}>Loading...</p>}
      {!loading && blogs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
          <p style={{ fontSize: 16, margin: 0 }}>No blogs found</p>
          <p style={{ fontSize: 13, marginTop: 6 }}>Create your first blog to get started</p>
        </div>
      )}

      {/* Blog list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {blogs.map((blog) => (
          <div key={blog.id} style={{
            border: '1px solid #e5e7eb', borderRadius: 10, padding: '18px 20px',
            background: '#fff'
          }}>
            {/* Title */}
            <h3
              onClick={() => router.push(`/blog/${blog.id}`)}
              style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 600, color: '#111', cursor: 'pointer' }}
            >
              {blog.title}
            </h3>

            {/* Preview */}
            <p style={{ margin: '0 0 6px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              {blog.content?.slice(0, 120)}...
            </p>

            {/* Date */}
            <p style={{ margin: '0 0 14px', fontSize: 12, color: '#9ca3af' }}>
              {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              {/* ✅ View button */}
              <button
                onClick={() => router.push(`/blog/${blog.id}`)}
                style={{
                  padding: '6px 14px', fontSize: 13, border: '1px solid #bfdbfe',
                  borderRadius: 6, background: '#eff6ff', cursor: 'pointer',
                  color: '#1d4ed8', fontWeight: 500
                }}
              >
                View
              </button>

              <button
                onClick={() => router.push(`/blog/edit/${blog.id}`)}
                style={{
                  padding: '6px 14px', fontSize: 13, border: '1px solid #d1d5db',
                  borderRadius: 6, background: '#fff', cursor: 'pointer',
                  color: '#374151', fontWeight: 500
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog)}
                style={{
                  padding: '6px 14px', fontSize: 13, border: '1px solid #fca5a5',
                  borderRadius: 6, background: '#fff', cursor: 'pointer',
                  color: '#dc2626', fontWeight: 500
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {blogs.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 32 }}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            style={{
              padding: '7px 16px', border: '1px solid #e5e7eb', borderRadius: 6,
              background: page === 1 ? '#f9fafb' : '#fff',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              color: page === 1 ? '#d1d5db' : '#374151', fontSize: 14
            }}
          >
            ← Prev
          </button>
          <span style={{ fontSize: 14, color: '#6b7280' }}>Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={blogs.length < limit}
            style={{
              padding: '7px 16px', border: '1px solid #e5e7eb', borderRadius: 6,
              background: blogs.length < limit ? '#f9fafb' : '#fff',
              cursor: blogs.length < limit ? 'not-allowed' : 'pointer',
              color: blogs.length < limit ? '#d1d5db' : '#374151', fontSize: 14
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}