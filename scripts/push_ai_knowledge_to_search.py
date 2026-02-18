#!/usr/bin/env python3
"""
Push AI knowledge manifest into Azure AI Search.

Reads docs/ai/knowledge/manifest.jsonl and uploads docs with mergeOrUpload.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import List
from urllib import error, request

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = REPO_ROOT / "docs" / "ai" / "knowledge" / "manifest.jsonl"
DEFAULT_API_VERSION = "2023-11-01"


def load_manifest(path: Path) -> List[dict]:
    if not path.exists():
        raise FileNotFoundError(f"Manifest not found: {path}")

    rows: List[dict] = []
    with path.open("r", encoding="utf-8") as fh:
        for line_no, line in enumerate(fh, start=1):
            line = line.strip()
            if not line:
                continue
            try:
                row = json.loads(line)
            except json.JSONDecodeError as ex:
                raise ValueError(f"Invalid JSONL at line {line_no}: {ex}") from ex
            rows.append(row)
    return rows


def chunked(items: List[dict], size: int) -> List[List[dict]]:
    return [items[i : i + size] for i in range(0, len(items), size)]


def post_batch(
    endpoint: str,
    index_name: str,
    api_key: str,
    api_version: str,
    docs: List[dict],
    allow_unsafe_keys: bool,
) -> dict:
    url = f"{endpoint.rstrip('/')}/indexes/{index_name}/docs/index?api-version={api_version}"
    if allow_unsafe_keys:
        url += "&allowUnsafeKeys=true"
    payload = {"value": docs}
    body = json.dumps(payload).encode("utf-8")
    req = request.Request(
        url,
        data=body,
        headers={
            "Content-Type": "application/json",
            "api-key": api_key,
        },
        method="POST",
    )
    try:
        with request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except error.HTTPError as ex:
        details = ex.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"Upload failed ({ex.code}): {details}") from ex


def main() -> int:
    parser = argparse.ArgumentParser(description="Push AI knowledge manifest to Azure AI Search")
    parser.add_argument("--manifest", default=str(DEFAULT_MANIFEST), help="Path to manifest.jsonl")
    parser.add_argument("--endpoint", default=os.getenv("AZURE_SEARCH_ENDPOINT", ""))
    parser.add_argument("--index-name", default=os.getenv("AZURE_SEARCH_INDEX_NAME", ""))
    parser.add_argument("--api-key", default=os.getenv("AZURE_SEARCH_API_KEY", ""))
    parser.add_argument("--api-version", default=os.getenv("AZURE_SEARCH_API_VERSION", DEFAULT_API_VERSION))
    parser.add_argument("--batch-size", type=int, default=100, help="Documents per upload batch")
    parser.add_argument("--allow-unsafe-keys", action="store_true", default=True, help="Allow '/' and other key chars in index key values")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    manifest_path = Path(args.manifest).resolve()
    rows = load_manifest(manifest_path)
    if not rows:
        print("Manifest is empty. Nothing to upload.")
        return 0

    for row in rows:
        if "id" not in row:
            raise ValueError("Manifest row missing required key: id")
        row["@search.action"] = "mergeOrUpload"

    print(f"Loaded docs: {len(rows)}")
    print(f"Manifest: {manifest_path}")

    if args.dry_run:
        print("Dry run enabled. Skipping upload.")
        return 0

    missing = []
    if not args.endpoint:
        missing.append("AZURE_SEARCH_ENDPOINT")
    if not args.index_name:
        missing.append("AZURE_SEARCH_INDEX_NAME")
    if not args.api_key:
        missing.append("AZURE_SEARCH_API_KEY")
    if missing:
        raise ValueError(f"Missing required settings: {', '.join(missing)}")

    batches = chunked(rows, max(1, args.batch_size))
    uploaded = 0
    for idx, batch in enumerate(batches, start=1):
        response = post_batch(
            args.endpoint,
            args.index_name,
            args.api_key,
            args.api_version,
            batch,
            args.allow_unsafe_keys,
        )
        failed = [item for item in response.get("value", []) if not item.get("status", False)]
        uploaded += len(batch) - len(failed)
        print(f"Batch {idx}/{len(batches)} uploaded: {len(batch) - len(failed)}/{len(batch)}")
        if failed:
            first = failed[0]
            key = first.get("key", "<unknown>")
            msg = first.get("errorMessage", "unknown error")
            raise RuntimeError(f"Azure Search rejected documents. Example key={key}: {msg}")

    print(f"Upload complete. Documents uploaded: {uploaded}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as ex:
        print(f"ERROR: {ex}", file=sys.stderr)
        raise SystemExit(2)
