#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="$ROOT_DIR/server/src/CRM.Enterprise.Api"
PORT="${1:-5014}"

echo "Checking port ${PORT}..."
PIDS="$(lsof -ti "tcp:${PORT}" || true)"
if [[ -n "${PIDS}" ]]; then
  echo "Stopping existing process(es) on ${PORT}: ${PIDS}"
  kill -9 ${PIDS}
  sleep 1
fi

echo "Starting CRM API on http://127.0.0.1:${PORT}"
cd "$API_DIR"
dotnet run --urls "http://127.0.0.1:${PORT}"
