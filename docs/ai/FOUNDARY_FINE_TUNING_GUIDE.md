# Foundry Fine‑Tuning Guide (North Edge CRM)

This guide documents how the CRM assistant was created and how fine‑tuning was initiated in Azure AI Foundry for North Edge System (Toronto, ON, Canada). It is intended for internal use.

## 1) Foundry resources used
- **Resource group:** `rg-crm-dev-ca`
- **AI resource:** `crm-ai-project-resource` (eastus2)
- **Foundry project:** `crm-ai-project`
- **Agent name:** CRM Internal Assistant
- **Agent ID:** `asst_LQWvrfLaeN3KL8nzNyA6JwZH`

> Agent lives under:  
Azure Portal → Resource Group `rg-crm-dev-ca` → `crm-ai-project-resource` → Projects → `crm-ai-project` → Agents

## 2) Assistant model (current)
- **Model:** `gpt-4.1-mini`
- **Note:** `gpt-4.1-mini` does **not** support supervised fine‑tuning in this region.

## 3) Fine‑tune capability in eastus2
Fine‑tune‑capable models for this resource include:
- `gpt-4o` (recommended)
- `gpt-4o-2024-08-06`
- `gpt-35-turbo`
- `gpt-35-turbo-1106`
- `gpt-35-turbo-0125`
- `o4-mini`

Important:
- **o4‑mini** requires **reinforcement fine‑tuning** (not supervised JSONL).  
  For supervised fine‑tuning, use **gpt‑4o** or **gpt‑35‑turbo**.

## 4) Training dataset
- **Location:** `docs/ai/training/north-edge-crm-o4-mini-train.jsonl`
- **Size:** 110 examples
- **Format:** JSONL, each line is a chat‑style example:

```json
{"messages":[
  {"role":"system","content":"You are the internal CRM assistant for North Edge System. Company: North Edge System. Location: Toronto, ON, Canada. ..."},
  {"role":"user","content":"How do I qualify a lead?"},
  {"role":"assistant","content":"Check fit, need, authority, and timeline..."}
]}
```

## 5) Uploading training file (Azure OpenAI)
Uploaded using the Azure OpenAI Files endpoint (token from Azure CLI):

```bash
TOKEN=$(az account get-access-token --resource https://cognitiveservices.azure.com/ --query accessToken -o tsv)
ENDPOINT="https://crm-ai-project-resource.openai.azure.com"
FILE="docs/ai/training/north-edge-crm-o4-mini-train.jsonl"

curl -X POST "$ENDPOINT/openai/files?api-version=2024-05-01-preview" \
  -H "Authorization: Bearer $TOKEN" \
  -F "purpose=fine-tune" \
  -F "file=@$FILE"
```

**Training file ID:** `file-0d0598cd3bd54d139546adfc6235f788`

## 6) Fine‑tuning job (gpt‑4o)
Fine‑tune job created with supervised dataset:

```bash
curl -X POST "$ENDPOINT/openai/fine_tuning/jobs?api-version=2024-05-01-preview" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "training_file": "file-0d0598cd3bd54d139546adfc6235f788"
  }'
```

**Fine‑tune job ID:** `ftjob-c24a70b97e6e4a4bbcf8c64ba8a14ebd`  
**Status:** running at time of creation

Check status:
```bash
curl -X GET "$ENDPOINT/openai/fine_tuning/jobs/ftjob-c24a70b97e6e4a4bbcf8c64ba8a14ebd?api-version=2024-05-01-preview" \
  -H "Authorization: Bearer $TOKEN"
```

## 7) Deploying the fine‑tuned model
After the job completes, deploy the fine‑tuned model and then wire the agent to that deployment.

Typical steps:
1) Create a **deployment** for the fine‑tuned model in Azure OpenAI (Foundry UI).
2) Update the assistant to use the new deployment model.
3) Update server settings:
   - `FoundryAgent__Endpoint`
   - `FoundryAgent__ApiKey`
   - `FoundryAgent__AgentId`

### Deployment created (2026-01-30)
- **Deployment name:** `crm-assistant-ft`
- **Model:** `gpt-4o-2024-08-06.ft-c24a70b97e6e4a4bbcf8c64ba8a14ebd`
- **Capacity:** 1 (GlobalStandard)

### Assistant updated to fine‑tuned deployment
- **Assistant ID:** `asst_LQWvrfLaeN3KL8nzNyA6JwZH`
- **Model setting:** `crm-assistant-ft`

## 8) Where configuration lives in the repo
- `server/src/CRM.Enterprise.Api/appsettings.Development.json`  
  - `FoundryAgent` section

## 9) Notes
- Fine‑tune data is internal and company‑specific.  
- Keep answers concise and CRM‑specific (sales reps + managers).
- For future training updates, append new JSONL rows and start a new fine‑tune job.
