export interface TimeZoneOption {
  label: string;
  value: string;
  flagCode: string;
}

// Shared time zone list to keep labels and flags consistent across settings pages.
export const STANDARD_TIMEZONE_OPTIONS: TimeZoneOption[] = [
  { label: 'UTC (GMT+00:00)', value: 'UTC', flagCode: 'un' },
  { label: 'Auckland, New Zealand (GMT+13:00)', value: 'Pacific/Auckland', flagCode: 'nz' },
  { label: 'Sydney, Australia (GMT+12:00)', value: 'Australia/Sydney', flagCode: 'au' },
  { label: 'Melbourne, Australia (GMT+12:00)', value: 'Australia/Melbourne', flagCode: 'au' },
  { label: 'Hobart, Australia (GMT+10:30)', value: 'Australia/Hobart', flagCode: 'au' },
  { label: 'Brisbane, Australia (GMT+10:00)', value: 'Australia/Brisbane', flagCode: 'au' },
  { label: 'Darwin, Australia (GMT+10:00)', value: 'Australia/Darwin', flagCode: 'au' },
  { label: 'Seoul, South Korea (GMT+10:00)', value: 'Asia/Seoul', flagCode: 'kr' },
  { label: 'Tokyo, Japan (GMT+10:00)', value: 'Asia/Tokyo', flagCode: 'jp' },
  { label: 'Adelaide, Australia (GMT+09:30)', value: 'Australia/Adelaide', flagCode: 'au' },
  { label: 'Perth, Australia (GMT+08:00)', value: 'Australia/Perth', flagCode: 'au' },
  { label: 'Singapore (GMT+08:00)', value: 'Asia/Singapore', flagCode: 'sg' },
  { label: 'Hong Kong (GMT+08:00)', value: 'Asia/Hong_Kong', flagCode: 'hk' },
  { label: 'Shanghai, China (GMT+08:00)', value: 'Asia/Shanghai', flagCode: 'cn' },
  { label: 'Manila, Philippines (GMT+08:00)', value: 'Asia/Manila', flagCode: 'ph' },
  { label: 'Jakarta, Indonesia (GMT+07:00)', value: 'Asia/Jakarta', flagCode: 'id' },
  { label: 'Kolkata, India (GMT+05:30)', value: 'Asia/Kolkata', flagCode: 'in' },
  { label: 'Dubai, United Arab Emirates (GMT+04:00)', value: 'Asia/Dubai', flagCode: 'ae' },
  { label: 'Istanbul, Turkey (GMT+03:00)', value: 'Europe/Istanbul', flagCode: 'tr' },
  { label: 'Riyadh, Saudi Arabia (GMT+03:00)', value: 'Asia/Riyadh', flagCode: 'sa' },
  { label: 'Moscow, Russia (GMT+03:00)', value: 'Europe/Moscow', flagCode: 'ru' },
  { label: 'Johannesburg, South Africa (GMT+02:00)', value: 'Africa/Johannesburg', flagCode: 'za' },
  { label: 'Jerusalem, Israel (GMT+02:00)', value: 'Asia/Jerusalem', flagCode: 'il' },
  { label: 'Berlin, Germany (GMT+01:00)', value: 'Europe/Berlin', flagCode: 'de' },
  { label: 'Rome, Italy (GMT+01:00)', value: 'Europe/Rome', flagCode: 'it' },
  { label: 'Paris, France (GMT+01:00)', value: 'Europe/Paris', flagCode: 'fr' },
  { label: 'Madrid, Spain (GMT+01:00)', value: 'Europe/Madrid', flagCode: 'es' },
  { label: 'Amsterdam, Netherlands (GMT+01:00)', value: 'Europe/Amsterdam', flagCode: 'nl' },
  { label: 'Stockholm, Sweden (GMT+01:00)', value: 'Europe/Stockholm', flagCode: 'se' },
  { label: 'Oslo, Norway (GMT+01:00)', value: 'Europe/Oslo', flagCode: 'no' },
  { label: 'London, United Kingdom (GMT+00:00)', value: 'Europe/London', flagCode: 'gb' },
  { label: 'Sao Paulo, Brazil (GMT-03:00)', value: 'America/Sao_Paulo', flagCode: 'br' },
  { label: 'Buenos Aires, Argentina (GMT-03:00)', value: 'America/Argentina/Buenos_Aires', flagCode: 'ar' },
  { label: "St. John's, Canada (GMT-03:30)", value: 'America/St_Johns', flagCode: 'ca' },
  { label: 'Halifax, Canada (GMT-04:00)', value: 'America/Halifax', flagCode: 'ca' },
  { label: 'Santiago, Chile (GMT-04:00)', value: 'America/Santiago', flagCode: 'cl' },
  { label: 'Toronto, Canada (GMT-05:00)', value: 'America/Toronto', flagCode: 'ca' },
  { label: 'New York, United States (GMT-05:00)', value: 'America/New_York', flagCode: 'us' },
  { label: 'Bogota, Colombia (GMT-05:00)', value: 'America/Bogota', flagCode: 'co' },
  { label: 'Lima, Peru (GMT-05:00)', value: 'America/Lima', flagCode: 'pe' },
  { label: 'Winnipeg, Canada (GMT-06:00)', value: 'America/Winnipeg', flagCode: 'ca' },
  { label: 'Chicago, United States (GMT-06:00)', value: 'America/Chicago', flagCode: 'us' },
  { label: 'Mexico City, Mexico (GMT-06:00)', value: 'America/Mexico_City', flagCode: 'mx' },
  { label: 'Edmonton, Canada (GMT-07:00)', value: 'America/Edmonton', flagCode: 'ca' },
  { label: 'Denver, United States (GMT-07:00)', value: 'America/Denver', flagCode: 'us' },
  { label: 'Vancouver, Canada (GMT-08:00)', value: 'America/Vancouver', flagCode: 'ca' },
  { label: 'Los Angeles, United States (GMT-08:00)', value: 'America/Los_Angeles', flagCode: 'us' },
  { label: 'Anchorage, United States (GMT-09:00)', value: 'America/Anchorage', flagCode: 'us' },
  { label: 'Honolulu, United States (GMT-10:00)', value: 'Pacific/Honolulu', flagCode: 'us' }
];

// Centralized flag resolver so all time zone selects use the same assets.
export const getTimeZoneFlagUrl = (flagCode?: string): string => {
  if (!flagCode) {
    return 'https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png';
  }
  return `https://flagcdn.com/w20/${flagCode}.png`;
};
