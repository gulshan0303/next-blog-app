import { getAccessToken, setAccessToken } from '../store/auth.store';
import { refreshToken } from '../features/auth/auth.service';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api: any = async (url: string, options: RequestInit = {}) => {
  let token = getAccessToken();

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  // 🔥 If token expired → refresh
  if (res.status === 401) {
    try {
      const refreshRes = await refreshToken();

      setAccessToken(refreshRes.accessToken);

      // retry original request
      return api(url, options);
    } catch (err) {
      throw new Error('Session expired');
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error');
  }

  return data;
};
