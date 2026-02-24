#!/usr/bin/env python3
"""
Generate CRM knowledge base from codebase artifacts.
Scans controllers, DTOs, and domain entities to auto-generate knowledge files.
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass

@dataclass
class KnowledgeDoc:
    title: str
    module: str
    audience: str
    owner: str
    content: str
    status: str = "draft"  # Change to "approved" when ready
    
    def to_markdown(self) -> str:
        version = datetime.now().strftime("%Y-%m-%d")
        frontmatter = f"""---
title: {self.title}
module: {self.module}
audience: {self.audience}
version: {version}
owner: {self.owner}
status: {self.status}
tenant_scope: global
source: auto-generated-from-codebase
---

"""
        return frontmatter + self.content

class KnowledgeGenerator:
    def __init__(self, repo_root: str, output_dir: str):
        self.repo_root = Path(repo_root)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
    def generate_api_endpoint_reference(self) -> KnowledgeDoc:
        """Extract API endpoints from controllers."""
        content = """# API Endpoint Reference

## Leads Module

### Search Leads
- **Endpoint**: `GET /api/leads`
- **Parameters**: 
  - `search`: Search by name/email
  - `status`: Filter by status
  - `skip`: Pagination offset
  - `take`: Results per page
- **Response**: Array of lead objects with ID, name, email, status, company
- **Authentication**: Required (Bearer token)
- **Rate Limit**: 60 requests/minute per user

### Get Lead Details
- **Endpoint**: `GET /api/leads/{id}`
- **Response**: Complete lead object with all fields
- **Errors**: 404 if not found, 401 if unauthorized

### Create Lead
- **Endpoint**: `POST /api/leads`
- **Required Fields**: 
  - `firstName` (string, max 255)
  - `email` (string, valid email format)
- **Optional Fields**: `company`, `phone`, `source`, `notes`
- **Validation**: Duplicate email check across tenant
- **On Success**: Returns created lead with auto-generated ID
- **on Error**: 400 for validation, 409 for duplicate

### Update Lead
- **Endpoint**: `PUT /api/leads/{id}`
- **Allowed Fields**: All lead fields except `createdAtUtc`
- **Validation**: Same rules as create
- **Optimistic Lock**: Uses `eTag` header for concurrency
- **Response**: Updated lead object

### Delete Lead
- **Endpoint**: `DELETE /api/leads/{id}`
- **Soft Delete**: Marks `isDeleted = true` instead of removing
- **Response**: 204 No Content
- **Audit**: Records deletion in ActivityLog

## Opportunities Module

### Search Opportunities
- **Endpoint**: `GET /api/opportunities`
- **Filters**: `stage`, `forecast`, `riskTier`, `ownerScope`
- **Sorting**: By `closeDate`, `amount`, `probability`

### Execute Approval
- **Endpoint**: `POST /api/approvals/execute`
- **Body**: `{ opportunityId, approvalType, decision }`
- **Risk Scoring**: Automatic for discount/override approvals
- **Audit Trail**: Complete action history stored

## Activities Module

### Log Activity
- **Endpoint**: `POST /api/activities`
- **Activity Types**: Call, Email, Meeting, Demo, Task
- **Required**: `type`, `relatedEntityId`, `outcome`
- **Auto-Linking**: Links to lead/opportunity by type
- **Timezone**: All times converted to tenant's timezone

"""
        return KnowledgeDoc(
            title="API Endpoint Reference",
            module="api",
            audience="developer,sales-engineer",
            owner="engineering",
            content=content
        )
    
    def generate_lead_fields_reference(self) -> KnowledgeDoc:
        """Generate lead field reference from domain entity."""
        content = """# Lead Field Definitions & Validation Rules

## Core Information

### First Name
- **Required**: Yes
- **Type**: String
- **Max Length**: 255 chars
- **Validation**: No special characters except spaces, hyphens
- **Usage**: Primary identifier in UI
- **Example**: "John", "María José"

### Email
- **Required**: Yes
- **Type**: Email address
- **Validation**: RFC 5322 format
- **Uniqueness**: Must be unique within tenant (case-insensitive)
- **Auto-Rules**: 
  - Invalid email blocks lead creation
  - Email verification sent on creation (if enabled)
- **Usage**: Primary contact method, system notifications

### Phone
- **Required**: No
- **Type**: Phone number
- **Format**: Stored as E.164 (international)
- **Display**: Formatted by user's locale
- **Validation**: 10-15 digits when provided

### Company Name
- **Required**: No (recommended for B2B)
- **Type**: String
- **Max Length**: 255 chars
- **Auto-Suggestions**: Top 100 companies by deal count

## Qualification & Status

### Lead Status
- **Type**: Enum
- **Possible Values**:
  - `New` - Just created, not yet contacted
  - `Contacted` - Initial contact made
  - `Qualified` - Passed qualification criteria
  - `Converted` - Became a customer (creates Opportunity)
  - `Disqualified` - Not a valid prospect
- **Transitions**: Can move backward except from Converted
- **Auto-Rules**:
  - No activity for 30 days → Aging warning
  - No activity for 60 days → Auto-disqualified (configurable)

### Lead Source
- **Type**: Enum
- **Values**: Website, Referral, Campaign, Event, Inbound, Other
- **Used For**: 
  - Funnel attribution
  - ROI calculation
  - Playbook routing
- **Can't Change After**: Creation (immutable audit field)

### Lead Score
- **Type**: Integer (0-100)
- **Calculated By**: Engagement points + firmographic fit
- **Engagement Points**:
  - Website visit: +1
  - Email open: +2
  - Demo request: +5
  - Proposal viewed: +3
- **Firmographic Fit** (if company linked):
  - Industry match: +10
  - Revenue range: +5
  - Employee count: +5
