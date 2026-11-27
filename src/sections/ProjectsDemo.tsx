import { ProjectDeck, type Project } from '@/components/ui/scroll-stacking-cards';
import { projects } from '@/data/projects';

/**
 * The deck wants a one-line summary, a live URL and a single brand colour,
 * so the project data is mapped into that shape rather than duplicated.
 */
const deckProjects: Project[] = projects.map((project) => ({
  name: project.title,
  summary: project.description.replace(/\s+/g, ' ').trim(),
  details: project.description.trim().replace(/^[ \t]+/gm, ''),
  url: project.liveURL,
  image: project.imgSrc,
  video: project.video,
  accent: project.themeColor,
  stack: project.stack,
  stackIcons: project.stackIcons,
  github: project.githubURL,
  kind: project.projectType,
}));

export default function ProjectsDemo() {
  return (
    <section id="projects" className="bg-background" aria-labelledby="projects-demo-title">
      <div className="flex items-center justify-center flex-col pt-[clamp(5.125rem,11vw,10rem)]">
        <p className="portfolio-eyebrow">01 / Selected work</p>
        <div>
          <h2 id="projects-demo-title" className="text-center portfolio-title">
            Things I helped<br />
            <em className="portfolio-title-accent not-italic">bring to life.</em>
          </h2>
        </div>
      </div>

      <ProjectDeck projects={deckProjects} ground="var(--background)" />
    </section>
  );
}
