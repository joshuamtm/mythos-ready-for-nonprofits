// 10 self-diagnostic questions from the Mythos-ready document.
// Each adapted with a yes/partial/no answer format and weighted scoring.

export const QUESTIONS = [
  {
    id: 1,
    question: 'Is there clarity in your organization about how staff should use AI tools today?',
    context: 'Written or unwritten. Allowed, tolerated, restricted, or unclear. There is no wrong answer — "no" is the most common starting point.',
    relatedRisks: [11, 13],
    relatedActions: [4],
  },
  {
    id: 2,
    question: 'Can your IT and security staff use AI agentic coding tools (not just chatbots) with security guardrails in place?',
    context: 'Coding agents, looping LLM tool use — not just ChatGPT-as-search. Includes whether MFA, data classification, and acceptable-use are enforced.',
    relatedRisks: [2, 3],
    relatedActions: [2, 3],
  },
  {
    id: 3,
    question: 'Can your staff use or contribute to open source without legal ambiguity?',
    context: 'A legal and IP question, not a technology question. Matters most for orgs whose staff write or contribute code.',
    relatedRisks: [11],
    relatedActions: [4],
  },
  {
    id: 4,
    question: 'Do you have disciplined control over your software supply chain — including agentic supply chain (MCP servers, plugins, AI skills)?',
    context: 'Source control, package paths, artifact provenance, and what is allowed in CI/CD pipelines and through coding agents.',
    relatedRisks: [3, 6],
    relatedActions: [3, 7],
  },
  {
    id: 5,
    question: 'Is there a real cooling-off point or security gate between code change and production?',
    context: 'Demonstrates enforcement of security in release cycles and control of software supply chain. (If you don\'t ship custom code, mark N/A.)',
    relatedRisks: [7],
    relatedActions: [1],
  },
  {
    id: 6,
    question: 'Is your security function operational, or primarily advisory?',
    context: 'The extent to which security can directly affect outcomes vs. serving mostly as review and escalation. Most nonprofits without dedicated security staff are advisory-only by default.',
    relatedRisks: [2, 4],
    relatedActions: [2],
  },
  {
    id: 7,
    question: 'What is the fastest you have made a security-driven production change in the last 12 months?',
    context: 'Use a real example, not a policy statement. The doc treats this as the single best test of organizational agility.',
    relatedRisks: [11],
    relatedActions: [4, 5],
  },
  {
    id: 8,
    question: 'Are your critical "crown jewels" explicitly tracked and current?',
    context: 'Not theoretically important systems — the actual few that matter most, and their main dependencies.',
    relatedRisks: [6],
    relatedActions: [7],
  },
  {
    id: 9,
    question: 'Do you know how to get urgent work prioritized by your key third parties (MSP, vendors, software providers)?',
    context: 'Feature requests, bug reports, security escalations, relationship ownership, and leverage. For nonprofits below the Cyber Poverty Line, this is your primary lever.',
    relatedRisks: [2, 6],
    relatedActions: [3, 5],
  },
  {
    id: 10,
    question: 'Does executive leadership have a working definition of urgency?',
    context: 'If everything is a crisis, nothing is urgent. Test: when was the last time leadership said "this can wait"?',
    relatedRisks: [5, 11, 13],
    relatedActions: [4, 6],
  },
]

export const ANSWER_OPTIONS = [
  { value: 'yes', label: 'Yes', score: 2, color: '#10b981' },
  { value: 'partial', label: 'Partially', score: 1, color: '#f59e0b' },
  { value: 'no', label: 'No', score: 0, color: '#ef4444' },
  { value: 'na', label: 'N/A', score: null, color: '#9ca3af' },
]

// Tier-aware scoring thresholds. Small orgs get more credit for the same answers
// because the realistic ceiling is lower — we calibrate against what's actually
// achievable below the Cyber Poverty Line, not against a CISO's expectations.
const THRESHOLDS = {
  small:  { aware: 65, progress: 50, foundational: 30 },
  medium: { aware: 75, progress: 55, foundational: 35 },
  large:  { aware: 80, progress: 60, foundational: 40 },
}

export const scoreToProfile = (score, total, tier = 'medium') => {
  if (total === 0) return { label: 'No data', color: '#9ca3af', summary: 'Answer at least one question to see your profile.' }
  const pct = (score / total) * 100
  const t = THRESHOLDS[tier] || THRESHOLDS.medium
  const tierLabel = tier === 'small' ? 'small' : tier === 'medium' ? 'mid-size' : 'large'

  if (pct >= t.aware) return {
    label: 'Mythos-aware',
    color: '#10b981',
    summary: `You're ahead of most ${tierLabel} nonprofits. Focus on continuous improvement and helping peers below the Cyber Poverty Line — your story is worth sharing.`,
  }
  if (pct >= t.progress) return {
    label: 'Mythos-aware in progress',
    color: '#1ab1d2',
    summary: `Strong foundation for a ${tierLabel} nonprofit. Pick the lowest-scoring answers and tackle one per quarter. The board briefing generator will help you tell this story.`,
  }
  if (pct >= t.foundational) return {
    label: 'Foundational',
    color: '#f59e0b',
    summary: `You have meaningful security investments, but the AI-accelerated landscape is outpacing them. Prioritize the actions tied to your "no" answers — the next page rescales them for a ${tierLabel} nonprofit's reality.`,
  }
  return {
    label: 'Below readiness',
    color: '#ef4444',
    summary: `You're not ready for the AI-accelerated threat environment, which is common for ${tierLabel} nonprofits and recoverable. Start with the basics (Actions 1, 2, 8) and bring this profile to your next board meeting using the briefing generator.`,
  }
}
