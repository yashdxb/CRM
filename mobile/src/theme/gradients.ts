/**
 * Gradient presets for LinearGradient components.
 * Aligned with the web CRM gradient palette.
 */

/** Primary action gradient — purple-to-blue (#667eea → #764ba2) */
export const primaryGradient = {
  colors: ['#667eea', '#764ba2'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

/** Cyan/teal gradient — leads, info (#22d3ee → #06b6d4) */
export const cyanGradient = {
  colors: ['#22d3ee', '#06b6d4'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

/** Success/green gradient — contacts, wins (#4ade80 → #22c55e) */
export const successGradient = {
  colors: ['#4ade80', '#22c55e'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

/** Purple gradient — activities, special (#a855f7 → #9333ea) */
export const purpleGradient = {
  colors: ['#a855f7', '#9333ea'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

/** Orange gradient — deals, alerts (#fb923c → #f97316) */
export const orangeGradient = {
  colors: ['#fb923c', '#f97316'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

/** Blue gradient — info, primary alt (#60a5fa → #3b82f6) */
export const blueGradient = {
  colors: ['#60a5fa', '#3b82f6'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

/** Red gradient — danger, error (#f87171 → #ef4444) */
export const redGradient = {
  colors: ['#f87171', '#ef4444'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

/** Page background mesh gradient */
export const backgroundGradient = {
  colors: ['#f5f7fa', '#e4e9f2', '#d8dde8'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

/** Glass shimmer overlay */
export const glassGradient = {
  colors: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0)'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

/** Entity accent gradient map */
export const entityGradients = {
  leads: cyanGradient,
  contacts: successGradient,
  deals: orangeGradient,
  activities: purpleGradient,
  home: primaryGradient,
} as const;
