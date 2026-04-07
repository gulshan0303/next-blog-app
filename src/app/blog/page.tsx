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

  // 🔥 Fetch blogs
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

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  // 🔥 Delete blog
  const handleDelete = async (blog: any) => {
    console.log('DELETE BLOG:', blog);

    if (!blog?.id) {
      alert('Invalid blog id');
      return;
    }

    try {
      await deleteBlog(blog.id);
      alert('Blog deleted');

      fetchBlogs();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // 🔥 Edit blog (FIXED)
  const handleEdit = (blog: any) => {
    console.log('EDIT BLOG:', blog);

    if (!blog?.id) {
      alert('Invalid blog id');
      return;
    }

    router.push(`/blog/edit/${blog.id}`);
  };

  // 🔥 View blog
  const handleView = (blog: any) => {
    if (!blog?.id) return;

    router.push(`/blog/${blog.id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blogs</h1>

      {/* 🔍 Search */}
      <input
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        style={{
          marginBottom: '10px',
          padding: '8px',
          width: '300px',
        }}
      />

      {/* ➕ Create */}
      <div style={{ marginBottom: '15px' }}>
        <Link href="/blog/create">
          <button>Create Blog</button>
        </Link>
      </div>

      {/* ⏳ Loading */}
      {loading && <p>Loading...</p>}

      {/* ❌ Empty */}
      {!loading && blogs.length === 0 && <p>No blogs found</p>}

      {/* 📄 Blog List */}
      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            border: '1px solid #ddd',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          {/* 🔥 Title click */}
          <h3
            style={{ cursor: 'pointer' }}
            onClick={() => handleView(blog)}
          >
            {blog.title}
          </h3>

          <p>{blog.content?.slice(0, 100)}...</p>

          {/* 🔥 Actions */}
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => handleEdit(blog)}
              style={{ marginRight: '10px' }}
            >
              Edit
            </button>

            <button onClick={() => handleDelete(blog)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* 📄 Pagination */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: '10px' }}
        >
          Prev
        </button>

        <span>Page: {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}