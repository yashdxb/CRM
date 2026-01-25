using System.Text;
using System.Text.RegularExpressions;

namespace CRM.Enterprise.Infrastructure.Leads;

internal static class LeadCsvImportHelper
{
    public static async Task<IReadOnlyList<Dictionary<string, string>>> ReadAsync(
        Stream stream,
        CancellationToken cancellationToken)
    {
        if (stream is null || (stream.CanSeek && stream.Length == 0))
        {
            return Array.Empty<Dictionary<string, string>>();
        }

        using var reader = new StreamReader(stream, leaveOpen: true);
        var content = await reader.ReadToEndAsync(cancellationToken);
        var rows = ParseRows(content);
        if (rows.Count == 0)
        {
            return Array.Empty<Dictionary<string, string>>();
        }

        var headers = rows[0].Select(NormalizeHeader).ToList();
        var result = new List<Dictionary<string, string>>();

        for (var i = 1; i < rows.Count; i++)
        {
            var row = rows[i];
            var dict = new Dictionary<string, string>();
            for (var col = 0; col < headers.Count && col < row.Count; col++)
            {
                var key = headers[col];
                if (string.IsNullOrWhiteSpace(key))
                {
                    continue;
                }

                var value = row[col]?.Trim();
                if (!string.IsNullOrEmpty(value))
                {
                    dict[key] = value;
                }
            }

            if (dict.Count > 0)
            {
                result.Add(dict);
            }
        }

        return result;
    }

    public static async Task<IReadOnlyList<Dictionary<string, string>>> ReadAsync(
        string filePath,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
        {
            return Array.Empty<Dictionary<string, string>>();
        }

        var content = await File.ReadAllTextAsync(filePath, cancellationToken);
        var rows = ParseRows(content);
        if (rows.Count == 0)
        {
            return Array.Empty<Dictionary<string, string>>();
        }

        var headers = rows[0].Select(NormalizeHeader).ToList();
        var result = new List<Dictionary<string, string>>();

        for (var i = 1; i < rows.Count; i++)
        {
            var row = rows[i];
            var dict = new Dictionary<string, string>();
            for (var col = 0; col < headers.Count && col < row.Count; col++)
            {
                var key = headers[col];
                if (string.IsNullOrWhiteSpace(key))
                {
                    continue;
                }

                var value = row[col]?.Trim();
                if (!string.IsNullOrEmpty(value))
                {
                    dict[key] = value;
                }
            }

            if (dict.Count > 0)
            {
                result.Add(dict);
            }
        }

        return result;
    }

    public static string? ReadValue(Dictionary<string, string> row, params string[] keys)
    {
        foreach (var key in keys)
        {
            var normalized = NormalizeHeader(key);
            if (row.TryGetValue(normalized, out var value) && !string.IsNullOrWhiteSpace(value))
            {
                return value.Trim();
            }
        }

        return null;
    }

    public static bool? ReadBool(Dictionary<string, string> row, params string[] keys)
    {
        var raw = ReadValue(row, keys);
        if (string.IsNullOrWhiteSpace(raw))
        {
            return null;
        }

        return raw.Trim().ToLowerInvariant() switch
        {
            "true" or "1" or "yes" or "y" => true,
            "false" or "0" or "no" or "n" => false,
            _ => null
        };
    }

    public static int? ReadInt(Dictionary<string, string> row, params string[] keys)
    {
        var raw = ReadValue(row, keys);
        if (string.IsNullOrWhiteSpace(raw))
        {
            return null;
        }

        return int.TryParse(raw, out var value) ? value : null;
    }

    public static (string FirstName, string LastName) SplitName(string fullName)
    {
        var parts = fullName.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length == 0)
        {
            return (string.Empty, string.Empty);
        }

        if (parts.Length == 1)
        {
            return (parts[0], string.Empty);
        }

        return (parts[0], string.Join(' ', parts.Skip(1)));
    }

    private static string NormalizeHeader(string header)
    {
        var cleaned = header.Trim().ToLowerInvariant();
        return Regex.Replace(cleaned, @"[\s_\-]+", string.Empty);
    }

    private static List<List<string>> ParseRows(string input)
    {
        var rows = new List<List<string>>();
        var row = new List<string>();
        var field = new StringBuilder();
        var inQuotes = false;

        for (var i = 0; i < input.Length; i++)
        {
            var ch = input[i];
            if (inQuotes)
            {
                if (ch == '"' && i + 1 < input.Length && input[i + 1] == '"')
                {
                    field.Append('"');
                    i++;
                }
                else if (ch == '"')
                {
                    inQuotes = false;
                }
                else
                {
                    field.Append(ch);
                }

                continue;
            }

            switch (ch)
            {
                case '"':
                    inQuotes = true;
                    break;
                case ',':
                    row.Add(field.ToString());
                    field.Clear();
                    break;
                case '\r':
                    break;
                case '\n':
                    row.Add(field.ToString());
                    field.Clear();
                    rows.Add(row);
                    row = new List<string>();
                    break;
                default:
                    field.Append(ch);
                    break;
            }
        }

        if (field.Length > 0 || row.Count > 0)
        {
            row.Add(field.ToString());
            rows.Add(row);
        }

        return rows;
    }
}
