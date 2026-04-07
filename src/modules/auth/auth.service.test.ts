import { authService } from './auth.service';
import { authRepository } from './auth.repository';

jest.mock('./auth.repository');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // 🔥 important
  });

  it('should register new user', async () => {
    (authRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

    (authRepository.createUser as jest.Mock).mockResolvedValue({
      email: 'test@test.com',
    });

    const result = await authService.register({
      email: 'test@test.com',
      password: '123456',
    });

    expect(result.email).toBe('test@test.com');
  });

  it('should throw error if user already exists', async () => {
    (authRepository.findUserByEmail as jest.Mock).mockResolvedValue({
      email: 'test@test.com',
    });

    await expect(
      authService.register({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toThrow('User already exists');
  });
});
