import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'pixelarticons/react';
import { socialMedia } from '@/data/social-media';

type StreakData = {
  totalContributions: number;
  pullRequestContributions: number;
  bestStreak: number;
  days: { date: string; contributionCount: number }[];
};

export default function GitHubProofSection() {
  const [streakData, setStreakData] = useState<StreakData | null>(null);

  useEffect(() => {
    fetch('/github-streak.json')
      .then((response) => response.ok ? response.json() : null)
      .then((data: StreakData | null) => setStreakData(data))
      .catch(() => setStreakData(null));
  }, []);

  return (
    <section className="portfolio-section grid grid-cols-2 items-center gap-[3.4rem] max-[760px]:grid-cols-1 max-[760px]:gap-8" id="proof">
      <div>
        <p className="portfolio-eyebrow">03 / Proof of practice</p>
        <h2 className="portfolio-title text-[clamp(3rem,7vw,6rem)]">Showing up.<br /><em className="portfolio-title-accent not-italic">Shipping steadily.</em></h2>
      </div>
      <div className="relative flex items-center gap-5 border border-foreground bg-muted p-[clamp(1.25rem,3vw,1.875rem)] shadow-[7px_7px_0_var(--primary)] max-[520px]:items-start">
        <div className="grid h-[4.25rem] w-[4.25rem] shrink-0 rotate-[-7deg] place-items-center bg-foreground text-accent"><Github aria-hidden="true" className="h-10 w-10" /></div>
        <div className="min-w-0 flex-1">
          <h3 className="m-0 text-2xl">My work in progress</h3>
          <p className="leading-relaxed text-muted-foreground">Explore my public repositories and contribution history on GitHub.</p>
          {streakData && <>
            <div className="my-5 grid grid-cols-3 gap-[clamp(0.75rem,3vw,2.25rem)] text-center">
              <div className="flex min-w-0 flex-col justify-center"><p className="m-0 font-display text-[clamp(2.375rem,5vw,3.5rem)] leading-none text-primary">{streakData.bestStreak}</p><p className="mt-2 font-mono text-[0.6875rem] uppercase leading-snug text-muted-foreground">Day best streak</p></div>
              <div className="flex min-w-0 flex-col justify-center border-l border-border pl-3"><p className="m-0 font-display text-[clamp(2.375rem,5vw,3.5rem)] leading-none text-primary">{streakData.totalContributions.toLocaleString()}</p><p className="mt-2 font-mono text-[0.6875rem] uppercase leading-snug text-muted-foreground">Contributions since March 12, 2026</p></div>
              <div className="flex min-w-0 flex-col justify-center border-l border-border pl-3"><p className="m-0 font-display text-[clamp(2.375rem,5vw,3.5rem)] leading-none text-primary">{streakData.pullRequestContributions.toLocaleString()}</p><p className="mt-2 font-mono text-[0.6875rem] uppercase leading-snug text-muted-foreground">Pull request contributions</p></div>
            </div>
            <div className="my-4 grid max-w-full auto-cols-[9px] grid-flow-col grid-rows-[repeat(7,9px)] gap-[3px] overflow-hidden" aria-label="GitHub contribution activity since March 12, 2026">
              {streakData.days.map((day) => <span key={day.date} className="border border-foreground/10 bg-foreground/10 data-[level='1']:bg-primary/30 data-[level='2']:bg-primary/50 data-[level='3']:bg-primary/70 data-[level='4']:bg-primary" data-level={day.contributionCount === 0 ? 0 : day.contributionCount > 8 ? 4 : Math.ceil(day.contributionCount / 2)} title={`${day.date}: ${day.contributionCount} contributions`} />)}
            </div>
          </>}
          <a className="portfolio-link inline-flex items-center gap-1.5" href={socialMedia[0].href} target="_blank" rel="noreferrer"><Github aria-hidden="true" className="h-[18px] w-[18px]" /> Visit GitHub profile <ExternalLink aria-hidden="true" className="h-[18px] w-[18px]" /></a>
        </div>
        <span className="absolute right-[18px] top-2.5 font-display text-[1.75rem] text-primary">↗</span>
      </div>
    </section>
  );
}
