import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthSession } from '../models';
import { login as doLogin, restoreSession, clearSession } from '../services/auth';

interface AuthState {
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore session on mount
  useEffect(() => {
    restoreSession()
      .then(setSession)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const s = await doLogin({ email, password });
      setSession(s);
    } catch (e: any) {
      const msg =
        e?.status === 401
          ? 'Invalid email or password'
          : e?.message || 'Unable to connect to the server';
      setError(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await clearSession();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
