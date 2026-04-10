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
  // AbortController timeout — RN Hermes may not have DOMException
  if (err && typeof err === 'object' && (err as any).name === 'AbortError') return true;
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
      const delayMs = Config.retryDelaysMs[attempt - 1] ?? 4_000;
      console.log(`[apiFetch] Retry ${attempt}/${Config.maxRetries} after ${delayMs}ms...`);
      await delay(delayMs);
    }

    try {
      console.log(`[apiFetch] Attempt ${attempt} → ${url} (timeout: ${Config.requestTimeoutMs}ms)`);

      // Use Promise.race for timeout — AbortController is unreliable on Hermes/RN
      const fetchPromise = fetch(url, { ...options, headers });
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('REQUEST_TIMEOUT')), Config.requestTimeoutMs),
      );

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      console.log(`[apiFetch] Response status: ${response.status}`);

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        const err = new ApiError(response.status, body || `HTTP ${response.status}`);
        if (isTransient(err) && attempt < Config.maxRetries) {
          lastError = err;
          continue;
        }
        throw err;
      }

      // 204 No Content
      if (response.status === 204) return undefined as T;

      return (await response.json()) as T;
    } catch (e: any) {
      console.log(`[apiFetch] Error on attempt ${attempt}: ${e?.name ?? 'unknown'} — ${e?.message ?? String(e)}`);
      lastError = e;
      // Treat our own timeout error as transient
      if (e?.message === 'REQUEST_TIMEOUT') {
        if (attempt < Config.maxRetries) continue;
        const timeoutErr = new Error(
          'Server is taking too long to respond. It may be restarting — please try again in a moment.',
        );
        (timeoutErr as any).name = 'TimeoutError';
        throw timeoutErr;
      }
      if (isTransient(e) && attempt < Config.maxRetries) {
        continue;
      }
      throw e;
    }
  }

  // Should not be reached, but safety net
  throw lastError;
}
