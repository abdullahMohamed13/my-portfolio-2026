import { ArrowRight } from "pixelarticons/react";
import HeroArtwork from "@/components/HeroArtwork";
import { CartoonButton } from "@/components/ui/cartoon-button";

export default function HeroSection() {
	return (
		<section
			id="hero"
			className="relative flex h-screen flex-col justify-between overflow-hidden bg-background px-[clamp(1.375rem,6vw,5.75rem)] pt-[calc(60px+1.75rem)] max-[760px]:h-[100svh] max-[760px]:px-4"
		>
			<div className="relative z-10 flex shrink-0 justify-between gap-4 font-mono text-[0.625rem] uppercase tracking-[0.09em] text-muted-foreground max-[760px]:[&>span:last-child]:hidden">
				<span className="uppercase">
					Frontend Developer | Contributor | Mentor
				</span>
				<span>Cairo, Egypt · Available for freelancing</span>
			</div>

			<div className="relative z-10 isolate flex min-h-0 flex-1 items-end justify-center">
				<div className="relative isolate z-0 aspect-[1158/1358] max-h-full max-[760px]:w-[min(90%,54svh)]">
					<div
						aria-hidden="true"
						className="absolute left-1/2 top-[60%] -z-10 aspect-square w-[min(65%,100cqw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
					/>
					<img
						className="relative z-10 h-full w-full object-contain object-bottom"
						src="/me-hero.png"
						alt="Abdallah Aziz"
					/>
				</div>
				<HeroArtwork />
				<CartoonButton
					label="Explore selected work"
					href="#projects"
					icon={<ArrowRight aria-hidden="true" />}
					color="bg-accent"
					wrapperClassName="absolute left-0 bottom-[clamp(4.5rem,10vh,7rem)] z-20 font-mono text-xs uppercase max-[760px]:bottom-auto max-[760px]:top-2 max-[760px]:left-1/2 max-[760px]:w-max max-[760px]:-translate-x-1/2"
				/>
			</div>
		</section>
	);
}
