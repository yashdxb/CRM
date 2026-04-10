import { useCallback, useEffect, useRef, useState } from 'react';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Generic hook that calls an async fetcher and manages loading/error/data.
 * Re-fetches whenever `deps` change.
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (mountedRef.current) {
        setData(result);
      }
    } catch (e: any) {
      if (mountedRef.current) {
        setError(e?.message || 'Something went wrong');
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  return { data, isLoading, error, refresh: load };
}
