# AI Knowledge Pack

This folder is the source-of-truth knowledge set for Foundry grounding.

## Structure

- `_templates/`: frontmatter and writing templates.
- `approval-workflows/`: approvals policies and routing rules.
- `activities/`: activity outcome and next-step policies.
- `auth/`: login/logout journey, token/session, and auth API contracts.
- `assistant/`: assistant grounding and response governance.
- `command-center/`: KPI definitions and usage rules.
- `leads/`: lead lifecycle, SLA, and conversion policies.
- `opportunities/`: opportunity execution and forecast governance.
- `pipeline-governance/`: stage gates, required fields, and forecast rules.
- `sales-playbooks/`: role playbooks and daily operating guidance.
- `CHANGELOG.md`: policy update log for assistant grounding.

## Rules

- Each file must include required frontmatter.
- Keep content factual and aligned with implemented CRM behavior.
- Use `status: approved` when content is ready for production assistant use.

## Build + Upload

```bash
python3 scripts/setup_ai_knowledge_search_index.py
python3 scripts/build_ai_knowledge_manifest.py
python3 scripts/push_ai_knowledge_to_search.py
```
