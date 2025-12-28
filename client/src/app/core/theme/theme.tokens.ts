export interface ThemeDefinition {
  name: string;
  displayName: string;
  cssVars: Record<string, string>;
}

export const THEMES: Record<string, ThemeDefinition> = {
  default: {
    name: 'default',
    displayName: 'Apple Light',
    cssVars: {
      '--surface-base': '#f7f8fb',
      '--surface-card': '#ffffff',
      '--surface-muted': '#edf0f5',
      '--text-strong': '#0b1a2b',
      '--text-subtle': '#4b5563',
      '--border-subtle': '#dfe4ec',
      '--brand-primary': '#0a84ff',
      '--brand-secondary': '#5ac8fa',
      '--accent-positive': '#0ea5e9',
      '--accent-warning': '#ff9f0a',
      '--accent-critical': '#ff453a'
    }
  },
  graphite: {
    name: 'graphite',
    displayName: 'Graphite',
    cssVars: {
      '--surface-base': '#f5f5f4',
      '--surface-card': '#ffffff',
      '--surface-muted': '#e0e7ff',
      '--text-strong': '#111827',
      '--text-subtle': '#4b5563',
      '--border-subtle': '#d4d4d8',
      '--brand-primary': '#1d4ed8',
      '--brand-secondary': '#0f172a',
      '--accent-positive': '#38bdf8',
      '--accent-warning': '#f59e0b',
      '--accent-critical': '#dc2626'
    }
  },
  desert: {
    name: 'desert',
    displayName: 'Desert Dawn',
    cssVars: {
      '--surface-base': '#fdf6e3',
      '--surface-card': '#ffffff',
      '--surface-muted': '#fae8d7',
      '--text-strong': '#1f2937',
      '--text-subtle': '#4b5563',
      '--border-subtle': '#e6d9c9',
      '--brand-primary': '#f97316',
      '--brand-secondary': '#0ea5e9',
      '--accent-positive': '#0ea5e9',
      '--accent-warning': '#f59e0b',
      '--accent-critical': '#ef4444'
    }
  },
  appleDark: {
    name: 'appleDark',
    displayName: 'Apple Dark',
    cssVars: {
      '--surface-base': '#0c0f14',
      '--surface-card': '#11141c',
      '--surface-muted': '#151924',
      '--text-strong': '#e8ecf2',
      '--text-subtle': '#cbd2dc',
      '--border-subtle': 'rgba(255,255,255,0.08)',
      '--brand-primary': '#0a84ff',
      '--brand-secondary': '#5ac8fa',
      '--accent-positive': '#64d2ff',
      '--accent-warning': '#ffd60a',
      '--accent-critical': '#ff453a'
    }
  }
};

export const DEFAULT_THEME_NAME = 'default';
