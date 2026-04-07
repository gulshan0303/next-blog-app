'use client';

import { useEffect, useState } from 'react';
import { refreshToken } from '../features/auth/auth.service';
import { setAccessToken } from '../store/auth.store';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await refreshToken();

        setAccessToken(res.accessToken);
      } catch (err) {
        // user not logged in → ignore
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}