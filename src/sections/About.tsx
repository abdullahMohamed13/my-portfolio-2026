// custom components
import { Separator } from "../components/Separator";
import AnimatedHeader from "../components/AnimatedHeader"
// shadcn/ui
import { Badge } from "@/components/ui/badge";
import { SiNextdotjs }from 'react-icons/si';
import TrueFocus from "@/components/react-bits/TextAnimations/TrueFocus";
import { internships } from "@/data/internships";

export default function About() {
  return (
    <section id="about" className="relative mt-10 section-padding px-3 sm:px-0 text-center">
      <AnimatedHeader text="About Me" />
      <div className="text-xl leading-8">
          I started coding in September 2022 with <Badge className="bg-[#004482] text-base text-white">C++</Badge> , building simple console apps and discovering the fundamentals of programming.
          It wasn't long before frontend development caught my attention, and I quickly found my passion in web development and design.
          Brining an idea to life through code feels like superpower and I'm grateful that my tools allow me to make that happen.
      </div>

      <div className="max-w-60 my-8 md:max-w-120 mx-auto">
        <Separator />
      </div>

      <div>
        <h3 className="text-2xl font-semibold flex-center gap-1 mt-4">
          Internships & Student-Activities I have been part of
        </h3>

        <div className="flex items-center justify-around gap-3 flex-wrap mt-6">
          {internships.map((internship) => {
            return (
              <a
                key={internship.id}
                href={internship.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                style={{ '--brand-color': internship.company.color } as React.CSSProperties}
              >
                <img
                  src={internship.company.logo}
                  alt={internship.company.name}
                  className="border-(--brand-color) p-0.5 w-32 h-32 rounded-full border-4 sm:border-transparent group-hover:border-(--brand-color) object-contain mx-auto hover:scale-110 transition-all duration-300"
                />
                <h4 className="text-lg group-hover:text-(--brand-color) transition-colors font-semibold mt-2">{internship.company.name}</h4>
              </a>
            );
          })}
        </div>
      </div>

      <div className="max-w-60 my-8 md:max-w-120 mx-auto">
        <Separator />
      </div>

      <div className="mx-auto flex flex-col gap-3">
        <h3 className="text-2xl font-semibold flex-center gap-1 mt-4">
          Next Learning Goals On The Queue:
        </h3>
        <div
          className="text-base sm:text-xl flex-center flex-col gap-2 px-4 py-2 pb-5"
        >
          <div className="flex items-center">
            <TrueFocus 
              manualMode={false}
              blurAmount={2}
              animationDuration={2}
              pauseBetweenAnimations={2}
            >
              <Badge className="bg-car text-sm sm:text-lg">
                NextJS
                <SiNextdotjs className=" ml-1" size={28}/>
              </Badge>
              <Badge className="bg-card text-sm sm:text-lg">
                Jest
                <img src="/skills/jest.svg" className="h-6 ml-1" />
              </Badge>
            </TrueFocus>
          </div>
        </div>
      </div>
    </section>
  );
}
