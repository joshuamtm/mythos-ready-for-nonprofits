// Framework crosswalk — codes used across the 13-row risk register
// Source: CSA / SANS / [un]prompted / OWASP "Mythos-ready" briefing, Appendix B

export const FRAMEWORK_PREFIXES = [
  { prefix: 'LLMxx', name: 'OWASP Top 10 for LLM Applications 2025', description: 'Risks in LLMs used as application components', color: '#3b82f6' },
  { prefix: 'ASIxx', name: 'OWASP Top 10 for Agentic Applications 2026', description: 'Risks in autonomous AI systems that plan and act', color: '#8b5cf6' },
  { prefix: 'AML.Txxxx', name: 'MITRE ATLAS', description: 'Adversarial techniques targeting AI/ML systems', color: '#10b981' },
  { prefix: 'GV.xx', name: 'NIST CSF 2.0 — Govern', description: 'Governance: context, risk strategy, roles, supply chain', color: '#f59e0b' },
  { prefix: 'ID.xx', name: 'NIST CSF 2.0 — Identify', description: 'Asset management, risk assessment, improvement', color: '#f97316' },
  { prefix: 'PR.xx', name: 'NIST CSF 2.0 — Protect', description: 'Access control, platform security, resilience', color: '#ec4899' },
  { prefix: 'DE.xx', name: 'NIST CSF 2.0 — Detect', description: 'Continuous monitoring, adverse event analysis', color: '#06b6d4' },
  { prefix: 'RS.xx', name: 'NIST CSF 2.0 — Respond', description: 'Incident management and communication', color: '#dc2626' },
]

export const FRAMEWORK_CODES = [
  { code: 'AML.T0000', name: 'ML Model Reconnaissance', framework: 'MITRE ATLAS' },
  { code: 'AML.T0018', name: 'Backdoor ML Model', framework: 'MITRE ATLAS' },
  { code: 'AML.T0040', name: 'ML Inference API Access', framework: 'MITRE ATLAS' },
  { code: 'AML.T0043', name: 'Craft Adversarial Data', framework: 'MITRE ATLAS' },
  { code: 'AML.T0047', name: 'ML-Enabled Product Abuse', framework: 'MITRE ATLAS' },
  { code: 'AML.T0051.000', name: 'LLM Prompt Injection (Direct)', framework: 'MITRE ATLAS' },
  { code: 'AML.T0051.001', name: 'LLM Prompt Injection (Indirect)', framework: 'MITRE ATLAS' },
  { code: 'ASI01', name: 'Agent Goal Hijack', framework: 'OWASP Agentic Top 10 2026' },
  { code: 'ASI02', name: 'Tool Misuse and Exploitation', framework: 'OWASP Agentic Top 10 2026' },
  { code: 'ASI03', name: 'Identity and Privilege Abuse', framework: 'OWASP Agentic Top 10 2026' },
  { code: 'ASI04', name: 'Agentic Supply Chain Vulnerabilities', framework: 'OWASP Agentic Top 10 2026' },
  { code: 'ASI06', name: 'Memory and Context Poisoning', framework: 'OWASP Agentic Top 10 2026' },
  { code: 'ASI08', name: 'Cascading Failures', framework: 'OWASP Agentic Top 10 2026' },
  { code: 'ASI10', name: 'Rogue Agents', framework: 'OWASP Agentic Top 10 2026' },
  { code: 'LLM01', name: 'Prompt Injection', framework: 'OWASP LLM Top 10 2025' },
  { code: 'LLM02', name: 'Sensitive Information Disclosure', framework: 'OWASP LLM Top 10 2025' },
  { code: 'LLM05', name: 'Improper Output Handling', framework: 'OWASP LLM Top 10 2025' },
  { code: 'LLM06', name: 'Excessive Agency', framework: 'OWASP LLM Top 10 2025' },
  { code: 'LLM08', name: 'Vector and Embedding Weaknesses', framework: 'OWASP LLM Top 10 2025' },
  { code: 'DE.AE', name: 'Adverse Event Analysis', framework: 'NIST CSF 2.0 Detect' },
  { code: 'DE.CM', name: 'Continuous Monitoring', framework: 'NIST CSF 2.0 Detect' },
  { code: 'GV.OC', name: 'Organizational Context', framework: 'NIST CSF 2.0 Govern' },
  { code: 'GV.OV', name: 'Oversight', framework: 'NIST CSF 2.0 Govern' },
  { code: 'GV.RM', name: 'Risk Management Strategy', framework: 'NIST CSF 2.0 Govern' },
  { code: 'GV.RR', name: 'Roles, Responsibilities, and Authorities', framework: 'NIST CSF 2.0 Govern' },
  { code: 'GV.SC', name: 'Supply Chain Risk Management', framework: 'NIST CSF 2.0 Govern' },
  { code: 'ID.AM', name: 'Asset Management', framework: 'NIST CSF 2.0 Identify' },
  { code: 'ID.IM', name: 'Improvement', framework: 'NIST CSF 2.0 Identify' },
  { code: 'ID.RA', name: 'Risk Assessment', framework: 'NIST CSF 2.0 Identify' },
  { code: 'PR.AA', name: 'Identity Management, Authentication, and Access Control', framework: 'NIST CSF 2.0 Protect' },
  { code: 'PR.IR', name: 'Infrastructure Resilience', framework: 'NIST CSF 2.0 Protect' },
  { code: 'PR.PS', name: 'Platform Security', framework: 'NIST CSF 2.0 Protect' },
  { code: 'RS.CO', name: 'Incident Response Communication', framework: 'NIST CSF 2.0 Respond' },
  { code: 'RS.MA', name: 'Incident Management', framework: 'NIST CSF 2.0 Respond' },
]

export const lookupCode = (code) => FRAMEWORK_CODES.find((c) => c.code === code)
