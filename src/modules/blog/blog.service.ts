import { blogRepository } from './blog.repository';
import { redis } from '../../lib/redis';
import { AppError } from '../../utils/AppError';

export class BlogService {
  // ✅ Invalidate all blog list caches after write
  private async invalidateBlogCache(id?: string) {
    const keys = await redis.keys('blogs:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    // also clear single blog cache if id provided
    if (id) {
      await redis.del(`blog:${id}`);
    }
  }

  async createBlog(data: any, userId: string) {
    const blog = await blogRepository.create({
      ...data,
      authorId: userId,
    });

    await this.invalidateBlogCache(); // ✅ clear list cache

    return blog;
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

    const blogs = await blogRepository.findAll({ skip, take: limit, search });

    await redis.set(cacheKey, JSON.stringify(blogs), 'EX', 60);

    return blogs;
  }

  async getBlogById(id: string) {
    const cacheKey = `blog:${id}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached); // ✅ also cache single blog
    }

    const blog = await blogRepository.findById(id);

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    await redis.set(cacheKey, JSON.stringify(blog), 'EX', 60);

    return blog;
  }

  async updateBlog(id: string, data: any) {
    const blog = await blogRepository.update(id, data);

    await this.invalidateBlogCache(id); // ✅ clear list + single cache

    return blog;
  }

  async deleteBlog(id: string) {
    const blog = await blogRepository.delete(id);

    await this.invalidateBlogCache(id); // ✅ clear list + single cache

    return blog;
  }
}

export const blogService = new BlogService();
