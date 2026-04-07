'use client';

import { useAuth } from '../custome_hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // 🔥 redirect
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  return <>{children}</>;
}