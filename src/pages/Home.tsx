import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
// sections
import Hero from "@/sections/HeroSection";
const About = lazy(() => import("../sections/AboutSection"));
const Testimonials = lazy(() => import("../sections/TestimonialsSection"));
const Skills = lazy(() => import("../sections/SkillsSection"));
const Projects = lazy(() => import("../sections/ProjectsSection"));
const Contact = lazy(() => import("../sections/ContactSection"));
// Components
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import FadeInOnScroll from "../components/FadeInOnScroll";

export default function App() {
	
  return (
    <>
      <Helmet>
        <title>Abdallah Aziz | Front-end Developer | Software Engineer</title>
        <meta
          name="description"
          content="Frontend developer skilled in React, TypeScript & Tailwind. I build pixel-perfect, responsive web apps with clean code & smooth UX."
        />
        <meta
          name="keywords"
          content="Frontend developer, React, JavaScript, TypeScript, Tailwindcss, HTML, CSS, Web developer, Web designer, React developer."
        />
        <meta
          property="og:title"
          content="Abdallah Aziz - Front-end React Developer"
        />
        <meta
          property="og:description"
          content="Frontend developer skilled in React, TypeScript & Tailwind. I build pixel-perfect, responsive web apps with clean code & smooth UX."
        />
        <meta property="og:image" content="/me.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Abdallah Aziz | Front-end React Developer"
        />
        <link rel="canonical" href="https://abdallah-aziz.netlify.app/" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Abdallah Aziz",
              "alternateName": [
                "Abdallah Mohamed",
                "Abdallah Mohamed Abdelaziz",
                "Abdallah Mohamed Aziz",
              ],
              "url": "https://abdallah-aziz.netlify.app/",
              "image": "/me.webp",
              "sameAs": [
                "https://www.linkedin.com/in/abdallah-m-aziz"
              ]
            }
          `}
        </script>
      </Helmet>

      <FadeInOnScroll direction="left">
	      <Header />
	      <Hero />
      </FadeInOnScroll>
      <div className="max-w-5xl mx-auto">
        <NavBar />
        <Suspense fallback={null}>
          <FadeInOnScroll direction="left">
            <About />
          </FadeInOnScroll>
          <FadeInOnScroll direction="down">
            <Testimonials />
          </FadeInOnScroll>
          <FadeInOnScroll direction="up">
            <Projects />
          </FadeInOnScroll>
          <FadeInOnScroll direction="left">
            <Skills />
          </FadeInOnScroll>
          <FadeInOnScroll direction="left">
            <Contact />
          </FadeInOnScroll>
        </Suspense>
      </div>
    </>
  );
}
