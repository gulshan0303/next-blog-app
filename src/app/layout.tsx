// app/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuth } from '../store/auth.store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // ✅ agar ek tab mein logout hua to dusre tabs bhi logout ho jayenge
    const handleLogout = () => {
      router.push('/login');
    };

    window.addEventListener('auth:logout', handleLogout);

    // ✅ dusre tabs ke localStorage changes bhi sun
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'accessToken' && !e.newValue) {
        router.push('/login');
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('auth:logout', handleLogout);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}