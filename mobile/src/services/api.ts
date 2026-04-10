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

/** Status codes that indicate a transient / cold-start failure worth retrying. */
const TRANSIENT_STATUSES = new Set([502, 503, 504]);

function isTransient(err: unknown): boolean {
  if (err instanceof ApiError) return TRANSIENT_STATUSES.has(err.status);
  // AbortController timeout or network error
  if (err instanceof DOMException && err.name === 'AbortError') return true;
  if (err instanceof TypeError) return true; // fetch network failure
  return false;
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
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

  let lastError: unknown;

  for (let attempt = 0; attempt <= Config.maxRetries; attempt++) {
    if (attempt > 0) {
      await delay(Config.retryDelaysMs[attempt - 1] ?? 4_000);
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
        const err = new ApiError(response.status, body || `HTTP ${response.status}`);
        // Only retry transient statuses; 4xx should fail immediately
        if (isTransient(err) && attempt < Config.maxRetries) {
          lastError = err;
          continue;
        }
        throw err;
      }

      // 204 No Content
      if (response.status === 204) return undefined as T;

      return (await response.json()) as T;
    } catch (e) {
      lastError = e;
      if (isTransient(e) && attempt < Config.maxRetries) {
        continue;
      }
      throw e;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Should not be reached, but safety net
  throw lastError;
}
