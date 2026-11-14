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

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || !('IntersectionObserver' in window)) return;

    const targets = page.querySelectorAll<HTMLElement>('section, article');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );

    targets.forEach((target) => {
      target.classList.add('scroll-reveal');
      observer.observe(target);
    });

    return () => observer.disconnect();
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
