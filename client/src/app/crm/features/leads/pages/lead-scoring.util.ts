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
  conversationScore100?: number | null;
  firstTouchDueAtUtc?: string | null;
  firstTouchedAtUtc?: string | null;
  status?: string | null;
}

export interface LeadDataWeight {
  key: string;
  weight: number;
}

export interface QualificationFactorConfig {
  key: string;
  displayLabel?: string | null;
  isActive: boolean;
  isRequired?: boolean;
  order?: number;
  factorType?: 'system' | 'custom';
  valueType?: 'singleSelect' | 'text';
  includeInScore?: boolean;
  options?: string[];
}

export interface LeadScoreResult {
  buyerDataQualityScore100: number;
  qualificationRawScore100: number | null;
  qualificationScore100: number;
  leadContributionScore100: number;
  qualificationContributionScore100: number;
  conversationContributionScore100: number;
  historyContributionScore100: number;
  finalLeadScore: number;
}

export interface LeadLifecycleWeightConfig {
  qualificationWeight: number;
  leadDataQualityWeight: number;
  conversationWeight: number;
  historyWeight: number;
}

const clampScore = (value: number): number => Math.max(0, Math.min(100, value));

const CQVS_GROUP_WEIGHT: Record<'C' | 'Q' | 'V' | 'S', number> = {
  C: 25,
  Q: 35,
  V: 25,
  S: 15
};

const toKey = (value?: string | null): string => (value ?? '').trim().toLowerCase();

const DEFAULT_LEAD_DATA_WEIGHTS: LeadDataWeight[] = [
  { key: 'firstNameLastName', weight: 16 },
  { key: 'email', weight: 24 },
  { key: 'phone', weight: 24 },
  { key: 'companyName', weight: 16 },
  { key: 'jobTitle', weight: 12 },
  { key: 'source', weight: 8 }
];

const DEFAULT_LIFECYCLE_WEIGHTS: LeadLifecycleWeightConfig = {
  qualificationWeight: 50,
  leadDataQualityWeight: 20,
  conversationWeight: 20,
  historyWeight: 10
};

