export default function IntroductionSection() {
  return (
    <section id="introduction" className="intro-scene" aria-labelledby="intro-title">
      <div className="intro-marker"><span>01 / THE PRACTICE</span><span>INTERFACE IS A CONVERSATION</span></div>
      <div className="intro-layout">
        <h2 id="intro-title"><span>I turn</span><span>complexity into</span><span className="intro-accent">clear interfaces<span className="intro-asterisk">✳</span></span></h2>
        <div className="intro-copy">
          <p className="intro-lead">Good frontend work starts before the first component.</p>
          <p>I listen for what people need, work closely with design and engineering, then shape the details into an interface that feels clear, responsive, and finished.</p>
          <a href="#projects" className="intro-link">How I contribute <span>↓</span></a>
        </div>
      </div>
      <div className="intro-footer"><span>DESIGN INTENT <i>→</i> FRONTEND SYSTEMS <i>→</i> PEOPLE</span><span>SCROLL TO EXPLORE</span></div>
      <span className="intro-orbit intro-orbit--one" aria-hidden="true" /><span className="intro-orbit intro-orbit--two" aria-hidden="true" />
    </section>
  );
}
