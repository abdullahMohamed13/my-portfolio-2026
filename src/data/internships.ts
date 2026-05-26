interface InternshipProps {
 id: number;
 href: string;
 company: {
  name: string;
  logo: string;
  color: string;
 };
 // duration: string;
}

export const internships: InternshipProps[] = [
 {
  id: 1,
  href: "https://www.mckinsey.org/home",
  company: {
   name: "McKinsey.org",
   logo: "/internships/mckinsey.png",
   color: "#2350FF",
  },
 },
 {
  id: 2,
  href: "https://gizasystems.com/",
  company: {
   name: "Giza Systems",
   logo: "/internships/giza-systems.webp",
   color: "#02A5DE",
  },
 },
 {
  id: 3,
  href: "https://www.facebook.com/IEEE.ElShoroukAcademy.SB",
  company: {
   name: "IEEE SHA",
   logo: "/internships/ieee.png",
   color: "#006597",
  },
 },
 {
  id: 4,
  href: "https://eyouthlearning.com/",
  company: {
   name: "EYouth",
   logo: "/internships/eyouth.webp",
   color: "#003DF2",
  },
 },
 {
  id: 5,
  href: "https://huma-volve.com/company-profile/",
  company: {
   name: "Huma Volve",
   logo: "/internships/huma-volve.webp",
   color: "#1900AD",
  },
 },
 {
  id: 6,
  href: "https://www.linkedin.com/company/108834010/",
  company: {
   name: "Afaaq Ware",
   logo: "/internships/afaaq-ware.webp",
   color: "#343379",
  },
 },
];
