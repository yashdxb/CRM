import { Platform } from 'react-native';

/**
 * Resolve the API base URL.
 * iOS Simulator shares the host network so localhost works.
 * Android Emulator uses 10.0.2.2 to reach the host.
 * Physical devices (Expo Go) use the deployed Azure API because most
 * consumer Wi-Fi routers enable AP isolation, blocking LAN device-to-device traffic.
 */
import Constants from 'expo-constants';

const AZURE_API = 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';

function isRunningOnDevice(): boolean {
  const env = (Constants as any).executionEnvironment;
  const isDevice = Constants.isDevice;

  console.log('[Config] Constants.isDevice =', isDevice);
  console.log('[Config] Constants.executionEnvironment =', env);
  console.log('[Config] Platform.OS =', Platform.OS);

  if (env === 'storeClient') return true;
  if (typeof isDevice === 'boolean') return isDevice;
  return true;
}

function resolveApiUrl(): string {
  if (!__DEV__) {
    return AZURE_API;
  }

  const onDevice = isRunningOnDevice();
  console.log('[Config] isRunningOnDevice =', onDevice);

  if (onDevice) {
    // Physical device → Azure API (LAN usually blocked by router AP isolation)
    console.log('[Config] Resolved API URL =', AZURE_API);
    return AZURE_API;
  }

  const url = Platform.OS === 'android'
    ? 'http://10.0.2.2:5014'
    : 'http://localhost:5014';
  console.log('[Config] Resolved API URL =', url);
  return url;
}

export const Config = {
  apiUrl: resolveApiUrl(),
  defaultTenantKey: 'default',
  /** Must be ≥ 30 s — Azure App Service cold starts can take 10-30 s */
  requestTimeoutMs: 30_000,
  /** Retry transient failures (timeout / 502 / 503 / 504) */
  maxRetries: 3,
  retryDelaysMs: [1_000, 2_000, 4_000],
} as const;
