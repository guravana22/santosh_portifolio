import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { LOCALES, type LocaleCode } from '../app/lib/i18n';

/* ------------------------------------------------------------------ */
/* Inline SVG flags (emoji flags don't render on Windows)              */
/* ------------------------------------------------------------------ */
const IndiaFlag = (
  <>
    <rect width="60" height="40" fill="#fff" />
    <rect width="60" height="13.4" fill="#FF9933" />
    <rect y="26.6" width="60" height="13.4" fill="#138808" />
    <circle cx="30" cy="20" r="5" fill="none" stroke="#000080" strokeWidth="1.4" />
    <circle cx="30" cy="20" r="1" fill="#000080" />
  </>
);

const FLAGS: Record<LocaleCode, ReactNode> = {
  en: (
    <>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
    </>
  ),
  hi: IndiaFlag,
  te: IndiaFlag,
  ar: (
    <>
      <rect width="60" height="40" fill="#fff" />
      <rect x="15" width="45" height="13.4" fill="#00732F" />
      <rect x="15" y="26.6" width="45" height="13.4" fill="#000" />
      <rect width="15" height="40" fill="#FF0000" />
    </>
  ),
  it: (
    <>
      <rect width="60" height="40" fill="#fff" />
      <rect width="20" height="40" fill="#009246" />
      <rect x="40" width="20" height="40" fill="#CE2B37" />
    </>
  ),
  el: (
    <>
      <rect width="60" height="40" fill="#0D5EAF" />
      <g fill="#fff">
        <rect y="4.44" width="60" height="4.44" />
        <rect y="13.33" width="60" height="4.44" />
        <rect y="22.22" width="60" height="4.44" />
        <rect y="31.11" width="60" height="4.44" />
      </g>
      <rect width="22.22" height="22.22" fill="#0D5EAF" />
      <rect x="8.89" width="4.44" height="22.22" fill="#fff" />
      <rect y="8.89" width="22.22" height="4.44" fill="#fff" />
    </>
  ),
};

function Flag({ code }: { code: LocaleCode }) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden className="h-4 w-6 shrink-0 rounded-[3px] ring-1 ring-black/15">
      {FLAGS[code]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Switcher: fixed to the right edge, vertically centred               */
/* ------------------------------------------------------------------ */
interface Props {
  locale: LocaleCode;
  onChange: (code: LocaleCode) => void;
  label: string;
}

export default function LanguageSwitcher({ locale, onChange, label }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    // "right-0" is physical on purpose: the switcher stays on the right edge in Arabic (RTL) too
    <div ref={ref} className="fixed right-0 top-1/2 z-[65] -translate-y-1/2">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-11 items-center gap-2 rounded-l-2xl border border-r-0 border-[var(--line)] bg-[var(--raise)]/80 pl-3 pr-2.5 text-[13px] font-semibold shadow-lg backdrop-blur-xl transition-colors hover:bg-[var(--raise)] sm:gap-2.5 sm:pl-3.5 sm:pr-3 cursor-pointer"
      >
        <Flag code={current.code} />
        <span className="hidden sm:inline">{current.short}</span>
        <ChevronDown size={15} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <ul
        role="menu"
        className={`absolute right-2 top-[calc(100%+8px)] max-h-[min(24rem,45vh)] w-[13rem] origin-top-right overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--raise)] p-1.5 shadow-2xl transition-all duration-200 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        {LOCALES.map((l) => {
          const active = l.code === locale;
          return (
            <li key={l.code} role="none">
              <button
                role="menuitemradio"
                aria-checked={active}
                lang={l.code}
                onClick={() => {
                  onChange(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-[15px] transition-colors ${
                  active ? 'bg-[var(--accent)]/15 font-semibold text-[var(--accent)]' : 'hover:bg-[var(--line)]'
                }`}
              >
                <Flag code={l.code} />
                <span className="flex-1">{l.label}</span>
                {active && <Check size={16} />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}