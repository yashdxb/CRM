# How to Feed Complete CRM Knowledge to AI Assistant

> **Doc Role**
> - **Source of truth**: No (`Operational Guide`)
> - **Canonical references**: `docs/PROJECT_MASTER.md` (AI assistant team guides / governance), `docs/DOCS_INDEX.md`
> - **Use this doc for**: End-to-end AI knowledge authoring, publishing, validation, and expansion workflow
> - **Status**: Active


**Status**: 17 documents indexed | Ready for expansion  
**Last Updated**: 2026-02-23  
**Guide Version**: 1.0

---

## Table of Contents
1. [Quick Start (5 minutes)](#quick-start)
2. [System Architecture](#system-architecture)
3. [Knowledge Creation Workflow](#knowledge-creation-workflow)
4. [Automated Knowledge Generation](#automated-generation)
5. [Publishing Knowledge](#publishing-knowledge)
6. [Validation & Testing](#validation--testing)
7. [Best Practices](#best-practices)

---

## Quick Start

### Scenario: Add knowledge about opportunities

```bash
# 1. Create knowledge file in appropriate directory
cat > docs/ai/knowledge/opportunities/opportunity-stages-complete.md << 'EOF'
---
title: Opportunity Stages & Gate Requirements
module: opportunities
audience: sales-rep,manager
version: 2026-02-23
owner: revenue-ops
status: draft
tenant_scope: global
source: internal-policy
---

# Opportunity Stages

## Prospecting
- **Definition**: Initial lead converted to opportunity
- **Entry Criteria**: Lead qualified with company name
- **Exit Gate**: Needs initial discovery call + notes
- **Required Fields**: Opportunity title, company, estimated amount
- **Typical Duration**: 1-2 weeks
- **Key Actions**:
  - Schedule discovery call
  - Research company
  - Identify decision makers

... (add more stages)
EOF

# 2. Update file status from "draft" to "approved" when ready

# 3. Build manifest
python3 scripts/build_ai_knowledge_manifest.py

# 4. Push to Azure Search
export AZURE_SEARCH_ENDPOINT="https://crmenterprisesearchdevca.search.windows.net"
export AZURE_SEARCH_API_KEY="your-key"
python3 scripts/push_ai_knowledge_to_search.py

# 5. Test with assistant
# Open assistant and ask: "What are the requirements for moving an opportunity to Commit stage?"
```

---

## System Architecture

### How Knowledge Flows to Assistant

```
┌──────────────────────────────────────┐
│ Knowledge Files                      │
│ /docs/ai/knowledge/**/*.md           │
│ - YAML frontmatter                   │
│ - One topic per file                 │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│ Build Manifest                       │
│ scripts/build_ai_knowledge_manifest.py
│ Parses frontmatter + content         │
│ Outputs: manifest.jsonl              │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│ Azure AI Search Upload               │
│ scripts/push_ai_knowledge_to_search.py
│ Creates/updates index                │
│ Index: crm-ai-knowledge              │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│ User Asks Question                   │
│ "What's required for Commit stage?"  │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│ AssistantChatService.SendAsync()     │
│ 1. Calls Azure Search (full-text)    │
│ 2. Retrieves top 5 matching docs     │
│ 3. Builds grounded prompt            │
│ 4. Sends to Foundry agent            │
│ 5. Agent answers from sources        │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│ Assistant Response                   │
│ "Commit stage requires [sources]..."  │
└──────────────────────────────────────┘
```

### Key Files

| File/Directory | Purpose |
|---|---|
| `docs/ai/knowledge/` | Source of truth for all CRM policies |
| `docs/ai/knowledge/manifest.jsonl` | Indexed metadata for Azure Search |
| `scripts/build_ai_knowledge_manifest.py` | Parses .md files, validates frontmatter |
| `scripts/push_ai_knowledge_to_search.py` | Uploads manifest to Azure Search |
| `server/src/CRM.Enterprise.Infrastructure/AI/AzureSearchKnowledgeClient.cs` | Runtime retrieval client |
| `server/src/CRM.Enterprise.Infrastructure/AI/AssistantChatService.cs` | Builds grounded prompts |

### Current Knowledge Index

```
Index Name: crm-ai-knowledge
Service: crmenterprisesearchdevca
Capacity: 5GB (current usage: ~50MB)
Documents: 17 (from manifest.jsonl)

Modules Covered:
✅ auth (login/session/token)
✅ leads (lifecycle, SLA, fields)
✅ opportunities (stages, forecast, risk)
✅ approvals (routing, policies, escalation)
✅ activities (types, logging, outcomes)
✅ command-center (KPI definitions)
✅ pipeline-governance (stage gates)
✅ sales-playbooks (daily routines)
```

---

## Knowledge Creation Workflow

### 1. Plan Your Knowledge

Before writing, ask:
- **Topic**: What specific CRM behavior or policy?
- **Audience**: Who uses this knowledge? (sales-rep, manager, admin)
- **Source**: Where does this come from? (internal-policy, implementation-guide, api-docs)
- **Scope**: Tenant-global or specific business unit?

### 2. Create File with Frontmatter

Every file **must** start with YAML frontmatter:

```markdown
---
title: Clear, specific title
module: One of: leads, opportunities, approvals, activities, auth, command-center, pipeline-governance, sales-playbooks, api, assistant
audience: Comma-separated: sales-rep, sales-manager, administrator, developer
version: YYYY-MM-DD (must be single format)
owner: Role or team (revenue-ops, engineering, product)
status: draft (or approved when ready)
tenant_scope: global (or specific business unit)
source: Where this came from (internal-policy, api-docs, implementation-guide)
---

# Main Title (H1)

Content starts here...
```

### 3. Write for Clarity

**DO:**
- One topic per file
- Use short sections (max 500 words)
- Include examples that reflect actual CRM behavior
- Use lists for procedures and rules
- Start with "Why" or definition

**DON'T:**
- Invent features not yet built
- Include credentials or secrets
- Write narrative stories (be direct)
- Reference personal data
- Use future tense (we might, we'll)

### 4. Example: Lead Status Transitions

```markdown
---
title: Lead Status Transitions & Auto-Rules
module: leads
audience: sales-rep,sales-manager
version: 2026-02-23
owner: revenue-ops
status: approved
tenant_scope: global
source: internal-policy
---

# Lead Status Transitions

## Valid Transitions

| Current | Next | Allowed By | Notes |
|---------|------|-----------|-------|
| New | Contacted | Anyone | Contact made via call/email |
| Contacted | Qualified | Rep | Lead meets score threshold |
| Qualified | Converted | Rep or System | Creates opportunity |
| Qualified | Disqualified | Rep or Manager | Not a prospect |
| Disqualified | Qualified | Manager | Re-evaluate decision |
| Converted | - | None | Cannot change status |

## Auto-Transition Rules

### New → Disqualified (Auto)
- **Trigger**: 60 days without activity
- **Pre-Warning**: Manager alert at 50 days
- **Can Override**: Manager can extend or re-qualify by date

### Contacted → Aging (Visual, Not Status Change)
- **Warning**: Yellow after 7 days
- **Escalation**: Orange after 14 days
- **Alert**: Red and manager notified after 30 days

## Reverse Transitions

Only managers can move backward:
- Qualified → Contacted (for re-working)
- Disqualified → Qualified (to reconsider)

Regular sales reps can only move forward or mark disqualified.
```

---

## Automated Generation

Use the provided script to generate knowledge from codebase:

```bash
# Generate boilerplate knowledge files from code structure
python3 scripts/generate_knowledge_from_codebase.py

# Output:
# ✅ API Endpoint Reference → docs/ai/knowledge/api/
# ✅ Lead Field Definitions → docs/ai/knowledge/leads/
# ✅ Lead SLA & Policy → docs/ai/knowledge/leads/
```

Then **manually enhance** generated files with:
- Business context and "why"
- Edge cases and exceptions
- Common mistakes
- Playbook integration

### Custom Generation for Your Modules

To generate knowledge for your specific entities:

```python
# Extend scripts/generate_knowledge_from_codebase.py
class KnowledgeGenerator:
    def generate_opportunity_fields_reference(self):
        # Extract from Opportunity domain entity
        # Document each field with validation
        pass
    
    def generate_dashboard_kpi_definitions(self):
        # Extract from Dashboard DTOs
        # Document calculation methods
        pass
    
    def generate_workflow_playbook(self, workflow_name):
        # Map user journey through CRM
        # Document decision points
        pass
```

---

## Publishing Knowledge

### Step 1: Validate Your Markdown

```bash
# Check frontmatter syntax
python3 scripts/build_ai_knowledge_manifest.py --validate

# Output shows:
# ✅ docs/ai/knowledge/leads/lead-status-transitions.md (valid)
# ❌ docs/ai/knowledge/opportunities/bad-file.md (missing "module" field)
```

### Step 2: Build Manifest

```bash
# Converts all .md files to indexed JSON
python3 scripts/build_ai_knowledge_manifest.py

# Generates:
# ├─ docs/ai/knowledge/manifest.jsonl (indexed docs)
# └─ docs/ai/knowledge/manifest-errors.txt (if any issues)

# Check result:
cat docs/ai/knowledge/manifest.jsonl | head -3
# {"id": "leads-lead-status", "title": "Lead Status...", ...}
```

### Step 3: Set Up Azure Search (One Time)

```bash
# Configure environment
export AZURE_SEARCH_ENDPOINT="https://crmenterprisesearchdevca.search.windows.net"
export AZURE_SEARCH_INDEX_NAME="crm-ai-knowledge"
export AZURE_SEARCH_API_KEY="your-key"

# Create/update index schema
python3 scripts/setup_ai_knowledge_search_index.py

# Output:
# ✅ Index "crm-ai-knowledge" created
# Schema fields: id, title, module, content, audience, version, ...
```

### Step 4: Upload to Azure Search

```bash
# Batch upload manifest to index
python3 scripts/push_ai_knowledge_to_search.py

# Output:
# ✅ Pushing 22 documents...
# ✅ [1/22] leads-lead-status-transitions
# ✅ [2/22] leads-lead-sla-policy
# ...
# ✅ All 22 documents uploaded to crm-ai-knowledge
```

### Step 5: Update Documentation

```bash
# Edit docs/ai/knowledge/CHANGELOG.md
# Add entry with version and new documents
```

---

## Validation & Testing

### Interactive Testing

```bash
# Test retrieval directly
python3 scripts/run_assistant_prompt_tests.py --no-live-assistant

# Tests against docs/ai/prompt-tests/assistant_grounding_test_set.json
# Verifies that questions retrieve correct knowledge sources
```

### Test Set Format

```json
{
  "id": "lead-aging-rule-01",
  "question": "What happens to leads with 60 days no activity?",
  "expected_source_paths": [
    "docs/ai/knowledge/leads/lead-sla-policy.md"
  ],
  "expected_response_keywords": [
    "auto-disqualified",
    "60 days",
    "manager notification"
  ]
}
```

### Test with Live Assistant

```bash
# Get your auth token first
AUTH_TOKEN=$(curl -X POST https://api.example.com/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"xxx"}' \
  | jq -r '.token')

# Run tests against live assistant
export ASSISTANT_API_BASE="https://crm-enterprise-api.azurewebsites.net"
export ASSISTANT_AUTH_TOKEN="$AUTH_TOKEN"
export ASSISTANT_TENANT_KEY="default"

python3 scripts/run_assistant_prompt_tests.py
```

### Manual Testing in UI

1. Open CRM → Dashboard
2. Click AI Assistant panel (bottom-right)
3. Ask: "What are the requirements for moving an opportunity to Commit?"
4. Assistant should cite knowledge sources in response
5. Look for citation format: `[1] Opportunity Stages | v2026-02-23`

---

## Best Practices

### ✅ DO

1. **One topic per file**
   - ✅ `lead-status-transitions.md` (narrow, focused)
   - ❌ `lead-complete-guide.md` (too broad)

2. **Write factually from source code**
   - ✅ "Status can transition from New → Contacted → Qualified → Converted"
   - ❌ "Leads should move through stages in order" (vague)

3. **Include concrete examples**
   - ✅ "If no activity recorded after 60 days, system auto-sets status to Disqualified"
   - ❌ "Engagement is important for lead QA"

4. **Mark status correctly**
   - `draft` = experimental, not for production assistant
   - `approved` = ready for users, cited in responses

5. **Keep versions consistent**
   - Use ISO date format: `2026-02-23`
   - Update when content changes
   - Archive old versions behind file suffix if needed

### ❌ DON'T

1. **Don't invent features**
   - Only document what's built and live
   - Use "future" docs in separate folder if planning

2. **Don't include secrets**
   - No API keys, passwords, or credentials
   - No personal data or emails
   - Sanitize example responses

3. **Don't write narratives**
   - ❌ "Once upon a time, a sales rep opened the CRM..."
   - ✅ "Sales rep accesses Opportunity via /app/opportunities/[id]"

4. **Don't assume future state**
   - ❌ "When we implement lead scoring..."
   - ✅ "Lead score is calculated as engagement + firmographic fit"

5. **Don't duplicate across modules**
   - If topic fits in multiple modules, choose primary
   - Cross-reference in others with specific sections

### Module Guidelines

| Module | Content | Audience |
|--------|---------|----------|
| `leads/` | Lead lifecycle, fields, SLA, scoring | sales-rep, manager |
| `opportunities/` | Opportunity stages, forecasting, risk | sales-rep, manager |
| `approvals/` | Approval routing, thresholds, policies | manager, admin |
| `activities/` | Activity types, logging, outcomes | sales-rep |
| `auth/` | Login, roles, permissions, session | developer, admin |
| `command-center/` | Dashboard KPIs, definitions, calculations | manager, executive |
| `pipeline-governance/` | Stage gates, required fields, constraints | manager, admin |
| `sales-playbooks/` | Daily workflows, how-tos, best practices | sales-rep |
| `api/` | REST endpoints, schemas, contracts | developer |

---

## Complete Workflow Example

### Objective: Add comprehensive Opportunity knowledge

```bash
# 1. Create files
mkdir -p docs/ai/knowledge/opportunities

cat > docs/ai/knowledge/opportunities/opportunity-complete-reference.md << 'EOF'
---
title: Opportunity Field Reference & Validation
module: opportunities
audience: sales-rep,sales-manager
version: 2026-02-23
owner: product
status: draft
tenant_scope: global
source: domain-entity
---

# Opportunity Fields

## Amount
- **Type**: Decimal
- **Currency**: Tenant's base currency
- **Minimum**: $1,000 (or configurable)
- **Required**: Yes, for Commit stage+
- **Validation**: Positive number only
- **Forecast Impact**: Amount × Probability = Forecast revenue

...
EOF

cat > docs/ai/knowledge/opportunities/opportunity-stage-gates.md << 'EOF'
---
title: Opportunity Stage Gate Requirements
module: opportunities
audience: sales-rep,sales-manager
version: 2026-02-23
owner: revenue-ops
status: draft
tenant_scope: global
source: internal-policy
---

# Stage Gate Requirements

## Prospecting Stage
- **Entry**: Lead converted
- **Exit Gate**: Initial discovery call scheduled
- **Required Fields**: Title, company
- **Documents Needed**: None
- **Typical Duration**: 1-2 weeks

...
EOF

# 2. Validate
python3 scripts/build_ai_knowledge_manifest.py --validate

# 3. Update status to "approved" when reviewed
sed -i 's/status: draft/status: approved/' docs/ai/knowledge/opportunities/*.md

# 4. Build manifest
python3 scripts/build_ai_knowledge_manifest.py

# 5. Upload
export AZURE_SEARCH_ENDPOINT="..."
export AZURE_SEARCH_API_KEY="..."
python3 scripts/push_ai_knowledge_to_search.py

# 6. Test
python3 scripts/run_assistant_prompt_tests.py \
  --no-live-assistant \
  --query "What are the requirements for Commit stage?"

# 7. Document
echo "## 2026-02-23

- Added opportunity field reference
- Added stage gate requirements
- Updated validation rules

Status: 19 documents indexed" >> docs/ai/knowledge/CHANGELOG.md

# 8. Commit
git add docs/ai/knowledge/
git commit -m "docs: add comprehensive opportunity knowledge base"
```

---

## Troubleshooting

### Issue: `build_ai_knowledge_manifest.py` fails with "invalid frontmatter"

**Solution**: Check YAML syntax in file header:
```bash
head -15 docs/ai/knowledge/leads/bad-file.md

# Common issues:
# - Missing colon after key: status approved (should be: status: approved)
# - Extra spaces in value: version:  2026-02-23 (should be: version: 2026-02-23)
# - Unquoted special chars: owner: revenue-ops & ops (quote: owner: "revenue-ops & ops")
```

### Issue: Azure Search returns no results

**Solution**:
1. Verify documents uploaded: `python3 scripts/push_ai_knowledge_to_search.py --check`
2. Check status field: Only `approved` docs should be searchable
3. Test retrieval: `python3 scripts/run_assistant_prompt_tests.py --no-live-assistant`
4. Check frontmatter `module` matches your query context

### Issue: Assistant answers "knowledge not available"

**Solution**:
1. Verify knowledge file exists for that topic
2. Set `status: approved` (not `draft`)
3. Run manifest build and upload steps
4. Add test case to `docs/ai/prompt-tests/assistant_grounding_test_set.json`
5. Re-run tests to verify retrieval works

---

## Next Steps

1. **Expand knowledge base** using scripts above
2. **Review with team**: Have domain experts review knowledge files
3. **Iterate**: Update CHANGELOG.md and re-upload as needed
4. **Monitor**: Track which questions the assistant answers well vs poorly
5. **Improve**: Add more specific knowledge based on user questions
