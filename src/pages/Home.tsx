import { useLayoutEffect, useRef } from 'react';
import { SeoHelmet } from '@/components/SeoHelmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ApproachSection from '@/sections/ApproachSection';
import GitHubProofSection from '@/sections/GitHubProofSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ContactIntroSection from '@/sections/ContactIntroSection';
import ContactSection from '@/sections/ContactSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const mm = gsap.matchMedia(page);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('[data-motion="hero-title"]',
        { yPercent: 18, rotateX: -18, transformPerspective: 900, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.15, ease: 'power3.out', delay: 0.12 },
      );

      gsap.fromTo('[data-motion="project-title"]',
        { yPercent: 30, rotateX: -24, transformPerspective: 1100, transformOrigin: '50% 100%', opacity: 0.35 },
        { yPercent: 0, rotateX: 0, opacity: 1, ease: 'none', scrollTrigger: {
          trigger: '#projects', start: 'top 72%', end: 'top 18%', scrub: 0.7,
        } },
      );

      gsap.fromTo('#projects article',
        { y: 90, rotateX: 8, transformPerspective: 1200, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, stagger: 0.16, ease: 'power2.out',
          scrollTrigger: { trigger: '#projects article:first-of-type', start: 'top 82%', end: 'top 48%', scrub: 0.8 } },
      );

      gsap.fromTo('[data-motion="approach-title"]',
        { rotateY: -10, z: -90, x: -30, opacity: 0.45, transformPerspective: 1000 },
        { rotateY: 0, z: 0, x: 0, opacity: 1, ease: 'none', scrollTrigger: {
          trigger: '#approach', start: 'top 78%', end: 'top 22%', scrub: 0.8,
        } },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <main className="portfolio-frame" ref={pageRef}>
      <SeoHelmet />
      <NavBar />
      <HeroSection />
      <ProjectsSection />
      <ApproachSection />
      <GitHubProofSection />
      <TestimonialsSection />
      <ContactIntroSection />
      <div className="bg-background px-5 pb-[5.625rem] [&_section]:pt-6"><ContactSection /></div>
      <Footer />
    </main>
  );
}
