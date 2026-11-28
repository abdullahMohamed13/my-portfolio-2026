import { 
  BiHomeAlt, 
  BiUser, 
  BiFolder, 
  BiCodeAlt, 
  BiEnvelope 
} from 'react-icons/bi'
import { MdOutlineRateReview } from "react-icons/md";

const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

export const navItems = [
    { icon: <BiHomeAlt size={18} />, label: 'Intro', onClick: () => scrollToSection('hero')},
    { icon: <BiUser size={18} />, label: 'Approach', onClick: () => scrollToSection('about')},
    { icon: <BiFolder size={18} />, label: 'Projects', onClick: () => scrollToSection('projects')},
    { icon: <BiCodeAlt size={18} />, label: 'Skills', onClick: () => scrollToSection('skills')},
    { icon: <MdOutlineRateReview size={18} />, label: 'Testimonials', onClick: () => scrollToSection('testimonials')},
    { icon: <BiEnvelope size={18} />, label: 'Contact', onClick: () => scrollToSection('contact')},
];

/** Full menu items for the kinetic gate navigation. */
export const kineticNavItems = [
    { label: 'Work', href: '#projects', meta: 'Selected projects', shape: 1 },
    { label: 'Approach', href: '#approach', meta: 'How I build', shape: 2 },
    { label: 'Proof', href: '#proof', meta: 'GitHub contributions', shape: 4 },
    { label: 'Testimonials', href: '#testimonials', meta: 'What collaborators say', shape: 2 },
    { label: 'Contact', href: '#contact', meta: 'Start a conversation', shape: 4 },
] as const;
