import type { ProjectProps } from '@/types/ProjectProps';

export default function ProjectCard({ project, index }: { project: ProjectProps; index: number }) {
	const preview = project.projectInSite || project.imgSrc;
  
  return (
    <article className="grid grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] items-center gap-[clamp(1.75rem,6vw,5.625rem)] even:grid-cols-[minmax(260px,0.65fr)_minmax(0,1.35fr)] even:[&>div:first-child]:order-2 max-[760px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:even:grid-cols-1 max-[760px]:even:[&>div:first-child]:order-none" key={project.title}>
      <div className="relative overflow-hidden border border-foreground bg-secondary p-3 shadow-[8px_8px_0_var(--foreground)]">
        <div className="relative aspect-[1.45] overflow-hidden">
          {preview && <img className="absolute inset-0 h-full w-full object-cover saturate-[0.88] contrast-[1.04]" src={preview} alt={`${project.title} interface`} loading="lazy" />}
          {project.video && (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={project.video}
              poster={preview}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${project.title} video preview`}
            />
          )}
        </div>
        <span className="absolute left-6 top-6 border border-foreground bg-accent px-2 py-1.5 font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <h3 className="text-[clamp(2.125rem,4vw,3.625rem)] leading-none tracking-[var(--tracking-display)]">{project.title}</h3>
          <span className="border border-foreground px-2 py-1 font-mono text-[0.625rem] uppercase tracking-wide" aria-label={`${project.projectType} project`}>
            {project.projectType}
          </span>
        </div>
        <p className="leading-[1.7] text-[#4c4a43]">{project.description}</p>
        <div className="my-5 flex flex-wrap gap-4" aria-label={`${project.title} technologies`}>
          {project.stackIcons.map((item) => <span className="inline-flex items-center gap-2 text-sm text-muted-foreground" key={item.text}>{item.icon}<span>{item.text}</span></span>)}
        </div>
        <div className="my-6 flex flex-wrap gap-2">{project.stack.map((technology) => <span className="border border-border px-2 py-1.5 font-mono text-[0.625rem] uppercase" key={technology}>{technology}</span>)}</div>
        <div className="flex gap-5"><a className="portfolio-link" href={project.liveURL} target="_blank" rel="noreferrer">Visit project ↗</a><a className="portfolio-link" href={project.githubURL} target="_blank" rel="noreferrer">Source code ↗</a></div>
      </div>
    </article>
  );
}
