import { SiTypescript, SiTailwindcss, SiJavascript, SiReact, SiCss3, SiClerk } from 'react-icons/si';
import type { ProjectProps } from "@/types/ProjectProps";

export const projects: ProjectProps[] = [
  {
    title: 'OpenChats',
    projectType: 'Individual',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Convex', 'Better Auth', 'Stream Chat'],
    themeColor: '#12623A',
    stackIcons: [
      { text: 'React', icon: <SiReact /> },
      { text: 'TypeScript', icon: <SiTypescript /> },
      { text: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
    description: 'A real-time team communication platform for organized workspace, channel, and direct message conversations. Includes workspace management, invitations, join requests, member roles, guest access, profiles, notifications, and responsive chat navigation.',
    imgSrc: '/projects/openchats/Openchats-hero.png',
    liveURL: 'http://openchats.qzz.io/',
    githubURL: 'https://github.com/abdullahMohamed13/openchats',
	},
  
  {
    title: 'IEEE Official Website',
    projectType: 'Team',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT'],
    themeColor: '#0096ff',
    stackIcons: [
      { text: 'React', icon: <SiReact /> },
      { text: 'JavaScript', icon: <SiJavascript /> },
      { text: 'CSS', icon: <SiCss3 /> },
    ],
    description: 'Official IEEE student branch website for sharing branch information, events, and community updates.',
    imgSrc: '/projects/ieee/ieee-landing.png',
    liveURL: 'https://ieeesha.org/',
    githubURL: 'https://github.com/ieeesha10-svg/Ieee-website',
	},
  
  {
    title: "The Good Studio",
    projectType: 'Individual',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Three.js', 'React Three Fiber', 'Cloudflare AI'],
    themeColor: '#ee6845',
    stackIcons: [
      { text: 'React', icon: <SiReact /> },
      { text: 'TypeScript', icon: <SiTypescript /> },
      { text: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
    description: 'Built a trilingual portfolio for The Good Studio, with English, Spanish, and French content throughout. Visitors can chat with an AI-powered studio guide about services and process, explore selected work, and send a tailored project inquiry. The experience pairs a live 3D hero mark with editorial design and responsive motion.',
    imgSrc: '/projects/studio/the-good-studio-hero.png',
    video: 'https://res.cloudinary.com/uwwnts8h/video/upload/v1795267591/promo-cropped_z3soqw.mp4',
    liveURL: 'https://the-good-studio.abdullah-229op.workers.dev/en',
    githubURL: 'https://github.com/abdullahMohamed13/the-good-studio',
	},
  
  {
    title: "Morgan's Hope",
    projectType: 'Team',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Express', 'PostgreSQL', 'Firebase', 'FastAPI'],
    themeColor: '#2E5C5A',
    stackIcons: [],
    description: 'An AI-assisted lung cancer screening platform that analyzes chest CT scans and X-ray images, provides structured result reviews and history, recommends hospitals for critical cases, and offers a patient-facing assistant for clearer follow-up guidance.',
    imgSrc: '/projects/morgan/morgan-landing.png',
    liveURL: 'https://morgans-hope.vercel.app/',
    githubURL: 'https://github.com/MorgansHope/MorgansHope',
	},
  
  {
    title: 'Titan MMA Gym',
    projectType: 'Individual',
    stack: ['ReactJs', 'TypeScript', 'TailwindCSS', 'Clerk', 'Convex'],
    themeColor: '#e20000',
    deploymentPlatform: 'Vercel',
    stackIcons: [
      { text: 'React', icon: <SiReact /> },
      { text: 'TypeScript', icon: <SiTypescript /> },
      { text: 'TailwindCSS', icon: <SiTailwindcss /> },
      { text: 'Clerk', icon: <SiClerk /> },
    ],
    description: `Full-stack booking system built for a Mixed Martial Arts (MMA) gym.
    The system enables fighters to explore the gym's classes, coaches, branches, and membership offerings.
    Then create an account and book training sessions.`,
		imgSrc: '/projects/titan-mma.webp',
    video: "https://res.cloudinary.com/uwwnts8h/video/upload/v1795769368/titan-promo_pg1sls.mp4",
    projectInSite: '/projects/titan/titan-landing.png',
    liveURL: 'https://titan-mma.vercel.app/',
    githubURL: 'https://github.com/abdullahMohamed13/titan-MMA-gym',
  },
  // Previous project entries retained for reference while the new project set is prepared.
  /*
  {
    title: 'Cure',
    stack: ['ReactJs', 'Typescript', 'TailwindCSS', 'React Query'],
    themeColor: '#0163D1',
    deploymentPlatform: 'Netlify',
    stackIcons: [
      { text: 'React', icon: <SiReact /> },
      { text: 'TypeScript', icon: <SiTypescript /> },
      { text: 'TailwindCSS', icon: <SiTailwindcss /> },
      { text: 'React Query', icon: <SiReactquery /> },
    ],
    description: `A full-stack team project for a medical booking platform where users can discover doctors,
    book appointments, receive notifications, and pay online.
    I owned the doctor details page, reviews, notifications, payment workflow, and nearby-doctor map.`,
    imgSrc: '/projects/cure.png',
    projectInSite: '/projects/cure-home-page.webp',
    liveURL: 'https://cure-telemedicine.vercel.app/',
    githubURL: 'https://github.com/Huma-volve/R7-React-Cure-3',
  },
  {
    title: 'Chess Times Square',
    stack: ['ReactJs', 'JavaScript', 'CSS'],
    themeColor: '#389B38',
    deploymentPlatform: 'Render',
    stackIcons: [
      { text: 'React', icon: <SiReact /> },
      { text: 'JavaScript', icon: <SiJavascript /> },
      { text: 'CSS', icon: <SiCss3 /> },
    ],
    description: `Free online chess clock, built it to play chess with my friends and it's perfect for
    over-the-board chess. Comes with customizable time controls, your live Chess.com or Lichess rating pulled up instantly by username, and a results tracker.`,
    imgSrc: '/projects/chess-times-square.webp',
    projectInSite: '/projects/chess-times-square-home-page.webp',
    liveURL: 'https://chesstimessquare.onrender.com',
    githubURL: 'https://github.com/abdullahMohamed13/ChessTimesSquare',
    linkedinPost: 'https://www.linkedin.com/posts/abdallah-aziz-999b54295_reactjs-frontenddeveloper-webdevelopment-activity-7339562171699228672-T7Sr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEeKCYUB2f05TmAQBvRvCLK8mgQqJSaN2fg'
  },
  */
];
