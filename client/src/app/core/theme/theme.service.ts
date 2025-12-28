import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal, computed } from '@angular/core';
import { DEFAULT_THEME_NAME, ThemeDefinition, THEMES } from './theme.tokens';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly activeTheme = signal<ThemeDefinition>(THEMES[DEFAULT_THEME_NAME]);
  private readonly storageKey = 'theme-preference';
  private readonly darkModeKey = 'dark-mode-preference';
  private readonly _isDarkMode = signal(false);

  readonly isDarkMode = this._isDarkMode.asReadonly();
  readonly themeIcon = computed(() => this._isDarkMode() ? 'pi-sun' : 'pi-moon');
  readonly themeLabel = computed(() => this._isDarkMode() ? 'Light Mode' : 'Dark Mode');

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  init(themeName?: string) {
    // Check for stored dark mode preference or system preference
    const storedDarkMode = this.getStoredDarkMode();
    const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = storedDarkMode ?? systemPrefersDark;

    const stored = this.getStoredTheme();
    const name = themeName && THEMES[themeName] ? themeName : stored ?? environment.theme ?? DEFAULT_THEME_NAME;
    
    // Apply appropriate theme based on dark mode
    if (shouldBeDark) {
      this._isDarkMode.set(true);
      this.applyTheme('appleDark');
      this.document.documentElement.classList.add('dark-theme');
    } else {
      this.applyTheme(name);
    }

    // Listen for system preference changes
    window.matchMedia?.('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (this.getStoredDarkMode() === null) {
          this.setDarkMode(e.matches);
        }
      });
  }

  get currentTheme() {
    return this.activeTheme.asReadonly();
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this._isDarkMode());
  }

  setDarkMode(enabled: boolean): void {
    this._isDarkMode.set(enabled);
    this.storeDarkMode(enabled);

    if (enabled) {
      this.applyTheme('appleDark');
      this.document.documentElement.classList.add('dark-theme');
    } else {
      this.applyTheme('default');
      this.document.documentElement.classList.remove('dark-theme');
    }
  }

  applyTheme(themeName: string) {
    const theme = THEMES[themeName] ?? THEMES[DEFAULT_THEME_NAME];
    Object.entries(theme.cssVars).forEach(([key, value]) =>
      this.document.documentElement.style.setProperty(key, value)
    );
    this.activeTheme.set(theme);
    this.storeTheme(theme.name);
  }

  private getStoredTheme(): string | null {
    try {
      return localStorage.getItem(this.storageKey);
    } catch {
      return null;
    }
  }

  private storeTheme(themeName: string) {
    try {
      localStorage.setItem(this.storageKey, themeName);
    } catch {
      // ignore storage failures (e.g., SSR or disabled storage)
    }
  }

  private getStoredDarkMode(): boolean | null {
    try {
      const stored = localStorage.getItem(this.darkModeKey);
      return stored === null ? null : stored === 'true';
    } catch {
      return null;
    }
  }

  private storeDarkMode(enabled: boolean) {
    try {
      localStorage.setItem(this.darkModeKey, String(enabled));
    } catch {
      // ignore storage failures
    }
  }
}
