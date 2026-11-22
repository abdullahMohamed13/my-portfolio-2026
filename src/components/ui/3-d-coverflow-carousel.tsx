import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type TouchEvent } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'pixelarticons/react';

export interface CoverFlowItem {
  id: string | number;
  tag?: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  meta?: ReactNode;
  ctaText?: string;
  ctaUrl?: string;
  dir?: 'ltr' | 'rtl';
}

export interface CoverFlowCarouselLabels {
  previous?: string;
  next?: string;
  slide?: (index: number, total: number) => string;
  goTo?: (index: number, title: string) => string;
  live?: (index: number, total: number, title: string) => string;
}

export interface CoverFlowCarouselProps {
  items: CoverFlowItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  dir?: 'ltr' | 'rtl';
  /** Controlled active index. Leave undefined to let the carousel manage itself. */
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  onCtaClick?: (item: CoverFlowItem, index: number) => void;
  ariaLabel?: string;
  labels?: CoverFlowCarouselLabels;
}

type SlidePosition = {
  transform: string;
  opacity: number;
  zIndex: number;
  filter: string;
  isCenter: boolean;
};

function getSlidePosition(offset: number, total: number, rtl: boolean): SlidePosition {
  if (offset === 0) {
    return {
      transform: 'translateX(0) scale(1) rotateY(0deg)',
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1)',
      isCenter: true,
    };
  }

  const direction = rtl ? -1 : 1;

  if (offset === 1) {
    return {
      transform: `translateX(calc(var(--cf-card-w) * ${0.84 * direction})) scale(0.84) rotateY(${-24 * direction}deg)`,
      opacity: 0.62,
      zIndex: 20,
      filter: 'brightness(0.7)',
      isCenter: false,
    };
  }

  if (total > 4 && offset === 2) {
    return {
      transform: `translateX(calc(var(--cf-card-w) * ${1.48 * direction})) scale(0.68) rotateY(${-38 * direction}deg)`,
      opacity: 0.3,
      zIndex: 10,
      filter: 'brightness(0.5) blur(1px)',
      isCenter: false,
    };
  }

  if (offset === total - 1) {
    return {
      transform: `translateX(calc(var(--cf-card-w) * ${-0.84 * direction})) scale(0.84) rotateY(${24 * direction}deg)`,
      opacity: 0.62,
      zIndex: 20,
      filter: 'brightness(0.7)',
      isCenter: false,
    };
  }

  if (total > 4 && offset === total - 2) {
    return {
      transform: `translateX(calc(var(--cf-card-w) * ${-1.48 * direction})) scale(0.68) rotateY(${38 * direction}deg)`,
      opacity: 0.3,
      zIndex: 10,
      filter: 'brightness(0.5) blur(1px)',
      isCenter: false,
    };
  }

  return {
    transform: 'translateX(0) scale(0.4) rotateY(0deg)',
    opacity: 0,
    zIndex: 0,
    filter: 'brightness(0.4) blur(2px)',
    isCenter: false,
  };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

