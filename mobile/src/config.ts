import { Platform } from 'react-native';

/**
 * Resolve the API base URL.
 * iOS Simulator shares the host network so localhost works.
 * Android Emulator uses 10.0.2.2 to reach the host.
 * Physical devices (Expo Go) need the Mac's LAN IP or deployed Azure API.
 */
import Constants from 'expo-constants';

const LAN_IP = '192.168.2.16'; // your Mac's Wi‑Fi IP — update if it changes

function isRunningOnDevice(): boolean {
  // Constants.isDevice can be undefined in some Expo Go versions
  // executionEnvironment is more reliable in SDK 54+
  const env = (Constants as any).executionEnvironment; // 'storeClient' | 'standalone' | 'bare' | undefined
  const isDevice = Constants.isDevice;

  // Debug — shows in Metro terminal
  console.log('[Config] Constants.isDevice =', isDevice);
  console.log('[Config] Constants.executionEnvironment =', env);
  console.log('[Config] Platform.OS =', Platform.OS);

  // If executionEnvironment is 'storeClient' → running inside Expo Go on device
  if (env === 'storeClient') return true;
  // Fall back to isDevice if available
  if (typeof isDevice === 'boolean') return isDevice;
  // Last resort — assume device if not iOS Simulator
  return true;
}

function resolveApiUrl(): string {
  if (!__DEV__) {
    return 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
  }

  const onDevice = isRunningOnDevice();
  console.log('[Config] isRunningOnDevice =', onDevice);

  if (onDevice) {
    // Physical device can't reach localhost — use the deployed Azure API
    const url = 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
    console.log('[Config] Resolved API URL =', url);
    return url;
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
