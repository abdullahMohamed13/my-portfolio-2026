import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';

export default function ProjectsSection() {
  return (
    <section className="portfolio-section" id="projects">
      <div className="mb-14 grid grid-cols-[1fr_auto] items-end gap-6 max-[760px]:grid-cols-1">
        <p className="portfolio-eyebrow col-span-full mb-0">01 / Selected work</p>
        <h2 data-motion="project-title" className="portfolio-title">Things I helped<br /><em className="portfolio-title-accent not-italic">bring to life.</em></h2>
      </div>
      <div className="grid gap-20">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  );
}
