// app/api/auth/register/route.ts

import { authController } from '../../../../modules/auth/auth.controller';

export async function POST(req: Request) {
  return authController.register(req);
}