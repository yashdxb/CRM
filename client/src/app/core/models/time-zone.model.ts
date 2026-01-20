export interface TimeZoneDefinitionDto {
  id: string;
  ianaId: string;
  label: string;
  utcOffsetMinutes: number;
  flagCode: string;
  isActive: boolean;
  sortOrder: number;
}

export interface TimeZoneOption {
  label: string;
  value: string;
  utcOffsetMinutes: number;
  flagCode: string;
}

// Reusable flag resolver to keep the UI consistent across all selectors.
export const getTimeZoneFlagUrl = (flagCode?: string): string => {
  if (!flagCode) {
    return 'https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png';
  }
  return `https://flagcdn.com/w20/${flagCode}.png`;
};
