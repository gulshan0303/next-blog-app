import { authService } from './auth.service';
import { setRefreshTokenCookie } from '../../utils/cookie';
  // auth.controller.ts

import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { parse } from 'cookie';


export class AuthController {
  async register(req: Request) {
    try {
      const body = await req.json();
      const user = await authService.register(body);

      return Response.json({ success: true, data: user });
    } catch (error: any) {
      return Response.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }
  }

  async login(req: Request) {
    try {
      const body = await req.json();

      const { accessToken, refreshToken, user } =
        await authService.login(body);

      return new Response(
        JSON.stringify({
          success: true,
          accessToken,
          user,
        }),
        {
          headers: {
            'Set-Cookie': setRefreshTokenCookie(refreshToken),
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error: any) {
      return Response.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }
  }


async refresh(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);

    const refreshToken = cookies.refreshToken;
    if (!refreshToken) throw new Error('Unauthorized');

    const decoded: any = verifyRefreshToken(refreshToken);

    const payload = {
      userId: decoded.userId,
      role: decoded.role,
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    return new Response(
      JSON.stringify({
        success: true,
        accessToken: newAccessToken,
      }),
      {
        headers: {
          'Set-Cookie': setRefreshTokenCookie(newRefreshToken),
        },
      },
    );
  } catch (error) {
    return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
}

logout() {
  return new Response(
    JSON.stringify({ success: true, message: 'Logged out' }),
    {
      headers: {
        'Set-Cookie': 'refreshToken=; HttpOnly; Path=/; Max-Age=0',
      },
    },
  );
}

}

export const authController = new AuthController();