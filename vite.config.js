import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execFileSync } from 'node:child_process'

// Capture the most recent commit date at build time so the page can display
// "Last updated". Uses execFileSync (no shell, args passed as array) to avoid
// any command-injection surface. Falls back gracefully if git isn't available.
function gitLogIsoDate() {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI'], {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim() || null
  } catch {
    return null
  }
}

function lastCommitDateDisplay() {
  const iso = gitLogIsoDate()
  if (!iso) return null
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default defineConfig({
  plugins: [react()],
  define: {
    __LAST_UPDATED_DISPLAY__: JSON.stringify(lastCommitDateDisplay()),
    __LAST_UPDATED_ISO__: JSON.stringify(gitLogIsoDate()),
  },
})
