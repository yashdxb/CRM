import { Platform } from 'react-native';

/**
 * Resolve the API base URL.
 * iOS Simulator shares the host network so localhost works.
 * Android Emulator uses 10.0.2.2 to reach the host.
 * Physical devices (Expo Go) need the Mac's LAN IP.
 */
import Constants from 'expo-constants';

const LAN_IP = '192.168.2.16'; // your Mac's Wi‑Fi IP — update if it changes

function isRunningOnDevice(): boolean {
  // Expo Go on a physical device won't be 'Simulator' or 'Emulator'
  return !Constants.isDevice ? false : true;
}

function resolveApiUrl(): string {
  if (!__DEV__) {
    return 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
  }

  if (isRunningOnDevice()) {
    // Physical device can't reach localhost — use the deployed Azure API
    return 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
  }

  return Platform.OS === 'android'
    ? 'http://10.0.2.2:5014'
    : 'http://localhost:5014';
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
