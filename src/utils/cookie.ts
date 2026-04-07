import { serialize } from 'cookie';

export const setRefreshTokenCookie = (token: string) => {
  return serialize('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
};