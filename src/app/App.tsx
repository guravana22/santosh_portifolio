import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Linkedin, Mail, MapPin, Moon, Sun } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { COMPLEX_SCRIPTS, LOCALES, MESSAGES, getInitialLocale, saveLocale, type LocaleCode } from '../app/lib/i18n';
import LanguageSwitcher from '../app/Languageswitcher';

import tTherapy from '../app/assets/t-therapy.png';
import erpforce from '../app/assets/erpforce.png';
import weforce from '../app/assets/weforce.png';
import fat from '../app/assets/fat.png';
import fatlanding from '../app/assets/fat_landing.png';
import quantasec from '../app/assets/quantasec.png';
import retrofit from '../app/assets/retrofit.png';
import trustin from '../app/assets/trustin.png';
import yaswash from '../app/assets/yaswash.png';
import ondemandlabs from '../app/assets/ondemandlabs.png';
import react from '../app/assets/react.png';
import nodejs from '../app/assets/nodejs.png';
import tailwind from '../app/assets/tailwind.png';
import aaks from '../app/assets/aaks.png';
import profile from '../app/assets/profile_pic.png';
import trustinQatar from '../app/assets/trustin_qatar.png';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */
const THEMES: Record<'dark' | 'light', Record<string, string>> = {
  dark: {
    '--bg': '#0D0C12',
    '--raise': '#16141D',
    '--fg': '#F2EEE6',
    '--muted': '#9A95A6',
    '--line': 'rgba(242,238,230,0.13)',
    '--accent': '#B9A7FF',
    '--on-accent': '#14102A',
  },
  light: {
    '--bg': '#F4F2F8',
    '--raise': '#FFFFFF',
    '--fg': '#14121C',
    '--muted': '#625D70',
    '--line': 'rgba(20,18,28,0.14)',
    '--accent': '#5B3FE0',
    '--on-accent': '#FFFFFF',
  },
};

// Anybody (variable width axis) covers Latin. Noto fonts cover Greek, Devanagari, Telugu and Arabic;
// the browser falls back per glyph, so one stack works for every language.
const DISPLAY =
  "'Anybody', 'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Telugu', 'Noto Sans Arabic', 'Arial Narrow', Arial, sans-serif";
const BODY =
  "'Hanken Grotesk', 'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Telugu', 'Noto Sans Arabic', 'Helvetica Neue', Arial, sans-serif";
const wdth = (w: number) => `'wdth' ${w}`;
const wrap = 'mx-auto w-full max-w-[1280px] px-5 sm:px-8 md:px-10';

/* ------------------------------------------------------------------ */
/* Content (text lives in locales/*.json; brand names stay as-is)      */
/* ------------------------------------------------------------------ */
const email = 'guravana22@gmail.com';
const linkedin = 'https://www.linkedin.com/in/santosh-guravana-8a8a5828b/';

const featured = [
  { key: 'trustinQatar', image: trustinQatar, title: 'TrustIn Qatar', tag: 'React, react-intl', link: 'https://trustin.qa/' },
  { key: 'trustin', image: trustin, title: 'Trustin', tag: 'Webflow', link: 'https://www.trustin.ae/' },
  { key: 'tTherapy', image: tTherapy, title: 'T-Therapy', tag: 'React, Motion, react-intl', link: 'https://t-therapyswiss.com/' },
  { key: 'fahad', image: fat, title: 'Fahad Al Tamimi Law Firm', tag: 'React, Motion', link: 'https://www.tamimilawfirm.com/' },
  { key: 'erpforce', image: erpforce, title: 'ERPForce', tag: 'Next.js, next-intl', link: 'https://erpforce.ai/' },
  { key: 'aaks', image: aaks, title: 'AAKS & BROS Turbo Machinery', tag: 'React, Motion', link: 'https://abturbomachinery.com/' },
];

const more = [
  { image: fatlanding, title: 'Al-Tamimi Law Firm: Landing Page', tag: 'React, Motion', link: 'https://www.tamimilawfirm.com/welcome' },
  { image: yaswash, title: 'YasWash', tag: 'React', link: 'https://yaswash.com/' },
  { image: ondemandlabs, title: 'Ondemandlabs', tag: 'React', link: 'https://ondemandlabs.com/' },
  { image: weforce, title: 'WEForce', tag: 'Next.js', link: 'https://weforce.co/' },
  { image: quantasec, title: 'QuantaSec', tag: 'HTML, JavaScript', link: 'https://www.quantasec.ae/' },
  { image: retrofit, title: 'Retrofit Turbine Parts Trading', tag: 'HTML, JavaScript', link: 'https://www.retrofitturbineparts.com/' },
];

