export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number | null | undefined;
}

export function exportToCsv<T>(rows: T[], columns: CsvColumn<T>[], filename: string) {
  const headers = columns.map((column) => escapeCsvValue(column.header));
  const lines = rows.map((row) =>
    columns.map((column) => escapeCsvValue(column.value(row))).join(',')
  );
  const content = [headers.join(','), ...lines].join('\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeCsvValue(value: string | number | null | undefined) {
  const raw = value == null ? '' : String(value);
  const escaped = raw.replace(/"/g, '""');
  if (/[",\n]/.test(escaped)) {
    return `"${escaped}"`;
  }
  return escaped;
}
