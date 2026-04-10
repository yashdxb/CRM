/**
 * Design tokens for the Apple Liquid Glass CRM mobile theme.
 * Aligned with the web CRM's premium glassmorphism palette.
 */

// ─── Colors ─────────────────────────────────────

export const Colors = {
  // Backgrounds (light mesh gradient)
  background: '#f5f7fa',
  backgroundMid: '#e4e9f2',
  backgroundDeep: '#d8dde8',

  // Glass
  glass: 'rgba(255, 255, 255, 0.65)',
  glassSubtle: 'rgba(255, 255, 255, 0.45)',
  glassElevated: 'rgba(255, 255, 255, 0.82)',
  glassBorder: 'rgba(255, 255, 255, 0.5)',
  glassBorderSubtle: 'rgba(255, 255, 255, 0.3)',

  // Text
  textPrimary: '#1e293b',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  textDisabled: '#cbd5e1',
  textInverse: '#ffffff',

  // Primary palette (web CRM aligned)
  primary: '#667eea',
  primaryDark: '#764ba2',
  cyan: '#06b6d4',
  cyanLight: '#22d3ee',
  green: '#22c55e',
  greenLight: '#4ade80',
  purple: '#a855f7',
  purpleDark: '#9333ea',
  orange: '#f97316',
  orangeLight: '#fb923c',
  amber: '#f59e0b',
  red: '#ef4444',
  redLight: '#f87171',

  // Semantic
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Gray scale
  gray50: '#f8fafc',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray300: '#cbd5e1',
  gray400: '#94a3b8',
  gray500: '#64748b',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1e293b',
  gray900: '#0f172a',
} as const;

// ─── Glass ──────────────────────────────────────

export const Glass = {
  blurIntensity: 40,
  blurTint: 'systemChromeMaterialLight' as const,
  cardBg: Colors.glass,
  cardBorder: Colors.glassBorder,
  cardBorderSubtle: Colors.glassBorderSubtle,
  elevatedBg: Colors.glassElevated,
  subtleBg: Colors.glassSubtle,
} as const;

// ─── Shadows ────────────────────────────────────

export const Shadows = {
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cardHover: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 20 },
    elevation: 12,
  },
  subtle: {
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  button: {
    shadowColor: '#667eea',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
} as const;

// ─── Spacing ────────────────────────────────────

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
} as const;

// ─── Border Radius ──────────────────────────────

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  pill: 999,
} as const;

// ─── Typography ─────────────────────────────────

export const Typography = {
  hero: {
    fontSize: 32,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
    lineHeight: 14,
  },
  button: {
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 22,
  },
} as const;
