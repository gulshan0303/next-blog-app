import { blogService } from './blog.service';
import { blogRepository } from './blog.repository';

jest.mock('./blog.repository');

describe('Blog Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create blog', async () => {
    (blogRepository.create as jest.Mock).mockResolvedValue({
      title: 'Test Blog',
    });

    const result = await blogService.createBlog(
      { title: 'Test Blog', content: 'content' },
      'user-id',
    );

    expect(result.title).toBe('Test Blog');
  });
});
