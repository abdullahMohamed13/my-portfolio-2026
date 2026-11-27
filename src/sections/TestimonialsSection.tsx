import { useState } from 'react';
import ClickSound from '@/assets/sound/click.oga?url';
import { playSound } from '@/utils/playSound';
import { testimonialsByCategory } from '@/data/testimonials-data';
import type { TestimonialCategory } from '@/types/TestimonialProps';

const categories = (
  [
    { value: 'team', label: 'Team' },
    { value: 'leaders', label: 'Leaders & mentors' },
    { value: 'clients', label: 'Clients' },
    { value: 'students', label: 'Students' },
  ] satisfies { value: TestimonialCategory; label: string }[]
).filter(({ value }) => testimonialsByCategory[value].length > 0);

export default function TestimonialsSection() {
  const [category, setCategory] = useState<TestimonialCategory>('team');
  const [showMore, setShowMore] = useState(false);
  const testimonials = testimonialsByCategory[category];

  return (
    <section className="portfolio-section bg-secondary" id="testimonials">
      <div className="mb-14 grid grid-cols-[1fr_auto] items-end gap-6 max-[760px]:grid-cols-1">
        <p className="portfolio-eyebrow col-span-full mb-0">04 / Good words</p>
        <h2 className="portfolio-title">Work is a team<br /><em className="portfolio-title-accent not-italic">sport.</em></h2>
      </div>
      <div className="-mt-4 mb-7 flex flex-wrap gap-2" role="group" aria-label="Filter testimonials">
        {categories.map(({ value, label }) => (
          <button className={`border border-foreground px-3.5 py-2.5 font-mono text-[0.625rem] uppercase transition-colors hover:bg-foreground hover:text-accent ${category === value ? 'bg-foreground text-accent' : 'bg-transparent text-foreground'}`} key={value} type="button" aria-pressed={category === value} onClick={() => { setCategory(value); setShowMore(false); playSound(ClickSound); }}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
        {(showMore ? testimonials : testimonials.slice(0, 6)).map((quote) => (
          <blockquote className="m-0 flex h-full flex-col border border-foreground bg-background p-[clamp(1.25rem,3vw,1.625rem)] shadow-[4px_4px_0_rgba(25,25,22,0.15)]" key={quote.id}>
            <span className="font-display text-[3.375rem] leading-[0.7] text-primary">“</span>
            <p className="text-base leading-relaxed">{quote.text}</p>
            <footer className="mt-auto flex items-center gap-3 border-t border-dashed border-border pt-4">
              <img className="h-[42px] w-[42px] rounded-full border-2 border-primary object-cover" src={quote.img} alt="" />
              <span className="grid gap-[3px]"><strong className="text-sm font-semibold">{quote.name}</strong><small className="font-mono text-[0.625rem] text-muted-foreground">{quote.role}</small></span>
            </footer>
          </blockquote>
        ))}
      </div>
      {testimonials.length > 6 && (
        <button className="mx-auto mt-7 block border border-foreground bg-accent px-[18px] py-[13px] font-mono text-[0.6875rem] uppercase text-foreground shadow-[3px_3px_var(--foreground)] hover:bg-primary" type="button" onClick={() => { setShowMore((current) => !current); playSound(ClickSound); }}>
          {showMore ? 'Show fewer' : `Show more (${testimonials.length - 6})`}
        </button>
      )}
    </section>
  );
}
