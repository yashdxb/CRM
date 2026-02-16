## Summary
- 

## Scope
- Module(s):
- Story / backlog reference:

## Architecture Classification (Required)
- Classification: `Simple Flow` / `Complex Orchestration`
- Why this classification applies:
- Implementation path: `Application Service` / `MediatR`
- If `Complex Orchestration`, list command/query + handlers:
  - 

## Hybrid CQRS Checklist (Required)
- [ ] I followed `docs/PROJECT_BACKLOG.md` -> `Hybrid CQRS Implementation Checklist (Execution)`.
- [ ] Controller actions do not use direct `DbContext` access.
- [ ] Tenant and permission guards are preserved.
- [ ] Side effects are event-driven where needed (domain events and/or Azure Service Bus).
- [ ] Response contracts are backward compatible (or explicitly documented as changed).

## Testing
- [ ] API/client build passes locally.
- [ ] Playwright executed (minimum `client/e2e/smoke.spec.ts` after code changes).
- [ ] Targeted tests for changed module executed.
- Evidence / command output summary:
  - 

## Docs and Backlog
- [ ] Updated docs/backlog status where needed (`docs/PROJECT_MASTER.md`, `docs/CRM_BACKLOG.md`, `docs/PROJECT_BACKLOG.md`).
- [ ] ClickUp story/task updated (if applicable).

## Risks / Rollback
- Risks:
  - 
- Rollback plan:
  - 
