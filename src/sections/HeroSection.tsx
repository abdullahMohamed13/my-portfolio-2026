import { ArrowRight } from "pixelarticons/react";
import HeroArtwork from "@/components/HeroArtwork";

export default function HeroSection() {
	return (
		<section
			id="hero"
			className="relative flex min-h-[min(810px,calc(100svh-4.75rem))] flex-col justify-between overflow-hidden bg-background px-[clamp(1.375rem,6vw,5.75rem)] py-7 max-[760px]:min-h-[95svh]"
		>
			<HeroArtwork />

			<div className="relative z-10 flex justify-between gap-4 font-mono text-[0.625rem] uppercase tracking-[0.09em] text-muted-foreground max-[760px]:[&>span:last-child]:hidden">
				<span className="uppercase">
					Frontend Developer / Contributor / Mentor
				</span>
				<span>Cairo, Egypt · Available for freelancing</span>
			</div>

			<div className="relative z-10 w-[min(760px,72%)] py-[clamp(4rem,8vh,5.3rem)] max-[760px]:w-full max-[760px]:py-20">
				<p className="portfolio-eyebrow">
					<i className="mr-2 inline-block h-2 w-2 rotate-45 border border-foreground bg-accent align-middle" />{" "}
					Independent developer, team contributor
				</p>
				<h1 data-motion="hero-title" className="portfolio-title text-[clamp(3.375rem,9vw,8.25rem)] max-[760px]:text-[clamp(3rem,13vw,5.375rem)]">
					I build products
					<br />
					meant to be{" "}
					<em className="portfolio-title-accent not-italic">used.</em>
				</h1>
				<p className="mt-7 max-w-[32rem] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-[#42413a]">
					I care about the whole arc: a rough requirement, the conversations with
					designers and backend developers, the implementation, and the small
					passes that make the result feel finished. Most of my work has been on
					products that ship and get used, not isolated features.
				</p>
				<p className="mt-4 max-w-[32rem] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-[#42413a]">
					To me, good frontend work starts with understanding how people move
					through a product—and ends with code the next developer can follow
					without a walkthrough.
				</p>
				<a
					className="mt-8 inline-flex items-center gap-5 border-2 border-foreground bg-accent px-5 py-4 font-mono text-xs uppercase text-foreground shadow-[4px_4px_0_var(--foreground)] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[1px_1px_0_var(--foreground)]"
					href="#projects"
				>
					Explore selected work <ArrowRight aria-hidden="true" />
				</a>
			</div>
			<div className="relative z-10 flex justify-between border-t border-border pt-3.5 font-mono text-[0.625rem] uppercase tracking-[0.09em] text-muted-foreground max-[760px]:text-[0.5rem]">
				<span>Design / Code / Collaboration</span>
			</div>
		</section>
	);
}
