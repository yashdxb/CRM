#!/usr/bin/env python3
"""
Build a knowledge manifest for Foundry grounding.

Scans docs/ai/knowledge/**/*.md, validates required frontmatter,
and writes JSONL manifest for indexing workflows.
"""

from __future__ import annotations

import json
import base64
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

REPO_ROOT = Path(__file__).resolve().parents[1]
KNOWLEDGE_ROOT = REPO_ROOT / "docs" / "ai" / "knowledge"
MANIFEST_PATH = KNOWLEDGE_ROOT / "manifest.jsonl"
ERRORS_PATH = KNOWLEDGE_ROOT / "manifest-errors.txt"

REQUIRED_KEYS = (
    "title",
    "module",
    "audience",
    "version",
    "owner",
    "status",
    "tenant_scope",
    "source",
)


@dataclass
class ParsedDoc:
    relative_path: str
    metadata: Dict[str, str]
    content: str


def parse_frontmatter(text: str) -> Tuple[Dict[str, str], str]:
    if not text.startswith("---\n"):
        return {}, text

    parts = text.split("\n---\n", 1)
    if len(parts) != 2:
        return {}, text

    raw_meta, content = parts
    meta_lines = raw_meta.splitlines()[1:]
    metadata: Dict[str, str] = {}
    for line in meta_lines:
        line = line.strip()
        if not line or ":" not in line:
            continue
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip()
    return metadata, content.strip()


def collect_docs() -> Tuple[List[ParsedDoc], List[str]]:
    docs: List[ParsedDoc] = []
    errors: List[str] = []

    for path in sorted(KNOWLEDGE_ROOT.rglob("*.md")):
        if path.name in {"README.md", "CHANGELOG.md"}:
            continue
        if "_templates" in path.parts:
            continue

        raw = path.read_text(encoding="utf-8")
        metadata, content = parse_frontmatter(raw)
        missing = [key for key in REQUIRED_KEYS if not metadata.get(key)]
        if missing:
            rel = path.relative_to(REPO_ROOT).as_posix()
            errors.append(f"{rel}: missing keys: {', '.join(missing)}")
            continue
        if not content.strip():
            rel = path.relative_to(REPO_ROOT).as_posix()
            errors.append(f"{rel}: missing content body")
            continue

        docs.append(
            ParsedDoc(
                relative_path=path.relative_to(REPO_ROOT).as_posix(),
                metadata=metadata,
                content=content,
            )
        )

    return docs, errors


def build_manifest(docs: List[ParsedDoc]) -> List[dict]:
    rows: List[dict] = []
    for doc in docs:
        safe_id = base64.urlsafe_b64encode(doc.relative_path.encode("utf-8")).decode("ascii").rstrip("=")
        row = {
            "id": safe_id,
            "path": doc.relative_path,
            "title": doc.metadata["title"],
            "module": doc.metadata["module"],
            "audience": doc.metadata["audience"],
            "version": doc.metadata["version"],
            "owner": doc.metadata["owner"],
            "status": doc.metadata["status"],
            "tenant_scope": doc.metadata["tenant_scope"],
            "source": doc.metadata["source"],
            "content": doc.content,
        }
        rows.append(row)
    return rows


def main() -> int:
    if not KNOWLEDGE_ROOT.exists():
        raise SystemExit(f"Knowledge root not found: {KNOWLEDGE_ROOT}")

    docs, errors = collect_docs()
    manifest_rows = build_manifest(docs)

    MANIFEST_PATH.write_text(
        "".join(json.dumps(row, ensure_ascii=True) + "\n" for row in manifest_rows),
        encoding="utf-8",
    )

    if errors:
        ERRORS_PATH.write_text("\n".join(errors) + "\n", encoding="utf-8")
    elif ERRORS_PATH.exists():
        ERRORS_PATH.unlink()

    print(f"Knowledge docs indexed: {len(manifest_rows)}")
    print(f"Manifest: {MANIFEST_PATH.relative_to(REPO_ROOT).as_posix()}")
    if errors:
        print(f"Validation errors: {len(errors)}")
        print(f"Errors: {ERRORS_PATH.relative_to(REPO_ROOT).as_posix()}")
        return 2

    print("Validation: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
