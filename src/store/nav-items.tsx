
export const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

export const navItems = [
    { label: '#Intro', onClick: () => scrollToSection('hero')},
    { label: '#About', onClick: () => scrollToSection('about')},
    { label: '#Projects', onClick: () => scrollToSection('projects')},
    { label: '#Skills', onClick: () => scrollToSection('skills')},
    { label: '#Testimonials', onClick: () => scrollToSection('testimonials')},
    { label: '#Contact', onClick: () => scrollToSection('contact')},
];