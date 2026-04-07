import { blogRepository } from './blog.repository';

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

    return blogRepository.findAll({
      skip,
      take: limit,
      search,
    });
  }

  async getBlogById(id: string) {
    return blogRepository.findById(id);
  }

  async updateBlog(id: string, data: any) {
    return blogRepository.update(id, data);
  }

  async deleteBlog(id: string) {
    return blogRepository.delete(id);
  }
}

export const blogService = new BlogService();