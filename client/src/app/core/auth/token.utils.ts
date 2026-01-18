const STORAGE_KEY = 'auth_token';
const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const PERMISSION_CLAIM = 'crm:permission';
const USER_ID_CLAIMS = [
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  'sub'
];
const EMAIL_CLAIMS = [
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  'email'
];

export interface TokenPayload {
  exp?: number;
  [claim: string]: unknown;
}

export interface TokenContext {
  token: string;
  payload: TokenPayload;
}

export function saveToken(token: string) {
  localStorage.setItem(STORAGE_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(STORAGE_KEY);
}

export function readTokenContext(): TokenContext | null {
  const token = localStorage.getItem(STORAGE_KEY);
  if (!token) {
    return null;
  }

  const payload = decodeTokenPayload(token);
  if (!payload) {
    clearToken();
    return null;
  }

  if (isExpired(payload)) {
    clearToken();
    return null;
  }

  return { token, payload };
}

export function tokenHasRole(payload: TokenPayload | null, role: string) {
  return hasClaimValue(payload, ROLE_CLAIM, role);
}

export function tokenHasPermission(payload: TokenPayload | null, permission: string) {
  return hasClaimValue(payload, PERMISSION_CLAIM, permission);
}

export function readUserId(): string | null {
  const context = readTokenContext();
  if (!context) {
    return null;
  }

  const payload = context.payload;
  for (const claim of USER_ID_CLAIMS) {
    const value = payload[claim];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return null;
}

export function readUserEmail(): string | null {
  const context = readTokenContext();
  if (!context) {
    return null;
  }

  const payload = context.payload;
  for (const claim of EMAIL_CLAIMS) {
    const value = payload[claim];
    if (typeof value === 'string' && value.trim()) {
      return value.trim().toLowerCase();
    }
  }

  return null;
}

function decodeTokenPayload(token: string): TokenPayload | null {
  try {
    const [, payload = ''] = token.split('.');
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
    const decoded = atob(normalized + padding);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function hasClaimValue(payload: TokenPayload | null, claim: string, expected: string) {
  if (!payload || !expected) {
    return false;
  }

  const value = payload[claim];
  if (!value) {
    return false;
  }

  const normalized = expected.toLowerCase();

  if (Array.isArray(value)) {
    return value.some((item) => typeof item === 'string' && item.toLowerCase() === normalized);
  }

  return typeof value === 'string' && value.toLowerCase() === normalized;
}

function isExpired(payload: TokenPayload | null) {
  if (!payload || typeof payload.exp !== 'number') {
    return false;
  }
  const expires = payload.exp * 1000;
  return expires <= Date.now();
}
