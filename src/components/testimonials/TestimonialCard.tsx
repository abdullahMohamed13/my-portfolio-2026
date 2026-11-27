import { type TestimonialProps } from "@/types/TestimonialProps";
import { FaQuoteRight } from "react-icons/fa6";
import { Separator } from "../Separator";

export default function TestimonialCard({test, index}: {test: TestimonialProps, index: number}) {
    const isEven = index % 2 === 0;

    return <div key={test.id} className="flex flex-col items-center text-center mt-2">
        <div className="relative">
            <img src={test.img === '' ? '/testimonials/user.png' : test.img} alt={test.name} className="w-20 h-20 sm:w-30 sm:h-30 border-2 border-primary rounded-full" />
            <i className={`${isEven ? "bg-black text-white": "bg-white text-black"} absolute bottom-0 right-2 p-2 rounded-full`}>
                <FaQuoteRight className="m-auto" />
            </i>
        </div>

        <p className="max-w-lg md:max-w-auto flex-1 flex items-center justify-center mt-4 text-lg md:text-xl italic">
            “{test.text}”
        </p>

        <Separator />

        <div className="mt-auto">
            <h3>{test.name}</h3>
            <p className="text-sm text-muted-foreground">{test.role}</p>
        </div>
    </div>
}
