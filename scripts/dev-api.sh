#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SQL_CONTAINER="crm-enterprise-sql"

if ! docker info >/dev/null 2>&1; then
  echo "Docker is not running. Start Docker Desktop and try again." >&2
  exit 1
fi

cd "$ROOT_DIR"
docker compose up -d sqlserver

echo "Waiting for SQL Server container to be healthy..."
status="starting"
for _ in {1..30}; do
  status="$(docker inspect -f '{{.State.Health.Status}}' "$SQL_CONTAINER" 2>/dev/null || echo starting)"
  if [[ "$status" == "healthy" ]]; then
    break
  fi
  if [[ "$status" == "unhealthy" ]]; then
    echo "SQL Server container is unhealthy. Check logs with: docker logs $SQL_CONTAINER" >&2
    exit 1
  fi
  sleep 2
done

if [[ "$status" != "healthy" ]]; then
  echo "Timed out waiting for SQL Server to be healthy." >&2
  exit 1
fi

cd "$ROOT_DIR/server/src/CRM.Enterprise.Api"
dotnet run
