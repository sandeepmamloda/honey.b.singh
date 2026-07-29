"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import {
  LoaderLink,
} from "@/components/common/loader/loader";


const navLinks = [
  { name: "Film", href: "/film" },
  { name: "Honeyverse", href: "/honeyverse" },
  { name: "Teach", href: "/teach" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];


const marqueeWords = [
  { text: "Story", accent: false },
  { text: "Woman", accent: false },
  { text: "Teach", accent: false },
  { text: "Film", accent: false },
  { text: "Same Honesty At Speed", accent: true },

  { text: "Story", accent: false },
  { text: "Woman", accent: false },
  { text: "Teach", accent: false },
  { text: "Film", accent: false },
  { text: "Same Honesty At Speed", accent: true },

  { text: "Story", accent: false },
  { text: "Woman", accent: false },
  { text: "Teach", accent: false },
  { text: "Film", accent: false },
  { text: "Same Honesty At Speed", accent: true },

  { text: "Story", accent: false },
  { text: "Woman", accent: false },
  { text: "Teach", accent: false },
  { text: "Film", accent: false },
  { text: "Same Honesty At Speed", accent: true },
];


const MarqueeContent = ({ innerRef }) => (
  <div className={styles["marquee-group"]} ref={innerRef}>
    {marqueeWords.map((word, index) => (
      <span key={index} className={styles["marquee-item"]}>
        <span
          className={
            word.accent ? styles["text-accent"] : styles["text-white"]
          }
        >
          {word.text}
        </span>
        <span className={styles["dot"]}>·</span>
      </span>
    ))}
  </div>
);


const MagneticButton = ({ href, children, className }) => {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const el = btnRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const strength = 0.35;

    setIsHovering(true);
    setPos({ x: relX * strength, y: relY * strength });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      className={`${className} ${styles["magnetic"]}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: isHovering
          ? `transform 0.15s ease-out, background 0.2s ease, color 0.2s ease, box-shadow 0.25s ease`
          : `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, color 0.2s ease, box-shadow 0.25s ease`,
      }}
    >
      {children}
    </a>
  );
};


/* ══════════════════════════════
   HAMBURGER ICON (opens the menu)
══════════════════════════════ */
const HamburgerIcon = ({ isOpen, onClick }) => (
  <button
    type="button"
    className={`${styles["hamburger"]} ${
      isOpen ? styles["hamburger-open"] : ""
    }`}
    onClick={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
  >
    <span className={styles["hamburger-line"]} />
    <span className={styles["hamburger-line"]} />
    <span className={styles["hamburger-line"]} />
  </button>
);


/* ══════════════════════════════
   CLOSE BUTTON (inside overlay)
══════════════════════════════ */
const CloseButton = ({ onClick }) => (
  <button
    type="button"
    className={styles["close-btn"]}
    onClick={onClick}
    aria-label="Close menu"
  >
    <span className={styles["close-line"]} />
    <span className={styles["close-line"]} />
  </button>
);


const Navbar = () => {
  const groupRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ══════════════════════════════
     MARQUEE WIDTH MEASUREMENT
  ══════════════════════════════ */

  useEffect(() => {
    const measure = () => {
      if (groupRef.current) {
        setDistance(groupRef.current.offsetWidth);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);

    if (groupRef.current) {
      observer.observe(groupRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* ══════════════════════════════
     SCROLL DETECTION
  ══════════════════════════════ */

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY.current;
      const tolerance = 25;

      if (isMenuOpen) {
        ticking = false;
        return;
      }

      if (currentScrollY <= 80) {
        setIsHidden(false);
      } else if (scrollDiff > tolerance) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
      } else if (scrollDiff < -tolerance) {
        setIsHidden(true);
        lastScrollY.current = currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  /* ══════════════════════════════
     LOCK BODY SCROLL WHEN MENU OPEN
  ══════════════════════════════ */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  return (
    <div
      className={`${styles["navbar-container"]} ${
        isHidden ? styles["navbar-hidden"] : ""
      }`}
    >
      {/* ── HEADER ── */}
      <div className={styles["header-wrapper"]}>
        <header className={styles["header-main"]}>
          <LoaderLink href="/" className={styles["logo"]}>
            honey oh honey
          </LoaderLink>

          <div className={styles["nav-actions"]}>
            {/* Desktop Nav */}
            <nav className={styles["nav"]}>
              {navLinks.map((link) => (
                <LoaderLink
                  href={link.href}
                  className={styles["nav-link"]}
                  key={link.name}
                >
                  {link.name}
                </LoaderLink>
              ))}
            </nav>

            <MagneticButton
              href="#subscribe"
              className={styles["subscribe-btn"]}
            >
              Subscribe ↗
            </MagneticButton>

            {/* Hamburger — tablet/mobile only, opens the overlay */}
            <HamburgerIcon isOpen={isMenuOpen} onClick={openMenu} />
          </div>
        </header>
      </div>

      {/* ── MARQUEE ── */}
      <div className={styles["marquee-wrapper"]}>
        <div
          className={styles["marquee-track"]}
          style={{
            "--marquee-distance": `${distance}px`,
            animationPlayState: distance ? "running" : "paused",
          }}
        >
          <MarqueeContent innerRef={groupRef} />
          <MarqueeContent />
        </div>
      </div>

      {/* ── MOBILE / TABLET MENU OVERLAY (LoaderLink used) ── */}
      <div
        className={`${styles["mobile-menu"]} ${
          isMenuOpen ? styles["mobile-menu-open"] : ""
        }`}
      >
        {/* Close button inside overlay */}
        <CloseButton onClick={closeMenu} />

        {/*
          IMPORTANT FIX:
          LoaderLink pe direct onClick={closeMenu} pass NAHI karte —
          isse uska internal navigation/loader onClick override ho jaata
          tha aur browser full page reload karta tha.

          Iske bajaye <nav> pe onClickCapture use kar rahe hai — ye sirf
          menu close karega, LoaderLink ka apna click handler untouched
          rahega, isliye client-side routing sahi se kaam karegi.
        */}
        <nav
          className={styles["mobile-nav"]}
          onClickCapture={(e) => {
            // Sirf tab close karo jab click kisi actual link pe hua ho
            if (e.target.closest("a")) {
              closeMenu();
            }
          }}
        >
          {navLinks.map((link, i) => (
            <LoaderLink
              href={link.href}
              className={styles["mobile-nav-link"]}
              key={link.name}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {link.name}
            </LoaderLink>
          ))}

          <MagneticButton
            href="#subscribe"
            className={styles["mobile-subscribe-btn"]}
          >
            Subscribe ↗
          </MagneticButton>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;