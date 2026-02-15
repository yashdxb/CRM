import {
  computeLeadScore,
  computeQualificationRawScore,
  computeSignalScore,
  qualificationFactorOptions
} from '../src/app/crm/features/leads/pages/lead-scoring.util.ts';

const basics = ['firstName', 'lastName', 'email', 'phone', 'companyName', 'jobTitle', 'source'];

const baselineQualification = {
  budgetAvailability: 'Unknown / not yet discussed',
  readinessToSpend: 'Unknown / unclear',
  buyingTimeline: 'Unknown / not discussed',
  problemSeverity: 'Unknown / not validated',
  economicBuyer: 'Unknown / not identified',
  icpFit: 'Unknown / not assessed'
};

const positiveQualification = {
  budgetAvailability: 'Budget allocated and approved',
  readinessToSpend: 'Ready to proceed pending final step',
  buyingTimeline: 'Decision date confirmed internally',
  problemSeverity: 'Executive-level priority',
  economicBuyer: 'Buyer verbally supportive',
  icpFit: 'Strong ICP fit'
};

function buildBasics(mask) {
  const out = {};
  for (let i = 0; i < basics.length; i++) {
    if ((mask & (1 << i)) === 0) continue;
    const field = basics[i];
    out[field] = `${field}-value`;
  }
  return out;
}

function* qualificationCombinations() {
  const budgetValues = qualificationFactorOptions.budgetAvailability;
  const readinessValues = qualificationFactorOptions.readinessToSpend;
  const timelineValues = qualificationFactorOptions.buyingTimeline;
  const problemValues = qualificationFactorOptions.problemSeverity;
  const economicValues = qualificationFactorOptions.economicBuyer;
  const icpValues = qualificationFactorOptions.icpFit;

  for (const budgetAvailability of budgetValues) {
    for (const readinessToSpend of readinessValues) {
      for (const buyingTimeline of timelineValues) {
        for (const problemSeverity of problemValues) {
          for (const economicBuyer of economicValues) {
            for (const icpFit of icpValues) {
              yield {
                budgetAvailability,
                readinessToSpend,
                buyingTimeline,
                problemSeverity,
                economicBuyer,
                icpFit
              };
            }
          }
        }
      }
    }
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function monotonicCheckForFactor(factorName, values, baseInput) {
  const scored = values
    .map((value) => ({ value, raw: computeQualificationRawScore({ ...baseInput, [factorName]: value }) ?? 0 }))
    .sort((a, b) => a.raw - b.raw);

  for (let i = 1; i < scored.length; i++) {
    const prev = computeLeadScore({ ...baseInput, [factorName]: scored[i - 1].value }).finalLeadScore;
    const curr = computeLeadScore({ ...baseInput, [factorName]: scored[i].value }).finalLeadScore;
    assert(
      curr >= prev,
      `Monotonicity failed for ${factorName}: "${scored[i - 1].value}" (${prev}) -> "${scored[i].value}" (${curr})`
    );
  }
}

function run() {
  let combinationCount = 0;
  let monotonicContextsChecked = 0;

  for (let basicMask = 0; basicMask < (1 << basics.length); basicMask++) {
    const basicInput = buildBasics(basicMask);
    for (const qualification of qualificationCombinations()) {
      combinationCount++;
      const input = { ...basicInput, ...qualification };
      const signal = computeSignalScore(input);
      const result = computeLeadScore(input);

      assert(result.buyerDataQualityScore100 === signal, 'Data quality score mismatch with computeSignalScore');
      assert(result.finalLeadScore >= 0 && result.finalLeadScore <= 100, 'Final score out of bounds');
      assert(result.buyerDataQualityScore100 >= 0 && result.buyerDataQualityScore100 <= 100, 'Data quality score out of bounds');
      assert(
        result.qualificationRawScore100 === null || (result.qualificationRawScore100 >= 0 && result.qualificationRawScore100 <= 100),
        'Qualification score out of bounds'
      );
      assert(result.qualificationScore100 >= 0 && result.qualificationScore100 <= 100, 'Qualification normalized score out of bounds');

      if (result.qualificationRawScore100 === null) {
        assert(result.qualificationScore100 === 0, 'Null qualification must have 0 normalized score');
      } else {
        assert(result.finalLeadScore === result.leadContributionScore100, 'Lead score must map directly to lead data quality score');
      }
    }

    const monotonicBase = { ...basicInput, ...baselineQualification };
    monotonicCheckForFactor('budgetAvailability', qualificationFactorOptions.budgetAvailability, monotonicBase);
    monotonicCheckForFactor('readinessToSpend', qualificationFactorOptions.readinessToSpend, monotonicBase);
    monotonicCheckForFactor('buyingTimeline', qualificationFactorOptions.buyingTimeline, monotonicBase);
    monotonicCheckForFactor('problemSeverity', qualificationFactorOptions.problemSeverity, monotonicBase);
    monotonicCheckForFactor('economicBuyer', qualificationFactorOptions.economicBuyer, monotonicBase);
    monotonicCheckForFactor('icpFit', qualificationFactorOptions.icpFit, monotonicBase);
    monotonicContextsChecked++;
  }

  const scenarioAInput = {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex@blueharborlogistics.com',
    phone: '+14155550134',
    companyName: 'Blue Harbor Logistics',
    jobTitle: 'Ops Director',
    source: 'Referral',
    territory: 'West',
    ...positiveQualification
  };
  const scenarioAResult = computeLeadScore(scenarioAInput);

  assert(
    scenarioAResult.buyerDataQualityScore100 === 100,
    `Scenario A data quality expected 100, got ${scenarioAResult.buyerDataQualityScore100}`
  );
  assert(
    scenarioAResult.qualificationRawScore100 === 100,
    `Scenario A qualification raw expected 100, got ${scenarioAResult.qualificationRawScore100}`
  );
  assert(scenarioAResult.qualificationScore100 === 100, `Scenario A qualification expected 100, got ${scenarioAResult.qualificationScore100}`);
  assert(scenarioAResult.finalLeadScore === 100, `Scenario A final expected 100, got ${scenarioAResult.finalLeadScore}`);

  console.log('Lead scoring matrix validation passed.');
  console.log(`Combinations checked: ${combinationCount.toLocaleString()}`);
  console.log(`Monotonic contexts checked: ${monotonicContextsChecked.toLocaleString()}`);
  console.log(
    `Scenario A -> dataQuality: ${scenarioAResult.buyerDataQualityScore100}, qualification: ${scenarioAResult.qualificationScore100}, final: ${scenarioAResult.finalLeadScore}`
  );
}

run();
