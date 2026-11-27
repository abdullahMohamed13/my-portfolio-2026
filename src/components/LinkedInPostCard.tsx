import { MessageCircle, Repeat2, ThumbsUp } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import type { LinkedInPostProps } from '@/types/LinkedInPostProps';

type LinkedInPostCardProps = {
  post: LinkedInPostProps;
  language: 'ar' | 'en';
};

const actionClassName = 'flex items-center justify-center gap-2 py-3 text-sm';
const linkActionClassName = `${actionClassName} hover:bg-muted`;
const linkedInFontFamily = '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", sans-serif';

export default function LinkedInPostCard({ post, language }: LinkedInPostCardProps) {
  const { url, images, reactions, comments, reposts } = post;
  const paragraphs = language === 'ar' ? post.arabicParagraphs : post.englishParagraphs;
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const secondaryStats = [
    comments !== undefined ? `${comments} comments` : null,
    reposts !== undefined ? `${reposts} reposts` : null,
  ].filter(Boolean).join(' · ');

  const actions = [
    { label: 'Like', Icon: ThumbsUp },
    { label: 'Comment', Icon: MessageCircle },
    { label: 'Repost', Icon: Repeat2 },
  ];

  const visibleImages = images?.slice(0, 3) ?? [];
  const remainingImages = (images?.length ?? 0) - visibleImages.length;

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content || isExpanded) return;

    const measure = () => setHasOverflow(content.scrollHeight > content.clientHeight + 1);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [isExpanded, paragraphs]);

  return <article className="mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-xl shadow-foreground/5" style={{ fontFamily: linkedInFontFamily }} dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
    <header className="flex items-center gap-3 border-b border-border p-5" dir="ltr">
      <img className="size-12 rounded-full object-cover" src="/linkedin_avatar.webp" alt="Abdallah Aziz" />
      <div className="text-left"><p className="font-semibold">Abdallah Aziz</p><p className="text-sm text-muted-foreground">Frontend Mentor · LinkedIn</p></div>
      {url && <a className="ml-auto rounded-full border border-primary px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground" href={url} target="_blank" rel="noreferrer">View post ↗</a>}
    </header>
    <div className="flex flex-1 flex-col p-5 text-[15px] leading-8 sm:p-7">
      <div ref={contentRef} className={isExpanded ? '' : 'relative max-h-56 overflow-hidden'}>
        <div className="space-y-4">{paragraphs.map((paragraph, i) => <p key={i} dir="auto">{paragraph}</p>)}</div>
        {!isExpanded && hasOverflow && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" aria-hidden="true" />}
      </div>
      {hasOverflow && <button type="button" className="mt-auto self-start pt-4 text-sm font-semibold text-primary hover:underline" onClick={() => setIsExpanded((expanded) => !expanded)} aria-expanded={isExpanded}>{language === 'ar' ? (isExpanded ? 'عرض أقل' : 'عرض المزيد') : (isExpanded ? 'Show less' : 'Show more')}</button>}
    </div>
    {visibleImages.length > 0 && <div className="grid gap-2 border-y border-border bg-muted/30 p-3">
      <a className="relative block overflow-hidden rounded-xl" href={visibleImages[0].src} target="_blank" rel="noreferrer" aria-label={`Open image: ${visibleImages[0].alt}`}>
        <img className="aspect-[16/9] w-full object-cover" src={visibleImages[0].src} alt={visibleImages[0].alt} loading="lazy" />
      </a>
      {visibleImages.length > 1 && <div className={`grid gap-2 ${visibleImages.length === 2 ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {visibleImages.slice(1).map((image, i) => <a key={`${image.src}-${i}`} className="relative block overflow-hidden rounded-xl" href={image.src} target="_blank" rel="noreferrer" aria-label={`Open image: ${image.alt}`}>
          <img className="aspect-[4/3] w-full object-cover" src={image.src} alt={image.alt} loading="lazy" />
          {i === visibleImages.length - 2 && remainingImages > 0 && <span className="absolute inset-0 flex items-center justify-center bg-foreground/70 text-2xl font-semibold text-background">+{remainingImages}</span>}
        </a>)}
      </div>}
    </div>}
    <div className="flex items-center justify-between px-5 py-3 text-sm text-muted-foreground" dir="ltr"><span>👍 {reactions} reactions</span>{secondaryStats && <span>{secondaryStats}</span>}</div>
    <footer className="grid grid-cols-3 border-t border-border" dir="ltr">
      {actions.map(({ label, Icon }) => url
        ? <a className={linkActionClassName} href={url} target="_blank" rel="noreferrer" key={label}><Icon size={16} />{label}</a>
        : <span className={`${actionClassName} text-muted-foreground`} key={label}><Icon size={16} />{label}</span>)}
    </footer>
  </article>;
}
