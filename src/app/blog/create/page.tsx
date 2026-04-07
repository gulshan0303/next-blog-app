'use client';

import { useState } from 'react';
import { createBlog } from '../../../features/blog/blog.service';

export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async () => {
    try {
      await createBlog({ title, content });

      alert('Blog created');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Create Blog</h1>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleCreate}>Create</button>
    </div>
  );
}