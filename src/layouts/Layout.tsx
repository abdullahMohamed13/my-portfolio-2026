import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import ScrollToTopComponent from '../components/ScrollToTopComponent';
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function Layout() {
	const knownPaths = ['/', '/resume'];
	const showFooter = knownPaths.includes(location.pathname);
	
	return ( 
        <FadeInOnScroll
            direction="down"
            className="flex flex-col min-h-screen selection:bg-primary selection:text-white"
        >
            <ScrollToTopComponent />
            <main className="grow">
                <Outlet />
            </main>
				 {showFooter && <Footer />}
        </FadeInOnScroll>
    )
}