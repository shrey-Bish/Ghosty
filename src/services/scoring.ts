import { Contact, ExtractedContactCard, IntentTag, ScoreFactor } from '../types';

const intentWeights: Record<IntentTag, number> = {
  recruiting: 2,
  mentor: 1.5,
  collaborator: 1.15,
  amplifier: 1.2,
  peer: 0.8
};

const seniorityWeights: Record<ExtractedContactCard['estimatedSeniority'], number> = {
  junior: 0.8,
  mid: 1.4,
  senior: 2.2,
  director: 2.6,
  vp: 2.9,
  'c-suite': 3,
  unknown: 1
};

const companyTiers: Record<string, number> = {
  aws: 2,
  amazon: 2,
  google: 2,
  toptal: 1.6,
  'ai cloud innovation center': 1.4,
  stripe: 2,
  openai: 2,
  anthropic: 2,
  microsoft: 1.9,
  meta: 1.9
};

export function getSalaryBand(role: string, company: string) {
  const normalizedRole = role.toLowerCase();
  const normalizedCompany = company.toLowerCase();
  const companyMultiplier = companyTiers[normalizedCompany] ? 1.18 : 1;

  const base: [number, number] = normalizedRole.includes('vp')
    ? [290000, 520000]
    : normalizedRole.includes('pm') || normalizedRole.includes('product')
      ? [210000, 285000]
      : normalizedRole.includes('founder')
        ? [140000, 350000]
        : normalizedRole.includes('engineer')
          ? [190000, 310000]
          : [105000, 190000];

  return {
    role,
    low: Math.round(base[0] * companyMultiplier),
    high: Math.round(base[1] * companyMultiplier),
    source: 'Demo salary band' as const
  };
}

export function calculateConnectionValue(
  extracted: ExtractedContactCard,
  userContext: { careerGoal: string; targetRoles: string[] },
  createdAt = new Date().toISOString()
) {
  const company = extracted.company ?? 'Unknown';
  const role = extracted.role ?? 'Unknown role';
  const roleWeight = seniorityWeights[extracted.estimatedSeniority];
  const companyTier = companyTiers[company.toLowerCase()] ?? (company === 'Unknown' ? 0.7 : 1.2);
  const intentWeight = intentWeights[extracted.intentTag];
  const relevance = calculateRelevance(role, extracted.contextSnippet, userContext);
  const recencyBonus = calculateRecencyBonus(createdAt);

  const raw =
    roleWeight * 1.05 +
    companyTier * 1.05 +
    intentWeight * 1.35 +
    relevance * 1.2 +
    recencyBonus;
  const score = Math.min(10, Math.max(1, Number(raw.toFixed(1))));

  const valueBreakdown: ScoreFactor[] = [
    { label: 'Role Seniority', detail: role, value: round(roleWeight), max: 3 },
    { label: 'Company Tier', detail: company, value: round(companyTier), max: 2 },
    { label: 'Opportunity Type', detail: `#${extracted.intentTag}`, value: round(intentWeight), max: 2 },
    { label: 'Career Relevance', detail: userContext.careerGoal, value: round(relevance), max: 2 },
    { label: 'Recency Bonus', detail: 'Today', value: round(recencyBonus), max: 1 }
  ];

  const salaryBand = getSalaryBand(role, company);
  const medianSalary = (salaryBand.low + salaryBand.high) / 2;
  const estimatedCareerValue = Math.round((medianSalary * (score / 10)) / 1000) * 1000;

  return {
    score,
    valueBreakdown,
    salaryBand,
    estimatedCareerValue
  };
}

export function rankFollowUps(contacts: Contact[]) {
  const urgencyWeight = {
    overdue: 1.4,
    today: 1.25,
    soon: 1.08,
    later: 0.9
  };

  return [...contacts].sort((a, b) => {
    const aRank = a.valueScore * urgencyWeight[a.urgency];
    const bRank = b.valueScore * urgencyWeight[b.urgency];
    return bRank - aRank;
  });
}

export function calculatePipelineValue(contacts: Contact[]) {
  return contacts
    .filter((contact) => !contact.followedUpAt)
    .reduce((total, contact) => total + contact.estimatedCareerValue, 0);
}

function calculateRelevance(
  role: string,
  context: string,
  userContext: { careerGoal: string; targetRoles: string[] }
) {
  const haystack = `${role} ${context}`.toLowerCase();
  const directRoleMatch = userContext.targetRoles.some((target) =>
    haystack.includes(target.toLowerCase())
  );
  const careerWords = userContext.careerGoal.toLowerCase().split(/\W+/).filter(Boolean);
  const careerHits = careerWords.filter((word) => haystack.includes(word)).length;
  return directRoleMatch ? 1.85 : Math.min(2, 1 + careerHits * 0.25);
}

function calculateRecencyBonus(createdAt: string) {
  const weeksOld = Math.max(
    0,
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  return Math.max(0.25, Number((1 - weeksOld * 0.1).toFixed(2)));
}

function round(value: number) {
  return Number(value.toFixed(1));
}
