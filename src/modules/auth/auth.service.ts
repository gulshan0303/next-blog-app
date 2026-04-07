export class AuthService {
  async register(data: any) {
    // abhi dummy return
    return {
      message: 'User registered successfully',
      data,
    };
  }
}

export const authService = new AuthService();