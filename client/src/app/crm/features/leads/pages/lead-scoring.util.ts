export interface LeadScoreInputs {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  companyName?: string | null;
  jobTitle?: string | null;
  source?: string | null;
  territory?: string | null;
  budgetAvailability?: string | null;
  readinessToSpend?: string | null;
  buyingTimeline?: string | null;
  problemSeverity?: string | null;
  economicBuyer?: string | null;
  icpFit?: string | null;
}

export interface LeadDataWeight {
  key: string;
  weight: number;
}

export interface LeadScoreResult {
  buyerDataQualityScore100: number;
  qualificationRawScore100: number | null;
  qualificationScore100: number;
  leadContributionScore100: number;
  qualificationContributionScore100: number;
  finalLeadScore: number;
}

const clampScore = (value: number): number => Math.max(0, Math.min(100, value));

const toKey = (value?: string | null): string => (value ?? '').trim().toLowerCase();

const DEFAULT_LEAD_DATA_WEIGHTS: LeadDataWeight[] = [
  { key: 'firstNameLastName', weight: 16 },
  { key: 'email', weight: 24 },
  { key: 'phone', weight: 24 },
  { key: 'companyName', weight: 16 },
  { key: 'jobTitle', weight: 12 },
  { key: 'source', weight: 8 }
];

const budgetScores: Record<string, number> = {
  'budget allocated and approved': 25,
  'budget identified but unapproved': 15,
  'indicative range mentioned': 15,
  'no defined budget': 5,
  'budget explicitly unavailable': 0,
  'unknown / not yet discussed': 0
};

const readinessScores: Record<string, number> = {
  'internal decision in progress': 20,
  'ready to proceed pending final step': 20,
  'actively evaluating solutions': 15,
  'interest expressed, no urgency': 8,
  'not planning to spend': 0,
  'unknown / unclear': 0
};

const timelineScores: Record<string, number> = {
  'decision date confirmed internally': 15,
  'target date verbally confirmed': 12,
  'rough timeline mentioned': 6,
  'date missed / repeatedly pushed': 0,
  'no defined timeline': 0,
  'unknown / not discussed': 0
};

const problemScores: Record<string, number> = {
  'executive-level priority': 20,
  'critical business impact': 20,
  'recognized operational problem': 8,
  'mild inconvenience': 2,
  'problem acknowledged but deprioritized': 0,
  'unknown / not validated': 0
};

const economicBuyerScores: Record<string, number> = {
  'buyer engaged in discussion': 10,
  'buyer verbally supportive': 10,
  'buyer identified, not engaged': 5,
  'influencer identified': 5,
  'buyer explicitly not involved': 0,
  'unknown / not identified': 0
};

const icpScores: Record<string, number> = {
  'strong icp fit': 10,
  'partial icp fit': 5,
  'out-of-profile but exploratory': 5,
  'clearly out of icp': 0,
  'unknown / not assessed': 0
};

export const qualificationFactorOptions = {
  budgetAvailability: [
    'Unknown / not yet discussed',
    'Indicative range mentioned',
    'Budget allocated and approved',
    'Budget identified but unapproved',
    'No defined budget',
    'Budget explicitly unavailable'
  ],
  readinessToSpend: [
    'Unknown / unclear',
    'Interest expressed, no urgency',
    'Actively evaluating solutions',
    'Internal decision in progress',
    'Ready to proceed pending final step',
    'Not planning to spend'
  ],
  buyingTimeline: [
    'Unknown / not discussed',
    'Rough timeline mentioned',
    'Target date verbally confirmed',
    'Decision date confirmed internally',
    'Date missed / repeatedly pushed',
    'No defined timeline'
  ],
  problemSeverity: [
    'Unknown / not validated',
    'Mild inconvenience',
    'Recognized operational problem',
    'Critical business impact',
    'Executive-level priority',
    'Problem acknowledged but deprioritized'
  ],
  economicBuyer: [
    'Unknown / not identified',
    'Influencer identified',
    'Buyer identified, not engaged',
    'Buyer engaged in discussion',
    'Buyer verbally supportive',
    'Buyer explicitly not involved'
  ],
  icpFit: [
    'Unknown / not assessed',
    'Partial ICP fit',
    'Strong ICP fit',
    'Out-of-profile but exploratory',
    'Clearly out of ICP'
  ]
} as const;