const skills = [
  { icon: react, name: 'React.js', level: 'expert', pct: 95 },
  { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/960px-Typescript_logo_2020.svg.png', name: 'TypeScript', level: 'advanced', pct: 80 },
  { icon: tailwind, name: 'Tailwind CSS', level: 'expert', pct: 95 },
  { icon: nodejs, name: 'Node.js', level: 'advanced', pct: 75 },
];

const services = ['react', 'responsive', 'performance', 'api'];

const stats = [
  { value: 3, suffix: '+', key: 'years' },
  { value: 12, suffix: '', key: 'sites' },
  { value: 4, suffix: '', key: 'countries' },
];

const experience = [
  { key: 'trustin', company: 'Trustin', link: 'https://www.trustin.ae/' },
  { key: 'headrun', company: 'Headrun Technologies', link: 'https://headrun.com/' },
];

const education = [
  { key: 'mca', school: 'Dr. B.R. Ambedkar University', years: '2018 – 2020' },
  { key: 'bsc', school: 'Sri G.C.S.R Degree College', years: '2014 – 2017' },
];

const tech = ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Node.js', 'Strapi', 'Webflow', 'Figma', 'Motion', 'Vite', 'Git', 'SEO'];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function HeroRow({ children }: { children: ReactNode }) {
  return (
    <span data-hero-row className="block">
      <span className="block overflow-hidden pb-[0.06em]">
        <span data-hero-line className="block">{children}</span>
      </span>
    </span>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2
      data-heading
      className="overflow-hidden pb-[0.1em] text-[clamp(2.4rem,7vw,5rem)] font-bold leading-[1] tracking-[-0.02em]"
      style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}
    >
      <span className="block">{children}</span>
    </h2>
  );
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scroll-scrubbed statement. Re-creates its animation whenever the text (language) changes. */
function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-word]'),
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 55%', scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [text]);

  return (
    <p
      ref={ref}
      data-statement
      className="max-w-[62rem] text-[clamp(1.7rem,4.6vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.015em]"
      style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(90) }}
    >
      {text.split(' ').map((w, i) => (
        <span key={`${i}-${w}`} data-word className="me-[0.25em] inline-block">{w}</span>
      ))}
    </p>
  );
}

