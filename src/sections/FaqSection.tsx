import type { CSSProperties } from 'react';
import SlitTypeFaq, { type FaqItem } from '@/components/ui/slit-type-faq';
import { socialMedia } from '@/data/social-media';

const faqCategories = ['Role', 'Work', 'Availability'];

const faqItems: FaqItem[] = [
  {
    question: 'What role are you looking for, and what is your core stack?',
    category: 'Role',
    answer:
      'I am a Computer Science graduate based in Egypt, looking for junior frontend developer or frontend-focused software engineering roles. My core stack is React, Next.js, TypeScript, and JavaScript.',
  },
  {
    question: 'How do you contribute to a team?',
    category: 'Role',
    answer:
      // 'I have worked with main, develop, and feature branches, reviewed pull requests against requirements and code quality, resolved merge conflicts, and coordinated merges. I have also taken part in Scrum and sprint meetings and used GitHub Projects and milestones to organize work. That work is as much about communication and process as it is about writing UI.',
      'At AfaaqWare, I guide frontend trainees, review pull requests, and give practical feedback. I have also maintained SurveyLand, coordinated Git workflows, resolved merge conflicts, and taken part in sprint meetings.',
  },
  {
    question: 'Which projects best show your work?',
    category: 'Work',
    answer:
      'IEEE El-Shorouk Student Branch is a team-built platform I contributed to, including events, registration, announcements, forms, and admin features. OpenChats is my personal Next.js project. I have also delivered freelance websites for clients.',
  },
  {
    question: 'What opportunities and work arrangements are you open to?',
    category: 'Availability',
    answer:
      'I am open to full-time or part-time roles, preferably remote, in Egypt or internationally. For client work, I have delivered websites and completed the ITIDA & GIGS Freelancing Program; my paid freelance experience is still early-stage.',
  },
];

const contactHref =
  socialMedia.find((item) => item.name === 'Gmail')?.href ?? 'mailto:abdullah.229op@gmail.com';

// Match the horizontal rhythm of the other page sections while letting the ink flood stay full-bleed.
const sectionStyle = {
  '--stf-gutter': 'clamp(1.375rem, 8vw, 8.125rem)',
} as CSSProperties;

export default function FaqSection() {
  return (
    <div id="faq">
      <SlitTypeFaq
        headline={'BEFORE WE\nTALK'}
        intro="A short, honest overview of how I work, what I have shipped, and what I am still learning."
        items={faqItems}
        categories={faqCategories}
        palette={{ paper: '#eee9dc', ink: '#0056b3', onInk: '#ffffff' }}
        theme="light"
        searchLabel="Search the questions"
        contact={{ prompt: 'Have a role or a project in mind?', label: 'Email me', href: contactHref }}
        displayFont="var(--type-display)"
        textFont="Arial, sans-serif"
        className="faq-section"
        style={sectionStyle}
      />
    </div>
  );
}
