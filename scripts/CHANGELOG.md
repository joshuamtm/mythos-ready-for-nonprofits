# Mythos-ready dashboard — content changelog

Tracks what changed in the dashboard, when, and why. The `Last updated` chip in the header is generated from the latest git commit date; this file tracks the *content* changes specifically, separate from typos / styling / refactors.

---

## 2026-05-13 — First post-v1.0 refresh

**Trigger:** Joshua-initiated refresh, ahead of the scheduled-agent rollout.

**Paper version:** v1.0, April 18, 2026 (unchanged on source; metadata corrected in dashboard — previously inconsistent between "April 18, v0.95" and "May 1, v1.0").

### Findings rolled in

1. **First AI-weaponized zero-day confirmed in the wild (May 2026).** Google Threat Intelligence Group identified a Python script written by an LLM that bypasses two-factor authentication on a popular open-source web-based sysadmin tool. Added as an UPDATE note on Risk #1 (Accelerated Threat Exploitation) and as bullet 1 in the new Intro callout. Source: The Hacker News, May 2026.

2. **RedAccess study — 380,000 exposed vibe-coded apps (May 7, 2026).** Broader-scale finding than the April 20 Lovable BOLA incident already in the dashboard. ~5,000 contained sensitive corporate data; Lovable-built phishing sites impersonated Bank of America, FedEx, Trader Joe's, McDonald's. Added as UPDATE note on Risk #6 (Inventory) and as bullet 2 in the new Intro callout. Updated Risk #6 small/medium translations to flag the "public by default" toggle. Sources: Axios, VentureBeat, Security Boulevard.

3. **Claude Security public beta (May 1, 2026).** New capabilities since the previous "renamed April 30" mention: scheduled scans, directory-scoped scans, dismiss-with-reason workflows, CSV/Markdown export, Slack/Jira/webhook integration. Built on Claude Opus 4.7. Updated `tools:` field on Action #1 (Point Agents at Your Code) and added as bullet 3 in the new Intro callout. Source: Help Net Security, May 4, 2026.

4. **CISA KEV adds — Linux "Copy.Fail" CVE-2026-31431 (May 1, 2026).** Added as a concrete example to Action #5 (Prepare for Continuous Patching), illustrating the pace of disclosure → exposure. Source: CISA + The Hacker News.

5. **Anthropic Glasswing funding scale.** $100M Mythos Preview usage credits committed + $4M direct donations to OSS security organizations. Added context to Action #5 description. Sources: Anthropic Glasswing page, multiple secondary.

### Metadata fixes

- README: "v0.95, April 18" → "v1.0, dated April 18, 2026"
- Footer: same
- Intro: "v1.0 released May 1, 2026" → "current v1.0 is dated April 18, 2026"
- BoardBriefing source citations: same correction in two places
- `src/data/risks.js` header comment: corrected version+date provenance

### Build verified

`npm run build` clean. 41 modules, 299.58 kB JS bundle (93.91 kB gzipped). No behavior change to the assessment scoring or board-briefing generator.

---

## 2026-05-05 — Last updated chip added

Header "Last updated" date now derived from latest git commit date via `vite.config.js`. No content changes.

## 2026-04-26 — Initial public-ready build

13-risk register, 11-action plan, 10-question diagnostic, board-briefing generator. Sourced from CSA / SANS / [un]prompted / OWASP "AI Vulnerability Storm" paper. Internal MTM preview; not yet for public release.
