import { api } from '../../lib/api';

export const createBlog = (data: { title: string; content: string }) => {
  return api('/blog', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getBlogs = (query: string) => {
  return api(`/blog?${query}`);
};

export const getBlogById = (id: string) => {
  return api(`/blog/${id}`);
};

export const updateBlog = (id: string, data: any) => {
  return api(`/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteBlog = (id: string) => {
  return api(`/blog/${id}`, {
    method: 'DELETE',
  });
};
