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
      let msg: string;
      if (e?.status === 401) {
        msg = 'Invalid email or password';
      } else if (e?.name === 'AbortError' || (e instanceof DOMException && e.name === 'AbortError')) {
        msg = 'Server is taking too long to respond. It may be restarting — please try again in a moment.';
      } else if (e instanceof TypeError) {
        msg = 'Unable to reach the server. Check your internet connection.';
      } else {
        msg = e?.message || 'Unable to connect to the server';
      }
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
