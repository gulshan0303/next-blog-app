import { prisma } from '../../lib/prisma';

export class AuthRepository {
  async createUser(data: any) {
    return prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
}

export const authRepository = new AuthRepository();