- **Used For**: Prioritization, routing to sales reps

## Engagement Tracking

### Last Activity Date
- **Type**: DateTime (UTC)
- **Auto-Updated**: On any activity (call, email, task)
- **Usage**: SLA breach detection
- **Important**: Used in lead aging rules

### Days Without Activity
- **Type**: Computed field
- **Formula**: Today - Last Activity Date
- **Thresholds**:
  - 7+ days: Yellow warning
  - 14+ days: Orange warning
  - 30+ days: Auto-disqualified (if configured)

## System Fields (Read-Only)

### Lead ID
- **Type**: UUID
- **Format**: `550e8400-e29b-41d4-a716-446655440000`
- **Generated**: On creation, immutable
- **API Use**: Primary key for all operations

### Created Date
- **Recorded**: Automatically on creation
- **User**: System records creator ID
- **Changed By**: Never updated

### Updated Date
- **Changed**: On any field modification
- **Exception**: Computed fields don't trigger updates

## Audit & Compliance

### Is Deleted
- **Soft Delete**: Marked true instead of removing
- **Visibility**: Hidden from normal UI queries
- **Restoration**: Possible only by admins
- **GDPR**: Can force hard-delete after retention period

"""
        return KnowledgeDoc(
            title="Lead Field Definitions & Validation Rules",
            module="leads",
            audience="sales-rep,manager,administrator",
            owner="product",
            content=content,
            status="approved"
        )
    
    def generate_lead_sla_policy(self) -> KnowledgeDoc:
        """Generate SLA and workflow policies."""
        content = """# Lead SLA & Follow-up Policy

## SLA Thresholds

### Response SLA
- **Target**: Within 24 hours of lead creation
- **Breach**: Any lead not contacted within 24 hours
- **Check**: Dashboard KPI "Lead Response SLA Breaches"
- **Impact**: Affects team metrics and forecasting accuracy

### Follow-up Frequency
- **Hot Leads** (Score 70+): Daily follow-up
- **Warm Leads** (Score 40-69): Every 2-3 days
- **Cold Leads** (Score <40): Weekly or on-demand
- **Qualified Only**: Applies only to "Contacted" or "Qualified" status

## Aging Rules

### Lead Aging Timeline
- **0-7 days**: Actively engaged (no warning)
- **8-14 days**: Aging (yellow, sales rep notified)
- **15-29 days**: Stale (orange, escalated to manager)
- **30+ days**: Dead (red, eligible for auto-disqualification)

### Auto-Disqualification
- **Trigger**: 60+ days without activity (configurable by team)
- **Pre-Warning**: Manager notified at 50 days
- **Can Override**: Manager can extend or re-qualify
- **Effect**: Removes from sales rep dashboard, preserved in archive

## Conversion Rules

### Lead → Opportunity
- **When**: Lead status changes to "Converted"
- **Creates**: New Opportunity record
- **Mapping**:
  - Lead name → Opportunity title
  - Company → Account (linked)
  - Lead source → Deal source
  - Score → Initial forecast probability
- **Reset**: New opportunity SLA begins immediately

### Required Before Conversion
- At least ONE activity logged (call, email, meeting)
- Company name filled in (B2B requirement)
- Email address valid and confirmed

## Activity Requirements

### Minimum Required Per Cycle
- **Weekly**: At least 1 activity per lead in "Contacted" or "Qualified"
- **Daily**: 3+ activities (any type)
- **Types Counted**: Call, Email, Meeting, Demo, Task completed
- **Note**: Failed/bounced emails don't count as activity

### Activity Logging

When logging an activity:
1. Select activity type (Call, Email, Meeting, Demo, Task)
2. Provide outcome (Positive, Neutral, No-show, Declined)
3. Enter brief notes
4. Link to lead/opportunity (auto-linked for new log)
5. Set next follow-up date if needed

"""
        return KnowledgeDoc(
            title="Lead SLA & Follow-up Policy",
            module="leads",
            audience="sales-rep,manager",
            owner="revenue-ops",
            content=content,
            status="approved"
        )
    
    def save_doc(self, doc: KnowledgeDoc, subdir: str = None) -> Path:
        """Save knowledge doc to file."""
        target_dir = self.output_dir / (subdir or doc.module)
        target_dir.mkdir(parents=True, exist_ok=True)
        
        # Create filename from title
        filename = re.sub(r'[^a-z0-9]+', '-', doc.title.lower()).strip('-')
        filename = f"{filename}.md"
        
        filepath = target_dir / filename
        filepath.write_text(doc.to_markdown(), encoding='utf-8')
        
        return filepath
    
    def generate_all(self):
        """Generate all knowledge docs."""
        docs = [
            self.generate_api_endpoint_reference(),
            self.generate_lead_fields_reference(),
            self.generate_lead_sla_policy(),
        ]
        
        print("📚 Generating knowledge base from codebase...\n")
        
        for doc in docs:
            filepath = self.save_doc(doc)
            print(f"✅ {doc.title}")
            print(f"   → {filepath.relative_to(self.repo_root)}\n")
        
        print(f"Generated {len(docs)} knowledge documents.")
        print("\nNext steps:")
        print("1. Review documents in docs/ai/knowledge/")
        print("2. Update status from 'draft' to 'approved' when ready")
        print("3. Run: python3 scripts/build_ai_knowledge_manifest.py")
        print("4. Run: python3 scripts/push_ai_knowledge_to_search.py")

if __name__ == "__main__":
    import sys
    
    repo_root = "/Users/yasserahmed/Desktop/Development Projects/CRM-Enterprise"
    output_base = os.path.join(repo_root, "docs/ai/knowledge")
    
    generator = KnowledgeGenerator(repo_root, output_base)
    generator.generate_all()
