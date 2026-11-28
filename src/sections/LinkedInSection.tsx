import { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Comment, ExternalLink, Linkedin, Repeat, ThumbsUp } from 'pixelarticons/react';
import { CoverFlowCarousel, type CoverFlowItem } from '@/components/ui/3-d-coverflow-carousel';
import { linkedinPosts } from '@/data/linkedin-posts';

type Language = 'ar' | 'en';

const themes: Record<Language, string[]> = {
  en: ['Structure', 'Types & tooling', 'Team workflow', 'Learning in public'],
  ar: ['الهيكلة', 'Types والأدوات', 'شغل التيم', 'التعلّم في العلن'],
};

export default function LinkedInSection() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageTouchStartX = useRef<number | null>(null);

  const activePost = linkedinPosts[activeIndex] ?? linkedinPosts[0];
  const paragraphs = language === 'ar' ? activePost.arabicParagraphs : activePost.englishParagraphs;
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const languageOptions = language === 'ar' ? (['ar', 'en'] as const) : (['en', 'ar'] as const);

  const carouselItems = useMemo<CoverFlowItem[]>(() => {
    const labels = language === 'ar'
      ? { reactions: 'تفاعل', comments: 'تعليق', reposts: 'إعادة نشر' }
      : { reactions: 'reactions', comments: 'comments', reposts: 'reposts' };

    return linkedinPosts.map((post) => ({
      id: post.id,
      tag: post.topic[language],
      title: post.title[language],
      excerpt: post.excerpt[language],
      image: post.images?.[0]?.src,
      imageAlt: post.images?.[0]?.alt,
      meta: [
        `${post.reactions} ${labels.reactions}`,
        post.comments !== undefined ? `${post.comments} ${labels.comments}` : null,
        post.reposts !== undefined ? `${post.reposts} ${labels.reposts}` : null,
      ].filter(Boolean).join(' · '),
      ctaText: language === 'ar' ? 'اقرأ المنشور' : 'Read post',
      ctaUrl: post.url,
      dir: language === 'ar' ? 'rtl' : 'ltr',
    }));
  }, [language]);

  const selectPost = (index: number) => {
    setActiveIndex(index);
    setActiveImageIndex(0);
  };

  const postImages = activePost.images ?? [];
  const activeImage = postImages[activeImageIndex];
  const moveImage = (direction: -1 | 1) => {
    setActiveImageIndex((index) => (index + direction + postImages.length) % postImages.length);
  };

  return (
    <section
      id="linkedin"
      className="portfolio-section"
      aria-labelledby="linkedin-post-title"
      dir="ltr"
      lang="en"
    >
      <div className="grid grid-cols-[1.1fr_0.9fr] items-end gap-[clamp(2rem,6vw,6rem)] max-[860px]:grid-cols-1">
        <div>
          <p className="portfolio-eyebrow flex items-center gap-2">
            <Linkedin aria-hidden="true" className="h-4 w-4" />
            04 / Field notes
          </p>
          <h2
            id="linkedin-post-title"
            className={`text-[clamp(2.75rem,6.5vw,5.5rem)] ${
              language === 'ar'
                ? 'm-0 max-w-[56.25rem] font-sans leading-[1.25] tracking-normal'
                : 'portfolio-title'
            }`}
          >
            <>I write to figure out<br /><em className="portfolio-title-accent not-italic">what I think.</em></>
          </h2>
        </div>

        <div className="max-w-[34rem] max-[860px]:max-w-none">
          <p className="text-[clamp(1rem,1.5vw,1.1875rem)] leading-relaxed text-[#4c4a43]">
            Most of these notes started as something I had to explain to myself first: how to keep a project from turning into spaghetti, why types are worth the extra keystrokes, and what a team workflow should feel like.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Published on LinkedIn, collected here as a record of the work and the opinions forming around it.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
              <strong dir="ltr" className="font-display text-sm leading-none tracking-normal text-foreground">
                5.5K+
              </strong>
              followers
            </span>
          </div>
        </div>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 py-4">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
          What I write about
        </span>
        {themes.en.map((theme) => (
          <span key={theme} className="border border-border px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.1em]">
            {theme}
          </span>
        ))}
      </div>

      <div
        className="mt-10 border-y border-foreground shadow-[10px_10px_0_var(--primary)]"
        style={{
          width: 'calc(100% + 2 * clamp(1.375rem, 8vw, 8.125rem))',
          marginInline: 'calc(-1 * clamp(1.375rem, 8vw, 8.125rem))',
        }}
      >
        <CoverFlowCarousel
          items={carouselItems}
          activeIndex={activeIndex}
          onActiveChange={selectPost}
          dir={dir}
          sectionLabel="Browse the notes"
          ariaLabel="Notes from LinkedIn"
          labels={{
            previous: 'Previous note',
            next: 'Next note',
            slide: (index, total) => `${index + 1} of ${total}`,
            goTo: (index, title) => `Go to note ${index + 1}: ${title}`,
            live: (index, total, title) => `Note ${index + 1} of ${total}: ${title}`,
          }}
        />
      </div>

      <div className="mt-10 border border-foreground bg-card shadow-[8px_8px_0_var(--accent)]">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col border-b border-foreground p-6 sm:p-8 lg:border-b-0 lg:border-e">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary">
                {language === 'ar' ? 'ملاحظة' : 'Note'} {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="border border-border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground">
                {activePost.topic[language]}
              </span>
            </div>

            <h3
              key={`${activePost.id}-${language}-title`}
              dir={dir}
              className={`mt-5 text-[clamp(1.9rem,3.2vw,2.75rem)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-500 ${
                language === 'ar' ? 'font-sans leading-[1.35]' : 'font-display leading-[1.02]'
              }`}
            >
              {activePost.title[language]}
            </h3>

            <p dir={dir} className="mt-4 leading-relaxed text-muted-foreground">
              {activePost.excerpt[language]}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-4 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <ThumbsUp aria-hidden="true" className="h-4 w-4 text-primary" />
                <strong className="font-display text-base text-foreground">{activePost.reactions}</strong>
                <span>{language === 'ar' ? 'تفاعل' : 'reactions'}</span>
              </span>
              {activePost.comments !== undefined && (
                <span className="inline-flex items-center gap-2">
                  <Comment aria-hidden="true" className="h-4 w-4 text-primary" />
                  <strong className="font-display text-base text-foreground">{activePost.comments}</strong>
                  <span>{language === 'ar' ? 'تعليق' : 'comments'}</span>
                </span>
              )}
              {activePost.reposts !== undefined && (
                <span className="inline-flex items-center gap-2">
                  <Repeat aria-hidden="true" className="h-4 w-4 text-primary" />
                  <strong className="font-display text-base text-foreground">{activePost.reposts}</strong>
                  <span>{language === 'ar' ? 'إعادة نشر' : 'reposts'}</span>
                </span>
              )}
            </div>

            {activeImage && (
              <div
                className="relative mt-6 aspect-[16/9] overflow-hidden border border-foreground/20"
                onTouchStart={(event) => { imageTouchStartX.current = event.touches[0].clientX; }}
                onTouchEnd={(event) => {
                  if (imageTouchStartX.current === null || postImages.length < 2) return;
                  const delta = event.changedTouches[0].clientX - imageTouchStartX.current;
                  imageTouchStartX.current = null;
                  if (Math.abs(delta) > 40) moveImage((delta < 0) !== (dir === 'rtl') ? 1 : -1);
                }}
                aria-roledescription={language === 'ar' ? 'عارض صور' : 'image carousel'}
              >
                <a
                  key={activeImage.src}
                  href={activeImage.src}
                  target="_blank"
                  rel="noreferrer"
                  className="group absolute inset-0 block"
                  aria-label={`${language === 'ar' ? 'افتح الصورة' : 'Open image'}: ${activeImage.alt}`}
                >
                  <img
                    src={activeImage.src}
                    alt={activeImage.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </a>
                {postImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => moveImage(dir === 'rtl' ? 1 : -1)}
                      aria-label={language === 'ar' ? 'الصورة السابقة' : 'Previous image'}
                      className="absolute start-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center border border-foreground/30 bg-background/90 text-foreground hover:bg-accent"
                    >
                      {dir === 'rtl' ? <ChevronRight aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(dir === 'rtl' ? -1 : 1)}
                      aria-label={language === 'ar' ? 'الصورة التالية' : 'Next image'}
                      className="absolute end-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center border border-foreground/30 bg-background/90 text-foreground hover:bg-accent"
                    >
                      {dir === 'rtl' ? <ChevronLeft aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
                    </button>
                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-background/90 to-transparent px-3 pb-2 pt-6">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em]">
                        {activeImageIndex + 1} / {postImages.length}
                      </span>
                      <div className="flex items-center gap-1.5" aria-label={language === 'ar' ? 'اختر صورة' : 'Choose an image'}>
                        {postImages.map((image, index) => (
                          <button
                            key={image.src}
                            type="button"
                            onClick={() => setActiveImageIndex(index)}
                            aria-label={language === 'ar' ? `الصورة ${index + 1}` : `Image ${index + 1}`}
                            aria-current={index === activeImageIndex ? 'true' : undefined}
                            className={`size-2 rounded-full border border-foreground ${index === activeImageIndex ? 'bg-primary' : 'bg-background/70'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activePost.url && (
              <a className="portfolio-link mt-auto inline-flex items-center gap-1.5 pt-6" href={activePost.url} target="_blank" rel="noreferrer">
                {language === 'ar' ? 'المنشور الأصلي على LinkedIn' : 'Original post on LinkedIn'}
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                The note
              </p>
            </div>

            <div
              key={`${activePost.id}-${language}-body`}
              className="relative mt-5 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
              dir={dir}
              lang={language}
            >
              <div className="space-y-4 text-[0.95rem] leading-8">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} dir="auto">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t border-border p-3" dir="ltr">
          <div className="inline-flex border border-foreground bg-card p-1" role="group" aria-label="Choose note language">
            {languageOptions.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                aria-pressed={language === code}
                className={`px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors ${language === code ? 'bg-foreground text-background' : 'text-foreground hover:bg-foreground/5'}`}
              >
                {code === 'en' ? 'English' : 'العربية'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
