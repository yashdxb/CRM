import { MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

/**
 * CRM Glass Theme — Maps the existing dark-glass aesthetic to Paper MD3 tokens.
 *
 * Color families:
 *   blue   (#7fa1ff)  — primary / leads
 *   amber  (#fdb35a)  — secondary / deals
 *   purple (#a87dff)  — tertiary / activities
 *   green  (#5bcd97)  — success / contacts
 *   navy   (#0c1730)  — background base
 */
export const CrmTheme: MD3Theme = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...MD3DarkTheme.colors,

    // Primary — blue accent family
    primary: '#7fa1ff',
    primaryContainer: 'rgba(105, 154, 255, 0.18)',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#dbe6ff',

    // Secondary — amber accent family
    secondary: '#fdb35a',
    secondaryContainer: 'rgba(255, 179, 107, 0.18)',
    onSecondary: '#ffffff',
    onSecondaryContainer: '#ffe0c0',

    // Tertiary — purple accent family
    tertiary: '#a87dff',
    tertiaryContainer: 'rgba(168, 125, 255, 0.18)',
    onTertiary: '#ffffff',
    onTertiaryContainer: '#e0d0ff',

    // Surface & background
    surface: 'rgba(255, 255, 255, 0.12)',
    surfaceVariant: 'rgba(255, 255, 255, 0.08)',
    onSurface: '#f4f8ff',
    onSurfaceVariant: '#b7c8e6',
    background: '#0c1730',
    onBackground: '#f4f8ff',

    // Error
    error: '#ff6b6b',
    errorContainer: 'rgba(255, 107, 107, 0.18)',
    onError: '#ffffff',
    onErrorContainer: '#ffd0d0',

    // Outline
    outline: 'rgba(255, 255, 255, 0.18)',
    outlineVariant: 'rgba(255, 255, 255, 0.14)',

    // Inverse
    inverseSurface: '#f4f8ff',
    inverseOnSurface: '#0c1730',
    inversePrimary: '#3366cc',

    // Elevation — glass opacity scale
    elevation: {
      level0: 'transparent',
      level1: 'rgba(255, 255, 255, 0.06)',
      level2: 'rgba(255, 255, 255, 0.10)',
      level3: 'rgba(255, 255, 255, 0.12)',
      level4: 'rgba(255, 255, 255, 0.14)',
      level5: 'rgba(255, 255, 255, 0.16)',
    },

    // Disabled
    surfaceDisabled: 'rgba(255, 255, 255, 0.06)',
    onSurfaceDisabled: 'rgba(255, 255, 255, 0.38)',

    // Backdrop & shadow
    backdrop: 'rgba(12, 23, 48, 0.8)',
    shadow: '#040b18',
    scrim: 'rgba(12, 23, 48, 0.6)',
  },
};

/** Accent color families for custom glass components. */
export const AccentColors = {
  blue: {
    bg: 'rgba(105, 154, 255, 0.18)',
    border: 'rgba(147, 188, 255, 0.28)',
    text: '#dbe6ff',
  },
  amber: {
    bg: 'rgba(255, 179, 107, 0.18)',
    border: 'rgba(255, 201, 143, 0.3)',
    text: '#ffe0c0',
  },
  purple: {
    bg: 'rgba(168, 125, 255, 0.18)',
    border: 'rgba(190, 160, 255, 0.28)',
    text: '#e0d0ff',
  },
  green: {
    bg: 'rgba(91, 205, 151, 0.16)',
    border: 'rgba(135, 223, 179, 0.26)',
    text: '#c0f0d8',
  },
  navy: {
    bg: 'rgba(20, 39, 77, 0.86)',
    border: 'rgba(145, 175, 229, 0.12)',
    text: '#d3def2',
  },
} as const;
