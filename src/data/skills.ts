
interface SkillsProps {
    label: string
    color?: string
    img?: string
}

const languages: SkillsProps[] = [
    {
        color: '#F7DF1E',
        label: 'JavaScript',
        img: '/skills/javascript.svg',
    },
    {
        color: '#3178C6',
        img: '/skills/typescript.svg',
        label: 'TypeScript',
    },
    {
        color: '#777BB3',
        label: 'PHP',
        img: '/skills/php.svg',
    },
    {
        label: 'HTML5',
        color: '#E34F26',
        img: '/skills/html.svg',
    },
    {
        label: 'CSS3',
        color: '#1572B6',
        img: '/skills/css.svg',
    },
    {
        label: 'SASS/SCSS',
        color: '#cc6699',
        img: '/skills/sass.svg',
    },
]

const frameworks_libraries: SkillsProps[] = [
		{
			label: 'Next.Js',
        color: '#000',
        img: '/skills/next.svg',
    },
		{
			label: 'React.Js',
        color: '#61DAFB',
        img: '/skills/react.svg',
    },
    {
        label: 'React Native',
        color: '#61DAFB',
        img: '/skills/react-native.svg',
    },
    {
        label: 'Redux',
        color: '#7748BC',
        img: '/skills/redux.svg',
    },
    {
        color: '#FBD74C',
        label: 'React Query',
        img: '/skills/react-query.svg',
    },
]

const styling_ui: SkillsProps[] = [
    {
        label: 'Tailwind CSS',
        color: '#06B6D4',
        img: '/skills/tailwindcss.svg',
    },
    {
        label: 'Bootstrap',
        color: '#8B4AFE',
        img: '/skills/bootstrap.svg',
    },
    {
        label: 'Shadcn UI',
        color: '#6366F1',
        img: '/skills/shadcn-ui.svg',
    },
    {
        label: 'Material UI',
        color: '#007FFF',
        img: '/skills/material-ui.svg',
    },
]

const backend: SkillsProps[] = [
    {
        color: '#777BB3',
        label: 'PHP',
        img: '/skills/php.svg',
    },
    {
        color: '#F29111',
        label: 'MySQL',
        img: '/skills/mysql.svg',
    },
]

const tools: SkillsProps[] = [
    {
        color: '#7d3601',
        label: 'GitHub',
        img: '/skills/github.svg',
    },
    {
        color: '#FF6C37',
        label: 'Postman',
        img: '/skills/postman.svg',
    },
    {
        color: '#A259FF',
        label: 'Figma',
        img: '/skills/figma.svg',
    },
    {
        color: '#F4BC00',
        label: 'Linux',
        img: '/skills/linux.svg',
    },
    // {
    //     color: '#039DEC',
    //     label: 'Docker',
    //     img: '/skills/docker.svg',
    // },
]

const planningToLearn: SkillsProps[] = [
    {
        label: 'Next JS',
        color: '#0070f3',
        img: '/skills/next.svg',
    },
    {
        label: 'Laravel',
        color: '#FF2D20',
        img: '/skills/laravel.svg',
    },
    {
        label: 'Jest',
        color: '#973755',
        img: '/skills/jest.svg',
    },
]

export {
    languages,
    frameworks_libraries,
    styling_ui,
    backend,
    tools,
    planningToLearn
}