'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = session?.user?.id || 'dev-user-001';

      try {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser({
            id: 'dev-user-001',
            email: 'dev@example.com',
            fullName: 'Development User',
            plan: 'premium',
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser({
          id: 'dev-user-001',
          email: 'dev@example.com',
          fullName: 'Development User',
          plan: 'premium',
        });
      }
    };

    fetchUser();
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ user, loading: status === 'loading' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
