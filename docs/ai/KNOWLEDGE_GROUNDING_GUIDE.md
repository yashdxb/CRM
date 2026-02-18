# Knowledge Grounding Guide (Microsoft Foundry)

This guide defines how North Edge CRM knowledge is prepared for Foundry assistant grounding.

## Goal

Provide trusted, current, tenant-safe CRM answers using retrieval before model memory.

## Approach

1. Author knowledge in `docs/ai/knowledge`.
2. Require YAML frontmatter metadata for every knowledge file.
3. Build a manifest for indexing with `scripts/build_ai_knowledge_manifest.py`.
4. Upload/index documents in Azure AI Search or Foundry knowledge.
5. Configure assistant instructions to answer from retrieved sources and cite them.

## Required frontmatter

Every knowledge file must start with frontmatter:

```md
---
title: Approval Policy
module: approvals
audience: sales-manager
version: 2026-02-18
owner: revenue-ops
status: approved
tenant_scope: global
source: internal-policy
---
```

Required keys:
- `title`
- `module`
- `audience`
- `version`
- `owner`
- `status`
- `tenant_scope`
- `source`

## Content standards

- One topic per file.
- Use short sections with clear headings.
- Prefer explicit rules over narrative.
- Include examples only if they reflect actual system behavior.
- Never include secrets, credentials, or personal data.

## Assistant instruction baseline

Use these instruction rules in Foundry assistant:

1. Answer from retrieved knowledge first.
2. If no reliable source is retrieved, say that policy is not available.
3. Cite source title and version in responses.
4. Do not invent workflow steps not present in retrieved content.
5. For action requests, provide a safe plan unless tool execution is enabled.
6. For new-user questions, explain simply but stay grounded in current CRM behavior.

## Indexing flow

1. Add/update docs in `docs/ai/knowledge`.
2. Run:

```bash
python3 scripts/build_ai_knowledge_manifest.py
```

3. Review generated files:
- `docs/ai/knowledge/manifest.jsonl`
- `docs/ai/knowledge/manifest-errors.txt` (if any)

4. Upload/index into Foundry knowledge pipeline.
   - Create or update Azure AI Search index schema:

```bash
python3 scripts/setup_ai_knowledge_search_index.py --dry-run
```

```bash
export AZURE_SEARCH_ENDPOINT="https://<service-name>.search.windows.net"
export AZURE_SEARCH_INDEX_NAME="crm-ai-knowledge"
export AZURE_SEARCH_API_KEY="<admin-or-index-key>"
python3 scripts/setup_ai_knowledge_search_index.py
```

   - Azure AI Search upload helper:

```bash
python3 scripts/push_ai_knowledge_to_search.py --dry-run
```

```bash
export AZURE_SEARCH_ENDPOINT="https://<service-name>.search.windows.net"
export AZURE_SEARCH_INDEX_NAME="crm-ai-knowledge"
export AZURE_SEARCH_API_KEY="<admin-or-index-key>"
python3 scripts/push_ai_knowledge_to_search.py
```
5. Validate with prompt tests:
- "What is discount approval threshold?"
- "What is required before Commit stage?"
- "What are SLA follow-up rules?"

## Current Dev Setup (Verified)

- Azure AI Search service: `crmenterprisesearchdevca`
- Endpoint: `https://crmenterprisesearchdevca.search.windows.net`
- Index: `crm-ai-knowledge`
- Indexed documents: `17` (from `docs/ai/knowledge/manifest.jsonl`)
- Key Vault secrets (for reuse):  
  - `ai-search-endpoint`  
  - `ai-search-index-name`  
  - `ai-search-api-key`

## ClickUp Tracking (Created)

- Epic: `Epic | AI Assistant | Knowledge Grounding & Retrieval` (ClickUp: `86dzw8unp`)
- Stories:
  - `86dzw8uug` — Azure AI Search index setup automation
  - `86dzw8uuk` — Knowledge manifest validation/generation
  - `86dzw8uuu` — Azure Search publishing with safe ids
  - `86dzw8uuv` — Grounded response policy for real workflows
  - `86dzw8uuw` — Login-to-logout + lead field reference coverage
  - `86dzw8uux` — Foundry runtime retrieval hookup + prompt QA

## Governance

- Update `docs/ai/knowledge/CHANGELOG.md` on policy changes.
- Keep older versions archived by filename suffix if needed.
- Prefer `status: approved` content for production assistant behavior.

## Prompt Test Set

- Test set file: `docs/ai/prompt-tests/assistant_grounding_test_set.json`
- Runner: `scripts/run_assistant_prompt_tests.py`

Retrieval verification:

```bash
export AZURE_SEARCH_ENDPOINT="https://crmenterprisesearchdevca.search.windows.net"
export AZURE_SEARCH_INDEX_NAME="crm-ai-knowledge"
export AZURE_SEARCH_API_KEY="<search-key>"
python3 scripts/run_assistant_prompt_tests.py --no-live-assistant
```

Live assistant verification (requires valid CRM auth token):

```bash
export ASSISTANT_API_BASE="https://crm-enterprise-api-dev-01122345.azurewebsites.net"
export ASSISTANT_AUTH_TOKEN="<jwt>"
export ASSISTANT_TENANT_KEY="default"
python3 scripts/run_assistant_prompt_tests.py
```
