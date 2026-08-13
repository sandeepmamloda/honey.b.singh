'use client';

import { useState, useEffect } from 'react';
import styles from './hero.module.css';
import { LoaderLink } from "@/components/common/loader/loader";

const TAGS = [
  { label: 'Story', active: false },
  { label: 'Woman', active: false },
  { label: 'Teach', active: true },
  { label: 'Film', active: false },
  { label: 'Gym', active: false },
];

function ArrowRight() {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
       <path d="M-1.95093e-05 6.13406V4.94906H8.68498L4.30498 0.809062L5.09998 -0.000937879L10.5 5.18906V5.84906L5.09998 11.0541L4.28998 10.2291L8.63998 6.13406H-1.95093e-05Z" fill="rgba(124, 111, 163, 1)"/>
    </svg>
  );
}

function ArrowDiagonal() {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
       <path d="M0.944902 8.17453L0.104902 7.33453L6.3299 1.12453H-9.76138e-05V-0.000469208H7.7549L8.2349 0.464531V8.24953H7.1099V2.00953L0.944902 8.17453Z" fill="#080808"/>
    </svg>
  );
}

function Badge() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      // Scroll karne par offset add hoga jo speed ko boost/slow karega
      setScrollOffset((prev) => prev + delta * 0.35);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.badge}>
      <svg aria-hidden="true" className={styles.svg} viewBox="0 0 260 260">
        <defs>
          <path
            id="badgePath"
            d="M130,130 m-85,0 a85,85 0 1,1 170,0 a85,85 0 1,1 -170,0"
          />
        </defs>
        <circle cx="130" cy="130" r="124" className={styles.circle} />
        <g 
          className={styles.spin}
          style={{ '--scroll-offset': `${scrollOffset}deg` }}
        >
          <text className={styles.ring}>
            <textPath
              href="#badgePath"
              startOffset="0%"
              textLength="530"
              lengthAdjust="spacing"
            >
            . ONE PERSON. SAME HONESTY. THREE ROOMS
            </textPath>
          </text>
        </g>
      </svg>
      <span className={styles.center}>Honey</span>
    </div>
  );
}

export default function Hero() {
  const [hovered, setHovered] = useState(null);

  const quietGrow = hovered === 'quiet' ? 1.35 : hovered === 'loud' ? 0.85 : 1;
  const loudGrow = hovered === 'loud' ? 1.35 : hovered === 'quiet' ? 0.85 : 1;

  return (
    <section className={styles.wrapper}>
      <span className={`${styles.corner} ${styles.cornerTL}`} />
      <span className={`${styles.corner} ${styles.cornerTR}`} />
      <span className={`${styles.corner} ${styles.cornerBL}`} />
      <span className={`${styles.corner} ${styles.cornerBR}`} />

      {/* left — the quiet room */}
      <LoaderLink
        href="/film"
        className={`${styles.panel} ${styles.quiet}`}
        style={{ flexGrow: quietGrow, cursor: 'pointer' }}
        onMouseEnter={() => setHovered('quiet')}
        onMouseLeave={() => setHovered(null)}
      >
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowRule} />
          <span>The Quiet Room</span>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            <span className={styles.titleLineWrap}>
              <span className={styles.titleLine} style={{ animationDelay: '0.35s' }}>
                Films about
              </span>
            </span>
            <span className={styles.titleLineWrap}>
              <span className={styles.titleLine} style={{ animationDelay: '0.55s' }}>
                Girlhood &amp; Womanhood.
              </span>
            </span>
          </h1>
          <p className={styles.sub}>
            Directing and Writing (about south asian women, mostly) One honest scene at a time.
          </p>

          <hr className={styles.rule} />

          <p className={styles.credit}>HEER</p>
          <p className={styles.creditNote}>Best Short, London South Asian Film Festival</p>

          <hr className={styles.rule} />

          {/* visual only — the whole panel above is already the LoaderLink,
              so this isn't a separate <a> (avoids nested anchors) */}
          <span className={styles.cta}>
            Enter quietly
            <ArrowRight />
          </span>
        </div>
      </LoaderLink>

      {/* right — the loud room */}
      <LoaderLink
        href="/newhoneyverse"
        className={`${styles.panel} ${styles.loud}`}
        style={{ flexGrow: loudGrow, cursor: 'pointer' }}
        onMouseEnter={() => setHovered('loud')}
        onMouseLeave={() => setHovered(null)}
      >
        <div className={styles.eyebrow}>
          <span>The Loud Room</span>
          <span className={styles.eyebrowRule} />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>
            <span className={styles.titleLineWrap}>
              <span className={styles.titleLine} style={{ animationDelay: '0.35s' }}>
                Oh <span className={styles.honeyWhite}>Honey,</span>
              </span>
            </span>
            <span className={styles.titleLineWrap}>
              <span className={styles.titleLine} style={{ animationDelay: '0.55s' }}>
                Honey.
              </span>
            </span>
          </h2>
          <p className={styles.sub}>
            The internet side. Blunt, outspoken, brutal. Same woman, same honesty, four times the volume.
          </p>

          <div className={styles.tags}>
            {TAGS.map((tag) => (
              <span
                key={tag.label}
                className={`${styles.tag} ${tag.active ? styles.tagActive : ''}`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* visual only — see note above */}
          <span className={styles.cta}>
            Enter Loud
            <ArrowDiagonal />
          </span>
        </div>
      </LoaderLink>

      <Badge />
    </section>
  );
}