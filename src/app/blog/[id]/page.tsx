'use client';

import { useEffect, useState } from 'react';
import { getBlogById } from '../../../features/blog/blog.service';

export default function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await getBlogById(params.id);
    setBlog(res.data);
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}