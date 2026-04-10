import { MD3LightTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { Colors } from './theme/tokens';

/**
 * CRM Liquid Glass Theme — Light, frosted-glass aesthetic aligned with Apple UI + web CRM.
 *
 * Color families:
 *   primary  (#667eea)  — primary / home
 *   cyan     (#06b6d4)  — leads
 *   orange   (#f97316)  — deals
 *   purple   (#a855f7)  — activities
 *   green    (#22c55e)  — contacts / success
 */
export const CrmTheme: MD3Theme = {
  ...MD3LightTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,

    // Primary — purple-blue accent
    primary: Colors.primary,
    primaryContainer: 'rgba(102, 126, 234, 0.12)',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#3b4fa0',

    // Secondary — cyan accent
    secondary: Colors.cyan,
    secondaryContainer: 'rgba(6, 182, 212, 0.12)',
    onSecondary: '#ffffff',
    onSecondaryContainer: '#065f73',

    // Tertiary — purple accent
    tertiary: Colors.purple,
    tertiaryContainer: 'rgba(168, 85, 247, 0.12)',
    onTertiary: '#ffffff',
    onTertiaryContainer: '#6b21a8',

    // Surface & background — light glass
    surface: Colors.glass,
    surfaceVariant: Colors.glassSubtle,
    onSurface: Colors.textPrimary,
    onSurfaceVariant: Colors.textSecondary,
    background: Colors.background,
    onBackground: Colors.textPrimary,

    // Error
    error: Colors.error,
    errorContainer: 'rgba(239, 68, 68, 0.12)',
    onError: '#ffffff',
    onErrorContainer: '#991b1b',

    // Outline — glass borders
    outline: 'rgba(0, 0, 0, 0.12)',
    outlineVariant: 'rgba(0, 0, 0, 0.06)',

    // Inverse
    inverseSurface: Colors.gray800,
    inverseOnSurface: '#f8fafc',
    inversePrimary: '#a5b4fc',

    // Elevation — subtle white layers
    elevation: {
      level0: 'transparent',
      level1: 'rgba(255, 255, 255, 0.45)',
      level2: 'rgba(255, 255, 255, 0.55)',
      level3: 'rgba(255, 255, 255, 0.65)',
      level4: 'rgba(255, 255, 255, 0.72)',
      level5: 'rgba(255, 255, 255, 0.82)',
    },

    // Disabled
    surfaceDisabled: 'rgba(0, 0, 0, 0.04)',
    onSurfaceDisabled: Colors.textDisabled,

    // Backdrop & shadow
    backdrop: 'rgba(15, 23, 42, 0.4)',
    shadow: '#000000',
    scrim: 'rgba(15, 23, 42, 0.3)',
  },
};

/** Accent color families for entity-themed components. */
export const AccentColors = {
  primary: {
    bg: 'rgba(102, 126, 234, 0.12)',
    border: 'rgba(102, 126, 234, 0.25)',
    text: '#4338ca',
  },
  cyan: {
    bg: 'rgba(6, 182, 212, 0.12)',
    border: 'rgba(6, 182, 212, 0.25)',
    text: '#0e7490',
  },
  green: {
    bg: 'rgba(34, 197, 94, 0.12)',
    border: 'rgba(34, 197, 94, 0.25)',
    text: '#15803d',
  },
  orange: {
    bg: 'rgba(249, 115, 22, 0.12)',
    border: 'rgba(249, 115, 22, 0.25)',
    text: '#c2410c',
  },
  purple: {
    bg: 'rgba(168, 85, 247, 0.12)',
    border: 'rgba(168, 85, 247, 0.25)',
    text: '#7c3aed',
  },
  red: {
    bg: 'rgba(239, 68, 68, 0.12)',
    border: 'rgba(239, 68, 68, 0.25)',
    text: '#dc2626',
  },
} as const;