/** Count-up number. React renders no children, so GSAP can own the text safely. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const state = { v: 0 };
    el.textContent = `0${suffix}`;
    const ctx = gsap.context(() => {
      gsap.to(state, {
        v: value,
        duration: 1.6,
        ease: 'power2.out',
        snap: { v: 1 },
        onUpdate: () => {
          el.textContent = `${state.v}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <div
      ref={ref}
      className="text-[clamp(2rem,4vw,3rem)] font-bold leading-none text-[var(--accent)]"
      style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}
    />
  );
}

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ------------------------------------------------------------------ */
/* Root: owns the locale and provides react-intl                       */
/* ------------------------------------------------------------------ */
export default function App() {
  const [locale, setLocale] = useState<LocaleCode>(getInitialLocale);

  // Keep <html lang> and <html dir> in sync (dir flips the whole layout for Arabic)
  useLayoutEffect(() => {
    const meta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
    saveLocale(locale);
  }, [locale]);

  return (
    // "-u-nu-latn" keeps Western digits (2024, 12:30) in every language, matching the counters
    <IntlProvider locale={`${locale}-u-nu-latn`} defaultLocale="en" messages={MESSAGES[locale]}>
      <Portfolio locale={locale} onLocaleChange={setLocale} />
    </IntlProvider>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
function Portfolio({ locale, onLocaleChange }: { locale: LocaleCode; onLocaleChange: (c: LocaleCode) => void }) {
  const intl = useIntl();
  const t = (id: string, values?: Record<string, string | number>) => intl.formatMessage({ id }, values);

  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const rootRef = useRef<HTMLDivElement>(null);
  const now = useNow();
  const isDark = theme === 'dark';
  const isComplex = COMPLEX_SCRIPTS.includes(locale);

  const time = intl.formatTime(now, { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  const fullName = `${t('hero.first')} ${t('hero.last')}`;

  /* ---------------- GSAP: animations that don't depend on text ---------------- */
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(root);
    const setWidth = (els: Element[], w: number) =>
      els.forEach((el) => ((el as HTMLElement).style.fontVariationSettings = wdth(w)));

    // Reduced motion: no loader, everything static
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(q('[data-loader]'), { display: 'none' });
    });

    // Cursor label over project cards (mouse devices only)
    mm.add('(hover: hover) and (pointer: fine)', () => {
      const cur = q('[data-cursor]')[0] as HTMLElement;
      if (!cur) return;
      gsap.set(cur, { scale: 0 });
      const qx = gsap.quickTo(cur, 'x', { duration: 0.4, ease: 'power3' });
      const qy = gsap.quickTo(cur, 'y', { duration: 0.4, ease: 'power3' });
      let active = false;
      const onMove = (e: MouseEvent) => {
        qx(e.clientX);
        qy(e.clientY);
        const over = !!(e.target as Element).closest('[data-cursor-open]');
        if (over !== active) {
          active = over;
          gsap.to(cur, { scale: over ? 1 : 0, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
        }
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const html = document.documentElement;
      html.style.overflow = 'hidden'; // lock scroll while the loader runs

      const heroTitles = q('[data-hero-line]');
      setWidth(heroTitles, 40);

      /* ---------- Preloader → hero intro ---------- */
      const counter = { v: 0 };
      const num = q('[data-loader-num]')[0];
      const heroW = { w: 40 };

      gsap
        .timeline({
          onComplete: () => {
            html.style.overflow = '';
            ScrollTrigger.refresh();
          },
        })
        .to(counter, {
          v: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v));
          },
        })
        .to(q('[data-loader-inner]'), { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' })
        .to(q('[data-loader]'), { yPercent: -100, duration: 1, ease: 'expo.inOut' })
        .from(q('[data-hero-line]'), { yPercent: 115, duration: 1.2, ease: 'expo.out', stagger: 0.12 }, '-=0.45')
        .to(
          heroW,
          { w: 100, duration: 1.6, ease: 'expo.out', onUpdate: () => setWidth(heroTitles, heroW.w) },
          '<',
        )
        .from(q('[data-hero-photo]'), { scale: 0.6, opacity: 0, rotate: -8, duration: 1, ease: 'back.out(1.5)' }, '-=1.1')
        .from(q('[data-hero-sub]'), { y: 24, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1 }, '-=1');

      /* ---------- Scroll progress + nav ---------- */
      gsap.fromTo(
        q('[data-progress]'),
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: html, start: 'top top', end: 'bottom bottom', scrub: 0.3 } },
      );

      const nav = q('[data-nav]')[0];
      let navHidden = false;
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 200;
          if (hide === navHidden) return;
          navHidden = hide;
          gsap.to(nav, { yPercent: hide ? -160 : 0, duration: 0.45, ease: 'power3.out' });
        },
      });

      /* ---------- Hero: lines drift apart on scroll ---------- */
      const rows = q('[data-hero-row]');
      gsap.to(rows[0], { xPercent: -6, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to(rows[1], { xPercent: 6, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to(q('[data-hero-bottom]'), {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: '#top', start: '60% top', end: 'bottom top', scrub: true },
      });

      /* ---------- Section headings ---------- */
      q('[data-heading]').forEach((el) => {
        gsap.from(el.firstElementChild, {
          yPercent: 115,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      /* ---------- Stacking project cards ---------- */
      const wraps = q('[data-stack-wrap]');
      wraps.forEach((w, i) => {
        const card = w.querySelector('[data-stack-card]');
        const img = w.querySelector('[data-stack-img]');
        const next = wraps[i + 1];

        gsap.fromTo(
          img,
          { scale: 1.18 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'top 25%', scrub: true } },
        );

        if (next) {
          gsap.to(card, {
            scale: 0.93,
            filter: 'brightness(0.5)',
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top 90%', end: 'top 22%', scrub: true },
          });
        }
      });

      /* ---------- Fade-ups, rows ---------- */
      const fades = q('[data-fade]');
      gsap.set(fades, { opacity: 0, y: 28 });
      ScrollTrigger.batch(fades, {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, overwrite: true }),
      });

      const listRows = q('[data-row]');
      gsap.set(listRows, { opacity: 0, y: 36 });
      ScrollTrigger.batch(listRows, {
        start: 'top 92%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      });

      gsap.fromTo(
        q('[data-bar]'),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.3, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '[data-skills]', start: 'top 85%', once: true } },
      );

      /* ---------- Marquee: speed and direction follow scroll ---------- */
      const track = q('[data-marquee-track]')[0];
      const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 45, repeat: -1 });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
          gsap.to(loop, {
            timeScale: boost * self.direction,
            duration: 0.25,
            overwrite: true,
            onComplete: () => {
              gsap.to(loop, { timeScale: self.direction, duration: 1.2, ease: 'power2.out' });
            },
          });
        },
      });

      /* ---------- Contact panel + wordmark ---------- */
      gsap.fromTo(
        q('[data-panel]'),
        { scale: 0.9, borderRadius: 72 },
        { scale: 1, borderRadius: 40, ease: 'none', scrollTrigger: { trigger: '[data-panel]', start: 'top bottom', end: 'top 35%', scrub: true } },
      );

      const mark = q('[data-wordmark]');
      const markW = { w: 50 };
      gsap.to(markW, {
        w: 100,
        ease: 'none',
        onUpdate: () => setWidth(mark, markW.w),
        scrollTrigger: { trigger: '[data-footer]', start: 'top bottom', end: 'bottom bottom', scrub: true },
      });

      return () => {
        html.style.overflow = '';
      };
    });

    // Fonts for a newly chosen script load lazily: re-measure when they finish
    const onFontsDone = () => ScrollTrigger.refresh();
    document.fonts?.addEventListener('loadingdone', onFontsDone);
    document.fonts?.ready.then(onFontsDone);

    return () => {
      document.fonts?.removeEventListener('loadingdone', onFontsDone);
      mm.revert();
    };
  }, []);

  // Text length changes with language, so re-measure all trigger positions
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [locale]);

  const navLinks = [
    [t('nav.work'), '#work'],
    [t('nav.about'), '#about'],
    [t('nav.contact'), '#contact'],
  ];

  return (
    <div
      ref={rootRef}
      data-script={isComplex ? 'complex' : 'latin'}
      data-locale={locale}
      style={{ ...(THEMES[theme] as CSSProperties), fontFamily: BODY }}
      className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--fg)] transition-colors duration-500"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,100..900&family=Hanken+Grotesk:wght@400;500;600&family=Noto+Sans:wght@400..800&family=Noto+Sans+Telugu:wght@400..800&family=Noto+Sans+Devanagari:wght@400..800&family=Noto+Sans+Arabic:wght@400..800&display=swap');
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
        a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 8px; }
        .outline-text { color: transparent; -webkit-text-stroke: 1.5px var(--fg); }
        .grain { background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }

        /* Hindi, Telugu and Arabic: tall glyphs and joined letters need room and no negative tracking */
        [data-script="complex"] * { letter-spacing: normal !important; }
        [data-script="complex"] [data-hero-title],
        [data-script="complex"] [data-heading] { line-height: 1.3 !important; }
        [data-script="complex"] [data-statement] { line-height: 1.4 !important; }
        [data-script="complex"] h3 { line-height: 1.25 !important; }
        [data-script="complex"] [data-wordmark] { line-height: 1.3 !important; }

        /* Greek capitals are wider than Latin: scale the big name type down so it fits */
        [data-locale="el"] [data-hero-title] { font-size: clamp(2.4rem, 11vw, 8.5rem) !important; }
        [data-locale="el"] [data-wordmark] { font-size: 5.6vw !important; }
        [data-script="complex"] [data-contact-title] { max-width: 100% !important; font-size: clamp(2.2rem, 7vw, 5.5rem) !important; line-height: 1.2 !important; }
      `}</style>

      {/* Grain overlay */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.05]" />

      {/* Preloader */}
      <div data-loader className="fixed inset-0 z-[100] bg-[var(--bg)]">
        <div data-loader-inner className="flex h-full flex-col justify-between p-6 sm:p-10">
          <span className="text-[15px] text-[var(--muted)]">{t('loader.tagline')}</span>
          <span
            data-loader-num
            dir="ltr"
            className="self-end text-[clamp(6rem,26vw,20rem)] font-bold leading-[0.8] text-[var(--accent)]"
            style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}
          >
            0
          </span>
        </div>
      </div>

      {/* Cursor label */}
      <div
        data-cursor
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-10 -mt-10 hidden h-20 w-20 place-items-center rounded-full bg-[var(--accent)] text-[14px] font-semibold text-[var(--on-accent)] md:pointer-fine:grid"
        style={{ transform: 'scale(0)' }}
      >
        {t('work.open')}
      </div>

      {/* Scroll progress */}
      <div data-progress className="fixed start-0 top-0 z-[60] h-[3px] w-full origin-left bg-[var(--accent)] rtl:origin-right" style={{ transform: 'scaleX(0)' }} />

      {/* Floating pill nav */}
      <header data-nav className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:px-4">
        <nav className="pointer-events-auto flex max-w-full items-center gap-0.5 rounded-full border border-[var(--line)] bg-[var(--raise)]/70 p-1.5 backdrop-blur-xl sm:gap-1">
          <a
            href="#top"
            aria-label={t('nav.top')}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[13px] font-bold text-[var(--on-accent)]"
            style={{ fontFamily: DISPLAY }}
          >
            SG
          </a>
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] text-[var(--muted)] transition-colors hover:bg-[var(--line)] hover:text-[var(--fg)] sm:px-4 sm:text-[14px]"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? t('nav.toLight') : t('nav.toDark')}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors hover:bg-[var(--line)]"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </header>

      {/* Language switcher: fixed on the right edge, vertically centred */}
      <LanguageSwitcher locale={locale} onChange={onLocaleChange} label={t('nav.language')} />

      {/* Hero */}
      <section id="top" className="flex min-h-[100svh] flex-col justify-between pb-8 pt-28 sm:pb-10">
        <div className={`${wrap} flex flex-1 items-center`}>
          <h1
            data-hero-title
            className="w-full text-[clamp(3rem,14.5vw,11rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]"
            style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}
          >
            <HeroRow>{t('hero.first')}</HeroRow>
            <HeroRow>{t('hero.last')}</HeroRow>
          </h1>
        </div>

        <div data-hero-bottom className={`${wrap} mt-10`}>
          <div className="flex flex-col gap-8 border-t border-[var(--line)] pt-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-4 sm:gap-5">
              <a
                data-hero-photo
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('hero.photoLabel')}
                className="block h-28 w-20 shrink-0 overflow-hidden rounded-t-full rounded-b-2xl border border-[var(--line)] bg-[var(--raise)] sm:h-36 sm:w-28"
              >
                <ImageWithFallback src={profile} alt={fullName} className="h-full w-full object-cover object-[50%_20%]" />
              </a>
              <p data-hero-sub className="max-w-[26rem] text-[16px] leading-relaxed sm:text-[18px]">
                {t('hero.intro')}
              </p>
            </div>

            <div data-hero-sub className="flex flex-col gap-5 md:items-end">
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="rounded-full bg-[var(--accent)] px-6 py-3.5 text-[15px] font-semibold text-[var(--on-accent)] transition-transform hover:scale-[1.04]">
                  {t('hero.ctaPrimary')}
                </a>
                <a href="#work" className="rounded-full border border-[var(--line)] px-6 py-3.5 text-[15px] font-semibold transition-colors hover:bg-[var(--raise)]">
                  {t('hero.ctaSecondary')}
                </a>
              </div>
              <p className="flex items-center gap-2 text-[14px] text-[var(--muted)]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                {t('hero.location', { time })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className={wrap}>
          <Statement text={t('statement.text')} />
        </div>
      </section>

      {/* Work: stacking cards */}
      <section id="work" className="scroll-mt-4 pb-10 pt-6 sm:pt-10">
        <div className={wrap}>
          <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <Heading>{t('work.title')}</Heading>
            <p data-fade className="max-w-[22rem] text-[15px] text-[var(--muted)]">
              {t('work.subtitle')}
            </p>
          </div>

          <div>
            {featured.map((p, i) => (
              <div
                key={p.key}
                data-stack-wrap
                className={`sticky ${i === featured.length - 1 ? '' : 'mb-[10vh] md:mb-[14vh]'}`}
                style={{ top: `calc(5.5rem + ${i * 14}px)` }}
              >
                <a
                  data-stack-card
                  data-cursor-open
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid origin-top gap-5 rounded-[28px] border border-[var(--line)] bg-[var(--raise)] p-4 sm:p-5 md:h-[500px] md:grid-cols-[0.85fr_1.15fr] md:gap-10 md:p-8 md:pointer-fine:cursor-none"
                >
                  <div className="order-2 flex flex-col justify-between gap-6 md:order-1 md:py-1">
                    <div>
                      <div className="mb-4 flex flex-wrap gap-2" dir="ltr">
                        {p.tag.split(', ').map((tag) => (
                          <span key={tag} className="rounded-full border border-[var(--line)] px-3 py-1 text-[13px] text-[var(--muted)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3
                        dir="auto"
                        className="text-[clamp(1.8rem,4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.02em]"
                        style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}
                      >
                        {p.title}
                      </h3>
                      <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-[var(--muted)]">{t(`projects.${p.key}`)}</p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--fg)] px-5 py-3 text-[14px] font-semibold text-[var(--bg)] transition-transform group-hover:scale-[1.04]">
                      {t('work.visit')} <ArrowUpRight size={16} />
                    </span>
                  </div>

                  <div className="order-1 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg)] md:order-2 md:aspect-auto md:h-full">
                    <div data-stack-img className="h-full w-full">
                      <ImageWithFallback src={p.image} alt={t('work.siteAlt', { title: p.title })} className="h-full w-full object-cover object-top" />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More work */}
      <section className="py-14 sm:py-20">
        <div className={wrap}>
          <div className="mb-6 sm:mb-8">
            <Heading>{t('more.title')}</Heading>
          </div>
          <div className="border-t border-[var(--line)]">
            {more.map((p) => (
              <a
                key={p.title}
                data-row
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-b border-[var(--line)] py-4 transition-colors hover:bg-[var(--raise)] sm:gap-6 sm:px-3 sm:py-5"
              >
                <div className="h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border border-[var(--line)] sm:h-14 sm:w-24">
                  <ImageWithFallback src={p.image} alt="" className="h-full w-full object-cover object-top" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    dir="auto"
                    className="text-[clamp(1.1rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.01em] transition-transform duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2"
                    style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-[var(--muted)] sm:hidden" dir="ltr">{p.tag}</p>
                </div>
                <span className="hidden shrink-0 text-[14px] text-[var(--muted)] sm:block" dir="ltr">{p.tag}</span>
                <ArrowUpRight size={22} className="shrink-0 text-[var(--muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee (always left-to-right so the loop stays seamless in Arabic too) */}
      <section dir="ltr" className="overflow-hidden border-y border-[var(--line)] py-5 sm:py-7" aria-label={t('marquee.label')}>
        <div data-marquee-track className="flex w-max items-center gap-8 whitespace-nowrap sm:gap-12">
          {[...tech, ...tech].map((name, i) => (
            <span key={i} className="flex items-center gap-8 sm:gap-12">
              <span
                className={`text-[clamp(2.2rem,6vw,5rem)] font-extrabold uppercase tracking-[-0.01em] ${i % 2 === 0 ? 'outline-text' : ''}`}
                style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}
              >
                {name}
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            </span>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-4 py-14 sm:py-20 md:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-16`}>
          {/* Left: sticky intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Heading>{t('about.title')}</Heading>
            <p data-fade className="mt-5 max-w-[26rem] text-[16px] leading-relaxed text-[var(--muted)]">
              {t('about.intro')}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-6">
              {stats.map((s) => (
                <div key={s.key}>
                  <Counter value={s.value} suffix={s.suffix} />
                  <div className="mt-2 text-[13px] leading-snug text-[var(--muted)]">{t(`stats.${s.key}`)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: details */}
          <div className="space-y-14">
            <div data-fade>
              <h3 className="mb-5 text-[24px] font-bold" style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}>{t('experience.title')}</h3>
              <ul className="border-t border-[var(--line)]">
                {experience.map((e) => (
                  <li key={e.key} className="grid gap-2 border-b border-[var(--line)] py-6 md:grid-cols-[10rem_1fr] md:gap-8">
                    <div className="text-[14px] text-[var(--muted)]">{t(`experience.${e.key}.years`)}</div>
                    <div>
                      <div className="text-[18px] font-semibold">{t(`experience.${e.key}.role`)}</div>
                      <a href={e.link} target="_blank" rel="noopener noreferrer" className="text-[15px] text-[var(--accent)] hover:underline">
                        {e.company}
                      </a>
                      <p className="mt-3 max-w-[38rem] text-[15px] leading-relaxed text-[var(--muted)]">{t(`experience.${e.key}.note`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div data-fade>
              <h3 className="mb-5 text-[24px] font-bold" style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}>{t('education.title')}</h3>
              <ul className="border-t border-[var(--line)]">
                {education.map((e) => (
                  <li key={e.key} className="grid gap-2 border-b border-[var(--line)] py-5 md:grid-cols-[10rem_1fr] md:gap-8">
                    <div className="text-[14px] text-[var(--muted)]">{e.years}</div>
                    <div>
                      <div className="text-[17px] font-semibold">{t(`education.${e.key}.degree`)}</div>
                      <div className="text-[15px] text-[var(--muted)]">{e.school}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div data-fade data-skills>
              <h3 className="mb-5 text-[24px] font-bold" style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}>{t('skills.title')}</h3>
              <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {skills.map((s) => (
                  <li key={s.name}>
                    <div className="mb-2 flex items-center gap-3">
                      <img src={s.icon} alt="" className="h-6 w-6 shrink-0 object-contain" />
                      <span className="flex-1 text-[16px] font-medium">{s.name}</span>
                      <span className="text-[13px] text-[var(--muted)]">{t(`skills.${s.level}`)}</span>
                    </div>
                    <div className="h-[3px] w-full overflow-hidden rounded-full bg-[var(--line)]">
                      <div data-bar className="h-full origin-left rounded-full bg-[var(--accent)] rtl:origin-right" style={{ width: `${s.pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div data-fade>
              <h3 className="mb-5 text-[24px] font-bold" style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}>{t('services.title')}</h3>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {services.map((key) => (
                  <li key={key} className="border-t border-[var(--line)] py-5">
                    <div className="text-[17px] font-semibold">{t(`services.${key}.title`)}</div>
                    <div className="mt-1 text-[14px] leading-relaxed text-[var(--muted)]">{t(`services.${key}.desc`)}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-4 px-3 pb-6 pt-8 sm:px-5 md:pt-14">
        <div
          data-panel
          className="mx-auto max-w-[1360px] rounded-[40px] bg-[var(--accent)] p-7 text-[var(--on-accent)] sm:p-12 md:p-16"
        >
          <h2
            data-contact-title
            className="max-w-[16ch] text-[clamp(2.6rem,9vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.02em]"
            style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}
          >
            {t('contact.title')}
          </h2>

          <a
            href={`mailto:${email}`}
            dir="ltr"
            className="group mt-10 inline-flex max-w-full items-center gap-3 rounded-full bg-[var(--on-accent)] px-6 py-4 text-[clamp(1rem,3.8vw,1.6rem)] font-semibold text-[var(--accent)] transition-transform hover:scale-[1.02] sm:mt-14 sm:px-8 sm:py-5"
          >
            <span className="break-all">{email}</span>
            <ArrowUpRight className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <div className="mt-10 flex flex-col gap-3 border-t border-[var(--on-accent)]/25 pt-6 text-[15px] sm:mt-14 md:flex-row md:flex-wrap md:gap-x-10">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <Linkedin size={17} /> {t('contact.linkedin')}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2 hover:underline">
              <Mail size={17} /> {t('contact.email')}
            </a>
            <span className="flex items-center gap-2 opacity-80">
              <MapPin size={17} /> {t('contact.location')}
            </span>
          </div>
        </div>
      </section>

      {/* Footer wordmark */}
      <footer data-footer className="overflow-hidden px-5 pb-6 pt-10 sm:px-8">
        <div
          data-wordmark
          aria-hidden
          className="whitespace-nowrap text-center text-[7.4vw] font-extrabold uppercase leading-[0.9] tracking-[-0.01em] text-[var(--fg)] opacity-[0.14]"
          style={{ fontFamily: DISPLAY, fontVariationSettings: wdth(100) }}
        >
          {fullName}
        </div>
        <p className="mt-4 text-center text-[13px] text-[var(--muted)]">
          {t('footer.copyright', { year: String(new Date().getFullYear()), name: fullName })}
        </p>
      </footer>
    </div>
  );
}