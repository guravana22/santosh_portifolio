import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A boy flying on a rocket through the whole page, driven by scroll.
 *
 *  - Desktop only (hidden below the `lg` breakpoint).
 *  - After the page loader he flies in from the left edge.
 *  - As you scroll, he follows a weaving path from the top of the page to the footer.
 *    Scroll down and he flies forward along the path; scroll up and he flies back.
 *  - He banks along the path, turns around at each turn, and the flame grows and a smoke
 *    trail appears when you scroll fast. While you are not scrolling he hovers and bobs.
 *
 * Place it once inside the app's root <div> (so it inherits the theme variables).
 * It ignores the pointer, sits below the nav and language switcher, and is hidden
 * for visitors who prefer reduced motion.
 */

const TAU = Math.PI * 2;

/* The flight path, as fractions of the viewport, over page progress p (0 = top, 1 = bottom) */
// Reversed sign so the rocket noses LEFT first (dx < 0 at p = 0).
const pathX = (p: number) => 0.5 - 0.36 * Math.sin(p * TAU * 2.4 + 0.6); // weaves left and right
const pathY = (p: number) => 0.2 + 0.62 * p + 0.05 * Math.sin(p * TAU * 5); // drifts down the screen

export default function RocketBoy() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(root, { display: 'none' });
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const outer = q('[data-r-outer]')[0] as HTMLElement;
      const floater = q('[data-r-float]')[0];
      const flame = q('[data-r-flame]')[0];
      const puffs = q('[data-r-puff]') as HTMLElement[];

      gsap.set(flame, { svgOrigin: '54 128' }); // flame grows backwards from the nozzle
      gsap.set(outer, { transformOrigin: '50% 50%', opacity: 0 });

      // Live state
      const S = { introX: 0, boost: 1 };
      let p = 0;
      let dir = 1; // 1 = scrolling down, -1 = up
      let facing = -1; // 1 = nose right, -1 = nose left (start LEFT)

      const xTo = gsap.quickTo(outer, 'x', { duration: 0.9, ease: 'power3' });
      const yTo = gsap.quickTo(outer, 'y', { duration: 0.9, ease: 'power3' });
      const rotTo = gsap.quickTo(outer, 'rotation', { duration: 0.7, ease: 'power3' });
      const flipTo = gsap.quickTo(outer, 'scaleX', { duration: 0.45, ease: 'power2.inOut' });

      /* Work out where the rocket should be for the current scroll progress */
      const place = (instant = false) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const W = outer.offsetWidth;
        const H = outer.offsetHeight;
        const e = 0.003;

        // Direction of travel along the path (reversed when scrolling up)
        const dx = (pathX(p + e) - pathX(p - e)) * vw * dir;
        const dy = (pathY(p + e) - pathY(p - e)) * vh * dir;
        if (Math.abs(dx) > 0.6) facing = dx > 0 ? 1 : -1;

        // Nose follows the path; when mirrored the angle flips sign
        const a = facing === 1 ? Math.atan2(dy, dx) : -Math.atan2(dy, -dx);
        const deg = gsap.utils.clamp(-35, 35, (a * 180) / Math.PI);

        const x = pathX(p) * vw - W / 2 + S.introX;
        const y = pathY(p) * vh - H / 2;

        if (instant) gsap.set(outer, { x, y, rotation: deg, scaleX: facing });
        else {
          xTo(x);
          yTo(y);
          rotTo(deg);
          flipTo(facing);
        }
      };

      // Start off-screen to the left, hidden until the loader has finished
      S.introX = -(window.innerWidth + 400);
      place(true);

      gsap
        .timeline({ delay: 2.9 })
        .set(outer, { opacity: 1 })
        .to(S, { introX: 0, duration: 2.8, ease: 'power2.out', onUpdate: () => place() }, 0)
        .to(S, { boost: 0, duration: 1.2, ease: 'power1.out' }, 1.8);

      /* Scroll progress drives the flight */
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          p = self.progress;
          dir = self.direction || dir;
          place();
        },
        onRefresh: (self) => {
          p = self.progress;
          place(true);
        },
      });

      /* Hover and engine flicker */
      gsap.to(floater, { y: -7, rotation: 1.4, duration: 1.3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to(flame, { scaleY: 0.8, duration: 0.07, yoyo: true, repeat: -1, ease: 'none' });

      /* Flame length and smoke trail follow scroll speed */
      const setFlame = gsap.quickSetter(flame, 'scaleX');
      let lastScroll = window.scrollY;
      let vel = 0;
      let spawnIndex = 0;
      let lastPx = 0;
      let lastPy = 0;

      const tick = (_t: number, dt: number) => {
        const sy = window.scrollY;
        const inst = (Math.abs(sy - lastScroll) / Math.max(dt, 1)) * 1000; // px per second
        lastScroll = sy;
        vel += (inst - vel) * 0.1;
        const k = Math.max(gsap.utils.clamp(0, 1, vel / 1200), S.boost);
        setFlame(1 + k * 1.4);

        if (k < 0.12) return;
        const W = outer.offsetWidth;
        const H = outer.offsetHeight;
        const cx = (gsap.getProperty(outer, 'x') as number) + W / 2;
        const cy = (gsap.getProperty(outer, 'y') as number) + H / 2;
        if (Math.hypot(cx - lastPx, cy - lastPy) < 26) return;
        lastPx = cx;
        lastPy = cy;

        // Smoke leaves from the tail: offset along the (rotated, mirrored) rocket body
        const f = gsap.getProperty(outer, 'scaleX') as number;
        const rot = ((gsap.getProperty(outer, 'rotation') as number) * Math.PI) / 180;
        const back = -0.4 * W * Math.sign(f || 1);
        const tx = cx + back * Math.cos(rot);
        const ty = cy + back * Math.sin(rot) + 0.04 * W;

        const puff = puffs[spawnIndex++ % puffs.length];
        gsap.killTweensOf(puff);
        gsap.fromTo(
          puff,
          { x: tx - 7, y: ty - 7, scale: 0.5, opacity: 0.55 },
          { scale: 1.9, opacity: 0, y: ty - 7 + 14, duration: 1.1, ease: 'power1.out' },
        );
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} aria-hidden dir="ltr" className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* Smoke puffs (pooled) — desktop only too, so nothing renders on mobile */}
      <div className="hidden lg:block">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            data-r-puff
            className="absolute left-0 top-0 block h-4 w-4 rounded-full bg-[var(--muted)] opacity-0"
          />
        ))}

        <div
          data-r-outer
          className="absolute left-0 top-0 w-[16rem]"
          style={{ willChange: 'transform' }}
        >
          <div data-r-float>
            <svg
              viewBox="0 0 300 200"
              className="block h-auto w-full overflow-visible"
              style={{ filter: 'drop-shadow(0 18px 14px rgba(0,0,0,0.22))' }}
            >
              <defs>
                <linearGradient id="rk-body" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FF4D4F" />
                  <stop offset=".55" stopColor="#E5232B" />
                  <stop offset="1" stopColor="#B3141E" />
                </linearGradient>
                <linearGradient id="rk-flame" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0" stopColor="#FFE15A" />
                  <stop offset=".5" stopColor="#FF9F1C" />
                  <stop offset="1" stopColor="#FF5A1F" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* flame */}
              <g data-r-flame>
                <path d="M54 118 Q22 104 -22 126 Q22 150 54 138 Q46 128 54 118Z" fill="url(#rk-flame)" />
                <path d="M54 124 Q30 118 6 128 Q30 140 54 134Z" fill="#FFF3B0" opacity=".9" />
              </g>

              {/* far leg (behind the rocket) */}
              <path d="M132 108 L126 134 L128 166" stroke="#2C4F8E" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M120 164 L140 164 L144 174 L120 174Z" fill="#2B2B33" />

              {/* fins */}
              <path d="M66 118 L36 92 L84 108Z" fill="#23232B" />
              <path d="M66 140 L38 168 L86 152Z" fill="#23232B" />

              {/* rocket body */}
              <path d="M58 130 C58 112 100 106 150 106 L226 108 C258 110 280 122 290 133 C272 144 250 152 222 154 L150 156 C100 156 58 148 58 130Z" fill="url(#rk-body)" />
              <path d="M70 118 C95 112 130 111 170 111 L226 113 C240 114 252 118 262 123 C240 118 200 117 150 117 C110 117 85 119 70 118Z" fill="#fff" opacity=".28" />
              <path d="M205 107 L219 108 Q224 131 219 154 L205 155 Q210 131 205 107Z" fill="#fff" />
              <path d="M236 109 Q268 114 290 133 Q262 140 236 143 Q244 126 236 109Z" fill="#C41822" />
              <rect x="44" y="121" width="16" height="18" rx="3" fill="#FFC21A" />

              {/* near leg */}
              <path d="M142 108 L154 136 L148 168" stroke="#3F6EB5" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M138 166 L160 166 L166 176 L138 176Z" fill="#33333D" />

              {/* backpack */}
              <path d="M112 68 Q102 68 102 82 L106 108 Q122 112 134 102 L138 76 Q132 66 112 68Z" fill="#F5A04A" />
              <path d="M112 68 Q102 68 102 82 L106 108 Q114 110 120 109 L116 70Z" fill="#E08A33" />
              <path d="M120 76 Q132 82 136 98" stroke="#C97722" strokeWidth="3" fill="none" strokeLinecap="round" />

              {/* torso */}
              <path d="M126 108 Q120 82 138 68 Q158 58 176 68 Q186 86 170 108 Z" fill="#3DB39E" />
              <path d="M140 70 Q158 62 174 70 Q182 80 178 92 Q160 76 140 70Z" fill="#5CCDB7" opacity=".7" />

              {/* arms */}
              <path d="M146 82 L152 104" stroke="#E7A56F" strokeWidth="8" strokeLinecap="round" />
              <path d="M170 76 L222 62" stroke="#3DB39E" strokeWidth="12" strokeLinecap="round" />
              <path d="M214 64 L236 58" stroke="#F2B27C" strokeWidth="8" strokeLinecap="round" />
              <path d="M236 58 L248 55" stroke="#F2B27C" strokeWidth="4" strokeLinecap="round" />
              <circle cx="238" cy="59" r="5" fill="#F2B27C" />

              {/* head, mask and cap */}
              <rect x="170" y="56" width="10" height="12" rx="4" fill="#E7A56F" />
              <circle cx="182" cy="46" r="15" fill="#F2B27C" />
              <ellipse cx="170" cy="48" rx="3" ry="4" fill="#E09A63" />
              <path d="M176 51 Q192 54 198 49 Q199 63 188 65 Q178 63 176 51Z" fill="#CFEFF7" />
              <path d="M176 51 Q188 56 198 49" stroke="#9ACDDB" strokeWidth="1.5" fill="none" />
              <path d="M172 49 L176 51" stroke="#9ACDDB" strokeWidth="1.5" />
              <circle cx="191" cy="44" r="1.9" fill="#2A1A12" />
              <path d="M186 40 Q191 38 195 40" stroke="#2A1A12" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M165 44 Q165 28 183 29 Q199 31 199 44 Q184 38 165 44Z" fill="#FFC21A" />
              <path d="M190 40 L214 42 Q218 46 212 48 L192 47 Z" fill="#F2A900" />
              <path d="M165 44 Q184 38 199 44" stroke="#E69A00" strokeWidth="1.6" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}