const DEFAULT_QUALIFICATION_FACTORS: QualificationFactorConfig[] = [
  { key: 'budget', displayLabel: 'Budget availability', isActive: true, isRequired: true, order: 10, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
  { key: 'readiness', displayLabel: 'Readiness to spend', isActive: true, isRequired: false, order: 20, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
  { key: 'timeline', displayLabel: 'Buying timeline', isActive: true, isRequired: true, order: 30, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
  { key: 'problem', displayLabel: 'Problem severity', isActive: true, isRequired: true, order: 40, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
  { key: 'economicBuyer', displayLabel: 'Economic buyer', isActive: true, isRequired: true, order: 50, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
  { key: 'icpFit', displayLabel: 'ICP fit', isActive: true, isRequired: false, order: 60, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] }
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
  'high business impact': 15,
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

type QualificationFactorScoreConfig = {
  key: string;
  inputKey: keyof Pick<LeadScoreInputs, 'budgetAvailability' | 'readinessToSpend' | 'buyingTimeline' | 'problemSeverity' | 'economicBuyer' | 'icpFit'>;
  maxScore: number;
  group: 'C' | 'Q' | 'V' | 'S';
  scores: Record<string, number>;
};

const QUALIFICATION_FACTOR_SCORE_CONFIG: QualificationFactorScoreConfig[] = [
  { key: 'budget', inputKey: 'budgetAvailability', maxScore: 25, group: 'Q', scores: budgetScores },
  { key: 'readiness', inputKey: 'readinessToSpend', maxScore: 20, group: 'Q', scores: readinessScores },
  { key: 'timeline', inputKey: 'buyingTimeline', maxScore: 15, group: 'Q', scores: timelineScores },
  { key: 'problem', inputKey: 'problemSeverity', maxScore: 20, group: 'V', scores: problemScores },
  { key: 'economicBuyer', inputKey: 'economicBuyer', maxScore: 10, group: 'S', scores: economicBuyerScores },
  { key: 'icpFit', inputKey: 'icpFit', maxScore: 10, group: 'C', scores: icpScores }
];

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
    'High business impact',
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

export function computeQualificationRawScore(
  input: LeadScoreInputs,
  configuredFactors?: ReadonlyArray<QualificationFactorConfig> | null
): number | null {
  const activeConfigs = normalizeQualificationFactors(configuredFactors);
  const activeFactorKeys = new Set(activeConfigs.filter((factor) => factor.isActive && factor.includeInScore !== false).map((factor) => factor.key));
  const activeFactors = QUALIFICATION_FACTOR_SCORE_CONFIG.filter((factor) => activeFactorKeys.has(factor.key));
  const factors = activeFactors.map((factor) => input[factor.inputKey]);
  const hasAnyMeaningfulFactor = factors.some((value) => isMeaningfulQualificationValue(value));
  if (!hasAnyMeaningfulFactor) return null;

  const groups: Array<'C' | 'Q' | 'V' | 'S'> = ['C', 'Q', 'V', 'S'];
  const activeGroups = groups
    .map((group) => {
      const groupFactors = activeFactors.filter((factor) => factor.group === group);
      if (!groupFactors.length) {
        return null;
      }

      const groupMax = groupFactors.reduce((sum, factor) => sum + factor.maxScore, 0);
      if (groupMax <= 0) {
        return null;
      }

      const groupEarned = groupFactors.reduce((sum, factor) => {
        return sum + (factor.scores[toKey(input[factor.inputKey])] ?? 0);
      }, 0);

      const groupPercent = clampScore(Math.round((groupEarned / groupMax) * 100));
      return {
        group,
        baseWeight: CQVS_GROUP_WEIGHT[group],
        groupPercent
      };
    })
    .filter((item): item is { group: 'C' | 'Q' | 'V' | 'S'; baseWeight: number; groupPercent: number } => !!item);

  if (!activeGroups.length) {
    return null;
  }

  const activeWeightTotal = activeGroups.reduce((sum, group) => sum + group.baseWeight, 0);
  if (activeWeightTotal <= 0) {
    return null;
  }

  const weightedCqvs = activeGroups.reduce((sum, group) => {
    return sum + (group.groupPercent * group.baseWeight);
  }, 0);

  return clampScore(Math.round(weightedCqvs / activeWeightTotal));
}

export function computeLeadScore(
  input: LeadScoreInputs,
  configuredLeadDataWeights?: ReadonlyArray<LeadDataWeight> | null,
  configuredQualificationFactors?: ReadonlyArray<QualificationFactorConfig> | null,
  configuredLifecycleWeights?: Partial<LeadLifecycleWeightConfig> | null
): LeadScoreResult {
  const lifecycleWeights = normalizeLifecycleWeights(configuredLifecycleWeights);
  const buyerDataQualityScore100 = computeLeadDataQualityScore(input, configuredLeadDataWeights);
  const qualificationRawScore100 = computeQualificationRawScore(input, configuredQualificationFactors);
  const qualificationScore100 = qualificationRawScore100 === null ? 0 : qualificationRawScore100;
  const leadContributionScore100 = buyerDataQualityScore100;
  const qualificationContributionScore100 = qualificationScore100;
  const conversationContributionScore100 = normalizeOptionalScore(input.conversationScore100);
  const historyContributionScore100 = computeHistoryExecutionScore(input);

  const weightedParts: Array<{ score: number; weight: number }> = [
    { score: qualificationContributionScore100, weight: lifecycleWeights.qualificationWeight },
    { score: leadContributionScore100, weight: lifecycleWeights.leadDataQualityWeight },
    { score: historyContributionScore100, weight: lifecycleWeights.historyWeight }
  ];

  if (conversationContributionScore100 !== null) {
    weightedParts.push({ score: conversationContributionScore100, weight: lifecycleWeights.conversationWeight });
  }

  const activeWeightTotal = weightedParts.reduce((sum, item) => sum + item.weight, 0);
  const finalLeadScore =
    activeWeightTotal > 0
      ? clampScore(Math.round(weightedParts.reduce((sum, item) => sum + item.score * item.weight, 0) / activeWeightTotal))
      : 0;

  return {
    buyerDataQualityScore100,
    qualificationRawScore100,
    qualificationScore100,
    leadContributionScore100,
    qualificationContributionScore100,
    conversationContributionScore100: conversationContributionScore100 ?? 0,
    historyContributionScore100,
    finalLeadScore
  };
}

function normalizeOptionalScore(value?: number | null): number | null {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return null;
  }

  return clampScore(Math.round(value));
}

function computeHistoryExecutionScore(input: LeadScoreInputs): number {
  const touched = !!input.firstTouchedAtUtc;
  const dueRaw = input.firstTouchDueAtUtc;
  const now = Date.now();

  let slaScore = 40;
  if (touched) {
    slaScore = 100;
  } else if (dueRaw) {
    const dueAt = new Date(dueRaw);
    if (!Number.isNaN(dueAt.getTime())) {
      slaScore = dueAt.getTime() < now ? 20 : 60;
    }
  }

  const normalizedStatus = (input.status ?? '').trim().toLowerCase();
  const statusScoreMap: Record<string, number> = {
    new: 20,
    contacted: 40,
    nurture: 50,
    qualified: 80,
    converted: 100,
    lost: 30,
    disqualified: 30
  };
  const progressionScore = statusScoreMap[normalizedStatus] ?? 25;

  return clampScore(Math.round(slaScore * 0.6 + progressionScore * 0.4));
}

function normalizeLifecycleWeights(
  configuredWeights?: Partial<LeadLifecycleWeightConfig> | null
): LeadLifecycleWeightConfig {
  return {
    qualificationWeight: Math.max(0, Number(configuredWeights?.qualificationWeight ?? DEFAULT_LIFECYCLE_WEIGHTS.qualificationWeight)),
    leadDataQualityWeight: Math.max(0, Number(configuredWeights?.leadDataQualityWeight ?? DEFAULT_LIFECYCLE_WEIGHTS.leadDataQualityWeight)),
    conversationWeight: Math.max(0, Number(configuredWeights?.conversationWeight ?? DEFAULT_LIFECYCLE_WEIGHTS.conversationWeight)),
    historyWeight: Math.max(0, Number(configuredWeights?.historyWeight ?? DEFAULT_LIFECYCLE_WEIGHTS.historyWeight))
  };
}

function normalizeQualificationFactors(
  configuredFactors?: ReadonlyArray<QualificationFactorConfig> | null
): QualificationFactorConfig[] {
  const source = configuredFactors && configuredFactors.length > 0 ? configuredFactors : DEFAULT_QUALIFICATION_FACTORS;
  const byKey = new Map<string, QualificationFactorConfig>();
  for (const factor of source) {
    const key = (factor.key ?? '').trim();
    if (!key) continue;
    byKey.set(key, factor);
  }

  return DEFAULT_QUALIFICATION_FACTORS.map((factor) => {
    const configured = byKey.get(factor.key);
    if (!configured) {
      return factor;
    }

    return {
      ...factor,
      ...configured,
      displayLabel: (configured.displayLabel ?? '').trim() || factor.displayLabel,
      factorType: factor.factorType,
      valueType: configured.valueType ?? factor.valueType,
      includeInScore: configured.includeInScore ?? factor.includeInScore,
      options: configured.options ?? factor.options
    };
  });
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
