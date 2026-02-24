# AI Assistant Knowledge Feeding - Quick Reference

> **Doc Role**
> - **Source of truth**: No (`Operational Guide`)
> - **Canonical references**: `docs/PROJECT_MASTER.md` (AI assistant guidance references), `docs/DOCS_INDEX.md`
> - **Use this doc for**: Fast onboarding workflow to create/publish AI knowledge docs
> - **Status**: Active


**TL;DR**: Your CRM has an AI Assistant powered by Azure Search. To feed it knowledge, write Markdown files in `docs/ai/knowledge/`, run 3 Python scripts, and done.

---

## 🚀 30-Second Workflow

```bash
# 1. Create knowledge file
cat > docs/ai/knowledge/leads/my-new-knowledge.md << 'EOF'
---
title: Clear Topic Title
module: leads
audience: sales-rep
version: 2026-02-23
owner: revenue-ops
status: draft
tenant_scope: global
source: internal-policy
---

# Main Title

Your knowledge content here...
EOF

# 2. Validate
python3 scripts/build_ai_knowledge_manifest.py

# 3. Upload
export AZURE_SEARCH_ENDPOINT="https://crmenterprisesearchdevca.search.windows.net"
export AZURE_SEARCH_API_KEY="<your-key>"
python3 scripts/push_ai_knowledge_to_search.py

# 4. Test in Assistant UI (bottom-right corner)
# Ask a question → should cite your new knowledge
```

---

## 📁 Directory Structure

```
docs/ai/
├─ knowledge/                    ← All CRM policies & rules
│  ├─ leads/                    ← Lead knowledge files
│  ├─ opportunities/            ← Opportunity knowledge files
│  ├─ approvals/                ← Approval workflow knowledge
│  ├─ activities/               ← Activity logging knowledge
│  ├─ auth/                     ← Authentication & roles
│  ├─ command-center/           ← Dashboard KPIs
│  ├─ pipeline-governance/      ← Stage gates & requirements
│  ├─ sales-playbooks/          ← Workflows & how-tos
│  ├─ api/                      ← REST API reference
│  ├─ manifest.jsonl            ← [AUTO] Indexed metadata
│  ├─ CHANGELOG.md              ← Version history
│  └─ README.md
│
├─ KNOWLEDGE_GROUNDING_GUIDE.md  ← Full system explanation
└─ prompt-tests/
   └─ assistant_grounding_test_set.json

scripts/
├─ generate_knowledge_from_codebase.py  ← Auto-generate boilerplate
├─ build_ai_knowledge_manifest.py       ← Parse .md → manifest.jsonl
├─ setup_ai_knowledge_search_index.py   ← Create Azure Search index
├─ push_ai_knowledge_to_search.py       ← Upload to Azure Search
└─ run_assistant_prompt_tests.py        ← Test retrieval
```

---

## 📝 File Template (Copy & Paste)

```markdown
---
title: [Specific topic, e.g., "Lead Status Transitions"]
module: [leads|opportunities|approvals|activities|auth|command-center|pipeline-governance|sales-playbooks|api|assistant]
audience: [sales-rep|sales-manager|administrator|developer] (comma-separated)
version: 2026-02-23
owner: [revenue-ops|engineering|product|your-team]
status: draft
tenant_scope: global
source: internal-policy
---

# [Your Topic Title]

## Section One
Content here...

### Subsection
- Point 1
- Point 2

## Section Two
More content...

| Column | Details |
|--------|---------|
| Value  | Description |
```

---

## ✅ Your Current Status

```
✅ Azure Search set up: crm-ai-knowledge index
✅ 17 documents indexed (leads, opportunities, approvals, activities, auth)
✅ Backend integration: AssistantChatService retrieves and grounds responses
✅ Frontend: Assistant panel in UI ready to use

Need to expand:
❌ Opportunity fields & stages (comprehensive)
❌ Approval workflows & routing
❌ Activity logging best practices
❌ Dashboard KPI definitions
❌ Sales playbooks & daily workflows
❌ API reference documentation
```

---

## 🎯 Quick Goals (Next 2 Weeks)

1. **Week 1**: Add 10 new knowledge documents
   - Opportunity stages & gates
   - Lead qualification criteria
   - Approval policies
   - Activity types & outcomes

2. **Week 2**: Add 10 more
   - Dashboard KPI definitions
   - Sales playbook workflows
   - API endpoint reference
   - Mobile optimization guide

**Result**: 37 documents indexed, assistant answers 80% of common questions

---

## 🔧 Commands Cheat Sheet

### Create a new knowledge file
```bash
nano docs/ai/knowledge/[module]/[filename].md
```

### Validate syntax
```bash
python3 scripts/build_ai_knowledge_manifest.py
```

### Setup Azure Search (one-time)
```bash
python3 scripts/setup_ai_knowledge_search_index.py
```

### Upload to Azure Search
```bash
export AZURE_SEARCH_ENDPOINT="https://crmenterprisesearchdevca.search.windows.net"
export AZURE_SEARCH_API_KEY="<key>"
python3 scripts/push_ai_knowledge_to_search.py
```

### Test retrieval
```bash
python3 scripts/run_assistant_prompt_tests.py --no-live-assistant
```

### Auto-generate boilerplate
```bash
python3 scripts/generate_knowledge_from_codebase.py
```