export function CoverFlowCarousel({
  items,
  sectionLabel,
  autoplay = false,
  autoplayDelay = 6000,
  className = '',
  dir = 'ltr',
  activeIndex,
  onActiveChange,
  onCtaClick,
  ariaLabel = 'Coverflow carousel',
  labels,
}: CoverFlowCarouselProps) {
  const isRtl = dir === 'rtl';
  const previousLabel = labels?.previous ?? 'Previous note';
  const nextLabel = labels?.next ?? 'Next note';
  const slideLabel = labels?.slide ?? ((index: number, total: number) => `${index + 1} of ${total}`);
  const goToLabel = labels?.goTo ?? ((index: number, title: string) => `Go to note ${index + 1}: ${title}`);
  const liveLabel = labels?.live ?? ((index: number, total: number, title: string) => `Note ${index + 1} of ${total}: ${title}`);
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const touchStartX = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = items.length;
  const rawIndex = activeIndex ?? internalIndex;
  const currentIndex = total === 0 ? 0 : ((rawIndex % total) + total) % total;
  const activeItem = items[currentIndex];

  const goTo = useCallback((index: number) => {
    if (total === 0) return;
    const nextIndex = ((index % total) + total) % total;
    if (activeIndex === undefined) setInternalIndex(nextIndex);
    onActiveChange?.(nextIndex);
  }, [activeIndex, onActiveChange, total]);

  const nextSlide = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prevSlide = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    if (!autoplay || isHovered || isFocused || prefersReducedMotion || total <= 1) return;
    const interval = window.setInterval(nextSlide, autoplayDelay);
    return () => window.clearInterval(interval);
  }, [autoplay, autoplayDelay, isFocused, isHovered, nextSlide, prefersReducedMotion, total]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (isRtl) nextSlide();
      else prevSlide();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (isRtl) prevSlide();
      else nextSlide();
    }
    if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      goTo(total - 1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const diff = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      const forward = isRtl ? diff > 0 : diff < 0;
      if (forward) nextSlide();
      else prevSlide();
    }
  };

  if (total === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      dir={dir}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      className={`relative w-full select-none overflow-hidden bg-foreground text-background outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      {/* Ambient backdrop drawn from the active post image. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {activeItem?.image ? (
          <img
            key={activeItem.id}
            src={activeItem.image}
            alt=""
            className="h-full w-full scale-125 object-cover opacity-25 blur-3xl"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_40%,rgba(0,123,255,0.22),transparent_62%)]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,25,22,0.3)_0%,rgba(25,25,22,0.96)_78%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(238,233,220,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(238,233,220,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-10 sm:py-14">
        {sectionLabel && (
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" aria-hidden="true" />
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-accent">{sectionLabel}</p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent" aria-hidden="true" />
          </div>
        )}

        <div
          className="relative flex h-[clamp(27rem,42vw,34rem)] w-full items-center justify-center"
          style={{
            perspective: '1400px',
            '--cf-card-w': 'clamp(15rem, 25vw, 20rem)',
            '--cf-card-h': 'clamp(23rem, 36vw, 29rem)',
            '--cf-active-card-w': 'clamp(20rem, 40vw, 30rem)',
            '--cf-active-card-h': 'clamp(26rem, 42vw, 33rem)',
          } as CSSProperties}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => {
            const offset = (index - currentIndex + total) % total;
            const slide = getSlidePosition(offset, total, isRtl);

            return (
              <div
                key={item.id}
                role="group"
                aria-roledescription="slide"
                aria-label={slideLabel(index, total)}
                aria-hidden={!slide.isCenter}
                onClick={() => {
                  if (!slide.isCenter) goTo(index);
                }}
                className={`absolute overflow-hidden border ${slide.isCenter ? 'cursor-default' : 'cursor-pointer'}`}
                style={{
                  width: slide.isCenter ? 'var(--cf-active-card-w)' : 'var(--cf-card-w)',
                  height: slide.isCenter ? 'var(--cf-active-card-h)' : 'var(--cf-card-h)',
                  borderRadius: '2px',
                  backgroundColor: '#14130f',
                  borderColor: slide.isCenter ? 'rgba(253,189,4,0.7)' : 'rgba(238,233,220,0.18)',
                  transform: slide.transform,
                  opacity: slide.opacity,
                  zIndex: slide.zIndex,
                  filter: slide.filter,
                  transformOrigin: 'center center',
                  transition: prefersReducedMotion
                    ? 'none'
                    : 'transform 750ms cubic-bezier(0.25,1,0.5,1), opacity 750ms cubic-bezier(0.25,1,0.5,1), filter 750ms cubic-bezier(0.25,1,0.5,1), box-shadow 750ms ease',
                  boxShadow: slide.isCenter
                    ? '10px 10px 0 0 rgba(0,123,255,0.9), 0 30px 60px rgba(0,0,0,0.55)'
                    : '0 18px 40px rgba(0,0,0,0.45)',
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    loading={slide.isCenter ? 'eager' : 'lazy'}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(145deg,#242119_0%,#191916_55%,#0e0d0b_100%)]">
                    <span aria-hidden="true" className="absolute -right-3 -top-10 font-display text-[11rem] leading-none text-primary/25">“</span>
                    <span aria-hidden="true" className="absolute -bottom-8 -left-2 font-display text-[11rem] leading-none text-accent/15">”</span>
                    <div className="absolute inset-x-5 top-5 h-px bg-background/15" />
                  </div>
                )}

                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  aria-hidden="true"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(10,10,8,0.34) 0%, rgba(10,10,8,0.02) 34%, rgba(10,10,8,0.46) 68%, rgba(10,10,8,0.94) 100%)',
                  }}
                />

                <div
                  className="relative z-20 flex h-full flex-col justify-between p-5"
                  dir={item.dir}
                  aria-hidden={!slide.isCenter}
                  style={{
                    opacity: slide.isCenter ? 1 : 0,
                    transform: slide.isCenter ? 'translateY(0)' : 'translateY(14px)',
                    transition: prefersReducedMotion ? 'none' : 'opacity 450ms ease, transform 450ms ease',
                    pointerEvents: slide.isCenter ? 'auto' : 'none',
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    {item.tag && (
                      <span className="border border-accent/70 bg-accent px-2.5 py-1 font-mono text-[0.55rem] uppercase leading-none tracking-[0.16em] text-foreground">
                        {item.tag}
                      </span>
                    )}
                    <span dir="ltr" className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-background/65">
                      {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    {item.subtitle && (
                      <p className="mb-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-accent">{item.subtitle}</p>
                    )}
                    <h3
                      className={`text-balance text-background ${
                        item.dir === 'rtl'
                          ? 'font-sans text-[clamp(1.3rem,1.5vw,1.6rem)] leading-[1.4]'
                          : 'font-display text-[clamp(1.45rem,1.7vw,1.85rem)] leading-[1.02]'
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="mt-3 line-clamp-3 text-[0.8rem] leading-relaxed text-background/70">{item.excerpt}</p>
                    )}

                    <div className="mt-4 flex items-end justify-between gap-3 border-t border-background/15 pt-3">
                      <div className="font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.08em] text-background/65">
                        {item.meta}
                      </div>
                      {item.ctaUrl && (
                        <a
                          href={item.ctaUrl}
                          target="_blank"
                          rel="noreferrer"
                          tabIndex={slide.isCenter ? undefined : -1}
                          onClick={(event) => {
                            if (!onCtaClick) return;
                            event.preventDefault();
                            onCtaClick(item, index);
                          }}
                          className="inline-flex shrink-0 items-center gap-1.5 border border-primary bg-primary px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:border-accent hover:bg-accent hover:text-foreground"
                        >
                          {item.ctaText ?? 'Read post'}
                          {isRtl ? (
                            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                          ) : (
                            <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          )}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={prevSlide}
          aria-label={previousLabel}
          className={`absolute ${isRtl ? 'right-1' : 'left-1'} top-1/2 z-40 hidden size-11 -translate-y-1/2 place-items-center border border-background/25 bg-foreground/70 text-background backdrop-blur transition-colors hover:border-accent hover:text-accent md:grid`}
        >
          {isRtl ? (
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label={nextLabel}
          className={`absolute ${isRtl ? 'left-1' : 'right-1'} top-1/2 z-40 hidden size-11 -translate-y-1/2 place-items-center border border-background/25 bg-foreground/70 text-background backdrop-blur transition-colors hover:border-accent hover:text-accent md:grid`}
        >
          {isRtl ? (
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <div className="relative z-30 mt-7 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prevSlide}
            aria-label={previousLabel}
            className="grid size-9 place-items-center border border-background/25 text-background transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            {isRtl ? (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <span dir="ltr" className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-background/65">
            <span className="text-accent">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1.5 text-background/30">/</span>
            {String(total).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-1.5">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={goToLabel(index, item.title)}
                aria-current={index === currentIndex ? 'true' : undefined}
                className={`h-1.5 transition-all ${
                  index === currentIndex ? 'w-7 bg-accent' : 'w-1.5 bg-background/30 hover:bg-background/60'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label={nextLabel}
            className="grid size-9 place-items-center border border-background/25 text-background transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            {isRtl ? (
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {liveLabel(currentIndex, total, activeItem.title)}
        </p>
      </div>
    </div>
  );
}

export default CoverFlowCarousel;
