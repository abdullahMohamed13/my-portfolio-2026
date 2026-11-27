"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { MotionConfig, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, Github, Info, X } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export type Project = {
  name: string;
  /** One sentence for screen readers: what the site is. */
  summary: string;
  url: string;
  /** Short address shown on the button when the real one is long (a preview URL). */
  display?: string;
  /** A screenshot of the site, ideally 16:9. Doubles as the poster frame for a video. */
  image: string;
  /** A short silent clip of the site. Plays instead of the screenshot, which stands in while it loads or when motion is reduced. */
  video?: string;
  /** Longer copy for the info panel; falls back to `summary`. */
  details?: string;
  /** Tech stack labels shown in the info panel. */
  stack?: string[];
  /** Icons that match stack labels by name; anything unmatched is shown as text only. */
  stackIcons?: { text: string; icon: ReactNode }[];
  /** Source repository, shown beside the live link. */
  github?: string;
  /** e.g. "Individual" or "Team"; a small label above the name in the info panel. */
  kind?: string;
  /** The arrow's colour, from the site's own brand. */
  accent: string;
};

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export type ProjectDeckProps = {
  projects: Project[];
  /** The page ground; the cut-out corner that holds the visit button is filled with it. */
  ground?: string;
  className?: string;
  children?: ReactNode;
};

export function ProjectDeck({ projects, ground = "#E7E8EA", className, children }: ProjectDeckProps) {
  const deck = useRef(null as HTMLElement | null);
  const reduce = useReducedMotion() ?? false;
  const count = projects.length;
  const [info, setInfo] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll({ target: deck, offset: ["start start", "end end"] });
  // a light, critically damped smoothing: it follows the wheel closely and never overshoots
  const progress = useSpring(scrollYProgress, { stiffness: 380, damping: 48, mass: 0.35 });

  return (
    <MotionConfig reducedMotion="user">
      {/* one screen of scroll per card; the stage stays pinned while they are dealt onto it */}
      <section ref={deck} className={cn("relative w-full", className)} style={{ height: `${Math.max(1, count) * 100}svh` }} aria-label="Projects">
        <div className="sticky top-0 grid h-[100svh] place-items-center overflow-hidden px-5 [perspective:1800px] sm:px-10 lg:px-14">
          {projects.map((p, i) => (
            <Card
              key={p.url}
              p={p}
              i={i}
              count={count}
              progress={progress}
              still={reduce}
              ground={ground}
              paused={info !== null}
              onInfo={() => setInfo(p)}
            />
          ))}
        </div>
      </section>
      {children}
      {info && <InfoPanel p={info} onClose={() => setInfo(null)} />}
    </MotionConfig>
  );
}

const easeOut = (t: number) => 1 - (1 - t) ** 3;
const ENTER = 0.72; // share of each card's screen spent arriving; the rest it rests in place

/** How far card `j` has arrived (0 below the window, 1 landed) at deck progress `v`. */
function arrived(j: number, v: number, count: number) {
  if (j <= 0) return 1;
  const span = Math.max(1, count - 1);
  return easeOut(clamp01((v * span - (j - 1)) / ENTER));
}