### Update changelog
```bash
echo "## 2026-02-23

- Added opportunity stage gates
- Added lead qualification criteria
- Updated documentation

Status: 25 documents indexed" >> docs/ai/knowledge/CHANGELOG.md
```

---

## ❓ FAQ

**Q: How often do I need to update Azure Search?**  
A: Whenever you add/change knowledge files. Run script 3 times (build manifest, upload).

**Q: Can I mark knowledge as "draft" so users don't see it?**  
A: Yes. Set `status: draft`. Only `status: approved` docs are included in searches.

**Q: How do I know what knowledge is missing?**  
A: Use the **CRM Capabilities Mapping** guide ([CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md](CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md)) to identify gaps.

**Q: Can I auto-generate knowledge from my code?**  
A: Yes. Run `scripts/generate_knowledge_from_codebase.py`, then manually enhance.

**Q: What if the assistant gives wrong answers?**  
A: Add/fix knowledge file, rebuild, re-upload. Assistant learns from sources.

**Q: Can users ask about features not yet documented?**  
A: Yes. Assistant will say "knowledge not available" or use its general knowledge (grounded in real data helps more).

**Q: How long does it take after uploading?**  
A: Azure Search indexes within seconds. Test immediately.

---

## 📖 Full Guides

- **Detailed System**: [AI_KNOWLEDGE_FEEDING_GUIDE.md](AI_KNOWLEDGE_FEEDING_GUIDE.md)
- **Capability Mapping**: [CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md](CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md)
- **Grounding Details**: [ai/KNOWLEDGE_GROUNDING_GUIDE.md](ai/KNOWLEDGE_GROUNDING_GUIDE.md)
- **Example Test Cases**: [ai/prompt-tests/assistant_grounding_test_set.json](ai/prompt-tests/assistant_grounding_test_set.json)

---

## 🎓 Learning Path

1. **Start**: Read this file (5 min)
2. **Understand**: Review [AI_KNOWLEDGE_FEEDING_GUIDE.md](AI_KNOWLEDGE_FEEDING_GUIDE.md) → System Architecture (10 min)
3. **Map**: Use [CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md](CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md) to identify first 5 docs to create
4. **Create**: Write 1 knowledge file using the template
5. **Publish**: Run 3 scripts to upload
6. **Test**: Ask assistant in UI
7. **Iterate**: Repeat for more topics

---

## 💡 Pro Tips

- **One file per topic**: Easier to find and maintain
- **Link between files**: Use markdown links for cross-references
- **Include examples**: Real examples from your CRM
- **Version consistently**: Use ISO date format `YYYY-MM-DD`
- **Involve domain experts**: Have sales manages review lead/opportunity knowledge
- **Test before marking approved**: Add to test set, run validation script
- **Keep CHANGELOG updated**: Helps team track what's been added

---

## 🚨 Common Mistakes

❌ Inventing features not yet built  
✅ Only document what's live and tested

❌ Including credentials or API keys  
✅ Use examples with intentional gaps (xxx, your-key, etc.)

❌ Writing vague narratives  
✅ Be specific: "When Status = New AND Days > 30 → Auto-disqualify"

❌ Forgetting to mark `status: approved`  
✅ Draft docs won't show up in search results

❌ Missing required frontmatter fields  
✅ Check template: title, module, audience, version, owner, status, tenant_scope, source

---

## 🎬 Get Started Now

```bash
# Step 1: Create first knowledge doc
cat > docs/ai/knowledge/opportunities/opportunity-stages-101.md << 'KNOWLEDGE'
---
title: Opportunity Stages & Definitions
module: opportunities
audience: sales-rep,sales-manager
version: 2026-02-23
owner: revenue-ops
status: draft
tenant_scope: global
source: internal-policy
---

# Opportunity Stages

## What are opportunity stages?

Stages represent progress through the sales cycle.

## The Five Stages

### 1. Prospecting
- Initial lead converted to opportunity
- Goal: Schedule discovery call
- Duration: 1-2 weeks

### 2. Engage
- Discovery completed
- Goal: Understand business needs
- Duration: 1-3 weeks

### 3. Solution
- Proposal being developed
- Goal: Present solution
- Duration: 2-4 weeks

### 4. Commit
- Proposal accepted in principle
- Goal: Finalize terms
- Duration: 1-2 weeks

### 5. Closed Won / Closed Lost
- Deal closed
- Goal: Archive with learnings
KNOWLEDGE

# Step 2: Validate
python3 scripts/build_ai_knowledge_manifest.py

# Step 3: Upload
export AZURE_SEARCH_ENDPOINT="https://crmenterprisesearchdevca.search.windows.net"
export AZURE_SEARCH_API_KEY="<your-admin-key>"
python3 scripts/push_ai_knowledge_to_search.py

# Step 4: Test in UI
# Open CRM → Assistant panel → Ask: "What are the opportunity stages?"
```

**You're done! 🎉**

---

## Questions?

- **System Details**: See [AI_KNOWLEDGE_FEEDING_GUIDE.md](AI_KNOWLEDGE_FEEDING_GUIDE.md)
- **What to Write**: See [CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md](CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md)
- **Scripts Help**: Run `python3 scripts/build_ai_knowledge_manifest.py --help`
- **Test Cases**: See `docs/ai/prompt-tests/assistant_grounding_test_set.json`
