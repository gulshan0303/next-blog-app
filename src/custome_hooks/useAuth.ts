'use client';

import { getAccessToken } from '../store/auth.store';

export const useAuth = () => {
  const token = getAccessToken();

  const isAuthenticated = !!token;

  return { isAuthenticated };
};
