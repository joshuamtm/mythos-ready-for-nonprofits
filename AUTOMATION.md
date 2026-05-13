# Mythos Refresh Automation

## Cadence

**Monday and Thursday mornings, 7:00 AM ET.**

Twice a week is the deliberate compromise:

- **Daily is wasteful.** The Mythos paper itself updates rarely; AI-security incidents arrive in clusters, not on a daily drip.
- **Weekly is too slow.** When something material hits (an incident, a new paper version, a CISA KEV add affecting nonprofits), waiting up to 7 days to surface it defeats the point.
- **Monday morning** catches what landed over the weekend and gets the week's reading list in front of Joshua before he starts client meetings.
- **Thursday morning** catches mid-week incidents in time to act before the weekend.

If we see two consecutive "0 findings" runs, consider dropping to weekly (Mondays only) to conserve agent cycles. If a run regularly surfaces 5+ findings, consider adding a Wednesday slot.

---

## How it runs

The refresh is a [scheduled remote Claude agent](../../.claude/skills/schedule) with this configuration:

```
Schedule: 0 7 * * 1,4    # 7 AM ET, every Monday and Thursday
Agent prompt: scripts/refresh-mythos-agent-prompt.md
Output: one Gmail draft to joshua@mtm.now
Approval model: Joshua reviews the draft, replies with approve/selective/discard
```

The agent does **research only** — it never pushes to GitHub, deploys to Netlify, or sends email to anyone other than Joshua. Every dashboard change is human-approved.

---

## The two-step loop

```
[ Mon/Thu 7:00 AM ET ]
        │
        ▼
   Scheduled agent runs research checklist
   (CSA, OWASP, MITRE, NIST, Anthropic,
    vibe-coding platforms, CISA KEV, EU AI Act)
        │
        ▼
   Drafts Gmail to joshua@mtm.now with
   structured changelog of material findings
        │
        ▼
[ Joshua reviews draft ]
        │
        ├─── "approve all"      → apply session: Vishali edits the
        │                          flagged files, commits, pushes,
        │                          Netlify auto-deploys
        │
        ├─── "apply 1, 3"       → apply session: selective edits
        │
        └─── "discard"          → no changes, run logged
```

The reply triggers a separate **apply session** (a normal Claude Code session in this repo) that:

1. Pulls the agent's proposed text from the draft email.
2. Edits the named files at the named lines.
3. Runs `npm run build` to confirm no syntax breakage.
4. Bumps the "Last updated" date (handled automatically via `vite.config.js` reading the latest commit date).
5. Commits with conventional-commit message: `feat(data): mythos refresh [YYYY-MM-DD] — N findings applied`.
6. Pushes to `main`.
7. Netlify deploys automatically.

---

## What gets researched

See [`scripts/refresh-mythos-agent-prompt.md`](scripts/refresh-mythos-agent-prompt.md) for the full prompt. Summary:

1. The source paper version (CSA labs)
2. Framework crosswalk freshness (OWASP LLM, OWASP Agentic, MITRE ATLAS, NIST CSF 2.0)
3. Anthropic / Glasswing / Claude Security announcements
4. Vibe-coding platform incidents (Lovable, Base44, Replit, Cursor, Bolt, v0, Netlify)
5. CISA KEV adds in the last 7 days, filtered for nonprofit-relevant products + AI citations
6. Confirmed AI-weaponized attacks in the wild
7. EU AI Act enforcement guidance (August 2, 2026 enforcement)

---

## Installation

This automation is **not yet scheduled.** Joshua approves first. To install:

```
/schedule create \
  --name "Mythos refresh" \
  --cron "0 7 * * 1,4" \
  --timezone "America/New_York" \
  --prompt-file ~/mythos-ready-for-nonprofits/scripts/refresh-mythos-agent-prompt.md
```

(Or run `/schedule` interactively and paste the agent prompt.)

Verify the schedule with `/schedule list`. The agent prompt may be tuned over time — schedule re-reads the file on each run.

---

## Operating notes

- **Approval reply format matters.** The apply session looks for `approve all`, `apply <numbers>`, or `discard` as the first line of Joshua's reply. Anything else triggers a clarification round-trip.
- **Cost.** Each run is one agent invocation: ~10-20 tool calls (WebFetch + WebSearch), one Gmail draft. Estimated ~$0.50-$1.00 per run. Twice weekly = ~$5/month upper bound.
- **Failure mode.** If the agent can't reach the CSA labs page or a major framework site, it should still produce a draft — with the failures listed in Section 3 (Run metadata). A failed fetch is itself a finding.
- **Dashboard drift.** If Joshua applies changes manually outside the apply session (e.g., during a vCISO engagement), the next refresh agent might re-flag something already in the dashboard. That's fine — Joshua sees it, replies "discard," and the system stays honest.
- **Pause / resume.** During capacity-low weeks (vacation, conference travel), pause via `/schedule pause "Mythos refresh"`. Resume with `/schedule resume`.

---

## Why not auto-apply?

Two reasons:

1. **The Mythos paper is high-stakes content.** It's the spine of vCISO conversations with BronxWorks, GLWD, CEO, HELP USA, UCS. A bad auto-edit that misframes a risk could land in a client meeting before anyone caught it. Human review is cheap insurance.

2. **Joshua's standing preference: never auto-send, always draft.** Captured in `feedback_always_draft_emails.md`. The refresh respects that — research is automated, judgment is not.

---

## Adjacent automation worth considering

Not built yet, but on the watch list:

- **External attack surface scan of the dashboard itself** via MTM Sentinel — twice weekly, simultaneous with the refresh.
- **Lighthouse + axe-core** accessibility scan on each Netlify deploy.
- **Broken-link check** on the source links in the dashboard (CSA paper URL, OWASP, MITRE, NIST). If the CSA paper URL 404s, the dashboard's "Read the original briefing" call-to-action goes silently wrong. A weekly broken-link check would catch that within 7 days.

---

*Last updated: 2026-05-13 · Drafted by Joshua with help from Vishali (https://vishali-about.mtmapps.now), Joshua's AI assistant.*
