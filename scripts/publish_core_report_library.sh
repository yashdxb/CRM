#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TOOL_PROJECT="$ROOT_DIR/tools/report-library-pack/report-library-pack.csproj"
OUTPUT_DIR="${REPORT_OUTPUT_DIR:-$ROOT_DIR/output/report-library-pack/generated}"
REPORT_SERVER_URL="${REPORT_SERVER_URL:-https://reports.northedgesystem.com}"
CATEGORY_NAME="${REPORT_CATEGORY_NAME:-CRM}"
USERNAME="${REPORT_SERVER_USERNAME:-}"
PASSWORD="${REPORT_SERVER_PASSWORD:-}"
AZURE_SQL_CONNECTION="${AZURE_SQL_CONNECTION:-}"

if [[ -z "$AZURE_SQL_CONNECTION" ]]; then
  echo "AZURE_SQL_CONNECTION is required." >&2
  exit 1
fi

if [[ -z "$USERNAME" || -z "$PASSWORD" ]]; then
  echo "REPORT_SERVER_USERNAME and REPORT_SERVER_PASSWORD are required." >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

REPORT_OUTPUT_DIR="$OUTPUT_DIR" AZURE_SQL_CONNECTION="$AZURE_SQL_CONNECTION" \
  dotnet run --project "$TOOL_PROJECT"

TOKEN=$(curl -fsS -X POST "$REPORT_SERVER_URL/Token" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "grant_type=password" \
  --data-urlencode "username=$USERNAME" \
  --data-urlencode "password=$PASSWORD" | jq -r '.access_token')

if [[ -z "$TOKEN" || "$TOKEN" == "null" ]]; then
  echo "Unable to acquire Report Server token." >&2
  exit 1
fi

CATEGORY_ID=$(curl -fsS "$REPORT_SERVER_URL/api/reportserver/v2/categories" \
  -H "Authorization: Bearer $TOKEN" | jq -r --arg NAME "$CATEGORY_NAME" '.[] | select(.name == $NAME) | .id' | head -n1)

if [[ -z "$CATEGORY_ID" ]]; then
  echo "Unable to resolve Report Server category '$CATEGORY_NAME'." >&2
  exit 1
fi

for report_file in "$OUTPUT_DIR"/*.trdp; do
  [[ -e "$report_file" ]] || continue
  report_name="$(basename "$report_file" .trdp)"
  existing_id=$(curl -fsS "$REPORT_SERVER_URL/api/reportserver/v2/reports" \
    -H "Authorization: Bearer $TOKEN" | jq -r --arg NAME "$report_name" --arg CATEGORY "$CATEGORY_ID" '.[] | select(.name == $NAME and .categoryId == $CATEGORY) | .id' | head -n1)

  if [[ -n "$existing_id" ]]; then
    curl -fsS -X DELETE "$REPORT_SERVER_URL/api/reportserver/v2/reports/$existing_id" \
      -H "Authorization: Bearer $TOKEN" >/dev/null
  fi

  curl -fsS -X POST "$REPORT_SERVER_URL/api/reportserver/v2/reports" \
    -H "Authorization: Bearer $TOKEN" \
    -F "Name=$report_name" \
    -F "Description=CRM core report library item" \
    -F "CategoryId=$CATEGORY_ID" \
    -F "ReportFile=@$report_file;type=application/octet-stream" >/dev/null

  echo "Published $report_name"
done
