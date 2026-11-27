import type { ReactNode } from 'react';

export interface LinkedInPostImage {
  src: string;
  alt: string;
}

/** Bilingual copy used by the field-notes carousel and reading panel. */
export interface LinkedInPostText {
  ar: string;
  en: string;
}

export interface LinkedInPostProps {
  id: number;
  /** Link to the original post on LinkedIn. */
  url?: string;
  /** Editorial headline for the note. */
  title: LinkedInPostText;
  /** Short topic label that gives the note its direction. */
  topic: LinkedInPostText;
  /** One or two sentence summary shown on the carousel card. */
  excerpt: LinkedInPostText;
  /** Arabic post copy. Paragraphs can contain line breaks and inline markup. */
  arabicParagraphs: ReactNode[];
  /** English translation of the post copy. */
  englishParagraphs: ReactNode[];
  images?: LinkedInPostImage[];
  reactions: number;
  comments?: number;
  reposts?: number;
}
