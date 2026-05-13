import AnimatedHeader from "@/components/AnimatedHeader";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { Button } from "@/components/ui/button";
import { testimonialsData } from "@/data/testimonials-data";
import { LuLink } from "react-icons/lu";

export default function Testimonials() {
    return <section id="testimonials" className="section-padding flex-section-center">
          <AnimatedHeader text="Testimonials" />
        
          <div className="mx-3 mt-3 md:mt-6 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {testimonialsData.map((test) => {
                return <TestimonialCard key={test.id} test={test} index={test.id} />
            })}
          </div>
            <Button className="mt-6 hover:text-primary/80 transition-colors duration-300" variant='link'>
                <a className="text-lg sm:text-xl flex items-center gap-2" href="https://www.linkedin.com/in/abdallah-m-aziz/details/recommendations/">
                    <span className="underline">View more recommendations on LinkedIn</span>
                    <LuLink />
                </a>
            </Button>
        </section>
}
