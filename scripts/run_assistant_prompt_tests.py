#!/usr/bin/env python3
"""
Run assistant grounding prompt tests.

Modes:
1) Retrieval mode (default): verifies Azure Search retrieves expected source docs.
2) Live assistant mode (optional): calls /api/assistant/chat and verifies keyword hints.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any, Dict, List
from urllib import error, request

DEFAULT_SEARCH_API_VERSION = "2023-11-01"
DEFAULT_TEST_SET = Path("docs/ai/prompt-tests/assistant_grounding_test_set.json")


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def search_docs(endpoint: str, index_name: str, api_key: str, query: str, top: int, api_version: str) -> List[dict]:
    url = f"{endpoint.rstrip('/')}/indexes/{index_name}/docs/search?api-version={api_version}"
    body = {
        "search": query,
        "top": top,
        "select": "path,title,module,version,status"
    }
    req = request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json", "api-key": api_key},
        method="POST",
    )
    with request.urlopen(req, timeout=60) as resp:
        payload = json.loads(resp.read().decode("utf-8"))
    return payload.get("value", [])


def call_assistant(api_base: str, auth_token: str, question: str, tenant_key: str | None = None) -> str:
    url = f"{api_base.rstrip('/')}/api/assistant/chat"
    headers: Dict[str, str] = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {auth_token}",
    }
    if tenant_key:
        headers["X-Tenant-Key"] = tenant_key
    req = request.Request(
        url,
        data=json.dumps({"message": question}).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    with request.urlopen(req, timeout=60) as resp:
        payload = json.loads(resp.read().decode("utf-8"))
    return str(payload.get("reply", ""))


def contains_all(text: str, keywords: List[str]) -> bool:
    lowered = text.lower()
    return all(keyword.lower() in lowered for keyword in keywords)


def main() -> int:
    parser = argparse.ArgumentParser(description="Run AI assistant grounding prompt tests")
    parser.add_argument("--test-set", default=str(DEFAULT_TEST_SET))
    parser.add_argument("--search-endpoint", default=os.getenv("AZURE_SEARCH_ENDPOINT", ""))
    parser.add_argument("--search-index", default=os.getenv("AZURE_SEARCH_INDEX_NAME", "crm-ai-knowledge"))
    parser.add_argument("--search-key", default=os.getenv("AZURE_SEARCH_API_KEY", ""))
    parser.add_argument("--search-top", type=int, default=5)
    parser.add_argument("--search-api-version", default=os.getenv("AZURE_SEARCH_API_VERSION", DEFAULT_SEARCH_API_VERSION))
    parser.add_argument("--assistant-api-base", default=os.getenv("ASSISTANT_API_BASE", ""))
    parser.add_argument("--assistant-auth-token", default=os.getenv("ASSISTANT_AUTH_TOKEN", ""))
    parser.add_argument("--assistant-tenant-key", default=os.getenv("ASSISTANT_TENANT_KEY", "default"))
    parser.add_argument("--no-live-assistant", action="store_true")
    args = parser.parse_args()

    test_set_path = Path(args.test_set)
    if not test_set_path.exists():
        print(f"ERROR: missing test set {test_set_path}", file=sys.stderr)
        return 2

    tests = load_json(test_set_path)
    if not isinstance(tests, list):
        print("ERROR: test set must be a JSON array", file=sys.stderr)
        return 2

    if not args.search_endpoint or not args.search_key:
        print("ERROR: retrieval tests require AZURE_SEARCH_ENDPOINT and AZURE_SEARCH_API_KEY", file=sys.stderr)
        return 2

    total = len(tests)
    retrieval_passed = 0
    live_passed = 0
    run_live = not args.no_live_assistant and bool(args.assistant_api_base and args.assistant_auth_token)

    print(f"Running {total} prompt tests")
    print(f"Retrieval mode: ON")
    print(f"Live assistant mode: {'ON' if run_live else 'OFF'}")

    for test in tests:
        test_id = str(test.get("id", "unknown"))
        question = str(test.get("question", "")).strip()
        expected_paths = [str(p) for p in test.get("expected_source_paths", [])]
        expected_keywords = [str(k) for k in test.get("expected_response_keywords", [])]

        try:
            docs = search_docs(
                endpoint=args.search_endpoint,
                index_name=args.search_index,
                api_key=args.search_key,
                query=question,
                top=args.search_top,
                api_version=args.search_api_version,
            )
            returned_paths = [str(d.get("path", "")) for d in docs]
            retrieval_ok = all(any(exp == rp for rp in returned_paths) for exp in expected_paths)
        except error.HTTPError as ex:
            print(f"[{test_id}] retrieval error: {ex.code}")
            retrieval_ok = False
            returned_paths = []
        except Exception as ex:
            print(f"[{test_id}] retrieval error: {ex}")
            retrieval_ok = False
            returned_paths = []

        if retrieval_ok:
            retrieval_passed += 1
            print(f"[{test_id}] retrieval PASS")
        else:
            print(f"[{test_id}] retrieval FAIL expected={expected_paths} got={returned_paths}")

        if run_live:
            try:
                reply = call_assistant(
                    api_base=args.assistant_api_base,
                    auth_token=args.assistant_auth_token,
                    question=question,
                    tenant_key=args.assistant_tenant_key,
                )
                live_ok = contains_all(reply, expected_keywords)
            except Exception as ex:
                print(f"[{test_id}] live error: {ex}")
                live_ok = False

            if live_ok:
                live_passed += 1
                print(f"[{test_id}] live PASS")
            else:
                print(f"[{test_id}] live FAIL expected keywords={expected_keywords}")

    print("")
    print(f"Retrieval passed: {retrieval_passed}/{total}")
    if run_live:
        print(f"Live assistant passed: {live_passed}/{total}")

    if retrieval_passed != total:
        return 2
    if run_live and live_passed != total:
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
