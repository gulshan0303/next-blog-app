import { prisma } from '../../lib/prisma';

export class BlogRepository {
  async create(data: any) {
    return prisma.blog.create({ data });
  }

  async findAll({ skip, take, search }: any) {
    return prisma.blog.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.blog.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return prisma.blog.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.blog.delete({
      where: { id },
    });
  }
}

export const blogRepository = new BlogRepository();