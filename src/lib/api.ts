import { getAccessToken, setAccessToken, clearAuth } from '../store/auth.store';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

let isRefreshing = false; // ✅ prevent multiple refresh calls at same time
let refreshQueue: Array<(token: string) => void> = []; // ✅ queue pending requests

const processQueue = (token: string) => {
  refreshQueue.forEach((resolve) => resolve(token));
  refreshQueue = [];
};

export const api: any = async (
  url: string,
  options: RequestInit = {},
  isRetry = false,
) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  if (res.status === 401 && !isRetry) {
    // ✅ if already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push((newToken: string) => {
          resolve(api(url, options, true));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // ✅ send refresh token cookie
        headers: { 'Content-Type': 'application/json' },
      });

      if (!refreshRes.ok) {
        throw new Error('Refresh failed');
      }

      const refreshData = await refreshRes.json();
      const newToken = refreshData.accessToken ?? refreshData.data?.accessToken;

      if (!newToken) throw new Error('No token received');

      setAccessToken(newToken);
      processQueue(newToken);

      return api(url, options, true); // ✅ retry original request
    } catch (err) {
      // ✅ refresh token bhi expire — force logout
      refreshQueue = [];
      clearAuth();

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }

      throw new Error('Session expired. Please log in again.');
    } finally {
      isRefreshing = false;
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};
