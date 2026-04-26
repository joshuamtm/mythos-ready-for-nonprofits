# Mythos-ready for Nonprofits

An MTM working tool that translates the CSA / SANS / [un]prompted / OWASP briefing **"The AI Vulnerability Storm: Building a Mythos-ready Security Program"** (April 18, 2026, v0.95) for nonprofits operating at or below the Cyber Poverty Line.

## What it does

- Renders the 13-row risk register with tier-aware nonprofit translations (Small / Medium / Large)
- Rescales the 11-action priority plan to realistic timelines per tier
- Runs the 10-question self-diagnostic with scoring and gap-aware action recommendations
- Generates a board briefing in MTM voice, customized to organization name + assessment results
- Provides a framework crosswalk reference (OWASP LLM 2025, OWASP Agentic 2026, MITRE ATLAS, NIST CSF 2.0)

## Stack

- Vite + React 19
- Tailwind CSS v3.4.17
- Static data (no backend)
- Deploy: Netlify (auto-deploy on push to `main`)

## Audience priority

1. **MTM-internal first.** Joshua + Kim use during vCISO engagements with BronxWorks, GLWD, CEO, HELP USA, UCS.
2. **Client walkthrough.** Walk one client through draft (suggest GLWD) before public launch.
3. **MTM Together public resource** after one full client validation cycle.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Source attribution

The original document is licensed CC BY-NC 4.0 and authored by 50+ CISOs through the Cloud Security Alliance CISO Community, SANS Institute, [un]prompted, and the OWASP Gen AI Security Project. Translations and tier-aware guidance in this app are MTM's interpretation, not endorsed by the original authors.

## Tied to thought leadership

- LinkedIn carousel and Solve Tuesday piece (already flagged in Lens log April 25)
- Both should drive traffic to this app, not stand alone

## License

Proprietary — Meet the Moment. The underlying framework content from the source document remains under its CC BY-NC 4.0 license.
