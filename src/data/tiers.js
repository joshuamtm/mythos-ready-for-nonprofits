export const TIERS = [
  {
    id: 'small',
    label: 'Small Nonprofit',
    badge: 'S',
    range: 'Under $5M budget · MSP-managed IT · No dedicated security staff',
    examples: 'Small CBO, faith-based, advocacy, foundation program team',
    color: '#85abbd',
    realityNote: 'Below the Cyber Poverty Line. The Mythos-ready document explicitly admits its prescriptions don\'t reach you. Your defense is collective — sector ISACs, CERTs, and trusted advisors who translate this for you.',
  },
  {
    id: 'medium',
    label: 'Medium Nonprofit',
    badge: 'M',
    range: '$5M-$50M budget · 1-2 IT staff · MSP-supplemented · No dedicated CISO',
    examples: 'Workforce training, mid-size human services, regional foundations',
    color: '#1ab1d2',
    realityNote: 'At the Cyber Poverty Line. Some of the document\'s actions are within reach if you prioritize aggressively. Many require leverage through your MSP or vCISO partner.',
  },
  {
    id: 'large',
    label: 'Large Nonprofit',
    badge: 'L',
    range: '$50M+ budget · Internal IT team · CISO or security manager possible',
    examples: 'HELP USA, BronxWorks, GLWD, CEO, large hospitals/universities',
    color: '#1c487b',
    realityNote: 'Above the Cyber Poverty Line. The document\'s 90-day plan is feasible with executive sponsorship. You have the staffing and tooling budget to execute most actions on the aggressive timeline.',
  },
]

export const getTier = (id) => TIERS.find((t) => t.id === id) || TIERS[1]
