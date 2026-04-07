import { authService } from './auth.service';

export class AuthController {
  async register(req: Request) {
    try {
      const body = await req.json();

      const result = await authService.register(body);

      return Response.json({
        success: true,
        data: result,
      });
    } catch (error) {
      return Response.json(
        { success: false, message: 'Something went wrong' },
        { status: 500 },
      );
    }
  }
}

export const authController = new AuthController();