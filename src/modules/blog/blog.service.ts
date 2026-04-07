import { blogRepository } from './blog.repository';
import { redis } from '../../lib/redis';
import { AppError } from '../../utils/AppError';

export class BlogService {
  async createBlog(data: any, userId: string) {
    return blogRepository.create({
      ...data,
      authorId: userId,
    });
  }

  async getBlogs(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';

    const skip = (page - 1) * limit;

    const cacheKey = `blogs:${JSON.stringify(query)}`;

    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const blogs = await blogRepository.findAll({
      skip,
      take: limit,
      search,
    });
    await redis.set(cacheKey, JSON.stringify(blogs), 'EX', 60);
    return blogs;
  }

  async getBlogById(id: string) {
    const blog = await blogRepository.findById(id);

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    return blog;
  }

  async updateBlog(id: string, data: any) {
    return blogRepository.update(id, data);
  }

  async deleteBlog(id: string) {
    return blogRepository.delete(id);
  }
}

export const blogService = new BlogService();
