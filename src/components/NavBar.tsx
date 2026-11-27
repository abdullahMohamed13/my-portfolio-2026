import ScrollSound from '@/assets/sound/scroll.oga?url';
import { playSound } from '@/utils/playSound';

const navigation = [
  { label: 'Work', href: '#projects' },
  { label: 'Approach', href: '#approach' },
  { label: 'Proof', href: '#proof' },
  { label: 'Contact', href: '#contact' },
];

export default function NavBar() {
  return (
    <header className="relative z-20 flex h-[4.75rem] items-center justify-between border-b border-border bg-background px-[clamp(1.375rem,6vw,5.75rem)] max-[760px]:h-16">
      <a className="whitespace-nowrap font-display text-lg leading-none tracking-[-0.04em] text-foreground no-underline sm:text-xl" href="#hero" aria-label="Abdallah Aziz home">Abdallah <span className="text-primary">Aziz</span></a>
      <nav aria-label="Main navigation" className="flex gap-[clamp(0.75rem,3vw,3rem)] max-[760px]:gap-3">
        {navigation.map((item) => <a className="font-mono text-xs uppercase tracking-wide text-foreground no-underline transition-colors hover:text-primary max-[760px]:text-[0.5625rem]" key={item.href} href={item.href} onClick={() => playSound(ScrollSound)}>{item.label}</a>)}
      </nav>
      <a className="border border-foreground px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground no-underline max-[760px]:px-2 max-[760px]:py-2 max-[760px]:text-[0.5625rem]" href="#contact" onClick={() => playSound(ScrollSound)}>Let’s talk <span className="ml-2.5 text-primary">↗</span></a>
    </header>
  );
}
