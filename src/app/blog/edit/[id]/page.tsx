'use client';

import { useEffect, useState } from 'react';
import { getBlogById, updateBlog } from '../../../../features/blog/blog.service';
import { useRouter } from 'next/navigation';

export default function EditBlog({ params }: any) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await getBlogById(params.id);
    setTitle(res.data.title);
    setContent(res.data.content);
  };

  const handleUpdate = async () => {
    await updateBlog(params.id, { title, content });

    alert('Updated');
    router.push('/blog');
  };

  return (
    <div>
      <h1>Edit Blog</h1>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}