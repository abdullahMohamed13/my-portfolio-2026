import { readFile, writeFile } from 'node:fs/promises';

const START_DATE = '2026-03-12';
const PUBLIC_FILE = new URL('../public/github-streak.json', import.meta.url);

let token = process.env.GITHUB_TOKEN;

if (!token) {
  try {
    const localEnv = await readFile(new URL('../.env.local', import.meta.url), 'utf8');
    token = localEnv.match(/^GITHUB_TOKEN=(.*)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
  } catch {
    // Local env file is optional; Render provides the token through its environment settings.
  }
}

if (!token) {
  console.info('GITHUB_TOKEN is not set; skipping contribution data generation.');
  process.exit(0);
}

const query = `
  query ContributionHistory($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        totalPullRequestContributions
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

const response = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: {
      login: 'abdullahMohamed13',
      from: `${START_DATE}T00:00:00Z`,
      to: new Date().toISOString(),
    },
  }),
});

if (!response.ok) throw new Error(`GitHub GraphQL request failed: ${response.status}`);

const result = await response.json();
if (result.errors?.length || !result.data?.user) {
  throw new Error('GitHub did not return contribution calendar data.');
}

const contributions = result.data.user.contributionsCollection;
const calendar = contributions.contributionCalendar;
const days = calendar.weeks
  .flatMap((week) => week.contributionDays)
  .filter((day) => day.date >= START_DATE);

let bestStreak = 0;
let currentStreak = 0;

for (const day of days) {
  currentStreak = day.contributionCount > 0 ? currentStreak + 1 : 0;
  bestStreak = Math.max(bestStreak, currentStreak);
}

await writeFile(PUBLIC_FILE, JSON.stringify({
  startDate: START_DATE,
  totalContributions: calendar.totalContributions,
  pullRequestContributions: contributions.totalPullRequestContributions,
  bestStreak,
  days,
}));

console.info(`Generated GitHub activity data (${days.length} days).`);
