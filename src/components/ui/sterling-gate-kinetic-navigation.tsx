import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import ClickSound from '@/assets/sound/click.oga?url';
import ScrollSound from '@/assets/sound/scroll.oga?url';
import { playSound } from '@/utils/playSound';
import { kineticNavItems } from '@/data/nav-items';
import { socialLinks } from '@/data/social-media';
import '@/styles/kinetic-nav.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function KineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hover shapes for the menu links.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const menuItems = container.querySelectorAll<HTMLElement>('.menu-list-item[data-shape]');
    const shapesContainer = container.querySelector<HTMLElement>('.ambient-background-shapes');
    const cleanupCallbacks: Array<() => void> = [];

    menuItems.forEach((item) => {
      const shapeIndex = item.getAttribute('data-shape');
      const shape = shapesContainer?.querySelector<HTMLElement>(`.bg-shape-${shapeIndex}`);
      if (!shape) return;

      const shapeEls = shape.querySelectorAll<SVGElement>('.shape-element');

      const onEnter = () => {
        shapesContainer
          ?.querySelectorAll<HTMLElement>('.bg-shape')
          .forEach((s) => s.classList.remove('active'));
        shape.classList.add('active');

        if (prefersReducedMotion()) {
          gsap.set(shapeEls, { scale: 1, opacity: 1, rotation: 0 });
          return;
        }

        gsap.fromTo(
          shapeEls,
          { scale: 0.5, opacity: 0, rotation: -10 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            overwrite: 'auto',
          },
        );
      };

      const onLeave = () => {
        if (prefersReducedMotion()) {
          shape.classList.remove('active');
          return;
        }

        gsap.to(shapeEls, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => shape.classList.remove('active'),
          overwrite: 'auto',
        });
      };

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);
      cleanupCallbacks.push(() => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => {
      cleanupCallbacks.forEach((cleanup) => cleanup());
      gsap.killTweensOf(container.querySelectorAll('.shape-element'));
    };
  }, []);

  // Open/close choreography.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = prefersReducedMotion();
    let ease = reduce ? 'none' : 'main';

    if (!reduce) {
      try {
        if (!gsap.parseEase('main')) {
          CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');
        }
      } catch (error) {
        ease = 'power2.out';
        console.warn('CustomEase failed to load, falling back to the default ease.', error);
      }
    }

    if (!isMenuOpen) {
      container
        .querySelectorAll<HTMLElement>('.bg-shape.active')
        .forEach((shape) => shape.classList.remove('active'));
    }

    const overlay = container.querySelector<HTMLElement>('.kinetic-overlay');
    const menu = container.querySelector<HTMLElement>('.menu-content');
    const backdropLayers = container.querySelectorAll<HTMLElement>('.backdrop-layer');
    const menuLinks = container.querySelectorAll<HTMLElement>('.nav-link');
    const fadeTargets = container.querySelectorAll<HTMLElement>('[data-menu-fade]');
    const toggleTexts = container.querySelectorAll<HTMLElement>('.kinetic-toggle-text > span');
    const toggleIcon = container.querySelector<SVGElement>('.kinetic-toggle-icon');

    if (!overlay || !menu) return;

    const tl = gsap.timeline();

    if (isMenuOpen) {
      tl.set(overlay, { display: 'block' })
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0 : 0.35, ease })
        .fromTo(
          menu,
          { xPercent: reduce ? 0 : 4 },
          { xPercent: 0, duration: reduce ? 0 : 0.7, ease },
          '<',
        )
        .fromTo(
          toggleTexts,
          { yPercent: 0 },
          { yPercent: -100, stagger: reduce ? 0 : 0.2, duration: reduce ? 0 : 0.7, ease },
          '<',
        )
        .fromTo(
          toggleIcon,
          { rotate: 0 },
          { rotate: 315, duration: reduce ? 0 : 0.7, ease },
          '<',
        )
        .fromTo(
          backdropLayers,
          { xPercent: reduce ? 0 : 101 },
          {
            xPercent: 0,
            stagger: reduce ? 0 : 0.12,
            duration: reduce ? 0 : 0.575,
            ease,
          },
          '<',
        )
        .fromTo(
          menuLinks,
          { yPercent: reduce ? 0 : 140, rotate: reduce ? 0 : 10, autoAlpha: reduce ? 1 : 0 },
          {
            yPercent: 0,
            rotate: 0,
            autoAlpha: 1,
            stagger: reduce ? 0 : 0.05,
            duration: reduce ? 0 : 0.7,
            ease,
          },
          '<+=0.35',
        );

      if (fadeTargets.length) {
        tl.fromTo(
          fadeTargets,
          { autoAlpha: 0, yPercent: reduce ? 0 : 50 },
          {
            autoAlpha: 1,
            yPercent: 0,
            stagger: reduce ? 0 : 0.04,
            duration: reduce ? 0 : 0.7,
            ease,
            clearProps: 'all',
          },
          '<+=0.2',
        );
      }
    } else {
      tl.to(overlay, { autoAlpha: 0, duration: reduce ? 0 : 0.45, ease })
        .to(menu, { xPercent: reduce ? 0 : 120, duration: reduce ? 0 : 0.45, ease }, '<')
        .to(toggleTexts, { yPercent: 0, duration: reduce ? 0 : 0.45, ease }, '<')
        .to(toggleIcon, { rotate: 0, duration: reduce ? 0 : 0.45, ease }, '<')
        .set(overlay, { display: 'none' });
    }

    return () => {
      tl.kill();
    };
  }, [isMenuOpen]);

  // Lock page scroll and manage focus while the menu is open.
  useLayoutEffect(() => {
    if (!isMenuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => {
      const firstLink = menuRef.current?.querySelector<HTMLElement>('.nav-link');
      firstLink?.focus({ preventScroll: true });
    }, prefersReducedMotion() ? 0 : 750);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (previouslyFocused && previouslyFocused !== document.body) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [isMenuOpen]);

  useEffect(
    () => () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    },
    [],
  );

  const toggleMenu = () => {
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
    playSound(ClickSound);
    setIsMenuOpen((open) => !open);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    playSound(ScrollSound);

    if (!isMenuOpen) return;

    event.preventDefault();
    closeMenu();

    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = window.setTimeout(() => {
      scrollTimerRef.current = null;
      document.querySelector(href)?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 80);
  };

  return (
    <div ref={containerRef} className="kinetic-nav" data-menu-open={isMenuOpen}>
      <header className="kinetic-header">
        <a
          href="#hero"
          className="kinetic-logo"
          aria-label="Abdallah Aziz home"
          onClick={(event) => handleNavClick(event, '#hero')}
        >
          Abdallah <span>Aziz</span>
        </a>

        <div className="kinetic-actions">
          <button
            ref={toggleRef}
            type="button"
            className="kinetic-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="kinetic-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMenu}
          >
            <span className="kinetic-toggle-icon-wrap" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 16 16"
                fill="none"
                className="kinetic-toggle-icon"
              >
                <path d="M7.33333 16L7.33333 0L8.66667 0L8.66667 16L7.33333 16Z" fill="currentColor" />
                <path d="M16 8.66667L0 8.66667L0 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
                <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor" />
                <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor" />
                <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor" />
                <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor" />
              </svg>
            </span>
          </button>
        </div>
      </header>

      <div
        id="kinetic-menu"
        data-nav={isMenuOpen ? 'open' : 'closed'}
        className="kinetic-overlay"
        aria-hidden={!isMenuOpen}
      >
        <div className="overlay" onClick={closeMenu} aria-hidden="true" />

        <nav ref={menuRef} className="menu-content" aria-label="Main navigation">
          <div className="menu-bg" aria-hidden="true" onClick={closeMenu}>
            <div className="backdrop-layer first" />
            <div className="backdrop-layer second" />
            <div className="backdrop-layer third" />

            <div className="ambient-background-shapes">
              <svg
                className="bg-shape bg-shape-1"
                viewBox="0 0 400 400"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
              >
                <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(0,123,255,0.22)" />
                <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(253,189,4,0.16)" />
                <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(0,123,255,0.14)" />
                <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(253,189,4,0.2)" />
              </svg>

              <svg
                className="bg-shape bg-shape-2"
                viewBox="0 0 400 400"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
              >
                <path
                  className="shape-element"
                  d="M0 200 Q100 100, 200 200 T 400 200"
                  stroke="rgba(0,123,255,0.28)"
                  strokeWidth="60"
                  fill="none"
                />
                <path
                  className="shape-element"
                  d="M0 280 Q100 180, 200 280 T 400 280"
                  stroke="rgba(253,189,4,0.18)"
                  strokeWidth="40"
                  fill="none"
                />
              </svg>

              <svg
                className="bg-shape bg-shape-3"
                viewBox="0 0 400 400"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
              >
                <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(0,123,255,0.5)" />
                <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(253,189,4,0.5)" />
                <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(0,123,255,0.5)" />
                <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(253,189,4,0.5)" />
                <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(253,189,4,0.4)" />
                <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(0,123,255,0.4)" />
                <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(253,189,4,0.4)" />
                <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(0,123,255,0.5)" />
                <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(253,189,4,0.5)" />
                <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(0,123,255,0.5)" />
                <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(253,189,4,0.5)" />
                <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(253,189,4,0.4)" />
                <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(0,123,255,0.4)" />
                <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(253,189,4,0.4)" />
              </svg>

              <svg
                className="bg-shape bg-shape-4"
                viewBox="0 0 400 400"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
              >
                <path
                  className="shape-element"
                  d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                  fill="rgba(0,123,255,0.18)"
                />
                <path
                  className="shape-element"
                  d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                  fill="rgba(253,189,4,0.14)"
                />
              </svg>
            </div>
          </div>

          <div
            className="menu-content-wrapper"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeMenu();
            }}
          >
            <ul className="menu-list">
              {kineticNavItems.map((item, index) => (
                <li className="menu-list-item" data-shape={item.shape} key={item.href}>
                  <a
                    className="nav-link"
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                  >
                    <span className="nav-link-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="nav-link-text">{item.label}</span>
                    <span className="nav-link-meta">{item.meta}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="menu-footer" data-menu-fade>
              <div className="menu-footer-note">
                <span>Cairo, Egypt</span>
                <span>Available for freelance work</span>
              </div>

              <div className="menu-footer-links">
                <a href="mailto:abdullah.229op@gmail.com">Email</a>
                {socialLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>

              <span className="menu-footer-hint" aria-hidden="true">
                Esc to close
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
