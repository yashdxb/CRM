/** Models for the Lead Import Wizard. */

export interface ImportColumnMapping {
  csvHeader: string;
  mappedTo: string | null;
  sampleValues: string[];
}

export const LEAD_FIELD_OPTIONS: { label: string; value: string }[] = [
  { label: '— Skip this column —', value: '' },
  { label: 'First Name', value: 'firstName' },
  { label: 'Last Name', value: 'lastName' },
  { label: 'Full Name', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Company', value: 'company' },
  { label: 'Job Title', value: 'jobTitle' },
  { label: 'Status', value: 'status' },
  { label: 'Source', value: 'source' },
  { label: 'Territory', value: 'territory' },
  { label: 'Score', value: 'score' },
  { label: 'Owner', value: 'owner' },
  { label: 'Buyer Type', value: 'buyerType' },
  { label: 'Budget Band', value: 'budgetBand' },
  { label: 'Preferred Area', value: 'preferredArea' },
  { label: 'Preferred Property Type', value: 'preferredPropertyType' }
];

/** Auto-mapping from lowercase CSV header to field value. */
export const AUTO_MAP: Record<string, string> = {
  firstname: 'firstName',
  first_name: 'firstName',
  'first name': 'firstName',
  lastname: 'lastName',
  last_name: 'lastName',
  'last name': 'lastName',
  name: 'name',
  fullname: 'name',
  full_name: 'name',
  'full name': 'name',
  email: 'email',
  'e-mail': 'email',
  phone: 'phone',
  telephone: 'phone',
  mobile: 'phone',
  company: 'company',
  companyname: 'company',
  company_name: 'company',
  'company name': 'company',
  organization: 'company',
  jobtitle: 'jobTitle',
  job_title: 'jobTitle',
  'job title': 'jobTitle',
  title: 'jobTitle',
  status: 'status',
  source: 'source',
  lead_source: 'source',
  'lead source': 'source',
  territory: 'territory',
  region: 'territory',
  score: 'score',
  lead_score: 'score',
  'lead score': 'score',
  owner: 'owner',
  assigned_to: 'owner',
  'assigned to': 'owner'
};

export interface ParsedLeadRow {
  /** Row index in the CSV (1-based). */
  rowIndex: number;
  /** Raw CSV key→value pairs. */
  raw: Record<string, string>;
  /** Mapped lead fields after column mapping. */
  mapped: Record<string, string>;
  /** Whether USER has selected/checked this row. */
  selected: boolean;
  /** Validation errors for this row. */
  errors: string[];
}

export interface DuplicateGroup {
  importRow: ParsedLeadRow;
  existingMatches: DuplicateMatch[];
  /** User action: 'import' | 'skip' | 'merge' */
  action: 'import' | 'skip' | 'merge';
  /** If merge, which existing lead ID to merge into. */
  mergeTargetId?: string;
}

export interface DuplicateMatch {
  leadId: string;
  name: string;
  companyName: string;
  email?: string;
  phone?: string;
  leadScore: number;
  matchScore: number;
  matchLevel: 'block' | 'warning' | 'allow';
  matchedSignals: string[];
}

export type WizardStep = 1 | 2 | 3 | 4 | 5;
