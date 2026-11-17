import { projects } from '@/data/projects';

export default function ProjectsSection() {
  return (
    <section className="portfolio-section" id="projects">
      <div className="mb-14 grid grid-cols-[1fr_auto] items-end gap-6 max-[760px]:grid-cols-1">
        <p className="portfolio-eyebrow col-span-full mb-0">01 / Selected work</p>
        <h2 data-motion="project-title" className="portfolio-title">Things I helped<br /><em className="portfolio-title-accent not-italic">bring to life.</em></h2>
        <p className="mb-2 max-w-[16.25rem] leading-relaxed text-muted-foreground max-[760px]:mb-0">Real products, real constraints, thoughtful frontend work.</p>
      </div>
      <div className="grid gap-20">
        {projects.map((project, index) => (
          <article className="grid grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] items-center gap-[clamp(1.75rem,6vw,5.625rem)] even:grid-cols-[minmax(260px,0.65fr)_minmax(0,1.35fr)] even:[&>div:first-child]:order-2 max-[760px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:even:grid-cols-1 max-[760px]:even:[&>div:first-child]:order-none" key={project.title}>
            <div className="relative overflow-hidden border border-foreground bg-secondary p-3 shadow-[8px_8px_0_var(--foreground)]">
              {(project.projectInSite || project.imgSrc) && <img className="block aspect-[1.45] w-full object-cover saturate-[0.88] contrast-[1.04] transition duration-700 hover:scale-[1.035] hover:saturate-110" src={project.projectInSite || project.imgSrc} alt={`${project.title} interface`} loading="lazy" />}
              <span className="absolute left-6 top-6 border border-foreground bg-accent px-2 py-1.5 font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div>
              {/*<p className="portfolio-eyebrow mb-3">Featured project{project.deploymentPlatform ? ` / ${project.deploymentPlatform}` : ''}</p>*/}
              <h3 className="mb-5 text-[clamp(2.125rem,4vw,3.625rem)] leading-none tracking-[var(--tracking-display)]">{project.title}</h3>
              <p className="leading-[1.7] text-[#4c4a43]">{project.description}</p>
              <div className="my-6 flex flex-wrap gap-2">
                {project.stack.map((technology) => <span className="border border-border px-2 py-1.5 font-mono text-[0.625rem] uppercase" key={technology}>{technology}</span>)}
              </div>
              <div className="flex gap-5">
                <a className="portfolio-link" href={project.liveURL} target="_blank" rel="noreferrer">Visit project ↗</a>
                <a className="portfolio-link" href={project.githubURL} target="_blank" rel="noreferrer">Source code ↗</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
