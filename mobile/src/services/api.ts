import { Config } from '../config';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

let _accessToken: string | null = null;
let _tenantKey: string = Config.defaultTenantKey;

export function setApiToken(token: string | null) {
  _accessToken = token;
}

export function setApiTenantKey(key: string) {
  _tenantKey = key;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${Config.apiUrl}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Tenant-Key': _tenantKey,
    ...(options.headers as Record<string, string>),
  };

  if (_accessToken) {
    headers['Authorization'] = `Bearer ${_accessToken}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), Config.requestTimeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new ApiError(response.status, body || `HTTP ${response.status}`);
    }

    // 204 No Content
    if (response.status === 204) return undefined as T;

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}
