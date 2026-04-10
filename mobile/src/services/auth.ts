import * as SecureStore from 'expo-secure-store';
import type { AuthSession, LoginRequest, LoginResponse } from '../models';
import { apiFetch, setApiToken, setApiTenantKey } from './api';

const TOKEN_KEY = 'crm_session';

export async function login(credentials: LoginRequest): Promise<AuthSession> {
  const res = await apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  const session: AuthSession = {
    accessToken: res.accessToken,
    expiresAtUtc: res.expiresAtUtc,
    email: res.email,
    fullName: res.fullName,
    roles: res.roles,
    permissions: res.permissions,
    tenantKey: res.tenantKey,
  };

  // Persist & activate
  await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(session));
  setApiToken(session.accessToken);
  setApiTenantKey(session.tenantKey);

  return session;
}

export async function restoreSession(): Promise<AuthSession | null> {
  const raw = await SecureStore.getItemAsync(TOKEN_KEY);
  if (!raw) return null;

  try {
    const session: AuthSession = JSON.parse(raw);

    // Check expiry
    if (new Date(session.expiresAtUtc) <= new Date()) {
      await clearSession();
      return null;
    }

    // Activate token
    setApiToken(session.accessToken);
    setApiTenantKey(session.tenantKey);
    return session;
  } catch {
    await clearSession();
    return null;
  }
}

export async function clearSession(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  setApiToken(null);
}
