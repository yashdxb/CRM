#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Extract credentials from user secrets
cd "$ROOT_DIR/server/src/CRM.Enterprise.Api"
RS_URL=$(dotnet user-secrets list 2>/dev/null | grep 'Reporting:ReportServerUrl' | sed 's/.*= //')
RS_USER=$(dotnet user-secrets list 2>/dev/null | grep 'Reporting:ReportServerUsername' | sed 's/.*= //')
RS_PASS=$(dotnet user-secrets list 2>/dev/null | grep 'Reporting:ReportServerPassword' | sed 's/.*= //')

echo "Report Server: $RS_URL"
echo "User: $RS_USER"

# Authenticate
echo ""
echo "Authenticating..."
TOKEN=$(curl -fsS -X POST "$RS_URL/Token" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "grant_type=password" \
  --data-urlencode "username=$RS_USER" \
  --data-urlencode "password=$RS_PASS" | python3 -c "import sys,json; print(json.load(sys.stdin)['accessToken'])")
echo "Token acquired (${#TOKEN} chars)"

# Get CRM category ID (PascalCase keys: Id, Name)
echo ""
echo "Fetching categories..."
CRM_CATEGORY_ID=$(curl -fsS "$RS_URL/api/reportserver/v2/categories" \
  -H "Authorization: Bearer $TOKEN" | python3 -c "
import sys, json
cats = json.load(sys.stdin)
for c in cats:
    if c['Name'] == 'CRM':
        print(c['Id'])
        break
")
echo "CRM category ID: $CRM_CATEGORY_ID"

if [[ -z "$CRM_CATEGORY_ID" ]]; then
  echo "ERROR: CRM category not found on Report Server." >&2
  exit 1
fi

# Get existing CRM reports
echo ""
echo "Fetching existing reports..."
EXISTING=$(curl -fsS "$RS_URL/api/reportserver/v2/reports" \
  -H "Authorization: Bearer $TOKEN" | python3 -c "
import sys, json
reports = json.load(sys.stdin)
for r in reports:
    if r['CategoryId'] == '$CRM_CATEGORY_ID':
        print(r['Name'])
")
echo "Existing CRM reports:"
echo "$EXISTING" | sed 's/^/  /'

# The 15 new report files to upload
GENERATED_DIR="$ROOT_DIR/generated"

NEW_REPORTS=(
  "Activity Summary"
  "Campaign ROI"
  "Customer Growth"
  "Customer Revenue Concentration"
  "Email Engagement"
  "Lead Aging"
  "Lead Conversion Funnel"
  "Lead Score Distribution"
  "Lead Source Performance"
  "Pipeline Health Scorecard"
  "Revenue Forecast"
  "Sales Cycle Duration"
  "Team Performance"
  "Top Deals"
  "Win Loss Analysis"
)

echo ""
echo "Uploading 15 new reports to CRM category..."
echo "============================================"

SUCCESS=0
FAILED=0

for report_name in "${NEW_REPORTS[@]}"; do
  report_file="$GENERATED_DIR/${report_name}.trdp"
  if [[ ! -f "$report_file" ]]; then
    echo "SKIP: $report_name — file not found"
    FAILED=$((FAILED + 1))
    continue
  fi

  # Check if already exists and delete if so (PascalCase: Name, Id)
  existing_id=$(curl -fsS "$RS_URL/api/reportserver/v2/reports" \
    -H "Authorization: Bearer $TOKEN" | python3 -c "
import sys, json
reports = json.load(sys.stdin)
for r in reports:
    if r['Name'] == '$report_name':
        print(r['Id'])
        break
" 2>/dev/null || true)

  if [[ -n "$existing_id" ]]; then
    echo "  Replacing existing: $report_name (id: $existing_id)"
    curl -fsS -X DELETE "$RS_URL/api/reportserver/v2/reports/$existing_id" \
      -H "Authorization: Bearer $TOKEN" >/dev/null 2>&1 || true
  fi

  # Upload
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$RS_URL/api/reportserver/v2/reports" \
    -H "Authorization: Bearer $TOKEN" \
    -F "Name=$report_name" \
    -F "Description=CRM core report" \
    -F "CategoryId=$CRM_CATEGORY_ID" \
    -F "ReportFile=@$report_file;type=application/octet-stream")

  if [[ "$HTTP_CODE" =~ ^2 ]]; then
    echo "  OK: $report_name"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "  FAIL ($HTTP_CODE): $report_name"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "============================================"
echo "Done. Success: $SUCCESS, Failed: $FAILED"
