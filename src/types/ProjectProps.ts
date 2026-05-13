export interface ProjectProps {
  title: string
  description: string
  imgSrc: string
  projectInSite?: string
  deploymentPlatform: 'Netlify' | 'Render' | 'Github Pages'
  stack: string[]
  themeColor: string
  stackIcons: {
    text: string
    icon: React.ReactNode
   }[]
  liveURL: string
  githubURL: string
  linkedinPost?: string
}