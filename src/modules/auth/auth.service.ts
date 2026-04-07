import bcrypt from 'bcrypt';
import { authRepository } from './auth.repository';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/jwt';

export class AuthService {
  async register(data: any) {
    const { email, password } = data;

    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authRepository.createUser({
      email,
      password: hashedPassword,
    });

    return user;
  }

  async login(data: any) {
    const { email, password } = data;

    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const payload = { userId: user.id, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken, user };
  }
}

export const authService = new AuthService();