import { ExternalLink } from 'pixelarticons/react';
import { socialMedia } from '@/data/social-media';

export default function Footer() {
  return (
    <footer className="flex items-center justify-between gap-5 border-t border-border px-[clamp(1.375rem,6vw,5.75rem)] py-6 font-mono text-[0.625rem] uppercase max-[760px]:flex-wrap max-[760px]:justify-center max-[760px]:text-center">
      <a className="whitespace-nowrap text-lg leading-none text-foreground no-underline sm:text-xl" href="#hero" aria-label="Back to top"><span className="font-display inline-block origin-bottom-left -rotate-3 text-[1.12em] font-medium italic tracking-[-0.055em]">Abdallah</span>{' '}<span className="font-bricolage relative inline-block font-extrabold tracking-[-0.09em] text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100">Aziz</span></a>
      <span className="text-muted-foreground max-[760px]:order-3 max-[760px]:w-full">Frontend developer &amp; contributor · © 2026</span>
      <div className="flex gap-4">
        {socialMedia.slice(0, 2).map((item) => (
          <a className="inline-flex items-center gap-1.5 text-foreground no-underline transition-colors hover:text-primary" key={item.id} href={item.href} target="_blank" rel="noreferrer">{item.name} <ExternalLink aria-hidden="true" className="h-[18px] w-[18px]" /></a>
        ))}
      </div>
    </footer>
  );
}
