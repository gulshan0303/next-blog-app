import { blogService } from './blog.service';
import { authMiddleware } from '../../middleware/auth.middleware';
import { createBlogSchema } from './blog.schema';
import { validate } from '../../utils/validate';
export class BlogController {
  async create(req: Request) {
    try {
      const user: any = authMiddleware(req);
      const body = await req.json();

       const validatedData = await validate(createBlogSchema, body);

      const blog = await blogService.createBlog(validatedData, user.userId);

      return Response.json({ success: true, data: blog });
    } catch (error: any) {
      return Response.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }
  }

  async getAll(req: Request) {
    try {
      const { searchParams } = new URL(req.url);

      const query = {
        page: searchParams.get('page'),
        limit: searchParams.get('limit'),
        search: searchParams.get('search'),
      };

      const blogs = await blogService.getBlogs(query);

      return Response.json({ success: true, data: blogs });
    } catch (error: any) {
      return Response.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }
  }

  async getById(id: string) {
     console.log('controller id:', id); 
    const blog = await blogService.getBlogById(id);
    return Response.json({ success: true, data: blog });
  }

  async update(req: Request, id: string) {
    const body = await req.json();
    const blog = await blogService.updateBlog(id, body);

    return Response.json({ success: true, data: blog });
  }

  async delete(id: string) {
    await blogService.deleteBlog(id);

    return Response.json({ success: true, message: 'Deleted' });
  }
}

export const blogController = new BlogController();