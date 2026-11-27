// sections
import Hero from "@/sections/HeroSection";
import About from "@/sections/AboutSection";
import Testimonials from "@/sections/TestimonialsSection";
import Skills from "@/sections/SkillsSection";
import Projects from "@/sections/ProjectsSection";
import Contact from "@/sections/ContactSection";
// Components
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { SeoHelmet } from "@/components/SeoHelmet";

export default function App() {
  return (
		<>
			{/*SEO info*/}
    	<SeoHelmet />

			<FadeInOnScroll
				direction="left"
				// className="relative"
				// style={{
				// 	backgroundImage: `url("/backgrounds/1.jpg")`,
				// 	backgroundSize: "cover",
				// 	backgroundPosition: "center"
				// }}
			>
				{/*<div className='absolute inset-0 bg-popover/80' />*/}
				<Header />
   			<Hero />
			</FadeInOnScroll>
      
      <div className="max-w-7xl mx-auto">
				<NavBar />
        
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
      </div>
    </>
  );
}
