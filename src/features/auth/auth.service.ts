import { api } from '../../lib/api';
import { setAccessToken, clearAuth } from '../../store/auth.store';

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  // ✅ save token after login
  const token = res.accessToken ?? res.data?.accessToken;
  if (token) setAccessToken(token);

  return res;
};

export const registerUser = (data: { email: string; password: string }) => {
  return api('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const refreshToken = () => {
  return api('/auth/refresh', {
    method: 'POST',
  });
};

export const logoutUser = async () => {
  clearAuth(); // ✅ clear token on logout
  return api('/auth/logout', {
    method: 'POST',
  });
};
