// Components
import AnimatedHeader from "../components/AnimatedHeader";
import ProjectCard from "@/components/projects/ProjectCard";
// Data
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-0 section-padding flex-section-center">
      <AnimatedHeader text="Projects" />
      <h3 className="sub-heading">
        /* I've worked on many projects, here are a few of my favorites! */
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 sm:mt-12 gap-10">
        {projects.map((proj, index) => (
          <ProjectCard proj={proj} key={index} />
        ))}
      </div>

    </section>
  );
}