function Card({ p, i, count, progress, still, ground, paused, onInfo }: {
  p: Project; i: number; count: number; progress: MotionValue<number>; still: boolean; ground: string;
  paused: boolean; onInfo: () => void;
}) {
  // cards now lying on top of this one, counted smoothly
  const above = (v: number) => {
    let n = 0;
    for (let j = i + 1; j < count; j++) n += arrived(j, v, count);
    return Math.min(3, n);
  };
  const y = useTransform(progress, (v) => `${(1 - arrived(i, v, count)) * 108 - above(v) * 5}svh`); // covered cards lift so their edges show
  const rotateX = useTransform(progress, (v) => -(1 - arrived(i, v, count)) * 30 + above(v) * 5);
  const scale = useTransform(progress, (v) => 0.9 + 0.1 * arrived(i, v, count) - above(v) * 0.05);
  const filter = useTransform(progress, (v) => `blur(${((1 - arrived(i, v, count)) ** 2 * 12 + above(v) * 1.1).toFixed(2)}px)`);
  const dim = useTransform(progress, (v) => above(v) * 0.15);
  // reduced motion: no travel, each card simply appears in place when its turn comes
  const stillY = useTransform(progress, (v) => (arrived(i, v, count) >= 0.5 ? "0svh" : "110svh"));

  return (
    <motion.article
      aria-label={`${p.name}: ${p.summary}`}
      className="col-start-1 row-start-1 mt-[4svh] w-[min(100%,calc(84svh*16/9),1480px)] origin-[50%_25%] will-change-[transform,filter] max-sm:w-full"
      style={{ zIndex: i + 1, ...(still ? { y: stillY } : { y, rotateX, scale, filter }) }}
    >
      <div className="relative overflow-hidden rounded-[24px] shadow-[0_50px_90px_-35px_rgba(10,12,20,0.5)]" style={{ background: ground }}>
        {/* the whole site, edge to edge; the screenshot stays underneath so the card is never empty */}
        <div className="relative aspect-[16/9] w-full overflow-hidden max-sm:aspect-[4/5]">
          <img
            src={p.image}
            alt={`The ${host(p.url)} homepage`}
            loading={i < 2 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 size-full object-cover object-top"
          />
          {p.video && !still && <Clip src={p.video} paused={paused} />}
        </div>
        <Visit p={p} ground={ground} onInfo={onInfo} />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-[#0A0C14]" style={{ opacity: still ? 0 : dim }} />
      </div>
    </motion.article>
  );
}

/** A silent loop that only starts once it can play; until then the screenshot below shows through. */
function Clip({ src, paused }: { src: string; paused: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "10% 0px 10% 0px" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView && !paused) {
      el.muted = true; // belt and braces: React does not always reflect this as an attribute
      // The browser may still refuse to start (low power mode); the screenshot then stays visible.
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView, paused]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onCanPlay={() => setReady(true)}
      onPlaying={() => setReady(true)}
      className={cn(
        "absolute inset-0 size-full object-cover object-top transition-opacity duration-700 ease-out",
        ready ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

/** The visit button, set into a corner cut out of the card. */
function Visit({ p, ground, onInfo }: { p: Project; ground: string; onInfo: () => void }) {
  const R = 18;
  const corner = (
    <svg aria-hidden width={R} height={R} viewBox={`0 0 ${R} ${R}`} className="block">
      <path d={`M${R} 0 V${R} H0 A${R} ${R} 0 0 0 ${R} 0 Z`} fill={ground} />
    </svg>
  );
  return (
    <div className="absolute right-0 bottom-0 z-10 max-w-[calc(100%-1rem)]">
      <div className="absolute right-0 bottom-full">{corner}</div>
      <div className="absolute right-full bottom-0">{corner}</div>
      <div
        className="flex items-center gap-2 rounded-tl-[20px] py-3 pr-2 pl-4 text-[#111318] sm:gap-3 sm:py-4 sm:pr-3 sm:pl-7"
        style={{ background: ground }}
      >
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${p.name} at ${host(p.url)} (opens in a new tab)`}
          className="group flex min-w-0 items-center gap-3 outline-none sm:gap-4"
        >
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[15px] font-semibold tracking-[-0.015em] sm:text-[19px]">{p.name}</span>
            <span className="truncate text-[12px] text-[#3B3F48] underline-offset-4 group-hover:underline group-focus-visible:underline sm:text-[15px]">{p.display ?? host(p.url)}</span>
          </span>
          <span
            className="grid size-10 shrink-0 place-items-center rounded-full text-white transition-transform duration-200 ease-out group-hover:rotate-45 group-active:scale-90 group-focus-visible:outline-2 group-focus-visible:outline-offset-2 sm:size-[52px]"
            style={{ background: p.accent, outlineColor: p.accent }}
          >
            <ArrowUpRight className="size-5 sm:size-6" strokeWidth={2.2} />
          </span>
        </a>
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.name} source on GitHub (opens in a new tab)`}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#111318] text-white outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111318] active:scale-90 sm:size-[52px]"
          >
            <Github className="size-[18px] sm:size-5" strokeWidth={2} />
          </a>
        )}
        <button
          type="button"
          onClick={onInfo}
          aria-label={`More about ${p.name}`}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-[#111318]/20 text-[#111318] outline-none transition-colors duration-200 hover:border-transparent hover:bg-[#111318] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111318] sm:size-[52px]"
        >
          <Info className="size-[18px] sm:size-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

const stackOf = (p: Project) => (p.stack?.length ? p.stack : (p.stackIcons?.map((icon) => icon.text) ?? []));
const normalize = (label: string) => label.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Match a stack label to a supplied icon, e.g. "ReactJs" to "React". */
function iconFor(label: string, icons?: { text: string; icon: ReactNode }[]) {
  if (!icons?.length) return null;
  const key = normalize(label);
  return icons.find(({ text }) => {
    const candidate = normalize(text);
    return candidate.length > 0 && (key === candidate || key.startsWith(candidate) || candidate.startsWith(key));
  })?.icon ?? null;
}

/** The project write-up: description, stack and links, animated into view with GSAP. */
function InfoPanel({ p, onClose }: { p: Project; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const reduce = useReducedMotion() ?? false;
  const [closing, setClosing] = useState(false);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // entrance: backdrop, panel, then the content lines in sequence
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope || reduce) return;
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from("[data-info-backdrop]", { opacity: 0, duration: 0.3, ease: "power2.out" })
        .from(panel.current, { y: 44, scale: 0.96, opacity: 0, duration: 0.55, ease: "power3.out" }, 0.02)
        .from("[data-info-item]", { y: 16, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" }, 0.16);
    }, scope);
    return () => ctx.revert();
  }, [reduce]);

  // exit: play out, then unmount
  useEffect(() => {
    if (!closing) return;
    const scope = root.current;
    if (!scope || reduce) {
      closeRef.current();
      return;
    }
    const tl = gsap.timeline({ onComplete: () => closeRef.current() });
    tl.to(panel.current, { y: 18, scale: 0.98, opacity: 0, duration: 0.22, ease: "power2.in" }, 0)
      .to("[data-info-backdrop]", { opacity: 0, duration: 0.22 }, 0.02);
    return () => {
      tl.kill();
    };
  }, [closing, reduce]);

  // escape closes; the page behind is locked; focus starts on the close button and returns afterwards
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setClosing(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, []);

  const stack = stackOf(p);

  return createPortal(
    <div ref={root} className="fixed inset-0 z-[120] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div
        data-info-backdrop
        aria-hidden
        onClick={() => setClosing(true)}
        className="absolute inset-0 bg-[#0A0C14]/75 backdrop-blur-[3px]"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[86svh] w-full max-w-[40rem] flex-col overflow-hidden rounded-[24px] border border-[#111318]/10 bg-card text-card-foreground shadow-[0_40px_90px_-30px_rgba(10,12,20,0.7)]"
      >
        <div aria-hidden className="h-1.5 w-full shrink-0" style={{ background: p.accent }} />
        <div className="overflow-y-auto px-6 py-7 sm:px-9 sm:py-9">
          <div data-info-item className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em]" style={{ color: p.accent }}>
                {p.kind ?? "Project"}
              </p>
              <h3 id={titleId} className="mt-2 font-heading text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.05]">{p.name}</h3>
            </div>
            <button
              ref={closeButton}
              type="button"
              onClick={() => setClosing(true)}
              aria-label="Close project details"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-[#111318]/15 outline-none transition-colors hover:bg-[#111318] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111318]"
            >
              <X className="size-5" />
            </button>
          </div>

          <p data-info-item className="mt-4 whitespace-pre-line text-[0.9375rem] leading-relaxed text-[#4B4A44] sm:text-base">
            {p.details ?? p.summary}
          </p>

          {stack.length > 0 && (
            <div data-info-item className="mt-6">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">Tech stack</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {stack.map((label) => {
                  const icon = iconFor(label, p.stackIcons);
                  return (
                    <li
                      key={label}
                      className="flex items-center gap-2 rounded-full border border-[#111318]/12 bg-background px-3 py-1.5 text-[0.8125rem] leading-none text-[#2C2C27] [&_svg]:size-4"
                    >
                      {icon}
                      <span>{label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div data-info-item className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold text-white outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: p.accent, outlineColor: p.accent }}
            >
              Visit live site
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:rotate-45" strokeWidth={2.4} />
            </a>
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#111318]/20 px-5 py-2.5 text-[0.8125rem] font-semibold text-[#111318] outline-none transition-colors hover:bg-[#111318] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111318]"
              >
                <Github className="size-4" strokeWidth={2.2} />
                View source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
