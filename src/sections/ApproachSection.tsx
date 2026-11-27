export default function ApproachSection() {
  return (
    <section className="portfolio-section bg-foreground text-background" id="approach">
      <p className="portfolio-eyebrow text-accent">02 / How I contribute</p>
      <div className="grid grid-cols-[1.2fr_0.8fr] items-end gap-[10vw] max-[760px]:grid-cols-1 max-[760px]:gap-8">
        <h2 data-motion="approach-title" className="portfolio-title text-[clamp(3rem,7vw,6rem)]">Good interfaces<br />come from <em className="not-italic text-accent">good<br />collaboration.</em></h2>
        <div>
          <p className="text-[clamp(1.0625rem,2vw,1.4375rem)] leading-relaxed text-[#d2cfc4]">I work across the details that connect design and engineering: understanding the user flow, building reliable UI, and helping a team ship a coherent product.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Thoughtful UI', 'Frontend systems', 'Team delivery'].map((item) => <span className="border border-[#77756c] px-2 py-1.5 font-mono text-[0.625rem] uppercase text-background" key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
