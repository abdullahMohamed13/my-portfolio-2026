import { useLayoutEffect, useRef } from 'react';
import { SeoHelmet } from '@/components/SeoHelmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
// import ProjectsSection from '@/sections/ProjectsSection';
import ProjectsDemo from '@/sections/ProjectsDemo';
import ApproachSection from '@/sections/ApproachSection';
import GitHubProofSection from '@/sections/GitHubProofSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ContactSection from '@/sections/ContactSection';
import LinkedInSection from '@/sections/LinkedInSection';
import FaqSection from '@/sections/FaqSection';
import HorizonSection from '@/components/ui/horizon-hero-section';
import gsap from 'gsap';
import ContactIntroSection from '@/sections/ContactIntroSection';

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

    });

    return () => mm.revert();
  }, []);

  return (
    <main className="portfolio-frame" ref={pageRef}>
      <SeoHelmet />
      <NavBar />
      <HeroSection />
      <HorizonSection />
			{/*<ProjectsSection />*/}
			<ProjectsDemo />
			
      <ApproachSection />
      <GitHubProofSection />
      <LinkedInSection />
      <TestimonialsSection />
      <ContactIntroSection />
      {/*<FaqSection />*/}
			<div className="bg-background px-5 pb-[5.625rem] [&_section]:pt-6">
				<ContactSection />
			</div>
      <Footer />
    </main>
  );
}
