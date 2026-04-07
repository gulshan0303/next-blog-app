// app/api/blog/create/route.ts

import { authMiddleware } from '../../../../middleware/auth.middleware';

export async function POST(req: Request) {
  try {
    const user = authMiddleware(req);

    // userId mil gaya → authorized
    return Response.json({
      success: true,
      message: 'Authorized',
      user,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 },
    );
  }
}