export function isMeaningfulQualificationValue(value?: string | null): boolean {
  const normalized = toKey(value);
  return normalized.length > 0 && !normalized.includes('unknown');
}

export function computeSignalScore(input: LeadScoreInputs): number {
  return computeLeadDataQualityScore(input, DEFAULT_LEAD_DATA_WEIGHTS);
}

export function computeLeadDataQualityScore(
  input: LeadScoreInputs,
  configuredWeights?: ReadonlyArray<LeadDataWeight> | null
): number {
  const normalizedWeights = normalizeLeadDataWeights(configuredWeights);
  const firstName = input.firstName?.trim();
  const lastName = input.lastName?.trim();
  const email = input.email?.trim();
  const phone = input.phone?.trim();
  const company = input.companyName?.trim();
  const jobTitle = input.jobTitle?.trim();
  const source = input.source?.trim();
  const hasSignal = !!(firstName || lastName || email || phone || company || jobTitle || source);

  if (!hasSignal) {
    return 0;
  }

  const active = {
    firstNameLastName: !!(firstName && lastName),
    email: !!email,
    phone: !!phone,
    companyName: !!company,
    jobTitle: !!jobTitle,
    source: !!source
  } as const;

  const totalWeight = normalizedWeights.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight <= 0) {
    return 0;
  }

  const earnedWeight = normalizedWeights.reduce((sum, item) => {
    const enabled = active[item.key as keyof typeof active] ?? false;
    return sum + (enabled ? item.weight : 0);
  }, 0);

  return clampScore(Math.round((earnedWeight / totalWeight) * 100));
}

export function computeQualificationRawScore(input: LeadScoreInputs): number | null {
  const factors = [
    input.budgetAvailability,
    input.readinessToSpend,
    input.buyingTimeline,
    input.problemSeverity,
    input.economicBuyer,
    input.icpFit
  ];
  const hasAnyMeaningfulFactor = factors.some((value) => isMeaningfulQualificationValue(value));
  if (!hasAnyMeaningfulFactor) return null;

  const total =
    (budgetScores[toKey(input.budgetAvailability)] ?? 0) +
    (readinessScores[toKey(input.readinessToSpend)] ?? 0) +
    (timelineScores[toKey(input.buyingTimeline)] ?? 0) +
    (problemScores[toKey(input.problemSeverity)] ?? 0) +
    (economicBuyerScores[toKey(input.economicBuyer)] ?? 0) +
    (icpScores[toKey(input.icpFit)] ?? 0);

  return clampScore(total);
}

export function computeLeadScore(
  input: LeadScoreInputs,
  configuredLeadDataWeights?: ReadonlyArray<LeadDataWeight> | null
): LeadScoreResult {
  const buyerDataQualityScore100 = computeLeadDataQualityScore(input, configuredLeadDataWeights);
  const qualificationRawScore100 = computeQualificationRawScore(input);
  const qualificationScore100 = qualificationRawScore100 === null ? 0 : qualificationRawScore100;
  const finalLeadScore = buyerDataQualityScore100;

  return {
    buyerDataQualityScore100,
    qualificationRawScore100,
    qualificationScore100,
    leadContributionScore100: buyerDataQualityScore100,
    qualificationContributionScore100: qualificationScore100,
    finalLeadScore
  };
}

function normalizeLeadDataWeights(configuredWeights?: ReadonlyArray<LeadDataWeight> | null): LeadDataWeight[] {
  const source = configuredWeights && configuredWeights.length > 0 ? configuredWeights : DEFAULT_LEAD_DATA_WEIGHTS;
  const byKey = new Map<string, number>();
  for (const item of source) {
    const key = (item.key ?? '').trim();
    if (!key) continue;
    byKey.set(key, Math.max(0, Number(item.weight ?? 0)));
  }

  const normalized = DEFAULT_LEAD_DATA_WEIGHTS.map((item) => ({
    key: item.key,
    weight: byKey.has(item.key) ? (byKey.get(item.key) ?? item.weight) : item.weight
  }));

  const total = normalized.reduce((sum, item) => sum + item.weight, 0);
  if (total <= 0) {
    return [...DEFAULT_LEAD_DATA_WEIGHTS];
  }
  return normalized;
}
