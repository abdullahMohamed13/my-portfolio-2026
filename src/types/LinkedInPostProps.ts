import type { ReactNode } from 'react';

export interface LinkedInPostImage {
  src: string;
  alt: string;
}

export interface LinkedInPostProps {
  id: number;
  /** Link to the original post on LinkedIn. */
  url?: string;
  /** Arabic post copy. Paragraphs can contain line breaks and inline markup. */
  arabicParagraphs: ReactNode[];
  /** English translation of the post copy. */
  englishParagraphs: ReactNode[];
  images?: LinkedInPostImage[];
  reactions: number;
  comments?: number;
  reposts?: number;
}
