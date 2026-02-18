#!/usr/bin/env python3
"""
Create or update Azure AI Search index schema for CRM AI knowledge grounding.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from typing import Any, Dict
from urllib import error, request

DEFAULT_API_VERSION = "2023-11-01"


def build_index_schema(index_name: str) -> Dict[str, Any]:
    return {
        "name": index_name,
        "fields": [
            {"name": "id", "type": "Edm.String", "key": True, "searchable": False, "filterable": True, "sortable": True, "facetable": False, "retrievable": True},
            {"name": "path", "type": "Edm.String", "searchable": True, "filterable": True, "sortable": True, "facetable": False, "retrievable": True},
            {"name": "title", "type": "Edm.String", "searchable": True, "filterable": True, "sortable": True, "facetable": False, "retrievable": True},
            {"name": "module", "type": "Edm.String", "searchable": True, "filterable": True, "sortable": True, "facetable": True, "retrievable": True},
            {"name": "audience", "type": "Edm.String", "searchable": True, "filterable": True, "sortable": True, "facetable": True, "retrievable": True},
            {"name": "version", "type": "Edm.String", "searchable": False, "filterable": True, "sortable": True, "facetable": True, "retrievable": True},
            {"name": "owner", "type": "Edm.String", "searchable": True, "filterable": True, "sortable": True, "facetable": True, "retrievable": True},
            {"name": "status", "type": "Edm.String", "searchable": False, "filterable": True, "sortable": True, "facetable": True, "retrievable": True},
            {"name": "tenant_scope", "type": "Edm.String", "searchable": False, "filterable": True, "sortable": True, "facetable": True, "retrievable": True},
            {"name": "source", "type": "Edm.String", "searchable": True, "filterable": True, "sortable": True, "facetable": True, "retrievable": True},
            {"name": "content", "type": "Edm.String", "searchable": True, "filterable": False, "sortable": False, "facetable": False, "retrievable": True},
        ],
        "semantic": {
            "configurations": [
                {
                    "name": "default",
                    "prioritizedFields": {
                        "titleField": {"fieldName": "title"},
                        "prioritizedContentFields": [{"fieldName": "content"}],
                        "prioritizedKeywordsFields": [{"fieldName": "module"}, {"fieldName": "audience"}, {"fieldName": "status"}],
                    },
                }
            ]
        },
    }


def put_index(endpoint: str, api_key: str, api_version: str, schema: Dict[str, Any]) -> Dict[str, Any]:
    url = f"{endpoint.rstrip('/')}/indexes/{schema['name']}?api-version={api_version}"
    body = json.dumps(schema).encode("utf-8")
    req = request.Request(
        url,
        data=body,
        headers={
            "Content-Type": "application/json",
            "api-key": api_key,
        },
        method="PUT",
    )
    try:
        with request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except error.HTTPError as ex:
        details = ex.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"Index setup failed ({ex.code}): {details}") from ex


def main() -> int:
    parser = argparse.ArgumentParser(description="Create/update Azure AI Search index for CRM AI knowledge")
    parser.add_argument("--endpoint", default=os.getenv("AZURE_SEARCH_ENDPOINT", ""))
    parser.add_argument("--index-name", default=os.getenv("AZURE_SEARCH_INDEX_NAME", "crm-ai-knowledge"))
    parser.add_argument("--api-key", default=os.getenv("AZURE_SEARCH_API_KEY", ""))
    parser.add_argument("--api-version", default=os.getenv("AZURE_SEARCH_API_VERSION", DEFAULT_API_VERSION))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    schema = build_index_schema(args.index_name)

    if args.dry_run:
        print("Dry run enabled. Index schema preview:")
        print(json.dumps(schema, indent=2))
        return 0

    missing = []
    if not args.endpoint:
        missing.append("AZURE_SEARCH_ENDPOINT")
    if not args.api_key:
        missing.append("AZURE_SEARCH_API_KEY")
    if missing:
        raise ValueError(f"Missing required settings: {', '.join(missing)}")

    response = put_index(args.endpoint, args.api_key, args.api_version, schema)
    print(f"Index ready: {response.get('name', args.index_name)}")
    print(f"Fields: {len(response.get('fields', []))}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as ex:
        print(f"ERROR: {ex}", file=sys.stderr)
        raise SystemExit(2)
