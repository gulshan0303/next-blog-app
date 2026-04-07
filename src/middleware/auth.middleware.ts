import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = (req: Request) => {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) throw new Error('Unauthorized');

    const token = authHeader.split(' ')[1];

    const decoded = verifyAccessToken(token);

    return decoded;
  } catch (error) {
    throw new Error('Unauthorized');
  }
};